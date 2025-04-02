
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  Calendar,
  DollarSign,
  BarChart,
  Settings,
  Users,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    title: "Communication",
    icon: MessageSquare,
    path: "/dashboard/communication",
  },
  {
    title: "Bookings",
    icon: Calendar,
    path: "/dashboard/bookings",
  },
  {
    title: "Pricing",
    icon: DollarSign,
    path: "/dashboard/pricing",
  },
  {
    title: "Operations",
    icon: Users,
    path: "/dashboard/operations",
  },
  {
    title: "Analytics",
    icon: BarChart,
    path: "/dashboard/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 hidden md:block">
      <div className="p-6">
        <div className="space-y-6">
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-propcloud-50 text-propcloud-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-10 border-t border-border">
          <Link
            to="#"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => {
              window.open("https://docs.propcloud.io/help", "_blank");
            }}
          >
            <HelpCircle className="mr-3 h-5 w-5" />
            Help & Resources
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
