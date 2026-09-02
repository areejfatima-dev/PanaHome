-- Enables RLS on appointments with buyer/seller/admin select and buyer/seller/admin CRUD policies

alter table public.appointments enable row level security;

create policy "appointments_select_buyer" on public.appointments
    for select
    to authenticated
    using (auth.uid() = buyer_id);

create policy "appointments_select_seller" on public.appointments
    for select
    to authenticated
    using (auth.uid() = seller_id);

create policy "appointments_select_admin" on public.appointments
    for select
    to authenticated
    using (public.is_admin());

create policy "appointments_insert_buyer" on public.appointments
    for insert
    to authenticated
    with check (
        auth.uid() = buyer_id
        and seller_id = (
            select seller_id from public.properties where id = property_id
        )
    );

create policy "appointments_update_buyer" on public.appointments
    for update
    to authenticated
    using (auth.uid() = buyer_id)
    with check (auth.uid() = buyer_id);

create policy "appointments_update_seller" on public.appointments
    for update
    to authenticated
    using (auth.uid() = seller_id)
    with check (auth.uid() = seller_id);

create policy "appointments_update_admin" on public.appointments
    for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "appointments_delete_buyer" on public.appointments
    for delete
    to authenticated
    using (auth.uid() = buyer_id);

create policy "appointments_delete_seller" on public.appointments
    for delete
    to authenticated
    using (auth.uid() = seller_id);

create policy "appointments_delete_admin" on public.appointments
    for delete
    to authenticated
    using (public.is_admin());
