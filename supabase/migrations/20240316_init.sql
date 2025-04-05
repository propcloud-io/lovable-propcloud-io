-- Create the waitlist table
create table if not exists public.waitlist (
    id uuid default uuid_generate_v4() primary key,
    email text not null unique,
    signed_up_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.waitlist enable row level security;

-- Create a policy that allows inserting by anyone (for the waitlist form)
create policy "Allow public insert to waitlist" on public.waitlist
    for insert
    to anon
    with check (true);

-- Create a policy that allows reading only by authenticated users
create policy "Allow authenticated users to read waitlist" on public.waitlist
    for select
    to authenticated
    using (true);

-- Create profiles table for additional user data
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    updated_at timestamp with time zone,
    username text unique,
    full_name text,
    avatar_url text,
    company_name text,
    role text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Create a policy that allows users to read their own profile
create policy "Users can read own profile" on public.profiles
    for select
    to authenticated
    using (auth.uid() = id);

-- Create a policy that allows users to update their own profile
create policy "Users can update own profile" on public.profiles
    for update
    to authenticated
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
end;
$$;

-- Trigger to automatically create profile on user creation
create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 