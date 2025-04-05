import { ApiError } from './baseApi';

export interface Booking {
  id: string;
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  guestEmail: string;
  guestPhone: string;
  numberOfGuests: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingStats {
  totalBookings: number;
  occupancyRate: number;
  monthlyRevenue: number;
  averageRating: number;
}

class BookingService {
  private static instance: BookingService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  async getBookings(): Promise<Booking[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: '1',
          guestName: 'John Doe',
          propertyName: 'Luxury Villa',
          checkIn: '2024-03-01',
          checkOut: '2024-03-05',
          status: 'confirmed',
          totalAmount: 1200,
          paymentStatus: 'paid',
          guestEmail: 'john@example.com',
          guestPhone: '+1234567890',
          numberOfGuests: 2,
          specialRequests: 'Late check-in requested',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          guestName: 'Jane Smith',
          propertyName: 'Beach House',
          checkIn: '2024-03-10',
          checkOut: '2024-03-15',
          status: 'pending',
          totalAmount: 800,
          paymentStatus: 'pending',
          guestEmail: 'jane@example.com',
          guestPhone: '+1987654321',
          numberOfGuests: 4,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    } catch (error) {
      throw new ApiError('Failed to fetch bookings', error);
    }
  }

  async getBookingStats(): Promise<BookingStats> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        totalBookings: 12,
        occupancyRate: 85,
        monthlyRevenue: 8500,
        averageRating: 4.8
      };
    } catch (error) {
      throw new ApiError('Failed to fetch booking stats', error);
    }
  }

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        ...booking,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new ApiError('Failed to create booking', error);
    }
  }

  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<Booking> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const booking = await this.getBookingById(bookingId);
      return {
        ...booking,
        status,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new ApiError('Failed to update booking status', error);
    }
  }

  async updatePaymentStatus(bookingId: string, paymentStatus: Booking['paymentStatus']): Promise<Booking> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const booking = await this.getBookingById(bookingId);
      return {
        ...booking,
        paymentStatus,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new ApiError('Failed to update payment status', error);
    }
  }

  async getBookingById(bookingId: string): Promise<Booking> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const bookings = await this.getBookings();
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }
      return booking;
    } catch (error) {
      throw new ApiError('Failed to fetch booking', error);
    }
  }

  async cancelBooking(bookingId: string): Promise<Booking> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.updateBookingStatus(bookingId, 'cancelled');
    } catch (error) {
      throw new ApiError('Failed to cancel booking', error);
    }
  }
}

export const bookingService = BookingService.getInstance(); 