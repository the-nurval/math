-- Схема базы для сайта Math Check.
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
-- мягкое удаление: 30 дней аккаунт можно восстановить, потом purge_deleted удаляет его навсегда
alter table public.profiles add column if not exists deleted_at timestamptz;
alter table public.profiles add column if not exists deleted_by uuid;

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

-- запросы на удаление: ссылка из письма действует 24 часа
create table if not exists public.delete_requests (
  id           uuid primary key default gen_random_uuid(),
  target       uuid not null references public.profiles(id) on delete cascade,
  requested_by uuid not null references public.profiles(id) on delete cascade,
  ctx          jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now()
);

-- ---------- Профиль: роль меняется только через change_role ----------

create or replace function public.profiles_before_update() returns trigger
language plpgsql set search_path = public as $$
begin
  if coalesce(current_setting('app.role_change', true), '') <> '1' then
    new.role := old.role;
    new.role_changed := old.role_changed;
  end if;
  if coalesce(current_setting('app.sys', true), '') <> '1' then
    new.deleted_at := old.deleted_at;
    new.deleted_by := old.deleted_by;
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

create or replace function public.alive(pid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = pid and deleted_at is null);
$$;

create or replace function public.is_parent_of(sid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links
                 where parent_id = auth.uid() and student_id = sid and status = 'active')
     and public.alive(sid) and public.alive(auth.uid());
$$;

create or replace function public.is_main_parent_of(sid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.links
                 where parent_id = auth.uid() and student_id = sid and status = 'active' and kind = 'main')
     and public.alive(sid) and public.alive(auth.uid());
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
alter table public.delete_requests enable row level security;

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
              and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student' and p.deleted_at is null));

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
    if me.deleted_at is not null then return me; end if;  -- сайт покажет экран восстановления
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
declare me public.profiles; em text := lower(trim(p_email)); s public.profiles; iid uuid;
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
  insert into public.invites (email, role, parent_id, invited_by, confirm) values (em, 'student', me.id, me.id, true) returning id into iid;
  insert into public.outbox (to_email, kind, lang, payload)
    values (em, 'invite_child', public.my_lang(), json_build_object('from_name', me.name, 'from_email', me.email, 'invite_id', iid)::jsonb);
  return 'invited';
end $$;

-- приглашение родителя: ребёнок зовёт родителя или главный родитель зовёт второго.
-- Подтверждение не нужно. Первый родитель ученика становится главным.
drop function if exists public.invite_parent(text, uuid);
create or replace function public.invite_parent(p_email text, p_student uuid) returns text
language plpgsql security definer set search_path = public, auth as $$
declare me public.profiles; em text := lower(trim(p_email)); sid uuid; p public.profiles; k text; iid uuid;
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
  insert into public.invites (email, role, student_id, invited_by, kind) values (em, 'parent', sid, me.id, k) returning id into iid;
  insert into public.outbox (to_email, kind, lang, payload)
    values (em, case when me.role = 'student' then 'invite_parent_by_child' else 'invite_parent_by_parent' end, public.my_lang(),
            json_build_object('from_name', me.name, 'from_email', me.email, 'invite_id', iid,
                              'student_name', (select name from public.profiles where id = sid))::jsonb);
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

-- отключить связь: родитель — себя, главный родитель — второго, ученик — любого своего родителя.
-- Если ученик отвязался, родитель получает письмо. Если уходит главный, главным становится следующий родитель.
drop function if exists public.unlink(uuid, uuid);
create or replace function public.unlink(p_parent uuid, p_student uuid) returns void
language plpgsql security definer set search_path = public as $$
declare was text; st text; me public.profiles; par public.profiles;
begin
  if p_parent <> auth.uid() and p_student <> auth.uid() and not public.is_main_parent_of(p_student) then raise exception 'not_allowed'; end if;
  delete from public.links where parent_id = p_parent and student_id = p_student returning kind, status into was, st;
  if p_student = auth.uid() and st = 'active' then
    select * into me from public.profiles where id = auth.uid();
    select * into par from public.profiles where id = p_parent;
    if par.id is not null and par.deleted_at is null then
      insert into public.outbox (to_email, kind, lang, payload)
        values (par.email, 'unlinked', coalesce(par.settings->>'lang', 'ru'), json_build_object('from_name', me.name, 'from_email', me.email)::jsonb);
    end if;
  end if;
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
   where l.student_id = auth.uid() and p.deleted_at is null
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
   where l.parent_id = auth.uid() and p.deleted_at is null
   order by l.created_at;
$$;

-- родители ученика (для родителя, который его видит)
drop function if exists public.student_parents(uuid);
create or replace function public.student_parents(p_student uuid)
returns table (parent_id uuid, name text, email text, kind text, last_seen timestamptz)
language sql stable security definer set search_path = public as $$
  select l.parent_id, p.name, p.email, l.kind, p.last_seen
    from public.links l join public.profiles p on p.id = l.parent_id
   where l.student_id = p_student and l.status = 'active' and p.deleted_at is null and public.is_parent_of(p_student)
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
              where l.student_id = me.id and l.status = 'active' and p.deleted_at is null loop
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

-- ---------- Приглашение по ссылке ----------

-- Что показать на странице приглашения. Доступно без входа: id приглашения случайный и приходит только в письме.
drop function if exists public.invite_info(uuid);
create or replace function public.invite_info(p_id uuid)
returns table (role text, email text, from_name text, from_email text, from_role text, student_name text)
language sql stable security definer set search_path = public as $$
  select i.role, i.email, f.name, f.email, f.role, s.name
    from public.invites i
    join public.profiles f on f.id = i.invited_by
    left join public.profiles s on s.id = i.student_id
   where i.id = p_id;
$$;

-- Вошёл с другой почтой и согласился: приглашение привязывается к текущему аккаунту.
drop function if exists public.claim_invite(uuid, text);
create or replace function public.claim_invite(p_id uuid, p_name text) returns public.profiles
language plpgsql security definer set search_path = public, auth as $$
declare inv public.invites; me public.profiles;
begin
  select * into inv from public.invites where id = p_id;
  if inv.id is null then raise exception 'invite_gone'; end if;
  select * into me from public.profiles where id = auth.uid();
  if me.id is null then
    insert into public.profiles (id, role, name, email) values (auth.uid(), inv.role, coalesce(p_name, ''), public.my_email()) returning * into me;
  end if;
  if me.deleted_at is not null then raise exception 'deleted'; end if;
  if me.role <> inv.role then raise exception 'role_mismatch'; end if;
  if inv.role = 'student' then
    insert into public.links (parent_id, student_id, kind, status)
      values (inv.parent_id, me.id,
              case when exists (select 1 from public.links where student_id = me.id and kind = 'main') then 'second' else 'main' end,
              'active')
      on conflict (parent_id, student_id) do update set status = 'active';
  else
    insert into public.links (parent_id, student_id, kind, status)
      values (me.id, inv.student_id,
              case when exists (select 1 from public.links where student_id = inv.student_id and kind = 'main') then 'second' else 'main' end,
              'active')
      on conflict (parent_id, student_id) do update set status = 'active';
  end if;
  delete from public.invites where id = inv.id;
  return me;
end $$;

-- ---------- Удаление аккаунта: запрос → письмо → 30 дней на восстановление ----------

-- p_target: null — свой аккаунт; id ученика — удаляет главный родитель.
-- p_ctx: названия и цвета тем на языке письма, число олимпиадных задач — для письма с итогами.
drop function if exists public.request_delete(uuid, jsonb);
create or replace function public.request_delete(p_target uuid, p_ctx jsonb) returns text
language plpgsql security definer set search_path = public as $$
declare me public.profiles; t public.profiles; rid uuid;
begin
  select * into me from public.profiles where id = auth.uid();
  if me.id is null or me.deleted_at is not null then raise exception 'no_profile'; end if;
  if p_target is null or p_target = me.id then t := me;
  else
    if not public.is_main_parent_of(p_target) then raise exception 'not_main'; end if;
    select * into t from public.profiles where id = p_target;
  end if;
  delete from public.delete_requests where target = t.id and requested_by = me.id;
  insert into public.delete_requests (target, requested_by, ctx) values (t.id, me.id, coalesce(p_ctx, '{}'::jsonb)) returning id into rid;
  insert into public.outbox (to_email, kind, lang, payload)
    values (me.email, 'delete_confirm', coalesce(me.settings->>'lang', 'ru'),
            json_build_object('token', rid, 'self', t.id = me.id, 'name', t.name, 'email', t.email)::jsonb);
  return me.email;
end $$;

-- итоги ученика для письма после удаления
create or replace function public.student_stats(sid uuid, ctx jsonb) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare n int; av int; tsec bigint; oly int; best record; g int; tp jsonb; wk jsonb; a1 numeric; a0 numeric;
begin
  select count(*), round(avg(case when (data->>'max')::numeric > 0 then (data->>'score')::numeric / (data->>'max')::numeric end) * 100),
         coalesce(sum((data->>'timeSec')::numeric), 0)
    into n, av, tsec from public.results where student_id = sid;
  select count(distinct x) into oly from public.results r, jsonb_array_elements_text(coalesce(r.data->'olyOk', '[]'::jsonb)) x where r.student_id = sid;
  select round((data->>'score')::numeric / (data->>'max')::numeric * 100) as pc, ts into best
    from public.results where student_id = sid and (data->>'max')::numeric > 0 order by 1 desc, ts desc limit 1;
  select avg((data->>'score')::numeric / (data->>'max')::numeric) into a1 from public.results
   where student_id = sid and (data->>'max')::numeric > 0 and ts > now() - interval '30 days';
  select avg((data->>'score')::numeric / (data->>'max')::numeric) into a0 from public.results
   where student_id = sid and (data->>'max')::numeric > 0 and ts <= now() - interval '30 days' and ts > now() - interval '60 days';
  g := case when a1 is not null and a0 is not null then round((a1 - a0) * 100) end;
  select coalesce(jsonb_agg(jsonb_build_object('name', coalesce(ctx->'topics'->k->>'n', k), 'color', coalesce(ctx->'topics'->k->>'c', '#6fa8f5'), 'pc', pc) order by pc desc), '[]'::jsonb)
    into tp from (
      select k, round(sum((v->>0)::numeric) / nullif(sum((v->>1)::numeric), 0) * 100) as pc
        from public.results r, jsonb_each(coalesce(r.data->'topics', '{}'::jsonb)) as e(k, v)
       where r.student_id = sid and k not in ('oly', 'proof')
       group by k having sum((v->>1)::numeric) > 0) q;
  -- последние 6 недель, с понедельника
  select coalesce(jsonb_agg(jsonb_build_object('start', w::date, 'pc', pc) order by w), '[]'::jsonb) into wk from (
    select w, (select round(avg((data->>'score')::numeric / nullif((data->>'max')::numeric, 0)) * 100)
                 from public.results where student_id = sid and ts >= w and ts < w + interval '7 days') as pc
      from generate_series(date_trunc('week', now()) - interval '5 weeks', date_trunc('week', now()), interval '1 week') w) q;
  return jsonb_build_object('works', n, 'avg', av, 'time', tsec, 'oly', oly, 'oly_total', ctx->'olyTotal',
                            'best', best.pc, 'best_at', best.ts, 'growth', g, 'topics', tp, 'weeks', wk);
end $$;

-- Ссылка из письма. Доступно без входа: id запроса случайный и приходит только в письме.
drop function if exists public.confirm_delete(uuid);
create or replace function public.confirm_delete(p_token uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.delete_requests; t public.profiles; rq public.profiles; until timestamptz; par record;
begin
  select * into r from public.delete_requests where id = p_token;
  if r.id is null or r.created_at < now() - interval '24 hours' then raise exception 'link_expired'; end if;
  select * into t from public.profiles where id = r.target;
  select * into rq from public.profiles where id = r.requested_by;
  if t.deleted_at is null then
    perform set_config('app.sys', '1', true);
    update public.profiles set deleted_at = now(), deleted_by = rq.id where id = t.id returning * into t;
    perform set_config('app.sys', '', true);
  end if;
  until := t.deleted_at + interval '30 days';
  insert into public.outbox (to_email, kind, lang, payload)
    values (rq.email, 'farewell', coalesce(rq.settings->>'lang', 'ru'),
            jsonb_build_object('self', t.id = rq.id, 'role', t.role, 'name', t.name, 'email', t.email, 'until', until,
                               'stats', case when t.role = 'student' then public.student_stats(t.id, r.ctx) end));
  if t.id <> rq.id then
    insert into public.outbox (to_email, kind, lang, payload)
      values (t.email, 'child_deleted', coalesce(t.settings->>'lang', 'ru'),
              jsonb_build_object('from_name', rq.name, 'from_email', rq.email, 'until', until));
    for par in select p.email, coalesce(p.settings->>'lang', 'ru') as lang
                 from public.links l join public.profiles p on p.id = l.parent_id
                where l.student_id = t.id and l.status = 'active' and l.parent_id <> rq.id and p.deleted_at is null loop
      insert into public.outbox (to_email, kind, lang, payload)
        values (par.email, 'second_deleted', par.lang,
                jsonb_build_object('from_name', rq.name, 'from_email', rq.email, 'name', t.name, 'until', until));
    end loop;
  end if;
  delete from public.delete_requests where target = t.id;
  return jsonb_build_object('self', t.id = rq.id, 'role', t.role, 'name', t.name, 'email', t.email, 'until', until, 'by', rq.id);
end $$;

-- вход в удалённый аккаунт в течение 30 дней
drop function if exists public.restore_account();
create or replace function public.restore_account() returns public.profiles
language plpgsql security definer set search_path = public as $$
declare me public.profiles;
begin
  perform set_config('app.sys', '1', true);
  update public.profiles set deleted_at = null, deleted_by = null, last_seen = now()
   where id = auth.uid() and deleted_at > now() - interval '30 days' returning * into me;
  perform set_config('app.sys', '', true);
  if me.id is null then raise exception 'not_restorable'; end if;
  return me;
end $$;

-- Раз в сутки: навсегда удаляет аккаунты, удалённые больше 30 дней назад.
-- Если уходит главный родитель, главным становится следующий.
create or replace function public.purge_deleted() returns int
language plpgsql security definer set search_path = public, auth as $$
declare pid uuid; sid uuid; n int := 0;
begin
  for pid in select id from public.profiles where deleted_at < now() - interval '30 days' loop
    for sid in select student_id from public.links where parent_id = pid and kind = 'main' loop
      delete from public.links where parent_id = pid and student_id = sid;
      update public.links set kind = 'main'
       where (parent_id, student_id) = (select parent_id, student_id from public.links
                                         where student_id = sid order by created_at limit 1);
    end loop;
    delete from auth.users where id = pid;
    n := n + 1;
  end loop;
  delete from public.delete_requests where created_at < now() - interval '2 days';
  return n;
end $$;
revoke all on function public.purge_deleted() from public, anon, authenticated;
revoke all on function public.student_stats(uuid, jsonb) from public, anon, authenticated;

-- расписание: pg_cron (Supabase → Database → Extensions → pg_cron). Если расширения нет, этот шаг пропускается.
do $$
begin
  create extension if not exists pg_cron;
  perform cron.unschedule(jobid) from cron.job where jobname = 'math-purge-deleted';
  perform cron.schedule('math-purge-deleted', '17 3 * * *', 'select public.purge_deleted()');
exception when others then
  raise notice 'pg_cron недоступен: %', sqlerrm;
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
    'ask_help(text, text, text, boolean)', 'change_role()',
    'claim_invite(uuid, text)', 'request_delete(uuid, jsonb)', 'restore_account()']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
  -- без входа: страница приглашения и ссылка подтверждения удаления
  foreach f in array array['invite_info(uuid)', 'confirm_delete(uuid)'] loop
    execute format('revoke all on function public.%s from public', f);
    execute format('grant execute on function public.%s to anon, authenticated', f);
  end loop;
end $$;

drop function if exists public.link_by_code(text);
drop function if exists public.request_link_by_email(text);
drop function if exists public.is_linked_parent(uuid);
