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
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MessageCircle, BedDouble, Bell } from "lucide-react"; // Added icons

// --- Updated Interfaces for simulated data ---
interface UpcomingBooking {
  id: string;
  guestName: string;
  propertyName: string;
  checkInDate: string;
  source: 'Airbnb' | 'Vrbo' | 'Direct' | 'Booking.com'; // Added source
}
interface UnreadMessage {
  id: string;
  senderName: string;
  preview: string;
  source: 'Airbnb' | 'Vrbo' | 'Direct' | 'Booking.com'; // Added source
}
interface DashboardStats {
  propertyCount: number;
  occupancyRate: number | null;
  totalUpcomingBookings: number; // Added more stats
}
interface OperationalAlert {
  id: string;
  type: 'Cleaning' | 'Maintenance';
  description: string;
  propertyName: string;
  dueDate?: string;
}

// --- Reusable Card Components (Updated) ---

// Helper to get source icon (replace with actual icons later)
const SourceIcon: React.FC<{ source: string }> = ({ source }) => {
  // In a real app, use actual icons
  let emoji = '❓';
  if (source === 'Airbnb') emoji = '🏡';
  if (source === 'Vrbo') emoji = ' V';
  if (source === 'Direct') emoji = '🌐';
  if (source === 'Booking.com') emoji = ' B';
  return <span title={source} className="text-xs mr-1">{emoji}</span>;
};

const UpcomingActivityCard: React.FC<{ isLoading: boolean; bookings: UpcomingBooking[] }> = ({ isLoading, bookings }) => (
    <Card>
      <CardHeader><CardTitle className="flex items-center"><BedDouble className="mr-2 h-5 w-5 text-blue-500"/>Upcoming Activity</CardTitle></CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" /><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[180px]" />
          </div>
        ) : bookings.length > 0 ? (
          <ul className="space-y-2">
            {bookings.map(booking => (
              <li key={booking.id} className="text-sm flex items-center">
                <SourceIcon source={booking.source} />
                <span><span className="font-medium">{booking.guestName}</span> @ <span className="font-medium">{booking.propertyName}</span> on {new Date(booking.checkInDate).toLocaleDateString()}</span>
                <Button variant="link" size="sm" className="h-auto p-0 ml-auto" onClick={() => console.log(`View booking ${booking.id}`)}>View</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No upcoming check-ins/outs.</p>
        )}
      </CardContent>
    </Card>
);

const UnreadMessagesCard: React.FC<{ isLoading: boolean; messages: UnreadMessage[] }> = ({ isLoading, messages }) => (
     <Card>
      <CardHeader><CardTitle className="flex items-center"><MessageCircle className="mr-2 h-5 w-5 text-green-500"/>Unread Messages</CardTitle></CardHeader>
      <CardContent>
        {isLoading ? (
           <div className="space-y-2"><Skeleton className="h-4 w-[180px]" /><Skeleton className="h-4 w-[200px]" /></div>
        ) : messages.length > 0 ? (
           <ul className="space-y-2">
             {messages.map(msg => (
               <li key={msg.id} className="text-sm flex items-center">
                  <SourceIcon source={msg.source} />
                  <span>From <span className="font-medium">{msg.senderName}</span>: {msg.preview}...</span>
                  <Button variant="link" size="sm" className="h-auto p-0 ml-auto" onClick={() => console.log(`View message ${msg.id}`)}>View</Button>
               </li>
             ))}
           </ul>
         ) : (
           <p className="text-sm text-muted-foreground">Inbox zero!</p>
         )}
       </CardContent>
     </Card>
);

const StatsOverviewCard: React.FC<{ isLoading: boolean; stats: DashboardStats | null }> = ({ isLoading, stats }) => (
     <Card>
       <CardHeader><CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-purple-500"/>Portfolio Overview</CardTitle></CardHeader>
       <CardContent>
         {isLoading ? (
            <div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[120px]" /><Skeleton className="h-4 w-[180px]" /></div>
         ) : stats ? (
            <div className="space-y-1">
              <p className="text-sm">Total Properties: <span className="font-semibold">{stats.propertyCount}</span></p>
              <p className="text-sm">Upcoming Bookings: <span className="font-semibold">{stats.totalUpcomingBookings}</span></p>
              <p className="text-sm">Est. Occupancy (This Month): <span className="font-semibold">{stats.occupancyRate !== null ? `${stats.occupancyRate}%` : 'N/A'}</span></p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Stats unavailable.</p>
          )}
        </CardContent>
      </Card>
);

// --- New Operational Alerts Card ---
const OperationalAlertsCard: React.FC<{ isLoading: boolean; alerts: OperationalAlert[] }> = ({ isLoading, alerts }) => (
  <Card>
    <CardHeader><CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-orange-500"/>Operational Alerts</CardTitle></CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" /><Skeleton className="h-4 w-[180px]" />
        </div>
      ) : alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map(alert => (
            <li key={alert.id} className="text-sm flex items-center">
              <span className={`mr-2 font-semibold ${alert.type === 'Cleaning' ? 'text-blue-600' : 'text-red-600'}`}>[{alert.type}]</span>
              <span>{alert.description} @ <span className="font-medium">{alert.propertyName}</span> {alert.dueDate ? `(Due: ${new Date(alert.dueDate).toLocaleDateString()})` : ''}</span>
              <Button variant="link" size="sm" className="h-auto p-0 ml-auto" onClick={() => console.log(`View alert ${alert.id}`)}>View</Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No operational alerts.</p>
      )}
    </CardContent>
  </Card>
);

// --- AuthenticatedDashboard Component (Updated state and rendering) ---
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
  const [alerts, setAlerts] = useState<OperationalAlert[]>([]); // New state for alerts
  const [alertsLoading, setAlertsLoading] = useState(true); // New loading state

  // Simulate fetching user name
  useEffect(() => {
    const timer = setTimeout(() => { setUserName("Demo User"); setNameLoading(false); }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Simulate fetching unified upcoming bookings
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpcomingBookings([
        { id: 'b1', guestName: 'Alice Smith', propertyName: 'Beach House Villa', checkInDate: '2024-04-10', source: 'Airbnb' },
        { id: 'b2', guestName: 'Bob Johnson', propertyName: 'City Center Loft', checkInDate: '2024-04-12', source: 'Direct' },
        { id: 'b3', guestName: 'Carla Rossi', propertyName: 'Beach House Villa', checkInDate: '2024-04-15', source: 'Booking.com' },
      ]);
      setBookingsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

   // Simulate fetching unified unread messages
   useEffect(() => {
     const timer = setTimeout(() => {
       setUnreadMessages([
         { id: 'm1', senderName: 'Charlie Brown', preview: 'Regarding my stay next week...', source: 'Airbnb' },
         { id: 'm2', senderName: 'Diana Prince', preview: 'Question about amenities...', source: 'Vrbo' },
       ]);
       setMessagesLoading(false);
     }, 1500);
     return () => clearTimeout(timer);
   }, []);

   // Simulate fetching aggregated stats
   useEffect(() => {
     const timer = setTimeout(() => {
       setStats({ propertyCount: 15, occupancyRate: 78, totalUpcomingBookings: 25 });
       setStatsLoading(false);
     }, 1000);
     return () => clearTimeout(timer);
   }, []);

   // Simulate fetching operational alerts
   useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts([
        { id: 'a1', type: 'Cleaning', description: 'Needs cleaning post check-out', propertyName: 'City Center Loft', dueDate: '2024-04-12'}, 
        { id: 'a2', type: 'Maintenance', description: 'Leaky faucet reported', propertyName: 'Beach House Villa' },
      ]);
      setAlertsLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
   }, []);


  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-4">
        {nameLoading ? (
          <Skeleton className="h-8 w-[250px]" />
        ) : (
          <h1 className="text-2xl font-bold">Welcome back, {userName || 'User'}!</h1>
        )}
      </div>

      {/* Quick Actions (Updated Text) */}
      <Card>
         <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
         <CardContent className="flex flex-wrap gap-2">
            <Button onClick={() => console.log('Add Booking clicked')}>Add Direct Booking</Button>
            <Button variant="outline" onClick={() => console.log('View Calendar clicked')}>View Unified Calendar</Button>
            <Button variant="outline" onClick={() => console.log('Go to Inbox clicked')}>Go to Unified Inbox</Button>
            <Button variant="outline" onClick={() => console.log('Add Property clicked')}>Add New Property</Button>
         </CardContent>
      </Card>

      {/* Grid for Overview Cards (Added Alerts) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
         <StatsOverviewCard isLoading={statsLoading} stats={stats} />
         <UpcomingActivityCard isLoading={bookingsLoading} bookings={upcomingBookings} />
         <UnreadMessagesCard isLoading={messagesLoading} messages={unreadMessages} />
         <OperationalAlertsCard isLoading={alertsLoading} alerts={alerts} />
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
        <SidebarProvider>
          <div className="flex flex-1">
            <DashboardSidebar />
            <main className="flex-1 p-6 bg-slate-50"> {/* Add padding and background */}
              <AuthenticatedDashboard />
            </main>
          </div>
        </SidebarProvider>
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
