
import React, { useState } from "react";
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
import ChannelIntegration from "@/components/dashboard/ChannelIntegration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `${value.charAt(0).toUpperCase() + value.slice(1)} Tab`,
      description: `You've navigated to the ${value} section`,
    });
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Property Added",
      description: "Your new property has been added successfully",
    });
    setPropertyDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <WelcomeCard />

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="guests">Guests</TabsTrigger>
                <TabsTrigger value="channels">Channel Manager</TabsTrigger>
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
                  <ChannelIntegration />
                </div>
              </TabsContent>

              <TabsContent value="properties">
                <div className="bg-white p-6 rounded-lg border mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">Your Properties</h3>
                    <Button onClick={() => setPropertyDialogOpen(true)}>Add Property</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {["Beach Villa", "Downtown Apartment", "Mountain Cabin"].map((property, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                        <div className="h-40 bg-propcloud-100 flex items-center justify-center">
                          <span className="text-propcloud-400">Property Image</span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-lg">{property}</h4>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-muted-foreground">3 beds • 2 baths</span>
                            <div className="text-sm font-medium text-green-600">Active</div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="w-full" onClick={() => {
                              toast({
                                title: "Property Details",
                                description: `Viewing details for ${property}`,
                              });
                            }}>
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="guests">
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-2xl font-semibold mb-6">Guest Management</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Guest</th>
                          <th className="text-left py-3 px-4">Property</th>
                          <th className="text-left py-3 px-4">Check-in</th>
                          <th className="text-left py-3 px-4">Check-out</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "John Smith", property: "Beach Villa", checkin: "Oct 10, 2023", checkout: "Oct 15, 2023", status: "Checked out" },
                          { name: "Maria Garcia", property: "Downtown Apartment", checkin: "Oct 18, 2023", checkout: "Oct 25, 2023", status: "Current" },
                          { name: "Robert Johnson", property: "Mountain Cabin", checkin: "Nov 1, 2023", checkout: "Nov 5, 2023", status: "Upcoming" },
                        ].map((guest, index) => (
                          <tr key={index} className="border-b hover:bg-slate-50">
                            <td className="py-3 px-4">{guest.name}</td>
                            <td className="py-3 px-4">{guest.property}</td>
                            <td className="py-3 px-4">{guest.checkin}</td>
                            <td className="py-3 px-4">{guest.checkout}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                guest.status === "Current" ? "bg-green-100 text-green-800" :
                                guest.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {guest.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm" onClick={() => {
                                toast({
                                  title: "Guest Details",
                                  description: `Viewing details for ${guest.name}`,
                                });
                              }}>
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="channels">
                <div className="space-y-6">
                  <ChannelIntegration />
                  
                  <Card className="bg-white border rounded-lg">
                    <CardHeader>
                      <CardTitle>Channel Performance</CardTitle>
                      <CardDescription>
                        Compare performance metrics across your connected booking channels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b text-sm">
                              <th className="text-left py-3 px-4">Channel</th>
                              <th className="text-left py-3 px-4">Bookings</th>
                              <th className="text-left py-3 px-4">Revenue</th>
                              <th className="text-left py-3 px-4">Avg. Stay</th>
                              <th className="text-left py-3 px-4">Conversion</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 px-4">Airbnb</td>
                              <td className="py-3 px-4">42</td>
                              <td className="py-3 px-4">$12,480</td>
                              <td className="py-3 px-4">3.8 nights</td>
                              <td className="py-3 px-4">8.2%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4">Booking.com</td>
                              <td className="py-3 px-4">36</td>
                              <td className="py-3 px-4">$9,840</td>
                              <td className="py-3 px-4">4.2 nights</td>
                              <td className="py-3 px-4">7.5%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4">Direct Website</td>
                              <td className="py-3 px-4">18</td>
                              <td className="py-3 px-4">$6,300</td>
                              <td className="py-3 px-4">5.1 nights</td>
                              <td className="py-3 px-4">4.3%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNavigation />

      <Dialog open={propertyDialogOpen} onOpenChange={setPropertyDialogOpen}>
        <DialogContent>
          <form onSubmit={handleAddProperty}>
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Enter the details of your new property to add it to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Property Name</Label>
                <Input id="name" placeholder="Enter property name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" type="number" min="0" defaultValue="1" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" type="number" min="0" step="0.5" defaultValue="1" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter property address" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPropertyDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Property</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
