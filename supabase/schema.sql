create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'admin' check (role in ('admin', 'collaborator')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone_country_name text not null,
  phone_country_code text not null,
  phone_number text not null,
  attendance text not null check (attendance in ('yes', 'no', 'unsure')),
  has_companion boolean,
  companion_name text,
  travel_from_outside boolean not null,
  needs_accommodation boolean not null,
  dietary_restrictions text,
  locale text not null default 'es',
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.admin_profiles enable row level security;
alter table public.rsvp_responses enable row level security;

drop policy if exists "Los usuarios del panel pueden ver su propio perfil" on public.admin_profiles;
create policy "Los usuarios del panel pueden ver su propio perfil"
on public.admin_profiles
for select
to authenticated
using (
  auth.uid() = id
  and role in ('admin', 'collaborator')
);

drop policy if exists "Los usuarios del panel pueden ver todas las respuestas" on public.rsvp_responses;
create policy "Los usuarios del panel pueden ver todas las respuestas"
on public.rsvp_responses
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role in ('admin', 'collaborator')
  )
);

drop policy if exists "Los usuarios del panel pueden crear respuestas" on public.rsvp_responses;
create policy "Los usuarios del panel pueden crear respuestas"
on public.rsvp_responses
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role in ('admin', 'collaborator')
  )
);

drop policy if exists "Los usuarios del panel pueden actualizar respuestas" on public.rsvp_responses;
create policy "Los usuarios del panel pueden actualizar respuestas"
on public.rsvp_responses
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role in ('admin', 'collaborator')
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role in ('admin', 'collaborator')
  )
);

drop policy if exists "Solo admins pueden eliminar respuestas" on public.rsvp_responses;
create policy "Solo admins pueden eliminar respuestas"
on public.rsvp_responses
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role = 'admin'
  )
);
