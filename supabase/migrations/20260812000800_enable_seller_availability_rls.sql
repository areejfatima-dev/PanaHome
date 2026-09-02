-- Enables RLS on seller_availability with public/owner/admin select and owner/admin CRUD policies

alter table public.seller_availability enable row level security;

create policy "seller_availability_select_public_available" on public.seller_availability
    for select
    to anon, authenticated
    using (is_available = true);

create policy "seller_availability_select_own" on public.seller_availability
    for select
    to authenticated
    using (auth.uid() = seller_id);

create policy "seller_availability_select_admin" on public.seller_availability
    for select
    to authenticated
    using (public.is_admin());

create policy "seller_availability_insert_own" on public.seller_availability
    for insert
    to authenticated
    with check (auth.uid() = seller_id);

create policy "seller_availability_update_own" on public.seller_availability
    for update
    to authenticated
    using (auth.uid() = seller_id)
    with check (auth.uid() = seller_id);

create policy "seller_availability_delete_own" on public.seller_availability
    for delete
    to authenticated
    using (auth.uid() = seller_id);

create policy "seller_availability_delete_admin" on public.seller_availability
    for delete
    to authenticated
    using (public.is_admin());
