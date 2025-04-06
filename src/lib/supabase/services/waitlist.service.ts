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
      const waitlistEntry = {
        email: entry.email,
        full_name: entry.fullName,
        number_of_properties: entry.numberOfProperties || null,
        signed_up_at: new Date().toISOString()
      };
      console.log('Formatted waitlist entry:', waitlistEntry);

      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

      console.log('Calling supabase.from("waitlist").insert()');
      const { data, error } = await supabase
        .from('waitlist')
        .insert(waitlistEntry)
        .select('id')
        .single();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      return { id: data.id };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      } else {
        console.error('Unknown error type:', typeof error);
      }
      throw new Error('Failed to add to waitlist');
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
