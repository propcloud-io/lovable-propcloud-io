import { db } from '../config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, serverTimestamp, getDoc } from 'firebase/firestore';

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
  private static collection = 'bookings';

  static async createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const bookingData = {
        ...booking,
        status: BookingStatus.PENDING,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collection), bookingData);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  static async updateBooking(id: string, updates: Partial<Booking>): Promise<void> {
    try {
      const bookingRef = doc(db, this.collection, id);
      await updateDoc(bookingRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      throw new Error('Failed to update booking');
    }
  }

  static async getBookingById(id: string): Promise<Booking> {
    try {
      const docRef = doc(db, 'bookings', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Booking not found');
      }

      return { id: docSnap.id, ...docSnap.data() } as Booking;
    } catch (error) {
      console.error('Error getting booking:', error);
      throw error;
    }
  }

  static async getBookingsByProperty(propertyId: string): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('propertyId', '==', propertyId)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
    } catch (error) {
      console.error('Error getting bookings:', error);
      throw new Error('Failed to get bookings');
    }
  }

  static async getBookingsByGuest(guestId: string): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('guestId', '==', guestId)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
    } catch (error) {
      console.error('Error getting guest bookings:', error);
      throw new Error('Failed to get guest bookings');
    }
  }

  static async cancelBooking(id: string): Promise<void> {
    try {
      await this.updateBooking(id, { status: BookingStatus.CANCELLED });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw new Error('Failed to cancel booking');
    }
  }
}
