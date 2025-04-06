import { supabase } from '@/lib/supabase';

export interface WaitlistEntry {
  id?: string;
  email: string;
  fullName: string;
  numberOfProperties?: number;
  signedUpAt?: Date;
}

export class WaitlistService {
  static async addToWaitlist(entry: Omit<WaitlistEntry, 'id' | 'signedUpAt'>): Promise<{ id: string }> {
    console.log('WaitlistService.addToWaitlist called with:', entry);
    try {
      // First, check if the waitlist table exists
      console.log('Checking if waitlist table exists...');
      const { error: tableCheckError } = await supabase
        .from('waitlist')
        .select('count')
        .limit(1);

      if (tableCheckError) {
        console.error('Error checking waitlist table:', tableCheckError);
        throw new Error(`Waitlist table error: ${tableCheckError.message}`);
      }

      // Format the entry for insertion
      const waitlistEntry = {
        email: entry.email,
        full_name: entry.fullName,
        number_of_properties: entry.numberOfProperties || null,
        signed_up_at: new Date().toISOString()
      };
      console.log('Formatted waitlist entry:', waitlistEntry);

      // Log Supabase configuration
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      console.log('Supabase client initialized:', !!supabase);

      // Check if the email already exists
      console.log('Checking if email already exists...');
      const { data: existingEntry, error: checkError } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', entry.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing email:', checkError);
        throw new Error(`Email check error: ${checkError.message}`);
      }

      if (existingEntry) {
        console.log('Email already exists in waitlist:', entry.email);
        throw new Error('This email is already on our waitlist');
      }

      // Insert the new entry
      console.log('Calling supabase.from("waitlist").insert()');
      const { data, error } = await supabase
        .from('waitlist')
        .insert(waitlistEntry)
        .select('id')
        .single();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error details:', error);

        // Provide more specific error messages based on error code
        if (error.code === '23505') {
          throw new Error('This email is already on our waitlist');
        } else if (error.code === '42P01') {
          throw new Error('Waitlist table does not exist. Please contact support.');
        } else if (error.code === '42501') {
          throw new Error('Permission denied. Anonymous insertions may not be enabled.');
        } else {
          throw new Error(`Database error: ${error.message}`);
        }
      }

      if (!data || !data.id) {
        throw new Error('No data returned from database');
      }

      return { id: data.id };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        throw error; // Preserve the original error message
      } else {
        console.error('Unknown error type:', typeof error);
        throw new Error('Failed to add to waitlist');
      }
    }
  }

  static async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('signed_up_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(entry => ({
        id: entry.id,
        email: entry.email,
        fullName: entry.full_name,
        numberOfProperties: entry.number_of_properties,
        signedUpAt: entry.signed_up_at ? new Date(entry.signed_up_at) : undefined
      }));
    } catch (error) {
      console.error('Error getting waitlist entries:', error);
      throw error;
    }
  }

  static async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | null> {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw error;
      }

      return {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        numberOfProperties: data.number_of_properties,
        signedUpAt: data.signed_up_at ? new Date(data.signed_up_at) : undefined
      };
    } catch (error) {
      console.error('Error getting waitlist entry by email:', error);
      throw error;
    }
  }
}
