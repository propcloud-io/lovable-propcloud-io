import { Property } from './property';

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  nationality?: string;
  preferredLanguage?: string;
  previousStays?: number;
}

export interface PaymentDetails {
  status: 'pending' | 'partial' | 'paid' | 'refunded' | 'failed';
  totalAmount: number;
  currency: string;
  breakdown: {
    basePrice: number;
    cleaningFee?: number;
    taxes?: number;
    otherFees?: number;
  };
  payments: Array<{
    id: string;
    amount: number;
    method: 'card' | 'bank_transfer' | 'cash' | 'ota';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    date: Date;
  }>;
}

export interface Booking {
  id: string;
  propertyId: string;
  property?: Property; // For joined queries
  guestId: string;
  guest?: Guest; // For joined queries
  checkIn: Date;
  checkOut: Date;
  status: 'inquiry' | 'pending' | 'confirmed' | 'cancelled' | 'completed';
  source: 'direct' | 'airbnb' | 'booking' | 'vrbo' | 'website' | 'other';
  sourceBookingId?: string; // Reference ID from OTA
  guestCount: number;
  specialRequests?: string;
  payment: PaymentDetails;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}
