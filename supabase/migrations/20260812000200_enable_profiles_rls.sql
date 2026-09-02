-- Enables RLS on profiles with select/update policies for users and admins

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
    select exists (
        select 1
        from public.profiles
        where id = auth.uid() and role = 'admin'
    );
$$;

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
    for select
    to authenticated
    using (auth.uid() = id);

create policy "profiles_select_admin" on public.profiles
    for select
    to authenticated
    using (public.is_admin());

create policy "profiles_update_own" on public.profiles
    for update
    to authenticated
    using (auth.uid() = id)
    with check (
        auth.uid() = id
        and role = (select p.role from public.profiles p where p.id = auth.uid())
    );

create policy "profiles_update_admin" on public.profiles
    for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());