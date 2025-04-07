import { useState, useEffect, useCallback } from 'react';
// Import Domain types
import { Booking, BookingStatus, PaymentStatus, BookingStats } from '@/domain/models/booking';
// Import service for making calls, but use Domain types for data structures
import { BookingService } from '@/lib/supabase/services';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProperties } from './useProperties';

// Remove local BookingStats definition, use imported one
// export interface BookingStats {
//   totalBookings: number;
//   occupancyRate: number;
//   monthlyRevenue: number;
//   averageRating: number;
// }

// Define PaymentStatus locally - NO, use imported Domain type
// type PaymentStatus = 'pending' | 'paid' | 'refunded';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]); // Use Domain Booking type
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { properties } = useProperties();

  const fetchBookings = useCallback(async () => {
    if (!user || properties.length === 0) {
      setBookings([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get all bookings for all properties owned by the user
      const allBookings: Booking[] = [];

      for (const property of properties) {
        if (property.id) {
          const propertyBookings = await BookingService.getBookingsByProperty(property.id);
          allBookings.push(...propertyBookings);
        }
      }

      setBookings(allBookings);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch bookings');
      setError(error);
      toast({
        title: 'Error fetching bookings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, properties, toast]);

  const calculateStats = useCallback(() => {
    if (bookings.length === 0) {
      setStats(null);
      return;
    }

    // Calculate total bookings
    const totalBookings = bookings.length;

    // Calculate occupancy rate (simplified)
    const confirmedBookings = bookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.COMPLETED).length;
    const occupancyRate = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;

    // Calculate monthly revenue using nested payment details
    const monthlyRevenue = bookings.reduce((sum, booking) => sum + (booking.payment?.totalAmount || 0), 0);

    // Set a default average rating (in a real app, this would come from reviews)
    const averageRating = 4.7;

    setStats({
      totalBookings,
      occupancyRate,
      monthlyRevenue,
      averageRating
    });
  }, [bookings]);

  const createBooking = async (bookingInput: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);

    try {
      // The service now handles mapping the DomainBooking input to the DB structure
      const result = await BookingService.createBooking(bookingInput);

      // Refresh bookings
      await fetchBookings();
      calculateStats();

      toast({
        title: 'Booking created',
        description: 'The booking has been created successfully.',
      });

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create booking');
      setError(error);
      toast({
        title: 'Error creating booking',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    setIsLoading(true);
    setError(null);

    try {
      // Pass the domain status; service layer handles mapping if needed (but we aligned it)
      await BookingService.updateBooking(bookingId, { status });

      // Refresh bookings
      await fetchBookings();
      calculateStats();

      toast({
        title: 'Booking updated',
        description: 'The booking status has been updated successfully.',
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update booking status');
      setError(error);
      toast({
        title: 'Error updating booking',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (bookingId: string, paymentStatus: PaymentStatus) => {
    setIsLoading(true);
    setError(null);

    try {
      // Pass the domain status; service layer handles mapping if needed
      // We might need to pass it within a payment object depending on updateBooking implementation
      await BookingService.updateBooking(bookingId, { paymentStatus }); // Or potentially { payment: { status: paymentStatus } }

      // Refresh bookings
      await fetchBookings();
      calculateStats();

      toast({
        title: 'Payment status updated',
        description: 'The payment status has been updated successfully.',
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update payment status');
      setError(error);
      toast({
        title: 'Error updating payment',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use Domain BookingStatus
      await BookingService.updateBooking(bookingId, {
        status: BookingStatus.CANCELLED
      });

      // Refresh bookings
      await fetchBookings();
      calculateStats();

      toast({
        title: 'Booking cancelled',
        description: 'The booking has been cancelled successfully.',
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to cancel booking');
      setError(error);
      toast({
        title: 'Error cancelling booking',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats whenever bookings change
  useEffect(() => {
    calculateStats();
  }, [bookings, calculateStats]);

  // Fetch bookings when properties change
  useEffect(() => {
    if (properties.length > 0) {
      fetchBookings();
    }
  }, [properties, fetchBookings]);

  return {
    bookings,
    stats,
    isLoading,
    error,
    createBooking,
    updateBookingStatus,
    updatePaymentStatus,
    cancelBooking,
    refreshBookings: fetchBookings
  };
}