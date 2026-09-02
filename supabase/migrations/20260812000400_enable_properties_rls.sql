-- Enables RLS on properties with public/owner/admin select and owner/admin CRUD policies

alter table public.properties enable row level security;

create policy "properties_select_public_available" on public.properties
    for select
    to anon, authenticated
    using (status = 'available');

create policy "properties_select_own" on public.properties
    for select
    to authenticated
    using (auth.uid() = seller_id);

create policy "properties_select_admin" on public.properties
    for select
    to authenticated
    using (public.is_admin());

create policy "properties_insert_own" on public.properties
    for insert
    to authenticated
    with check (
        auth.uid() = seller_id
        and (select role from public.profiles where id = auth.uid()) = 'seller'
    );

create policy "properties_update_own" on public.properties
    for update
    to authenticated
    using (auth.uid() = seller_id)
    with check (auth.uid() = seller_id);

create policy "properties_update_admin" on public.properties
    for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "properties_delete_own" on public.properties
    for delete
    to authenticated
    using (auth.uid() = seller_id);

create policy "properties_delete_admin" on public.properties
    for delete
    to authenticated
    using (public.is_admin());