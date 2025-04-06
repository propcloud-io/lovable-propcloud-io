-- Create messages table
create table if not exists public.messages (
    id uuid default uuid_generate_v4() primary key,
    booking_id uuid references public.bookings(id) on delete cascade,
    sender_id uuid not null,
    receiver_id uuid not null,
    content text not null,
    type text not null,
    read boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.messages enable row level security;

-- Create policy for users to view messages they sent or received
create policy "Users can view their messages" on public.messages
    for select
    to authenticated
    using (sender_id = auth.uid() or receiver_id = auth.uid());

-- Create policy for users to send messages
create policy "Users can send messages" on public.messages
    for insert
    to authenticated
    with check (sender_id = auth.uid());

-- Create policy for users to mark messages as read
create policy "Users can mark received messages as read" on public.messages
    for update
    to authenticated
    using (receiver_id = auth.uid())
    with check (receiver_id = auth.uid());

-- Create indexes for faster queries
create index if not exists messages_booking_id_idx on public.messages(booking_id);
create index if not exists messages_sender_id_idx on public.messages(sender_id);
create index if not exists messages_receiver_id_idx on public.messages(receiver_id);
create index if not exists messages_created_at_idx on public.messages(created_at);
