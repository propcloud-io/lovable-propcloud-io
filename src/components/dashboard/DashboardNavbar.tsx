
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, LogOut, Settings, User, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DashboardNavbar = () => {
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();

  const handleShowTour = () => {
    // Remove the tour completed flag from localStorage
    localStorage.removeItem("dashboard_tour_completed");
    toast({
      title: "Tour Activated",
      description: "Refresh the page to start the tour",
    });
    // Reload the page to show the tour
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2" />
          <Link to="/dashboard" className="hidden md:flex items-center">
            <span className="text-xl font-bold text-propcloud-600">
              PropCloud<span className="text-propcloud-400">.io</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications ? (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">New booking request</span>
                      <span className="text-xs text-muted-foreground">Beach Villa: Jul 12-15</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">Maintenance alert</span>
                      <span className="text-xs text-muted-foreground">Downtown Apt: AC issue reported</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">New review received</span>
                      <span className="text-xs text-muted-foreground">Mountain Cabin: 5 stars</span>
                    </div>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">Demo User</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleShowTour}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Start Tour</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/">
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Exit Demo</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
