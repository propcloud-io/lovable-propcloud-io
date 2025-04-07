
import type { Property } from './property';

// Re-export Property type
export type { Property };

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED"
}

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
  status: PaymentStatus;
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
  status: BookingStatus;
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
  
  // Helper properties for display
  propertyName?: string;
  guestName?: string;
  totalAmount?: number;
  paymentStatus?: PaymentStatus;
}
