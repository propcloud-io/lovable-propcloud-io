-- Create the waitlist table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    number_of_properties INTEGER,
    signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting by anyone (for the waitlist form)
CREATE POLICY "Allow public insert to waitlist" ON public.waitlist
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create a policy that allows reading only by authenticated users
CREATE POLICY "Allow authenticated users to read waitlist" ON public.waitlist
    FOR SELECT
    TO authenticated
    USING (true);
