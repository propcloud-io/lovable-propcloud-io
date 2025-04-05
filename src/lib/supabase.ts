import { createClient } from '@supabase/supabase-js';

// Remove the @ from the URL if present
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace('@', '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 