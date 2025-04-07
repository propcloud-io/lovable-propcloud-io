import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, Clock, User, CreditCard, Loader2, Bell } from 'lucide-react';
import { CalendarSync } from '@/components/calendar/CalendarSync';
import { useBookings } from '@/hooks/useBookings';
import { useFeatureIntegration } from '@/hooks/useFeatureIntegration';

export function BookingsPage() {
  const {
    bookings,
    stats,
    isLoading: bookingsLoading,
    error: bookingsError,
    updateBookingStatus,
    updatePaymentStatus,
    cancelBooking
  } = useBookings();

  const {
    notifications,
    isLoading: integrationLoading,
    error: integrationError,
    handleBookingStatusChange,
    handlePaymentStatusChange
  } = useFeatureIntegration();

  const isLoading = bookingsLoading || integrationLoading;
  const error = bookingsError || integrationError;

  const handleStatusUpdate = async (bookingId: string, status: 'confirmed' | 'pending' | 'completed' | 'cancelled') => {
    try {
      await Promise.all([
        updateBookingStatus(bookingId, status),
        handleBookingStatusChange(bookingId, status)
      ]);
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handlePaymentUpdate = async (bookingId: string, status: 'paid' | 'pending' | 'refunded') => {
    try {
      await Promise.all([
        updatePaymentStatus(bookingId, status),
        handlePaymentStatusChange(bookingId, status)
      ]);
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      await Promise.all([
        cancelBooking(bookingId),
        handleBookingStatusChange(bookingId, 'cancelled')
      ]);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const renderStatusBadge = (status: 'confirmed' | 'pending' | 'completed' | 'cancelled') => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderPaymentStatus = (status: 'paid' | 'pending' | 'refunded') => {
    const styles = {
      paid: 'text-green-500',
      pending: 'text-yellow-500',
      refunded: 'text-red-500'
    };

    return (
      <div className={`flex items-center gap-1 ${styles[status]}`}>
        <CreditCard className="h-4 w-4" />
        <span className="text-sm capitalize">{status}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-500">
            <CheckCircle2 className="h-5 w-5" />
            <p>Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Bookings</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span>{notifications.length} notifications</span>
          </div>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map(booking => (
                <div
                  key={booking.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{booking.propertyName}</h3>
                      <p className="text-sm text-muted-foreground">{booking.guestName}</p>
                    </div>
                    {renderStatusBadge(booking.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.guestName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">${booking.totalAmount}</span>
                      {renderPaymentStatus(booking.paymentStatus)}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        disabled={booking.status === 'confirmed'}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePaymentUpdate(booking.id, 'paid')}
                        disabled={booking.paymentStatus === 'paid'}
                      >
                        Mark as Paid
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(booking.id)}
                        disabled={booking.status === 'cancelled'}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarSync />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{stats?.occupancyRate || 0}%</div>
              <div className="text-sm text-muted-foreground">Occupancy Rate</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">${stats?.monthlyRevenue || 0}</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{stats?.averageRating || 0}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 