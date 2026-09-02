-- Hardens handle_new_user() so signup metadata role can only be 'buyer' or 'seller'

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    meta_role text := lower(coalesce(new.raw_user_meta_data ->> 'role', ''));
begin
    insert into public.profiles (id, full_name, phone, role)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', ''),
        new.raw_user_meta_data ->> 'phone',
        case when meta_role in ('buyer', 'seller') then meta_role else 'buyer' end
    )
    on conflict (id) do nothing;

    return new;
end;
$$;