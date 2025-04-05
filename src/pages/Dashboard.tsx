
import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import OnboardingTour from "@/components/dashboard/OnboardingTour";
import DashboardWidget from "@/components/dashboard/DashboardWidget";
import OverviewStats from "@/components/dashboard/OverviewStats";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import MessagesPreview from "@/components/dashboard/MessagesPreview";
import TaskList from "@/components/dashboard/TaskList";
import OnboardingProgress from "@/components/dashboard/OnboardingProgress";
import ChannelIntegrationWidget from "@/components/sales/ChannelIntegrationWidget";
import PricingOptimizationWidget from "@/components/sales/PricingOptimizationWidget";
import MarketingAutomationWidget from "@/components/sales/MarketingAutomationWidget";
import FollowUpWidget from "@/components/sales/FollowUpWidget";
import DirectBookingWidget from "@/components/sales/DirectBookingWidget";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, PlusCircle, UserPlus, Zap, Layers, BookOpen, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Define available widgets across different categories
const availableWidgets = [
  // Analytics & Overview Widgets
  { id: "revenue", title: "Revenue Overview", component: RevenueChart, category: "analytics" },
  { id: "bookings", title: "Recent Bookings", component: RecentBookings, category: "analytics" },
  { id: "messages", title: "Recent Messages", component: MessagesPreview, category: "communication" },
  { id: "tasks", title: "Tasks", component: TaskList, category: "operations" },
  
  // Channel & Marketing Widgets
  { id: "channels", title: "Channel Integration", component: ChannelIntegrationWidget, category: "sales" },
  { id: "pricing", title: "Dynamic Pricing", component: PricingOptimizationWidget, category: "sales" },
  { id: "marketing", title: "Marketing Automation", component: MarketingAutomationWidget, category: "sales" },
  { id: "followups", title: "Follow-ups & Upsells", component: FollowUpWidget, category: "sales" },
  { id: "directBooking", title: "Direct Booking", component: DirectBookingWidget, category: "sales" },
  
  // Setup & Onboarding
  { id: "onboarding", title: "Setup Progress", component: OnboardingProgress, category: "setup" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [showTour, setShowTour] = useState(true);
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeWidgets, setActiveWidgets] = useState([
    "revenue", "messages", "tasks", "channels", "pricing", "onboarding"
  ]);

  // Load user preferences from localStorage on initial render
  useEffect(() => {
    const savedWidgets = localStorage.getItem("dashboard_widgets");
    const tourCompleted = localStorage.getItem("dashboard_tour_completed") === "true";
    
    if (savedWidgets) {
      setActiveWidgets(JSON.parse(savedWidgets));
    }
    
    if (tourCompleted) {
      setShowTour(false);
    }
  }, []);

  // Save widget preferences when they change
  useEffect(() => {
    localStorage.setItem("dashboard_widgets", JSON.stringify(activeWidgets));
  }, [activeWidgets]);

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem("dashboard_tour_completed", "true");
    toast({
      title: "Tour Completed",
      description: "You can always restart the tour from the help menu",
    });
  };

  const handleAddWidget = (widgetId: string) => {
    if (!activeWidgets.includes(widgetId)) {
      setActiveWidgets([...activeWidgets, widgetId]);
      toast({
        title: "Widget Added",
        description: "The widget has been added to your dashboard",
      });
    }
    setAddWidgetOpen(false);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter(id => id !== widgetId));
    toast({
      title: "Widget Removed",
      description: "The widget has been removed from your dashboard",
    });
  };

  const getFilteredWidgets = (category: string) => {
    return activeWidgets.filter(widgetId => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      return category === "all" ? true : widget?.category === category;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <WelcomeCard />
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="hidden md:flex">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Widget
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Available Widgets</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {availableWidgets
                          .filter(widget => !activeWidgets.includes(widget.id))
                          .map(widget => (
                            <DropdownMenuItem 
                              key={widget.id}
                              onClick={() => handleAddWidget(widget.id)}
                            >
                              {widget.title}
                            </DropdownMenuItem>
                          ))}
                        {availableWidgets.filter(widget => !activeWidgets.includes(widget.id)).length === 0 && (
                          <DropdownMenuItem disabled>
                            All widgets added
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" onClick={() => setShowTour(true)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Tour
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href="/dashboard/sales-automation">
                        <Zap className="mr-2 h-4 w-4" />
                        Setup Automations
                      </a>
                    </Button>
                  </div>
                </div>

                <OverviewStats />
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Widgets</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="sales">Sales & Marketing</TabsTrigger>
                    <TabsTrigger value="communication">Communication</TabsTrigger>
                    <TabsTrigger value="operations">Operations</TabsTrigger>
                    <TabsTrigger value="setup">Setup</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeWidgets.map(widgetId => {
                        const widget = availableWidgets.find(w => w.id === widgetId);
                        if (!widget) return null;
                        
                        const WidgetComponent = widget.component;
                        return (
                          <DashboardWidget 
                            key={widgetId}
                            title={widget.title}
                            onRemove={() => handleRemoveWidget(widgetId)}
                            id={`widget-${widgetId}`}
                          >
                            <WidgetComponent />
                          </DashboardWidget>
                        );
                      })}
                    </div>
                  </TabsContent>
                  
                  {["analytics", "sales", "communication", "operations", "setup"].map(category => (
                    <TabsContent key={category} value={category} className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredWidgets(category).map(widgetId => {
                          const widget = availableWidgets.find(w => w.id === widgetId);
                          if (!widget) return null;
                          
                          const WidgetComponent = widget.component;
                          return (
                            <DashboardWidget 
                              key={widgetId}
                              title={widget.title}
                              onRemove={() => handleRemoveWidget(widgetId)}
                              id={`widget-${widgetId}`}
                            >
                              <WidgetComponent />
                            </DashboardWidget>
                          );
                        })}
                        
                        {getFilteredWidgets(category).length === 0 && (
                          <div className="col-span-full text-center p-12 border rounded-lg bg-white">
                            <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No {category} widgets added</h3>
                            <p className="text-muted-foreground mb-4">Add some widgets to see them here</p>
                            <Button onClick={() => setAddWidgetOpen(true)}>
                              <Plus className="mr-2 h-4 w-4" /> Add Widget
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="md:hidden flex justify-center">
                  <Button 
                    onClick={() => setAddWidgetOpen(true)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Widget
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DashboardWidget title="AI Automations" variant="default">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Sparkles className="h-8 w-8 text-amber-500" />
                        <div>
                          <h3 className="font-medium">Enable AI Assistant</h3>
                          <p className="text-sm text-muted-foreground">Let AI help manage your properties</p>
                        </div>
                        <Button className="ml-auto" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
                        <div className="h-10 w-10 bg-propcloud-100 rounded-full flex items-center justify-center text-propcloud-600">
                          <UserPlus className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Invite your team</p>
                          <p className="text-xs text-muted-foreground mt-1">Add team members to collaborate on property management</p>
                          <Button variant="link" className="h-auto p-0 text-xs">Invite Now</Button>
                        </div>
                      </div>
                    </div>
                  </DashboardWidget>
                  
                  <DashboardWidget title="Quick Actions" variant="default">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                        <UserPlus className="h-5 w-5 mb-1" />
                        <span className="text-xs">Add Guest</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                        <Zap className="h-5 w-5 mb-1" />
                        <span className="text-xs">New Booking</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                        <Layers className="h-5 w-5 mb-1" />
                        <span className="text-xs">Add Property</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                        <BookOpen className="h-5 w-5 mb-1" />
                        <span className="text-xs">New Task</span>
                      </Button>
                    </div>
                  </DashboardWidget>
                </div>
              </div>
            </div>
            <MobileNavigation />

            {showTour && (
              <OnboardingTour module="dashboard" onComplete={handleTourComplete} />
            )}

            <Dialog open={addWidgetOpen} onOpenChange={setAddWidgetOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Widget</DialogTitle>
                  <DialogDescription>
                    Choose a widget to add to your dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {availableWidgets
                    .filter(widget => !activeWidgets.includes(widget.id))
                    .map(widget => (
                      <Button
                        key={widget.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleAddWidget(widget.id)}
                      >
                        {widget.title}
                      </Button>
                    ))}
                  {availableWidgets.filter(widget => !activeWidgets.includes(widget.id)).length === 0 && (
                    <p className="text-center text-muted-foreground">
                      All available widgets have been added to your dashboard
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddWidgetOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
