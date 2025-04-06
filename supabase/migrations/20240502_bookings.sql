-- Create bookings table
create table if not exists public.bookings (
    id uuid default uuid_generate_v4() primary key,
    property_id uuid references public.properties(id) on delete cascade,
    guest_id uuid,
    check_in timestamp with time zone not null,
    check_out timestamp with time zone not null,
    guests integer not null,
    total_price numeric not null,
    status text not null,
    payment_status text,
    special_requests text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.bookings enable row level security;

-- Create policy for property owners to manage bookings for their properties
create policy "Property owners can manage bookings" on public.bookings
    for all
    to authenticated
    using (
        property_id in (
            select id from public.properties where owner_id = auth.uid()
        )
    )
    with check (
        property_id in (
            select id from public.properties where owner_id = auth.uid()
        )
    );

-- Create indexes for faster queries
create index if not exists bookings_property_id_idx on public.bookings(property_id);
create index if not exists bookings_guest_id_idx on public.bookings(guest_id);
create index if not exists bookings_check_in_idx on public.bookings(check_in);
create index if not exists bookings_check_out_idx on public.bookings(check_out);
