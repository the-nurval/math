-- Схема базы для сайта «Математика, 7 класс».
-- Запуск: Supabase → SQL Editor → New query → вставить весь файл → Run.
-- Повторный запуск безопасен: данные не удаляются.

-- ---------- Таблицы ----------

create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         text not null check (role in ('student','parent')),
  name         text not null default '',
  email        text not null default '',
  settings     jsonb not null default '{}'::jsonb,
  seen_oly     text[] not null default '{}',
  role_changed boolean not null default false,
  last_seen    timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
alter table public.profiles add column if not exists email text not null default '';
alter table public.profiles add column if not exists role_changed boolean not null default false;
alter table public.profiles add column if not exists last_seen timestamptz not null default now();
alter table public.profiles drop column if exists link_code;

-- связь родитель — ученик. kind: main — главный родитель, second — второй.
-- status: pending — ученик ещё не подтвердил, что это его родитель.
create table if not exists public.links (
  parent_id   uuid not null references public.profiles(id) on delete cascade,
  student_id  uuid not null references public.profiles(id) on delete cascade,
  kind        text not null default 'main' check (kind in ('main','second')),
  status      text not null default 'pending' check (status in ('pending','active')),
  created_at  timestamptz not null default now(),
  primary key (parent_id, student_id)
);
alter table public.links add column if not exists kind text not null default 'main';

-- приглашения на почту, у которой ещё нет аккаунта
create table if not exists public.invites (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  role        text not null check (role in ('student','parent')),
  student_id  uuid references public.profiles(id) on delete cascade,
  parent_id   uuid references public.profiles(id) on delete cascade,
  invited_by  uuid not null references public.profiles(id) on delete cascade,
  kind        text not null default 'main' check (kind in ('main','second')),
  confirm     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists invites_email on public.invites (lower(email));

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

-- просьбы о помощи: ученик отмечает задание в проверенной работе
create table if not exists public.help (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.profiles(id) on delete cascade,
  result_cid  text not null,
  item_key    text not null,
  title       text not null default '',
  done        boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (student_id, result_cid, item_key)
);

-- письма к отправке. Заполняют только функции базы, отправляет функция send-mail.
create table if not exists public.outbox (
  id          uuid primary key default gen_random_uuid(),
  to_email    text not null,
  kind        text not null,
  lang        text not null default 'ru',
  payload     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  sent_at     timestamptz,
  error       text
);

-- ---------- Профиль: роль меняется только через change_role ----------

create or replace function public.profiles_before_update() returns trigger
language plpgsql set search_path = public as $$
begin
  if coalesce(current_setting('app.role_change', true), '') <> '1' then
    new.role := old.role;
    new.role_changed := old.role_changed;
  end if;
  new.email := old.email;
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists profiles_before_update on public.profiles;
create trigger profiles_before_update before update on public.profiles
  for each row execute function public.profiles_before_update();

drop trigger if exists profiles_before_insert on public.profiles;
drop function if exists public.profiles_before_insert();
drop function if exists public.gen_link_code();

-- ---------- Помощники ----------

create or replace function public.is_parent_of(sid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links
                 where parent_id = auth.uid() and student_id = sid and status = 'active');
$$;

create or replace function public.is_main_parent_of(sid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links
                 where parent_id = auth.uid() and student_id = sid and status = 'active' and kind = 'main');
$$;

-- в одной семье: ученик и его родители, родители одного ученика
create or replace function public.same_family(pid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links a
                  where a.status = 'active' and (
                        (a.student_id = auth.uid() and a.parent_id = pid)
                     or (a.parent_id = auth.uid() and a.student_id = pid)
                     or (a.parent_id = auth.uid() and exists (
                           select 1 from public.links b
                            where b.student_id = a.student_id and b.parent_id = pid and b.status = 'active'))));
$$;

create or replace function public.my_email() returns text
language sql stable security definer set search_path = public, auth as $$
  select lower(email) from auth.users where id = auth.uid();
$$;

create or replace function public.my_lang() returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select settings->>'lang' from public.profiles where id = auth.uid()), 'ru');
$$;

-- ---------- Правила доступа (RLS) ----------

alter table public.profiles enable row level security;
alter table public.links    enable row level security;
alter table public.invites  enable row level security;
alter table public.results  enable row level security;
alter table public.help     enable row level security;
alter table public.outbox   enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.same_family(id));

drop policy if exists profiles_insert on public.profiles;

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists links_select on public.links;
create policy links_select on public.links for select to authenticated
  using (parent_id = auth.uid() or student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists links_update on public.links;
drop policy if exists links_delete on public.links;

drop policy if exists invites_select on public.invites;
create policy invites_select on public.invites for select to authenticated
  using (invited_by = auth.uid() or public.is_parent_of(student_id) or student_id = auth.uid());

drop policy if exists results_select on public.results;
create policy results_select on public.results for select to authenticated
  using (student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists results_insert on public.results;
create policy results_insert on public.results for insert to authenticated
  with check (student_id = auth.uid()
              and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student'));

drop policy if exists help_select on public.help;
create policy help_select on public.help for select to authenticated
  using (student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists help_update on public.help;
create policy help_update on public.help for update to authenticated
  using (public.is_parent_of(student_id)) with check (public.is_parent_of(student_id));

-- outbox: доступа у пользователей нет совсем

-- ---------- Первый вход ----------

-- Возвращает профиль. Если профиля нет, но на эту почту есть приглашение,
-- создаёт профиль с ролью из приглашения. Иначе возвращает null: нужен выбор роли.
drop function if exists public.bootstrap(text);
create or replace function public.bootstrap(p_name text) returns public.profiles
language plpgsql security definer set search_path = public, auth as $$
declare me public.profiles; em text := public.my_email(); inv record; r text;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is not null then
    update public.profiles set last_seen = now() where id = me.id returning * into me;
    return me;
  end if;
  select role into r from public.invites where lower(email) = em order by created_at limit 1;
  if r is null then return null; end if;
  insert into public.profiles (id, role, name, email) values (auth.uid(), r, coalesce(p_name, ''), em) returning * into me;
  for inv in select * from public.invites where lower(email) = em and role = r order by created_at loop
    if r = 'student' then
      insert into public.links (parent_id, student_id, kind, status)
        values (inv.parent_id, me.id,
                case when exists (select 1 from public.links where student_id = me.id and kind = 'main') then 'second' else 'main' end,
                case when inv.confirm then 'pending' else 'active' end)
        on conflict do nothing;
    else
      insert into public.links (parent_id, student_id, kind, status)
        values (me.id, inv.student_id,
                case when exists (select 1 from public.links where student_id = inv.student_id and kind = 'main') then 'second' else 'main' end,
                'active')
        on conflict do nothing;
    end if;
  end loop;
  delete from public.invites where lower(email) = em;
  return me;
end $$;

drop function if exists public.create_profile(text, text, jsonb);
create or replace function public.create_profile(p_role text, p_name text, p_settings jsonb) returns public.profiles
language plpgsql security definer set search_path = public, auth as $$
declare me public.profiles;
begin
  if p_role not in ('student','parent') then raise exception 'bad_role'; end if;
  insert into public.profiles (id, role, name, email, settings)
    values (auth.uid(), p_role, coalesce(p_name, ''), public.my_email(), coalesce(p_settings, '{}'::jsonb))
    on conflict (id) do nothing;
  select * into me from public.profiles where id = auth.uid();
  return me;
end $$;

create or replace function public.touch() returns void
language sql security definer set search_path = public as $$
  update public.profiles set last_seen = now() where id = auth.uid();
$$;

-- ---------- Приглашения ----------

-- родитель приглашает ученика по почте. Ученик подтверждает «Это мой родитель».
drop function if exists public.invite_child(text);
create or replace function public.invite_child(p_email text) returns text
language plpgsql security definer set search_path = public, auth as $$
declare me public.profiles; em text := lower(trim(p_email)); s public.profiles;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null or me.role <> 'parent' then raise exception 'not_parent'; end if;
  if em = '' or position('@' in em) = 0 then raise exception 'bad_email'; end if;
  select p.* into s from public.profiles p join auth.users u on u.id = p.id where lower(u.email) = em;
  if s.id is not null then
    if s.role <> 'student' then raise exception 'not_student'; end if;
    insert into public.links (parent_id, student_id, kind, status)
      values (me.id, s.id,
              case when exists (select 1 from public.links where student_id = s.id and kind = 'main') then 'second' else 'main' end,
              'pending')
      on conflict do nothing;
    insert into public.outbox (to_email, kind, lang, payload)
      values (em, 'parent_wants_child', public.my_lang(), json_build_object('from_name', me.name, 'from_email', me.email)::jsonb);
    return 'requested';
  end if;
  if exists (select 1 from public.invites where lower(email) = em and parent_id = me.id) then return 'invited'; end if;
  insert into public.invites (email, role, parent_id, invited_by, confirm) values (em, 'student', me.id, me.id, true);
  insert into public.outbox (to_email, kind, lang, payload)
    values (em, 'invite_child', public.my_lang(), json_build_object('from_name', me.name, 'from_email', me.email)::jsonb);
  return 'invited';
end $$;

-- приглашение родителя: ребёнок зовёт родителя или главный родитель зовёт второго.
-- Подтверждение не нужно. Первый родитель ученика становится главным.
drop function if exists public.invite_parent(text, uuid);
create or replace function public.invite_parent(p_email text, p_student uuid) returns text
language plpgsql security definer set search_path = public, auth as $$
declare me public.profiles; em text := lower(trim(p_email)); sid uuid; p public.profiles; k text;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null then raise exception 'no_profile'; end if;
  if me.role = 'student' then sid := me.id;
  else
    sid := p_student;
    if not public.is_main_parent_of(sid) then raise exception 'not_main'; end if;
  end if;
  if em = '' or position('@' in em) = 0 then raise exception 'bad_email'; end if;
  k := case when exists (select 1 from public.links where student_id = sid and kind = 'main') then 'second' else 'main' end;
  select pr.* into p from public.profiles pr join auth.users u on u.id = pr.id where lower(u.email) = em;
  if p.id is not null then
    if p.role <> 'parent' then raise exception 'not_parent_account'; end if;
    insert into public.links (parent_id, student_id, kind, status) values (p.id, sid, k, 'active')
      on conflict (parent_id, student_id) do update set status = 'active';
    insert into public.outbox (to_email, kind, lang, payload)
      values (em, case when me.role = 'student' then 'child_added_you' else 'parent_added_you' end, public.my_lang(),
              json_build_object('from_name', me.name, 'from_email', me.email)::jsonb);
    return 'linked';
  end if;
  if exists (select 1 from public.invites where lower(email) = em and student_id = sid) then return 'invited'; end if;
  insert into public.invites (email, role, student_id, invited_by, kind) values (em, 'parent', sid, me.id, k);
  insert into public.outbox (to_email, kind, lang, payload)
    values (em, case when me.role = 'student' then 'invite_parent_by_child' else 'invite_parent_by_parent' end, public.my_lang(),
            json_build_object('from_name', me.name, 'from_email', me.email)::jsonb);
  return 'invited';
end $$;

drop function if exists public.cancel_invite(uuid);
create or replace function public.cancel_invite(p_id uuid) returns void
language sql security definer set search_path = public as $$
  delete from public.invites where id = p_id and invited_by = auth.uid();
$$;

-- ученик отвечает на запрос родителя: да — связь активна, нет — удаляется
drop function if exists public.answer_parent(uuid, boolean);
create or replace function public.answer_parent(p_parent uuid, p_yes boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_yes then
    update public.links set status = 'active' where parent_id = p_parent and student_id = auth.uid() and status = 'pending';
  else
    delete from public.links where parent_id = p_parent and student_id = auth.uid() and status = 'pending';
  end if;
end $$;

-- родитель отключает: себя сам, второго родителя — только главный.
-- Если уходит главный, главным становится следующий родитель.
drop function if exists public.unlink(uuid, uuid);
create or replace function public.unlink(p_parent uuid, p_student uuid) returns void
language plpgsql security definer set search_path = public as $$
declare was text;
begin
  if p_parent <> auth.uid() and not public.is_main_parent_of(p_student) then raise exception 'not_allowed'; end if;
  delete from public.links where parent_id = p_parent and student_id = p_student returning kind into was;
  if was = 'main' then
    update public.links set kind = 'main'
     where (parent_id, student_id) = (select parent_id, student_id from public.links
                                       where student_id = p_student order by created_at limit 1);
  end if;
end $$;

-- ---------- Семья: кто подключён и когда был в сети ----------

drop function if exists public.my_parents();
create or replace function public.my_parents()
returns table (parent_id uuid, name text, email text, kind text, status text, last_seen timestamptz)
language sql stable security definer set search_path = public as $$
  select l.parent_id, p.name, p.email, l.kind, l.status, p.last_seen
    from public.links l join public.profiles p on p.id = l.parent_id
   where l.student_id = auth.uid()
   order by l.kind, l.created_at;
$$;

drop function if exists public.my_students();
create or replace function public.my_students()
returns table (student_id uuid, name text, email text, kind text, status text, last_seen timestamptz, help_open int)
language sql stable security definer set search_path = public as $$
  select l.student_id, p.name, p.email, l.kind, l.status,
         case when l.status = 'active' then p.last_seen end,
         case when l.status = 'active' then (select count(*)::int from public.help h where h.student_id = l.student_id and not h.done) else 0 end
    from public.links l join public.profiles p on p.id = l.student_id
   where l.parent_id = auth.uid()
   order by l.created_at;
$$;

-- родители ученика (для родителя, который его видит)
drop function if exists public.student_parents(uuid);
create or replace function public.student_parents(p_student uuid)
returns table (parent_id uuid, name text, email text, kind text, last_seen timestamptz)
language sql stable security definer set search_path = public as $$
  select l.parent_id, p.name, p.email, l.kind, p.last_seen
    from public.links l join public.profiles p on p.id = l.parent_id
   where l.student_id = p_student and l.status = 'active' and public.is_parent_of(p_student)
   order by l.kind, l.created_at;
$$;

-- ---------- Просьба о помощи ----------

drop function if exists public.ask_help(text, text, text);
drop function if exists public.ask_help(text, text, text, boolean);
-- Ученик отмечает пример: с родителем — просьба о помощи (письмо), без родителя — «разобрать позже».
-- Открытых не больше 20. Полон список: без p_replace — ошибка list_full, с p_replace — удаляется самое старое.
create or replace function public.ask_help(p_cid text, p_key text, p_title text, p_replace boolean default false) returns text
language plpgsql security definer set search_path = public as $$
declare me public.profiles; par record; n int; sent boolean := false;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null or me.role <> 'student' then raise exception 'not_student'; end if;
  if not exists (select 1 from public.help where student_id = me.id and result_cid = p_cid and item_key = p_key and not done) then
    select count(*) into n from public.help where student_id = me.id and not done;
    if n >= 20 then
      if not p_replace then raise exception 'list_full'; end if;
      delete from public.help where id = (select id from public.help where student_id = me.id and not done order by created_at limit 1);
    end if;
  end if;
  insert into public.help (student_id, result_cid, item_key, title)
    values (me.id, p_cid, p_key, left(coalesce(p_title, ''), 200))
    on conflict (student_id, result_cid, item_key) do update set done = false, created_at = now();
  for par in select p.email, coalesce(p.settings->>'lang', 'ru') as lang
               from public.links l join public.profiles p on p.id = l.parent_id
              where l.student_id = me.id and l.status = 'active' loop
    insert into public.outbox (to_email, kind, lang, payload)
      values (par.email, 'help', par.lang, json_build_object('from_name', me.name, 'title', p_title)::jsonb);
    sent := true;
  end loop;
  return case when sent then 'sent' else 'saved' end;
end $$;

-- ученик убирает задание из своего списка
drop policy if exists help_delete on public.help;
create policy help_delete on public.help for delete to authenticated
  using (student_id = auth.uid());

-- ---------- Смена роли (один раз) и удаление аккаунта ----------

drop function if exists public.change_role();
create or replace function public.change_role() returns public.profiles
language plpgsql security definer set search_path = public as $$
declare me public.profiles;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null then raise exception 'no_profile'; end if;
  if me.role_changed then raise exception 'already_changed'; end if;
  if me.role = 'student' then
    delete from public.results where student_id = me.id;
    delete from public.help where student_id = me.id;
    delete from public.links where student_id = me.id;
    delete from public.invites where student_id = me.id or invited_by = me.id;
  else
    delete from public.links where parent_id = me.id;
    delete from public.invites where parent_id = me.id or invited_by = me.id;
  end if;
  perform set_config('app.role_change', '1', true);
  update public.profiles
     set role = case when me.role = 'student' then 'parent' else 'student' end,
         role_changed = true,
         settings = jsonb_build_object('lang', coalesce(me.settings->>'lang', 'ru'), 'theme', coalesce(me.settings->>'theme', 'system')),
         seen_oly = '{}'
   where id = me.id returning * into me;
  return me;
end $$;

drop function if exists public.delete_account();
create or replace function public.delete_account() returns void
language plpgsql security definer set search_path = public, auth as $$
declare sid uuid;
begin
  -- если уходит главный родитель, главным становится следующий
  for sid in select student_id from public.links where parent_id = auth.uid() and kind = 'main' loop
    delete from public.links where parent_id = auth.uid() and student_id = sid;
    update public.links set kind = 'main'
     where (parent_id, student_id) = (select parent_id, student_id from public.links
                                       where student_id = sid order by created_at limit 1);
  end loop;
  delete from auth.users where id = auth.uid();
end $$;

-- ---------- Права на вызов ----------

do $$
declare f text;
begin
  foreach f in array array[
    'bootstrap(text)', 'create_profile(text, text, jsonb)', 'touch()',
    'invite_child(text)', 'invite_parent(text, uuid)', 'cancel_invite(uuid)',
    'answer_parent(uuid, boolean)', 'unlink(uuid, uuid)',
    'my_parents()', 'my_students()', 'student_parents(uuid)',
    'ask_help(text, text, text, boolean)', 'change_role()', 'delete_account()']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

drop function if exists public.link_by_code(text);
drop function if exists public.request_link_by_email(text);
drop function if exists public.is_linked_parent(uuid);
