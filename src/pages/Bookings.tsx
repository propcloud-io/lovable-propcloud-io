
import React from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Clock, User, CreditCard, Loader2, Bell } from "lucide-react";
import { CalendarSync } from "@/components/calendar/CalendarSync";
import { useBookings } from "@/hooks/useBookings";
import { useFeatureIntegration } from "@/hooks/useFeatureIntegration";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BookingStatus, PaymentStatus } from "@/domain/models/booking";

const Bookings = () => {
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

  const handleStatusUpdate = async (bookingId: string, status: BookingStatus) => {
    try {
      await Promise.all([
        updateBookingStatus(bookingId, status),
        handleBookingStatusChange(bookingId, status)
      ]);
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handlePaymentUpdate = async (bookingId: string, status: PaymentStatus) => {
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
        handleBookingStatusChange(bookingId, BookingStatus.CANCELLED)
      ]);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const renderStatusBadge = (status: BookingStatus) => {
    const styles = {
      [BookingStatus.CONFIRMED]: 'bg-green-100 text-green-800',
      [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [BookingStatus.COMPLETED]: 'bg-blue-100 text-blue-800',
      [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderPaymentStatus = (status: PaymentStatus) => {
    const styles = {
      [PaymentStatus.PAID]: 'text-green-500',
      [PaymentStatus.PENDING]: 'text-yellow-500',
      [PaymentStatus.REFUNDED]: 'text-red-500'
    };

    return (
      <div className={`flex items-center gap-1 ${styles[status]}`}>
        <CreditCard className="h-4 w-4" />
        <span className="text-sm capitalize">{status}</span>
      </div>
    );
  };

  const renderContent = () => {
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
                        <h3 className="font-medium">{booking.property?.name || booking.propertyName}</h3>
                        <p className="text-sm text-muted-foreground">{booking.guest?.firstName ? `${booking.guest.firstName} ${booking.guest.lastName}` : booking.guestName}</p>
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
                        <span>{booking.guest?.firstName ? `${booking.guest.firstName} ${booking.guest.lastName}` : booking.guestName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">${booking.payment?.totalAmount || booking.totalAmount}</span>
                        {renderPaymentStatus(booking.payment?.status as PaymentStatus || booking.paymentStatus || PaymentStatus.PENDING)}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, BookingStatus.CONFIRMED)}
                          disabled={booking.status === BookingStatus.CONFIRMED}
                        >
                          Confirm
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handlePaymentUpdate(booking.id, PaymentStatus.PAID)}
                          disabled={booking.payment?.status === PaymentStatus.PAID || booking.paymentStatus === PaymentStatus.PAID}
                        >
                          Mark as Paid
                        </Button>
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(booking.id)}
                          disabled={booking.status === BookingStatus.CANCELLED}
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
            <CardTitle>Property Performance</CardTitle>
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
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Bookings;
