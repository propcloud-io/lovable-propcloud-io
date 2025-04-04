
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Bot, BarChart } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import TaskDashboard from "@/components/operations/TaskDashboard";
import WorkflowAutomation from "@/components/operations/WorkflowAutomation";

const Operations = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto space-y-6">
                {showOnboarding && (
                  <Card className="bg-gradient-to-r from-propcloud-50 to-blue-50 border-propcloud-100">
                    <CardHeader>
                      <CardTitle>Operations Automation</CardTitle>
                      <CardDescription>
                        Streamline your property management operations with AI-powered scheduling and coordination
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Operations Automation helps you manage cleaning, maintenance, and staff coordination 
                          efficiently. The AI will automatically schedule tasks based on guest check-ins and check-outs,
                          assign them to the right staff, and provide real-time updates.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              toast({
                                title: "Tour Started",
                                description: "Let's walk through the Operations features",
                              });
                            }}
                          >
                            Take a Quick Tour
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={() => setShowOnboarding(false)}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="tasks">
                      <CalendarCheck className="h-4 w-4 mr-2" />
                      Live Tasks
                    </TabsTrigger>
                    <TabsTrigger value="workflow">
                      <Bot className="h-4 w-4 mr-2" />
                      Workflow Automation
                    </TabsTrigger>
                    <TabsTrigger value="reports">
                      <BarChart className="h-4 w-4 mr-2" />
                      Reports
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="tasks" className="space-y-6">
                    <TaskDashboard />
                  </TabsContent>

                  <TabsContent value="workflow" className="space-y-6">
                    <WorkflowAutomation />
                  </TabsContent>

                  <TabsContent value="reports" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Operations Performance</CardTitle>
                        <CardDescription>Key metrics for your property operations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] flex items-center justify-center bg-slate-50 border rounded">
                          <p className="text-muted-foreground">Performance reports will be available soon</p>
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

export default Operations;
