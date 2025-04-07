import { useState, useEffect } from 'react';
import { bookingService, Booking, BookingStats } from '@/services/bookingService';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeBookings();
  }, []);

  const initializeBookings = async () => {
    try {
      setIsLoading(true);
      await bookingService.initialize();
      await Promise.all([
        fetchBookings(),
        fetchStats()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize bookings'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await bookingService.getBookings();
      setBookings(fetchedBookings);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
    }
  };

  const fetchStats = async () => {
    try {
      const fetchedStats = await bookingService.getBookingStats();
      setStats(fetchedStats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch booking stats'));
    }
  };

  const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newBooking = await bookingService.createBooking(booking);
      setBookings(prev => [...prev, newBooking]);
      await fetchStats();
      return newBooking;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create booking'));
      throw err;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const updatedBooking = await bookingService.updateBookingStatus(bookingId, status);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      await fetchStats();
      return updatedBooking;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update booking status'));
      throw err;
    }
  };

  const updatePaymentStatus = async (bookingId: string, paymentStatus: Booking['paymentStatus']) => {
    try {
      const updatedBooking = await bookingService.updatePaymentStatus(bookingId, paymentStatus);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      await fetchStats();
      return updatedBooking;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update payment status'));
      throw err;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const cancelledBooking = await bookingService.cancelBooking(bookingId);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? cancelledBooking : booking
      ));
      await fetchStats();
      return cancelledBooking;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to cancel booking'));
      throw err;
    }
  };

  return {
    bookings,
    stats,
    isLoading,
    error,
    createBooking,
    updateBookingStatus,
    updatePaymentStatus,
    cancelBooking,
    refreshBookings: fetchBookings,
    refreshStats: fetchStats
  };
} 