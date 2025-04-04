
import React from "react";
import DashboardWidget from "@/components/dashboard/DashboardWidget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MaintenanceRequestsChart from "./MaintenanceRequestsChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OperationalDashboard = () => {
  // Simulated operational metrics
  const metrics = [
    { title: "Active Properties", value: "32", change: "+2", positive: true },
    { title: "Maintenance Requests", value: "18", change: "-5", positive: true },
    { title: "Task Completion Rate", value: "94%", change: "+2%", positive: true },
    { title: "Response Time", value: "1.4h", change: "-0.3h", positive: true }
  ];

  // Simulated task data
  const recentTasks = [
    { id: "T-1042", property: "Seaside Villa", task: "AC Repair", status: "Completed", assignee: "Mike Johnson" },
    { id: "T-1041", property: "Mountain Cabin", task: "Deck Maintenance", status: "In Progress", assignee: "Sarah Lee" },
    { id: "T-1040", property: "Downtown Loft", task: "Plumbing Issue", status: "Scheduled", assignee: "James Wilson" },
    { id: "T-1039", property: "Lakefront House", task: "Cleaning", status: "Completed", assignee: "Emily Chen" },
    { id: "T-1038", property: "Garden Apartment", task: "Lock Replacement", status: "Completed", assignee: "David Kim" }
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
        <DashboardWidget title="Maintenance Requests" variant="default">
          <MaintenanceRequestsChart />
        </DashboardWidget>
        
        <DashboardWidget title="Recent Tasks" variant="default">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.property}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>
                    <Badge variant={
                      task.status === "Completed" ? "success" : 
                      task.status === "In Progress" ? "secondary" : "outline"
                    }>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.assignee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardWidget>
      </div>
    </div>
  );
};

export default OperationalDashboard;
