import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  MessageSquare,
  DollarSign,
  BarChart,
  Settings,
  Wrench,
  LineChart,
  PieChart,
  Layers,
  Sliders,
  CalendarDays,
  LogOut,
  Briefcase,
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    path: "/app",
  },
  {
    title: "Sales Automation",
    icon: DollarSign,
    path: "/app/sales-automation",
    description: "Pricing, channels, and marketing"
  },
  {
    title: "Bookings",
    icon: CalendarDays,
    path: "/app/bookings",
    description: "Manage reservations and calendar"
  },
  {
    title: "Communication",
    icon: MessageSquare,
    path: "/app/communication",
    description: "AI messaging and reviews"
  },
  {
    title: "Operations",
    icon: Wrench,
    path: "/app/operations",
    description: "Cleaning and maintenance"
  },
  {
    title: "Reports & Insights",
    icon: LineChart,
    path: "/app/analytics",
    description: "Data analytics and metrics"
  },
  {
    title: "Settings & Integrations",
    icon: Settings,
    path: "/app/settings",
    description: "Account and connections"
  },
  {
    title: "Properties",
    icon: Briefcase,
    path: "/app/properties",
    description: "Manage your properties"
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    }
  };
  
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border">
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link to="/app" className="flex items-center">
          <span className="text-xl font-bold text-propcloud-600">
            PropCloud<span className="text-propcloud-400">.io</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.description ? item.description : item.title}
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 space-y-2">
        <Link
          to="#"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={() => {
            window.open("https://docs.propcloud.io/help", "_blank");
          }}
        >
          <Layers className="mr-3 h-5 w-5" />
          <span>Help & Resources</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
