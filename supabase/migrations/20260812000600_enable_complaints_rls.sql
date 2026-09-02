-- Enables RLS on complaints with owner/admin select, authenticated insert, and admin-only update

alter table public.complaints enable row level security;

create policy "complaints_select_own" on public.complaints
    for select
    to authenticated
    using (auth.uid() = reported_by);

create policy "complaints_select_admin" on public.complaints
    for select
    to authenticated
    using (public.is_admin());

create policy "complaints_insert_own" on public.complaints
    for insert
    to authenticated
    with check (auth.uid() = reported_by);

create policy "complaints_update_admin" on public.complaints
    for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());
