
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Generate sample data for occupancy rate chart
const generateOccupancyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => {
    // Generate realistic occupancy rates with seasonal patterns
    let baseRate = 0.70; // Base 70%
    
    // Summer months (Jun-Aug) have higher occupancy
    if (month === "Jun" || month === "Jul" || month === "Aug") {
      baseRate = 0.85;
    }
    
    // Winter holidays (Dec) has higher occupancy
    if (month === "Dec") {
      baseRate = 0.80;
    }
    
    // Shoulder seasons (Apr-May, Sep-Oct) have moderate occupancy
    if (month === "Apr" || month === "May" || month === "Sep" || month === "Oct") {
      baseRate = 0.75;
    }
    
    // Low season (Jan-Mar, Nov) have lower occupancy
    if (month === "Jan" || month === "Feb" || month === "Mar" || month === "Nov") {
      baseRate = 0.60;
    }
    
    // Add some randomness
    const actualRate = Math.min(0.98, Math.max(0.45, baseRate + (Math.random() * 0.2 - 0.1)));
    
    return {
      month,
      "Current Year": Math.round(actualRate * 100),
      "Previous Year": Math.round((actualRate - 0.05 - Math.random() * 0.05) * 100)
    };
  });
};

const data = generateOccupancyData();

const OccupancyChart = () => {
  return (
    <ChartContainer 
      config={{
        "Current Year": { color: "#8B5CF6" },
        "Previous Year": { color: "#D1D5DB" } 
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]} 
            tickLine={false} 
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area 
            type="monotone" 
            dataKey="Previous Year" 
            stroke="#D1D5DB" 
            fillOpacity={0.3} 
            fill="#F3F4F6" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Current Year" 
            stroke="#8B5CF6" 
            fillOpacity={0.3} 
            fill="url(#colorUv)" 
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default OccupancyChart;
