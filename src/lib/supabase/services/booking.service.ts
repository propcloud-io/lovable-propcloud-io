import { supabase } from '@/lib/supabase';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface Booking {
  id?: string;
  propertyId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BookingService {
  static async createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const now = new Date().toISOString();
      const bookingData = {
        ...booking,
        check_in: booking.checkIn.toISOString(),
        check_out: booking.checkOut.toISOString(),
        status: BookingStatus.PENDING,
        created_at: now,
        updated_at: now
      };

      // Remove properties that are already mapped to snake_case
      delete bookingData.checkIn;
      delete bookingData.checkOut;

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select('id')
        .single();

      if (error) throw error;
      return { id: data.id };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  static async updateBooking(id: string, updates: Partial<Booking>): Promise<void> {
    try {
      const updateData: any = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      // Convert Date objects to ISO strings
      if (updates.checkIn) {
        updateData.check_in = updates.checkIn.toISOString();
        delete updateData.checkIn;
      }
      
      if (updates.checkOut) {
        updateData.check_out = updates.checkOut.toISOString();
        delete updateData.checkOut;
      }

      const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw new Error('Failed to update booking');
    }
  }

  static async getBookingById(id: string): Promise<Booking> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Booking not found');

      return this.mapBookingFromDb(data);
    } catch (error) {
      console.error('Error getting booking:', error);
      throw error;
    }
  }

  static async getBookingsByProperty(propertyId: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('propertyId', propertyId);

      if (error) throw error;
      return (data || []).map(this.mapBookingFromDb);
    } catch (error) {
      console.error('Error getting bookings by property:', error);
      throw error;
    }
  }

  static async getBookingsByGuest(guestId: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('guestId', guestId);

      if (error) throw error;
      return (data || []).map(this.mapBookingFromDb);
    } catch (error) {
      console.error('Error getting bookings by guest:', error);
      throw error;
    }
  }

  static async getAllBookings(): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*');

      if (error) throw error;
      return (data || []).map(this.mapBookingFromDb);
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw error;
    }
  }

  private static mapBookingFromDb(data: any): Booking {
    return {
      id: data.id,
      propertyId: data.propertyId,
      guestId: data.guestId,
      checkIn: new Date(data.check_in),
      checkOut: new Date(data.check_out),
      guests: data.guests,
      totalPrice: data.totalPrice,
      status: data.status,
      paymentStatus: data.paymentStatus,
      specialRequests: data.specialRequests,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
    };
  }
}
