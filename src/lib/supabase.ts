import { createClient } from '@supabase/supabase-js';

console.log('Initializing Supabase client');

// Log environment variables (without exposing full key)
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('VITE_SUPABASE_URL exists:', !!rawUrl);
console.log('VITE_SUPABASE_URL length:', rawUrl.length);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!rawKey);
console.log('VITE_SUPABASE_ANON_KEY length:', rawKey.length);

// Ensure URL is properly formatted
let supabaseUrl = rawUrl.replace('@', '');
const supabaseAnonKey = rawKey;

// Add https:// if not present
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.log('Adding https:// prefix to Supabase URL');
  supabaseUrl = `https://${supabaseUrl}`;
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

// Validate URL format
try {
  console.log('Validating Supabase URL format');
  new URL(supabaseUrl);
  console.log('Supabase URL is valid');
} catch (error) {
  console.error('Invalid Supabase URL:', supabaseUrl);
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
}

console.log('Creating Supabase client with URL:', supabaseUrl);
console.log('Anon key starts with:', supabaseAnonKey.substring(0, 3) + '...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('Supabase client created successfully');