
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenue: 4000, occupancy: 70 },
  { name: "Feb", revenue: 3000, occupancy: 65 },
  { name: "Mar", revenue: 5000, occupancy: 80 },
  { name: "Apr", revenue: 8000, occupancy: 90 },
  { name: "May", revenue: 7000, occupancy: 85 },
  { name: "Jun", revenue: 9000, occupancy: 95 },
  { name: "Jul", revenue: 11000, occupancy: 98 },
  { name: "Aug", revenue: 12000, occupancy: 99 },
  { name: "Sep", revenue: 8500, occupancy: 92 },
  { name: "Oct", revenue: 9500, occupancy: 94 },
  { name: "Nov", revenue: 7500, occupancy: 88 },
  { name: "Dec", revenue: 10000, occupancy: 96 },
];

const RevenueChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue & Occupancy</CardTitle>
        <CardDescription>Annual overview of revenue and occupancy rates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.2}
                activeDot={{ r: 8 }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="occupancy"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
