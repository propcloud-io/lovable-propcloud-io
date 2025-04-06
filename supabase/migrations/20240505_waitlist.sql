-- Create the waitlist table if it doesn't exist
create table if not exists public.waitlist (
    id uuid default uuid_generate_v4() primary key,
    email text not null unique,
    full_name text not null,
    number_of_properties integer,
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

-- Function to send email notification for new waitlist signups
create or replace function public.handle_new_waitlist_signup()
returns trigger
language plpgsql
security definer
as $$
begin
    perform net.send_email(
        from_email := 'noreply@propcloud.io',
        to_email := 'contact@propcloud.io',
        subject := 'New Waitlist Signup',
        body := format(
            'New waitlist signup received:
            
Name: %s
Email: %s
Number of Properties: %s
Signed up at: %s',
            new.full_name,
            new.email,
            coalesce(new.number_of_properties::text, 'Not specified'),
            new.signed_up_at
        )
    );
    return new;
end;
$$;

-- Create trigger for new waitlist signups
create trigger on_new_waitlist_signup
    after insert on public.waitlist
    for each row
    execute procedure public.handle_new_waitlist_signup();
