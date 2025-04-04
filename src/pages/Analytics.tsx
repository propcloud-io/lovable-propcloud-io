
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
                    <p className="text-muted-foreground">
                      Data-driven insights for your property business
                    </p>
                  </div>
                  <Button variant="outline">
                    Export Reports
                  </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="overview" className="flex items-center">
                      <BarChart className="h-4 w-4 mr-2" /> Overview
                    </TabsTrigger>
                    <TabsTrigger value="financials" className="flex items-center">
                      <LineChart className="h-4 w-4 mr-2" /> Financial Performance
                    </TabsTrigger>
                    <TabsTrigger value="operations" className="flex items-center">
                      <PieChart className="h-4 w-4 mr-2" /> Operational Metrics
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Dashboard</CardTitle>
                        <CardDescription>Key metrics at a glance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] flex items-center justify-center bg-slate-50 border rounded">
                          <p className="text-muted-foreground">Analytics dashboard will be displayed here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Financial Performance Tab */}
                  <TabsContent value="financials" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue & Expenses</CardTitle>
                        <CardDescription>Financial data for your properties</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] flex items-center justify-center bg-slate-50 border rounded">
                          <p className="text-muted-foreground">Financial charts will be displayed here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Operational Metrics Tab */}
                  <TabsContent value="operations" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Operational Performance</CardTitle>
                        <CardDescription>Metrics for property operations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] flex items-center justify-center bg-slate-50 border rounded">
                          <p className="text-muted-foreground">Operational charts will be displayed here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <MobileNavigation />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Analytics;
