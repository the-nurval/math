-- Схема базы для сайта «Математика, 7 класс».
-- Запуск: Supabase → SQL Editor → New query → вставить весь файл → Run.
-- Повторный запуск безопасен.

-- ---------- Таблицы ----------

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('student','parent')),
  name        text not null default '',
  settings    jsonb not null default '{}'::jsonb,
  seen_oly    text[] not null default '{}',
  link_code   text unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.links (
  parent_id   uuid not null references public.profiles(id) on delete cascade,
  student_id  uuid not null references public.profiles(id) on delete cascade,
  status      text not null default 'pending' check (status in ('pending','active')),
  created_at  timestamptz not null default now(),
  primary key (parent_id, student_id)
);

create table if not exists public.results (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.profiles(id) on delete cascade,
  client_id   text not null,
  ts          timestamptz not null,
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  unique (student_id, client_id)
);
create index if not exists results_student_ts on public.results (student_id, ts desc);

-- ---------- Код для привязки родителя ----------

create or replace function public.gen_link_code() returns text
language plpgsql volatile set search_path = public as $$
declare c text;
begin
  loop
    c := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    exit when not exists (select 1 from public.profiles where link_code = c);
  end loop;
  return c;
end $$;

create or replace function public.profiles_before_insert() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.role = 'student' and new.link_code is null then
    new.link_code := public.gen_link_code();
  end if;
  return new;
end $$;

drop trigger if exists profiles_before_insert on public.profiles;
create trigger profiles_before_insert before insert on public.profiles
  for each row execute function public.profiles_before_insert();

-- роль и код менять нельзя после создания профиля
create or replace function public.profiles_before_update() returns trigger
language plpgsql set search_path = public as $$
begin
  new.role := old.role;
  new.link_code := old.link_code;
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists profiles_before_update on public.profiles;
create trigger profiles_before_update before update on public.profiles
  for each row execute function public.profiles_before_update();

-- ---------- Помощники для правил доступа ----------

create or replace function public.is_parent_of(sid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links
                 where parent_id = auth.uid() and student_id = sid and status = 'active');
$$;

create or replace function public.is_linked_parent(pid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links
                 where parent_id = pid and student_id = auth.uid());
$$;

-- ---------- Правила доступа (RLS) ----------

alter table public.profiles enable row level security;
alter table public.links    enable row level security;
alter table public.results  enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_parent_of(id) or public.is_linked_parent(id));

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert to authenticated
  with check (id = auth.uid());

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists links_select on public.links;
create policy links_select on public.links for select to authenticated
  using (parent_id = auth.uid() or student_id = auth.uid());

-- ученик подтверждает запрос родителя
drop policy if exists links_update on public.links;
create policy links_update on public.links for update to authenticated
  using (student_id = auth.uid()) with check (student_id = auth.uid() and status = 'active');

-- любая сторона может разорвать связь
drop policy if exists links_delete on public.links;
create policy links_delete on public.links for delete to authenticated
  using (parent_id = auth.uid() or student_id = auth.uid());

drop policy if exists results_select on public.results;
create policy results_select on public.results for select to authenticated
  using (student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists results_insert on public.results;
create policy results_insert on public.results for insert to authenticated
  with check (student_id = auth.uid()
              and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student'));

-- ---------- Функции привязки ----------

-- родитель вводит код из профиля ученика: связь сразу активна
drop function if exists public.link_by_code(text);
create or replace function public.link_by_code(p_code text) returns json
language plpgsql security definer set search_path = public as $$
declare me public.profiles; s public.profiles;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null or me.role <> 'parent' then raise exception 'not_parent'; end if;
  select * into s from public.profiles where link_code = upper(trim(p_code)) and role = 'student';
  if s.id is null then raise exception 'not_found'; end if;
  insert into public.links (parent_id, student_id, status) values (me.id, s.id, 'active')
    on conflict (parent_id, student_id) do update set status = 'active';
  return json_build_object('student_id', s.id, 'name', s.name);
end $$;

-- родитель вводит почту ученика: запрос ждёт подтверждения ученика
drop function if exists public.request_link_by_email(text);
create or replace function public.request_link_by_email(p_email text) returns json
language plpgsql security definer set search_path = public, auth as $$
declare me public.profiles; sid uuid;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null or me.role <> 'parent' then raise exception 'not_parent'; end if;
  select u.id into sid from auth.users u join public.profiles p on p.id = u.id
   where lower(u.email) = lower(trim(p_email)) and p.role = 'student';
  if sid is null then raise exception 'not_found'; end if;
  insert into public.links (parent_id, student_id, status) values (me.id, sid, 'pending')
    on conflict (parent_id, student_id) do nothing;
  return json_build_object('ok', true);
end $$;

-- ученик: кто подключён или просит доступ
create or replace function public.my_parents()
returns table (parent_id uuid, name text, email text, status text)
language sql stable security definer set search_path = public, auth as $$
  select l.parent_id, p.name, u.email::text, l.status
    from public.links l
    join public.profiles p on p.id = l.parent_id
    join auth.users u on u.id = l.parent_id
   where l.student_id = auth.uid()
   order by l.created_at;
$$;

-- родитель: подключённые ученики и отправленные запросы
create or replace function public.my_students()
returns table (student_id uuid, name text, email text, status text)
language sql stable security definer set search_path = public, auth as $$
  select l.student_id, p.name, u.email::text, l.status
    from public.links l
    join public.profiles p on p.id = l.student_id
    join auth.users u on u.id = l.student_id
   where l.parent_id = auth.uid()
   order by l.created_at;
$$;

revoke all on function public.link_by_code(text) from public, anon;
revoke all on function public.request_link_by_email(text) from public, anon;
revoke all on function public.my_parents() from public, anon;
revoke all on function public.my_students() from public, anon;
grant execute on function public.link_by_code(text) to authenticated;
grant execute on function public.request_link_by_email(text) to authenticated;
grant execute on function public.my_parents() to authenticated;
grant execute on function public.my_students() to authenticated;
