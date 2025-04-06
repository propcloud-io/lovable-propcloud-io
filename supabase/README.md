# Supabase Database Setup

This directory contains the database migrations for the PropCloud.io application.

## Setup Instructions

1. Create a new Supabase project at [https://app.supabase.io](https://app.supabase.io)

2. Get your Supabase URL and anon key from the project settings

3. Add these to your `.env` file:
   ```
   VITE_SUPABASE_URL=YOUR_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

4. Run the migrations in the following order:
   - `20240316_init.sql` - Creates the initial tables (profiles, waitlist)
   - `20240501_properties.sql` - Creates the properties table
   - `20240502_bookings.sql` - Creates the bookings table
   - `20240503_tasks.sql` - Creates the tasks table
   - `20240504_messages.sql` - Creates the messages table
   - `20240505_waitlist.sql` - Updates the waitlist table with email notification

## Database Schema

### Profiles
Stores user profile information linked to Supabase Auth users.

### Properties
Stores property listings owned by users.

### Bookings
Stores booking information for properties.

### Tasks
Stores tasks related to properties (cleaning, maintenance, etc.).

### Messages
Stores communication messages between users.

### Waitlist
Stores waitlist signups for users interested in the platform.

## Row Level Security (RLS)

All tables have Row Level Security enabled to ensure data privacy:

- Users can only access their own profile data
- Property owners can only access their own properties and related data
- Waitlist data is publicly writable but only readable by authenticated users

## Functions and Triggers

- `handle_new_user()` - Creates a profile when a new user signs up
- `handle_new_waitlist_signup()` - Sends an email notification when a new waitlist signup is received
