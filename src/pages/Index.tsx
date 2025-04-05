import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Assuming supabase client is exported from here
import { Session } from '@supabase/supabase-js';

// Public Page Components
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import DemoSection from "@/components/DemoSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

// Authenticated Dashboard Components & Types
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// --- Interfaces for simulated data (same as before) ---
interface UpcomingBooking { id: string; guestName: string; propertyName: string; checkInDate: string; }
interface UnreadMessage { id: string; senderName: string; preview: string; }
interface DashboardStats { propertyCount: number; occupancyRate: number | null; }

// --- Reusable Card Components (same as before, slightly adjusted imports/scope if needed) ---
const UpcomingActivityCard: React.FC<{ isLoading: boolean; bookings: UpcomingBooking[] }> = ({ isLoading, bookings }) => (
    <Card>
      <CardHeader><CardTitle>Upcoming Activity</CardTitle></CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" /><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[180px]" />
          </div>
        ) : bookings.length > 0 ? (
          <ul className="space-y-2">
            {bookings.map(booking => (
              <li key={booking.id} className="text-sm">
                <span className="font-medium">{booking.guestName}</span> checking into <span className="font-medium">{booking.propertyName}</span> on {new Date(booking.checkInDate).toLocaleDateString()}
                <Button variant="link" size="sm" className="h-auto p-0 ml-2" onClick={() => console.log(`View booking ${booking.id}`)}>View</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No upcoming activity.</p>
        )}
      </CardContent>
    </Card>
);

const UnreadMessagesCard: React.FC<{ isLoading: boolean; messages: UnreadMessage[] }> = ({ isLoading, messages }) => (
     <Card>
      <CardHeader><CardTitle>Unread Messages</CardTitle></CardHeader>
      <CardContent>
        {isLoading ? (
           <div className="space-y-2"><Skeleton className="h-4 w-[180px]" /><Skeleton className="h-4 w-[200px]" /></div>
        ) : messages.length > 0 ? (
           <ul className="space-y-2">
             {messages.map(msg => (
               <li key={msg.id} className="text-sm">
                  From <span className="font-medium">{msg.senderName}</span>: {msg.preview}...
                  <Button variant="link" size="sm" className="h-auto p-0 ml-2" onClick={() => console.log(`View message ${msg.id}`)}>View</Button>
               </li>
             ))}
           </ul>
         ) : (
           <p className="text-sm text-muted-foreground">No unread messages.</p>
         )}
       </CardContent>
     </Card>
);

const StatsOverviewCard: React.FC<{ isLoading: boolean; stats: DashboardStats | null }> = ({ isLoading, stats }) => (
     <Card>
       <CardHeader><CardTitle>Stats Overview</CardTitle></CardHeader>
       <CardContent>
         {isLoading ? (
            <div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[120px]" /></div>
         ) : stats ? (
            <div className="space-y-1">
              <p className="text-sm">Properties Managed: <span className="font-semibold">{stats.propertyCount}</span></p>
              <p className="text-sm">Occupancy This Month: <span className="font-semibold">{stats.occupancyRate !== null ? `${stats.occupancyRate}%` : 'N/A'}</span></p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Stats not available.</p>
          )}
        </CardContent>
      </Card>
);

// --- Dashboard Component Logic (now inside Index) ---
const AuthenticatedDashboard = () => {
  // State for simulated data
  const [userName, setUserName] = useState<string | null>(null);
  const [nameLoading, setNameLoading] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState<UpcomingBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState<UnreadMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Simulate fetching user name (replace with actual Supabase call later)
  useEffect(() => {
    // TODO: Replace with: supabase.auth.getUser().then(...) or session data
    const timer = setTimeout(() => {
      setUserName("Test User");
      setNameLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate fetching upcoming bookings
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpcomingBookings([
        { id: 'b1', guestName: 'Alice Smith', propertyName: 'Beach House Villa', checkInDate: '2024-04-10' },
        { id: 'b2', guestName: 'Bob Johnson', propertyName: 'City Center Loft', checkInDate: '2024-04-12' },
      ]);
      setBookingsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

   // Simulate fetching unread messages
   useEffect(() => {
     const timer = setTimeout(() => {
       setUnreadMessages([
         { id: 'm1', senderName: 'Charlie Brown', preview: 'Regarding my stay next week...' },
         { id: 'm2', senderName: 'Diana Prince', preview: 'Question about amenities...' },
       ]);
       setMessagesLoading(false);
     }, 1500);
     return () => clearTimeout(timer);
   }, []);

   // Simulate fetching stats
   useEffect(() => {
     const timer = setTimeout(() => {
       setStats({ propertyCount: 7, occupancyRate: 82 });
       setStatsLoading(false);
     }, 1000);
     return () => clearTimeout(timer);
   }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-6">
        {nameLoading ? (
          <Skeleton className="h-8 w-[250px]" />
        ) : (
          <h1 className="text-2xl font-bold">Welcome back, {userName || 'User'}!</h1>
        )}
      </div>

      {/* Quick Actions (Placeholder) */}
      <Card>
         <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
         <CardContent className="flex flex-wrap gap-2">
            <Button onClick={() => console.log('Add Booking clicked')}>Add New Booking</Button>
            <Button variant="outline" onClick={() => console.log('View Calendar clicked')}>View Calendar</Button>
            <Button variant="outline" onClick={() => console.log('Send Message clicked')}>Send Message</Button>
         </CardContent>
      </Card>

      {/* Grid for Overview Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         <UpcomingActivityCard isLoading={bookingsLoading} bookings={upcomingBookings} />
         <UnreadMessagesCard isLoading={messagesLoading} messages={unreadMessages} />
         <StatsOverviewCard isLoading={statsLoading} stats={stats} />
      </div>
    </div>
  );
};

// --- Main Index Page Logic ---

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    // Optional: Render a loading spinner for the initial auth check
    // Or return null / minimal layout
    return <div>Loading...</div>; // Replace with a proper spinner/skeleton later
  }

  return (
    <div className="min-h-screen flex flex-col">
      {session ? (
        // --- Authenticated View ---
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 p-6 bg-slate-50"> {/* Add padding and background */}
            <AuthenticatedDashboard />
          </main>
        </div>
      ) : (
        // --- Public Landing Page View ---
        <>
          <NavBar />
          <main>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BenefitsSection />
            <DemoSection />
            <WaitlistSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
