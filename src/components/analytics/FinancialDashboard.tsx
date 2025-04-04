
import React from "react";
import DashboardWidget from "@/components/dashboard/DashboardWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RevenueMetricsChart from "./RevenueMetricsChart";
import ExpenseBreakdownChart from "./ExpenseBreakdownChart";

const FinancialDashboard = () => {
  // Simulated financial metrics
  const metrics = [
    { title: "Total Revenue", value: "$128,430", change: "+12.5%", positive: true },
    { title: "Average Daily Rate", value: "$249", change: "+5.2%", positive: true },
    { title: "RevPAR", value: "$182", change: "+8.7%", positive: true },
    { title: "Expenses", value: "$42,850", change: "-3.1%", positive: true }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge variant={metric.positive ? "success" : "destructive"} className="mt-1">
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardWidget title="Revenue Breakdown" variant="default">
          <RevenueMetricsChart simplified />
        </DashboardWidget>
        
        <DashboardWidget title="Expense Categories" variant="default">
          <ExpenseBreakdownChart />
        </DashboardWidget>
      </div>
      
      <DashboardWidget title="Monthly Financial Performance" variant="default">
        <div className="h-[350px]">
          <RevenueMetricsChart showExpenses />
        </div>
      </DashboardWidget>
    </div>
  );
};

export default FinancialDashboard;
