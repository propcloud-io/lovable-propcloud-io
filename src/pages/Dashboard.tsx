
import React from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import OverviewStats from "@/components/dashboard/OverviewStats";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import MessagesPreview from "@/components/dashboard/MessagesPreview";
import TaskList from "@/components/dashboard/TaskList";
import OnboardingProgress from "@/components/dashboard/OnboardingProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <WelcomeCard />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="guests">Guests</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <OverviewStats />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <RevenueChart />
                  <div className="space-y-6">
                    <MessagesPreview />
                    <TaskList />
                  </div>
                </div>
                
                <RecentBookings />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <OnboardingProgress />
                  {/* Additional widget could go here */}
                </div>
              </TabsContent>

              <TabsContent value="properties">
                <div className="bg-white p-6 rounded-lg border text-center py-12">
                  <h3 className="text-2xl font-semibold mb-4">Property Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section would display your properties and allow you to manage them.
                    For the demo, this section is a placeholder.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="guests">
                <div className="bg-white p-6 rounded-lg border text-center py-12">
                  <h3 className="text-2xl font-semibold mb-4">Guest Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section would display your guest information and history.
                    For the demo, this section is a placeholder.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Dashboard;
