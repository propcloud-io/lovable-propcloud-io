import { supabase } from '@/lib/supabase';
// Import domain types
import { Booking as DomainBooking, Guest as DomainGuest, PaymentDetails as DomainPaymentDetails, BookingStatus as DomainBookingStatus, PaymentStatus as DomainPaymentStatus } from '@/domain/models/booking';
// Import Property directly from its source
import { Property as DomainProperty } from '@/domain/models/property';

// Use domain enums directly
export { BookingStatus, PaymentStatus } from '@/domain/models/booking';

// Define a type for the raw DB data structure (might be slightly different)
interface BookingDbRecord {
  id: string;
  propertyId: string;
  guestId: string;
  check_in: string; // ISO string
  check_out: string; // ISO string
  guestCount: number;
  totalPrice: number; // Assuming DB stores total price directly for simplicity now
  status: DomainBookingStatus;
  paymentStatus: DomainPaymentStatus; // Assuming DB stores payment status directly
  source: string;
  sourceBookingId?: string;
  specialRequests?: string;
  notes?: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  cancelledAt?: string; // ISO string
  cancellationReason?: string;
  // Joined data might be present if selected
  property?: any; // Raw property data
  guest?: any; // Raw guest data
}

export class BookingService {

  // Accept DomainBooking structure for creation
  static async createBooking(bookingInput: Omit<DomainBooking, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const now = new Date().toISOString();
      const bookingData = {
        propertyId: bookingInput.propertyId,
        guestId: bookingInput.guestId,
        check_in: bookingInput.checkIn.toISOString(),
        check_out: bookingInput.checkOut.toISOString(),
        guestCount: bookingInput.guestCount,
        // Store payment details flattened for now, or handle JSONB in Supabase
        totalPrice: bookingInput.payment.totalAmount,
        paymentStatus: bookingInput.payment.status,
        status: DomainBookingStatus.PENDING, // Default to pending
        source: bookingInput.source,
        sourceBookingId: bookingInput.sourceBookingId,
        specialRequests: bookingInput.specialRequests,
        notes: bookingInput.notes,
        created_at: now,
        updated_at: now
      };

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

  // Accept partial DomainBooking structure for updates
  static async updateBooking(id: string, updates: Partial<DomainBooking>): Promise<void> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      // Map domain properties to DB columns
      if (updates.propertyId) updateData.propertyId = updates.propertyId;
      if (updates.guestId) updateData.guestId = updates.guestId;
      if (updates.checkIn) updateData.check_in = updates.checkIn.toISOString();
      if (updates.checkOut) updateData.check_out = updates.checkOut.toISOString();
      if (updates.guestCount) updateData.guestCount = updates.guestCount;
      if (updates.status) updateData.status = updates.status;
      if (updates.source) updateData.source = updates.source;
      if (updates.sourceBookingId) updateData.sourceBookingId = updates.sourceBookingId;
      if (updates.specialRequests) updateData.specialRequests = updates.specialRequests;
      if (updates.notes) updateData.notes = updates.notes;
      if (updates.cancelledAt) updateData.cancelledAt = updates.cancelledAt.toISOString();
      if (updates.cancellationReason) updateData.cancellationReason = updates.cancellationReason;

      // Handle payment updates (assuming flattened structure for now)
      if (updates.payment) {
        if (updates.payment.totalAmount !== undefined) updateData.totalPrice = updates.payment.totalAmount;
        if (updates.payment.status) updateData.paymentStatus = updates.payment.status;
      }
      // Direct update for paymentStatus helper property if needed
      if (updates.paymentStatus) updateData.paymentStatus = updates.paymentStatus;

      // Remove domain-only fields
      delete updateData.property;
      delete updateData.guest;
      delete updateData.payment;
      delete updateData.propertyName;
      delete updateData.guestName;

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

  // Return type is DomainBooking, achieved by mapBookingFromDb
  static async getBookingById(id: string): Promise<DomainBooking> {
    try {
      // Fetch related data using Supabase joins
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          property:properties(*),
          guest:guests(*)
        `)
        .eq('id', id)
        .single<BookingDbRecord>();

      if (error) throw error;
      if (!data) throw new Error('Booking not found');

      return this.mapBookingFromDb(data);
    } catch (error) {
      console.error('Error getting booking:', error);
      throw error;
    }
  }

  static async getBookingsByProperty(propertyId: string): Promise<DomainBooking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          property:properties(*),
          guest:guests(*)
        `)
        .eq('propertyId', propertyId)
        .returns<BookingDbRecord[]>();

      if (error) throw error;
      return (data || []).map(this.mapBookingFromDb);
    } catch (error) {
      console.error('Error getting bookings by property:', error);
      throw error;
    }
  }

  static async getBookingsByGuest(guestId: string): Promise<DomainBooking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          property:properties(*),
          guest:guests(*)
        `)
        .eq('guestId', guestId)
        .returns<BookingDbRecord[]>();

      if (error) throw error;
      return (data || []).map(this.mapBookingFromDb);
    } catch (error) {
      console.error('Error getting bookings by guest:', error);
      throw error;
    }
  }

  static async getAllBookings(): Promise<DomainBooking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          property:properties(*),
          guest:guests(*)
        `)
        .returns<BookingDbRecord[]>();

      if (error) throw error;
      return (data || []).map(this.mapBookingFromDb);
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw error;
    }
  }

  // Maps raw DB data (including potential joins) to the DomainBooking type
  private static mapBookingFromDb(data: BookingDbRecord): DomainBooking {
    // Basic mapping
    const booking: DomainBooking = {
      id: data.id,
      propertyId: data.propertyId,
      guestId: data.guestId,
      checkIn: new Date(data.check_in),
      checkOut: new Date(data.check_out),
      guestCount: data.guestCount,
      status: data.status,
      source: data.source as any, // Cast source type if needed
      sourceBookingId: data.sourceBookingId,
      specialRequests: data.specialRequests,
      notes: data.notes,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      cancelledAt: data.cancelledAt ? new Date(data.cancelledAt) : undefined,
      cancellationReason: data.cancellationReason,
      // Construct payment object (simplified mapping from flattened DB fields)
      payment: {
        status: data.paymentStatus,
        totalAmount: data.totalPrice,
        currency: 'USD', // Assuming USD or fetch from somewhere
        breakdown: { basePrice: data.totalPrice }, // Simplified breakdown
        payments: [] // Assuming payments array is not stored/fetched this way
      },
      // Map joined data if present
      property: data.property ? { ...data.property, id: data.property.id } as DomainProperty : undefined,
      guest: data.guest ? { ...data.guest, id: data.guest.id } as DomainGuest : undefined,
      // Populate helper fields
      propertyName: data.property?.name,
      guestName: data.guest ? `${data.guest.firstName} ${data.guest.lastName}` : undefined,
      totalAmount: data.totalPrice,
      paymentStatus: data.paymentStatus
    };
    return booking;
  }
}
