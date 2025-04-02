import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Clock, Users, AlertCircle, CheckCircle, Wrench, BarChart } from "lucide-react";

const Operations = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("cleaning");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      type: "cleaning",
      property: "Beach Villa",
      priority: "high",
      dueDate: "Today, 2:00 PM",
      assigned: "Maria Garcia",
      status: "pending",
    },
    {
      id: 2,
      type: "maintenance",
      property: "Downtown Apartment",
      priority: "medium",
      dueDate: "Tomorrow, 10:00 AM",
      assigned: "Robert Johnson",
      status: "completed",
      description: "Fix leaking faucet in bathroom"
    },
    {
      id: 3,
      type: "cleaning",
      property: "Mountain Cabin",
      priority: "high",
      dueDate: "Today, 5:00 PM",
      assigned: "Unassigned",
      status: "pending",
    },
    {
      id: 4,
      type: "maintenance",
      property: "Beach Villa",
      priority: "low",
      dueDate: "Oct 25, 2023, 4:00 PM",
      assigned: "John Smith",
      status: "in-progress",
      description: "Replace light bulbs in living room"
    },
  ]);

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task Updated",
      description: `Task status has been updated to ${newStatus}`,
    });
  };

  const handleAssignTask = (id: number, staff: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, assigned: staff } : task
    ));
    
    toast({
      title: "Task Assigned",
      description: `Task has been assigned to ${staff}`,
    });
  };

  const handleCreateTask = (type: string) => {
    toast({
      title: "Task Created",
      description: `New ${type} task has been created and assigned`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 pb-20 md:pb-6">
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
                <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="staff">Staff Management</TabsTrigger>
                <TabsTrigger value="reports">Performance Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="cleaning" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Cleaning Schedule</h2>
                  <Button onClick={() => handleCreateTask("cleaning")}>
                    Schedule Cleaning
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Upcoming Cleanings</CardTitle>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm border-b">
                            <th className="py-3 px-4 font-medium">Property</th>
                            <th className="py-3 px-4 font-medium">Priority</th>
                            <th className="py-3 px-4 font-medium">Due Date</th>
                            <th className="py-3 px-4 font-medium">Assigned To</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.filter(task => task.type === "cleaning").map((task) => (
                            <tr key={task.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">{task.property}</td>
                              <td className="py-3 px-4">
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{task.dueDate}</td>
                              <td className="py-3 px-4">
                                {task.assigned === "Unassigned" ? (
                                  <Select onValueChange={(value) => handleAssignTask(task.id, value)}>
                                    <SelectTrigger className="w-[140px]">
                                      <SelectValue placeholder="Assign" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Maria Garcia">Maria Garcia</SelectItem>
                                      <SelectItem value="John Smith">John Smith</SelectItem>
                                      <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback>{task.assigned.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <span>{task.assigned}</span>
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <Select 
                                  value={task.status}
                                  onValueChange={(value) => handleUpdateStatus(task.id, value)}
                                >
                                  <SelectTrigger className="w-[130px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-3 px-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Task Details",
                                      description: `Viewing details for cleaning at ${task.property}`,
                                    });
                                  }}
                                >
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cleaning Preferences</CardTitle>
                    <CardDescription>Customize how the AI schedules cleaning tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-schedule" defaultChecked />
                        <Label htmlFor="auto-schedule">Automatically schedule cleaning after check-out</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="deep-cleaning" />
                        <Label htmlFor="deep-cleaning">Schedule deep cleaning every 5 bookings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-guests" defaultChecked />
                        <Label htmlFor="notify-guests">Notify guests when cleaning is completed</Label>
                      </div>
                      
                      <div className="pt-4">
                        <Button onClick={() => {
                          toast({
                            title: "Preferences Saved",
                            description: "Your cleaning preferences have been updated",
                          });
                        }}>
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Maintenance Tasks</h2>
                  <Button onClick={() => handleCreateTask("maintenance")}>
                    Create Maintenance Task
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Active Maintenance Tasks</CardTitle>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm border-b">
                            <th className="py-3 px-4 font-medium">Property</th>
                            <th className="py-3 px-4 font-medium">Issue</th>
                            <th className="py-3 px-4 font-medium">Priority</th>
                            <th className="py-3 px-4 font-medium">Due Date</th>
                            <th className="py-3 px-4 font-medium">Assigned To</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.filter(task => task.type === "maintenance").map((task) => (
                            <tr key={task.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">{task.property}</td>
                              <td className="py-3 px-4">{task.description}</td>
                              <td className="py-3 px-4">
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{task.dueDate}</td>
                              <td className="py-3 px-4">
                                {task.assigned === "Unassigned" ? (
                                  <Select onValueChange={(value) => handleAssignTask(task.id, value)}>
                                    <SelectTrigger className="w-[140px]">
                                      <SelectValue placeholder="Assign" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="John Smith">John Smith</SelectItem>
                                      <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                                      <SelectItem value="External Vendor">External Vendor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback>{task.assigned.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <span>{task.assigned}</span>
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <Select 
                                  value={task.status}
                                  onValueChange={(value) => handleUpdateStatus(task.id, value)}
                                >
                                  <SelectTrigger className="w-[130px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-3 px-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Task Details",
                                      description: `Viewing details for maintenance at ${task.property}`,
                                    });
                                  }}
                                >
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Management</CardTitle>
                    <CardDescription>Manage your maintenance vendors and service providers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Elite Plumbing Services</h3>
                            <Badge>Active</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Plumbing & Water Systems</p>
                          <div className="flex justify-between items-center mt-4">
                            <Button variant="outline" size="sm">Contact</Button>
                            <Button variant="ghost" size="sm">View Contract</Button>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Speedy HVAC Solutions</h3>
                            <Badge>Active</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Air Conditioning & Heating</p>
                          <div className="flex justify-between items-center mt-4">
                            <Button variant="outline" size="sm">Contact</Button>
                            <Button variant="ghost" size="sm">View Contract</Button>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => {
                        toast({
                          title: "Add Vendor",
                          description: "New vendor added to your contact list",
                        });
                      }}>
                        Add New Vendor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="staff" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Staff Management</h2>
                  <Button onClick={() => {
                    toast({
                      title: "Add Staff",
                      description: "New staff member added to your team",
                    });
                  }}>
                    Add New Staff
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Team</CardTitle>
                    <CardDescription>Manage your cleaning and maintenance staff</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: "Maria Garcia", role: "Cleaning Staff", availability: "Full-time", properties: ["Beach Villa", "Downtown Apartment"] },
                        { name: "John Smith", role: "Maintenance", availability: "Part-time", properties: ["Mountain Cabin"] },
                        { name: "Robert Johnson", role: "Cleaning & Maintenance", availability: "On-call", properties: ["Downtown Apartment", "Beach Villa", "Mountain Cabin"] },
                      ].map((staff, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{staff.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{staff.name}</h3>
                              <p className="text-sm text-muted-foreground">{staff.role}</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Availability:</span>
                              <span>{staff.availability}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Properties:</span>
                              <span>{staff.properties.length}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="w-full">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Staff Scheduling</CardTitle>
                    <CardDescription>AI-powered staff scheduling based on your property needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-assign" defaultChecked />
                        <Label htmlFor="auto-assign">Automatically assign staff based on location proximity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="staff-notify" defaultChecked />
                        <Label htmlFor="staff-notify">Notify staff about new tasks via SMS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="workload-balance" defaultChecked />
                        <Label htmlFor="workload-balance">Balance workload across team members</Label>
                      </div>
                      <div className="pt-4">
                        <Button onClick={() => {
                          toast({
                            title: "Settings Saved",
                            description: "Staff scheduling preferences have been updated",
                          });
                        }}>
                          Save Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operations Performance</CardTitle>
                    <CardDescription>Key metrics for your property operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded mr-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Task Completion Rate</p>
                            <h3 className="text-2xl font-semibold">94.3%</h3>
                            <p className="text-xs text-green-600">+2.5% from last month</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded mr-4">
                            <Clock className="h-8 w-8 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Average Response Time</p>
                            <h3 className="text-2xl font-semibold">1.8 hrs</h3>
                            <p className="text-xs text-green-600">-0.4 hrs from last month</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded mr-4">
                            <AlertCircle className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Issue Resolution Rate</p>
                            <h3 className="text-2xl font-semibold">98.7%</h3>
                            <p className="text-xs text-green-600">+1.2% from last month</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
                      <div className="h-[300px] bg-slate-50 flex items-center justify-center border rounded-lg">
                        <div className="text-center">
                          <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Task distribution chart visualization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Staff Performance</CardTitle>
                    <CardDescription>Individual performance metrics for your team members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm border-b">
                            <th className="py-3 px-4 font-medium">Staff Member</th>
                            <th className="py-3 px-4 font-medium">Tasks Completed</th>
                            <th className="py-3 px-4 font-medium">Avg. Completion Time</th>
                            <th className="py-3 px-4 font-medium">Guest Rating</th>
                            <th className="py-3 px-4 font-medium">Properties Managed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>MG</AvatarFallback>
                                </Avatar>
                                <span>Maria Garcia</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">42</td>
                            <td className="py-3 px-4">1.2 hours</td>
                            <td className="py-3 px-4">4.9 / 5</td>
                            <td className="py-3 px-4">2</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <span>John Smith</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">28</td>
                            <td className="py-3 px-4">2.5 hours</td>
                            <td className="py-3 px-4">4.7 / 5</td>
                            <td className="py-3 px-4">1</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>RJ</AvatarFallback>
                                </Avatar>
                                <span>Robert Johnson</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">36</td>
                            <td className="py-3 px-4">1.8 hours</td>
                            <td className="py-3 px-4">4.8 / 5</td>
                            <td className="py-3 px-4">3</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Operations;
