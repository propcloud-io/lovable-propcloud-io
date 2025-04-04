
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Generate sample data for maintenance requests chart
const generateMaintenanceData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let cumulativeResolved = 0;
  
  return months.map((month, index) => {
    // Generate new requests with seasonal patterns
    let newBase = 12; // Base new requests
    
    // Summer months (Jun-Aug) often have more maintenance needs
    if (month === "Jun" || month === "Jul" || month === "Aug") {
      newBase = 18;
    }
    
    // Winter (Dec-Feb) might have more heating issues
    if (month === "Dec" || month === "Jan" || month === "Feb") {
      newBase = 16;
    }
    
    // Add some randomness
    const newRequests = Math.max(5, Math.round(newBase + (Math.random() * 8 - 4)));
    const resolved = Math.max(4, Math.round(newRequests * (0.7 + Math.random() * 0.25)));
    
    return {
      month,
      "New Requests": newRequests,
      "Resolved": resolved,
      "Open": newRequests - resolved + (index > 0 ? Math.max(0, cumulativeResolved) : 0)
    };
  });
};

const data = generateMaintenanceData();

const MaintenanceRequestsChart = () => {
  return (
    <ChartContainer 
      config={{
        "New Requests": { color: "#F59E0B" },
        "Resolved": { color: "#10B981" },
        "Open": { color: "#F43F5E" }
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="New Requests" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Open" fill="#F43F5E" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MaintenanceRequestsChart;
