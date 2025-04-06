-- Create tasks table
create table if not exists public.tasks (
    id uuid default uuid_generate_v4() primary key,
    property_id uuid references public.properties(id) on delete cascade,
    booking_id uuid references public.bookings(id) on delete set null,
    title text not null,
    description text not null,
    type text not null,
    status text not null,
    priority text not null,
    due_date timestamp with time zone not null,
    assigned_to uuid references auth.users(id) on delete set null,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.tasks enable row level security;

-- Create policy for property owners to manage tasks for their properties
create policy "Property owners can manage tasks" on public.tasks
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

-- Create policy for assigned users to view and update their tasks
create policy "Assigned users can view and update their tasks" on public.tasks
    for select
    to authenticated
    using (assigned_to = auth.uid());

create policy "Assigned users can update their tasks" on public.tasks
    for update
    to authenticated
    using (assigned_to = auth.uid())
    with check (assigned_to = auth.uid());

-- Create indexes for faster queries
create index if not exists tasks_property_id_idx on public.tasks(property_id);
create index if not exists tasks_booking_id_idx on public.tasks(booking_id);
create index if not exists tasks_assigned_to_idx on public.tasks(assigned_to);
create index if not exists tasks_due_date_idx on public.tasks(due_date);
