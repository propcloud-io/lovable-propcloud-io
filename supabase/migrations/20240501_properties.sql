-- Create properties table
create table if not exists public.properties (
    id uuid default uuid_generate_v4() primary key,
    owner_id uuid references auth.users(id) on delete cascade,
    name text not null,
    type text not null,
    status text not null default 'active',
    address jsonb not null,
    base_price numeric not null,
    amenities text[] not null default '{}',
    max_guests integer not null,
    bedrooms integer not null,
    bathrooms numeric not null,
    square_footage integer,
    photos text[] default '{}',
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.properties enable row level security;

-- Create policy for property owners
create policy "Users can manage their own properties" on public.properties
    for all
    to authenticated
    using (auth.uid() = owner_id)
    with check (auth.uid() = owner_id);

-- Create index for faster queries
create index if not exists properties_owner_id_idx on public.properties(owner_id);
