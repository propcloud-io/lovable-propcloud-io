
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Calendar, MessageSquare, DollarSign } from "lucide-react";

const statsData = [
  {
    title: "Total Revenue",
    value: "$24,329",
    change: "+12.5%",
    trending: "up",
    icon: DollarSign,
    description: "Last 30 days",
  },
  {
    title: "Occupancy Rate",
    value: "89%",
    change: "+4.2%",
    trending: "up",
    icon: Calendar,
    description: "Last 30 days",
  },
  {
    title: "Guest Messages",
    value: "342",
    change: "-5.8%",
    trending: "down",
    icon: MessageSquare,
    description: "Last 30 days",
  },
  {
    title: "New Bookings",
    value: "57",
    change: "+10.3%",
    trending: "up",
    icon: Users,
    description: "Last 30 days",
  },
];

const OverviewStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium mr-1 ${
                  stat.trending === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
              {stat.trending === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className="text-xs text-muted-foreground ml-1">
                {stat.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewStats;
