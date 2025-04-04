
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Props type definition
interface RevenueMetricsChartProps {
  simplified?: boolean;
  showExpenses?: boolean;
}

// Generate sample data for revenue chart
const generateRevenueData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => {
    // Generate realistic revenue patterns with seasonality
    let revenueBase = 9500; // Base revenue
    let expensesBase = 3200; // Base expenses
    let profitBase = revenueBase - expensesBase;
    
    // Summer months (Jun-Aug) have higher revenue
    if (month === "Jun" || month === "Jul" || month === "Aug") {
      revenueBase = 15000;
      expensesBase = 4800;
    }
    
    // Winter holidays (Dec) has higher revenue
    if (month === "Dec") {
      revenueBase = 13000;
      expensesBase = 4500;
    }
    
    // Shoulder seasons (Apr-May, Sep-Oct) have moderate revenue
    if (month === "Apr" || month === "May" || month === "Sep" || month === "Oct") {
      revenueBase = 11000;
      expensesBase = 3800;
    }
    
    // Add some randomness
    const revenue = Math.max(5000, Math.round(revenueBase + (Math.random() * 3000 - 1500)));
    const expenses = Math.max(2000, Math.round(expensesBase + (Math.random() * 1000 - 500)));
    const profit = revenue - expenses;
    
    return {
      month,
      "Revenue": revenue,
      "Expenses": expenses,
      "Profit": profit
    };
  });
};

const data = generateRevenueData();

const RevenueMetricsChart: React.FC<RevenueMetricsChartProps> = ({ 
  simplified = false,
  showExpenses = false
}) => {
  return (
    <ChartContainer 
      config={{
        "Revenue": { color: "#10B981" },
        "Expenses": { color: "#F43F5E" },
        "Profit": { color: "#8B5CF6" }
      }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
            tickLine={false} 
            axisLine={false}
          />
          <ChartTooltip 
            content={<ChartTooltipContent 
              formatter={(value) => `$${Number(value).toLocaleString()}`} 
            />} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Revenue" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 2 }}
            activeDot={{ r: 6 }}
          />
          {showExpenses && (
            <Line 
              type="monotone" 
              dataKey="Expenses" 
              stroke="#F43F5E" 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 2 }}
              activeDot={{ r: 6 }}
            />
          )}
          {!simplified && (
            <Line 
              type="monotone" 
              dataKey="Profit" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 2 }}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RevenueMetricsChart;
