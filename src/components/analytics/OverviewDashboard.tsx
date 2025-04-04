
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardWidget from "@/components/dashboard/DashboardWidget";
import OccupancyChart from "./OccupancyChart";
import BookingsChart from "./BookingsChart";
import RevenueMetricsChart from "./RevenueMetricsChart";
import PropertyPerformanceTable from "./PropertyPerformanceTable";

const OverviewDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardWidget title="Occupancy Rate" variant="default">
          <OccupancyChart />
        </DashboardWidget>
        
        <DashboardWidget title="Bookings Trends" variant="default">
          <BookingsChart />
        </DashboardWidget>
      </div>
      
      <DashboardWidget title="Revenue Metrics" variant="default">
        <RevenueMetricsChart />
      </DashboardWidget>
      
      <DashboardWidget title="Property Performance" variant="default">
        <PropertyPerformanceTable />
      </DashboardWidget>
    </div>
  );
};

export default OverviewDashboard;
