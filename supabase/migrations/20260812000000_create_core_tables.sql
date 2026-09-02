-- Creates core tables: profiles, properties, property_images, complaints, appointments, seller_availability

create extension if not exists pgcrypto;

create table if not exists public.profiles (
    id uuid primary key default gen_random_uuid() references auth.users (id) on delete cascade,
    full_name text not null,
    role text not null default 'buyer' check (role in ('buyer', 'seller', 'admin')),
    phone text,
    avatar_url text,
    is_suspended boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

create table if not exists public.properties (
    id uuid primary key default gen_random_uuid(),
    seller_id uuid not null references public.profiles (id) on delete cascade,
    title text not null,
    description text,
    property_type text not null default 'house' check (property_type in ('house', 'apartment', 'land', 'commercial')),
    area numeric(10, 2),
    price numeric(14, 2) not null check (price >= 0),
    location text not null,
    city text,
    state text,
    latitude double precision,
    longitude double precision,
    status text not null default 'pending' check (status in ('available', 'pending', 'sold')),
    created_at timestamptz not null default now()
);

create index if not exists properties_seller_id_idx on public.properties (seller_id);
create index if not exists properties_status_idx on public.properties (status);

create table if not exists public.property_images (
    id uuid primary key default gen_random_uuid(),
    property_id uuid not null references public.properties (id) on delete cascade,
    image_url text not null,
    is_ar_image boolean not null default false,
    angle_index smallint check (angle_index between 1 and 6),
    uploaded_at timestamptz not null default now()
);

create index if not exists property_images_property_id_idx on public.property_images (property_id);

create table if not exists public.complaints (
    id uuid primary key default gen_random_uuid(),
    reported_by uuid not null references public.profiles (id) on delete cascade,
    property_id uuid references public.properties (id) on delete set null,
    reported_user uuid references public.profiles (id) on delete set null,
    reason text not null,
    description text,
    status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'rejected')),
    created_at timestamptz not null default now()
);

create index if not exists complaints_reported_by_idx on public.complaints (reported_by);
create index if not exists complaints_property_id_idx on public.complaints (property_id);
create index if not exists complaints_reported_user_idx on public.complaints (reported_user);

create table if not exists public.appointments (
    id uuid primary key default gen_random_uuid(),
    property_id uuid not null references public.properties (id) on delete cascade,
    buyer_id uuid not null references public.profiles (id) on delete cascade,
    seller_id uuid not null references public.profiles (id) on delete cascade,
    scheduled_date date not null,
    scheduled_time time not null,
    notes text,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at timestamptz not null default now()
);

create index if not exists appointments_property_id_idx on public.appointments (property_id);
create index if not exists appointments_buyer_id_idx on public.appointments (buyer_id);
create index if not exists appointments_seller_id_idx on public.appointments (seller_id);

create table if not exists public.seller_availability (
    id uuid primary key default gen_random_uuid(),
    seller_id uuid not null references public.profiles (id) on delete cascade,
    day_of_week smallint not null check (day_of_week between 0 and 6),
    start_time time not null,
    end_time time not null check (end_time > start_time),
    is_available boolean not null default true
);

create index if not exists seller_availability_seller_id_idx on public.seller_availability (seller_id);