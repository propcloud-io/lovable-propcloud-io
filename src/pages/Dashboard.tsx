
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
import ChannelIntegration from "@/components/dashboard/ChannelIntegration";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, PlusCircle } from "lucide-react";
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

// Define available widgets
const availableWidgets = [
  { id: "revenue", title: "Revenue Overview", component: RevenueChart },
  { id: "bookings", title: "Recent Bookings", component: RecentBookings },
  { id: "messages", title: "Recent Messages", component: MessagesPreview },
  { id: "tasks", title: "Tasks", component: TaskList },
  { id: "channels", title: "Channel Integration", component: ChannelIntegration },
  { id: "onboarding", title: "Setup Progress", component: OnboardingProgress },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [showTour, setShowTour] = useState(true);
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState([
    "revenue", "messages", "tasks", "onboarding"
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

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-start">
                  <WelcomeCard />
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
                </div>

                <OverviewStats />
                
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

                <div className="md:hidden flex justify-center">
                  <Button 
                    onClick={() => setAddWidgetOpen(true)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Widget
                  </Button>
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
