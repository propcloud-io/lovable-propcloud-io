
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for expense breakdown
const data = [
  { name: "Cleaning", value: 28 },
  { name: "Maintenance", value: 22 },
  { name: "Utilities", value: 18 },
  { name: "Management Fees", value: 12 },
  { name: "Marketing", value: 10 },
  { name: "Supplies", value: 6 },
  { name: "Other", value: 4 }
];

// Colors for the pie chart
const COLORS = [
  "#8B5CF6", // Purple
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#94A3B8"  // Slate
];

const ExpenseBreakdownChart = () => {
  return (
    <ChartContainer 
      config={{
        "Cleaning": { color: "#8B5CF6" },
        "Maintenance": { color: "#3B82F6" },
        "Utilities": { color: "#10B981" },
        "Management Fees": { color: "#F59E0B" },
        "Marketing": { color: "#EC4899" },
        "Supplies": { color: "#6366F1" },
        "Other": { color: "#94A3B8" }
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ExpenseBreakdownChart;
