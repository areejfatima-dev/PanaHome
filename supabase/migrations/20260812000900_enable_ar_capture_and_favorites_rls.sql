-- Enables RLS on the AR capture chain (property_floors, property_rooms, capture_spots, photos) and favorites

-- ─── property_floors ────────────────────────────────────────────────────────

alter table public.property_floors enable row level security;

create policy "property_floors_select_public_available" on public.property_floors
    for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and status = 'available'
        )
    );

create policy "property_floors_select_own" on public.property_floors
    for select
    to authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_floors_select_admin" on public.property_floors
    for select
    to authenticated
    using (public.is_admin());

create policy "property_floors_insert_own" on public.property_floors
    for insert
    to authenticated
    with check (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_floors_update_own" on public.property_floors
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

create policy "property_floors_delete_own" on public.property_floors
    for delete
    to authenticated
    using (
        exists (
            select 1 from public.properties
            where id = property_id
              and seller_id = auth.uid()
        )
    );

create policy "property_floors_delete_admin" on public.property_floors
    for delete
    to authenticated
    using (public.is_admin());

-- ─── property_rooms ─────────────────────────────────────────────────────────

alter table public.property_rooms enable row level security;

create policy "property_rooms_select_public_available" on public.property_rooms
    for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.property_floors pf
            join public.properties p on p.id = pf.property_id
            where pf.id = floor_id
              and p.status = 'available'
        )
    );

create policy "property_rooms_select_own" on public.property_rooms
    for select
    to authenticated
    using (
        exists (
            select 1 from public.property_floors pf
            join public.properties p on p.id = pf.property_id
            where pf.id = floor_id
              and p.seller_id = auth.uid()
        )
    );

create policy "property_rooms_select_admin" on public.property_rooms
    for select
    to authenticated
    using (public.is_admin());

create policy "property_rooms_insert_own" on public.property_rooms
    for insert
    to authenticated
    with check (
        exists (
            select 1 from public.property_floors pf
            join public.properties p on p.id = pf.property_id
            where pf.id = floor_id
              and p.seller_id = auth.uid()
        )
    );

create policy "property_rooms_update_own" on public.property_rooms
    for update
    to authenticated
    using (
        exists (
            select 1 from public.property_floors pf
            join public.properties p on p.id = pf.property_id
            where pf.id = floor_id
              and p.seller_id = auth.uid()
        )
    )
    with check (
        exists (
            select 1 from public.property_floors pf
            join public.properties p on p.id = pf.property_id
            where pf.id = floor_id
              and p.seller_id = auth.uid()
        )
    );

create policy "property_rooms_delete_own" on public.property_rooms
    for delete
    to authenticated
    using (
        exists (
            select 1 from public.property_floors pf
            join public.properties p on p.id = pf.property_id
            where pf.id = floor_id
              and p.seller_id = auth.uid()
        )
    );

create policy "property_rooms_delete_admin" on public.property_rooms
    for delete
    to authenticated
    using (public.is_admin());

-- ─── capture_spots ──────────────────────────────────────────────────────────

alter table public.capture_spots enable row level security;

create policy "capture_spots_select_public_available" on public.capture_spots
    for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.property_rooms pr
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where pr.id = room_id
              and p.status = 'available'
        )
    );

create policy "capture_spots_select_own" on public.capture_spots
    for select
    to authenticated
    using (
        exists (
            select 1 from public.property_rooms pr
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where pr.id = room_id
              and p.seller_id = auth.uid()
        )
    );

create policy "capture_spots_select_admin" on public.capture_spots
    for select
    to authenticated
    using (public.is_admin());

create policy "capture_spots_insert_own" on public.capture_spots
    for insert
    to authenticated
    with check (
        exists (
            select 1 from public.property_rooms pr
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where pr.id = room_id
              and p.seller_id = auth.uid()
        )
    );

create policy "capture_spots_update_own" on public.capture_spots
    for update
    to authenticated
    using (
        exists (
            select 1 from public.property_rooms pr
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where pr.id = room_id
              and p.seller_id = auth.uid()
        )
    )
    with check (
        exists (
            select 1 from public.property_rooms pr
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where pr.id = room_id
              and p.seller_id = auth.uid()
        )
    );

create policy "capture_spots_delete_own" on public.capture_spots
    for delete
    to authenticated
    using (
        exists (
            select 1 from public.property_rooms pr
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where pr.id = room_id
              and p.seller_id = auth.uid()
        )
    );

create policy "capture_spots_delete_admin" on public.capture_spots
    for delete
    to authenticated
    using (public.is_admin());

-- ─── photos ─────────────────────────────────────────────────────────────────

alter table public.photos enable row level security;

create policy "photos_select_public_available" on public.photos
    for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.capture_spots cs
            join public.property_rooms pr on pr.id = cs.room_id
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where cs.id = spot_id
              and p.status = 'available'
        )
    );

create policy "photos_select_own" on public.photos
    for select
    to authenticated
    using (
        exists (
            select 1 from public.capture_spots cs
            join public.property_rooms pr on pr.id = cs.room_id
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where cs.id = spot_id
              and p.seller_id = auth.uid()
        )
    );

create policy "photos_select_admin" on public.photos
    for select
    to authenticated
    using (public.is_admin());

create policy "photos_insert_own" on public.photos
    for insert
    to authenticated
    with check (
        exists (
            select 1 from public.capture_spots cs
            join public.property_rooms pr on pr.id = cs.room_id
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where cs.id = spot_id
              and p.seller_id = auth.uid()
        )
    );

create policy "photos_update_own" on public.photos
    for update
    to authenticated
    using (
        exists (
            select 1 from public.capture_spots cs
            join public.property_rooms pr on pr.id = cs.room_id
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where cs.id = spot_id
              and p.seller_id = auth.uid()
        )
    )
    with check (
        exists (
            select 1 from public.capture_spots cs
            join public.property_rooms pr on pr.id = cs.room_id
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where cs.id = spot_id
              and p.seller_id = auth.uid()
        )
    );

create policy "photos_delete_own" on public.photos
    for delete
    to authenticated
    using (
        exists (
            select 1 from public.capture_spots cs
            join public.property_rooms pr on pr.id = cs.room_id
            join public.property_floors pf on pf.id = pr.floor_id
            join public.properties p on p.id = pf.property_id
            where cs.id = spot_id
              and p.seller_id = auth.uid()
        )
    );

create policy "photos_delete_admin" on public.photos
    for delete
    to authenticated
    using (public.is_admin());

-- ─── favorites ──────────────────────────────────────────────────────────────

alter table public.favorites enable row level security;

create policy "favorites_select_own" on public.favorites
    for select
    to authenticated
    using (auth.uid() = user_id);

create policy "favorites_insert_own" on public.favorites
    for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "favorites_delete_own" on public.favorites
    for delete
    to authenticated
    using (auth.uid() = user_id);
