
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  SidebarMenuButton
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Sales Automation",
    icon: DollarSign,
    path: "/dashboard/sales-automation",
    description: "Pricing, channels, and marketing"
  },
  {
    title: "Communication",
    icon: MessageSquare,
    path: "/dashboard/communication",
    description: "AI messaging and reviews"
  },
  {
    title: "Operations",
    icon: Wrench,
    path: "/dashboard/operations",
    description: "Cleaning and maintenance"
  },
  {
    title: "Reports & Insights",
    icon: LineChart,
    path: "/dashboard/analytics",
    description: "Data analytics and metrics"
  },
  {
    title: "Settings & Integrations",
    icon: Settings,
    path: "/dashboard/settings",
    description: "Account and connections"
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border">
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center">
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
      <SidebarFooter className="border-t p-4">
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
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
