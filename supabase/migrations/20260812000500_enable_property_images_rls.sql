-- Enables RLS on property_images with public/owner/admin select and owner CRUD policies

alter table public.property_images enable row level security;

create policy "property_images_select_public_available" on public.property_images
    for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and status = 'available'
        )
    );

create policy "property_images_select_own" on public.property_images
    for select
    to authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_images_select_admin" on public.property_images
    for select
    to authenticated
    using (public.is_admin());

create policy "property_images_insert_own" on public.property_images
    for insert
    to authenticated
    with check (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_images_update_own" on public.property_images
    for update
    to authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    )
    with check (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_images_delete_own" on public.property_images
    for delete
    to authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_images_delete_admin" on public.property_images
    for delete
    to authenticated
    using (public.is_admin());
