
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DollarSign, MessageSquare, TrendingUp, PlusCircle, Globe } from "lucide-react";
import DashboardWidget from "@/components/dashboard/DashboardWidget";
import ChannelIntegrationWidget from "@/components/sales/ChannelIntegrationWidget";
import DirectBookingWidget from "@/components/sales/DirectBookingWidget";
import PricingOptimizationWidget from "@/components/sales/PricingOptimizationWidget";
import MarketingAutomationWidget from "@/components/sales/MarketingAutomationWidget";
import FollowUpWidget from "@/components/sales/FollowUpWidget";

// Sample properties for the dropdown
const properties = [
  { id: 1, name: "Beach Villa", baseRate: 219, minRate: 179, maxRate: 299, status: "active" },
  { id: 2, name: "Downtown Apartment", baseRate: 149, minRate: 129, maxRate: 219, status: "active" },
  { id: 3, name: "Mountain Cabin", baseRate: 179, minRate: 139, maxRate: 249, status: "active" },
];

const SalesAutomation = () => {
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  const handlePropertyChange = (id) => {
    const property = properties.find(p => p.id === parseInt(id));
    if (property) {
      setSelectedProperty(parseInt(id));
      toast({
        title: "Property Changed",
        description: `Now viewing sales data for ${property.name}`
      });
    }
  };

  const currentProperty = properties.find(p => p.id === selectedProperty) || properties[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sales Automation</h1>
                    <p className="text-muted-foreground">
                      AI-powered tools to maximize your property's revenue
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={selectedProperty.toString()} onValueChange={handlePropertyChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map((property) => (
                          <SelectItem key={property.id} value={property.id.toString()}>
                            {property.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
                    <TabsTrigger value="booking">Direct Booking</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="channels">Channels</TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Base Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="text-3xl font-bold">${currentProperty.baseRate}</div>
                          <p className="text-sm text-muted-foreground">Average nightly rate</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Revenue Potential
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="text-3xl font-bold">+18%</div>
                          <p className="text-sm text-muted-foreground">With AI optimization</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Direct Bookings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="text-3xl font-bold">24</div>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <DashboardWidget title="Dynamic Pricing" variant="compact">
                        <PricingOptimizationWidget />
                      </DashboardWidget>
                      
                      <DashboardWidget title="Direct Booking" variant="compact">
                        <DirectBookingWidget />
                      </DashboardWidget>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <DashboardWidget title="Channel Integration" variant="compact">
                        <ChannelIntegrationWidget />
                      </DashboardWidget>
                      
                      <DashboardWidget title="Guest Follow-ups" variant="compact">
                        <FollowUpWidget />
                      </DashboardWidget>
                    </div>
                  </TabsContent>
                  
                  {/* Dynamic Pricing Tab */}
                  <TabsContent value="pricing" className="space-y-6">
                    <DashboardWidget 
                      title="Dynamic Pricing Optimization" 
                      fullHeight={true}
                      headerActions={
                        <Button variant="outline" size="sm" className="mr-2">
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Rule
                        </Button>
                      }
                    >
                      <div className="h-full">
                        <PricingOptimizationWidget />
                      </div>
                    </DashboardWidget>
                  </TabsContent>
                  
                  {/* Direct Booking Tab */}
                  <TabsContent value="booking" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <DashboardWidget 
                        title="AI Booking Assistant" 
                        fullHeight={true}
                      >
                        <DirectBookingWidget />
                      </DashboardWidget>
                      
                      <DashboardWidget 
                        title="Follow-Up & Upsell Automation" 
                        fullHeight={true}
                      >
                        <FollowUpWidget />
                      </DashboardWidget>
                    </div>
                  </TabsContent>
                  
                  {/* Marketing Tab */}
                  <TabsContent value="marketing" className="space-y-6">
                    <DashboardWidget 
                      title="Marketing Campaigns" 
                      fullHeight={true}
                    >
                      <MarketingAutomationWidget />
                    </DashboardWidget>
                  </TabsContent>
                  
                  {/* Channels Tab */}
                  <TabsContent value="channels" className="space-y-6">
                    <DashboardWidget 
                      title="Channel Manager" 
                      fullHeight={true}
                      headerActions={
                        <Button variant="outline" size="sm" className="mr-2">
                          <Globe className="h-4 w-4 mr-2" /> Add Channel
                        </Button>
                      }
                    >
                      <div className="h-full">
                        <ChannelIntegrationWidget />
                      </div>
                    </DashboardWidget>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <MobileNavigation />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default SalesAutomation;
