
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Clock, Wrench, Home, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

// Types for our tasks
type TaskStatus = "pending" | "in-progress" | "completed";
type TaskPriority = "high" | "medium" | "low";
type TaskType = "cleaning" | "maintenance" | "inspection";

interface Task {
  id: number;
  type: TaskType;
  property: string;
  priority: TaskPriority;
  dueDate: string;
  dueTime?: string;
  assigned: string;
  status: TaskStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const TaskDashboard = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      type: "cleaning",
      property: "Beach Villa",
      priority: "high",
      dueDate: "Today",
      dueTime: "2:00 PM",
      assigned: "Maria Garcia",
      status: "pending",
      createdAt: "2025-04-03T08:00:00",
      updatedAt: "2025-04-03T08:00:00",
    },
    {
      id: 2,
      type: "maintenance",
      property: "Downtown Apartment",
      priority: "medium",
      dueDate: "Tomorrow",
      dueTime: "10:00 AM",
      assigned: "Robert Johnson",
      status: "in-progress",
      description: "Fix leaking faucet in bathroom",
      createdAt: "2025-04-03T09:15:00",
      updatedAt: "2025-04-03T14:30:00",
    },
    {
      id: 3,
      type: "cleaning",
      property: "Mountain Cabin",
      priority: "high",
      dueDate: "Today",
      dueTime: "5:00 PM",
      assigned: "Unassigned",
      status: "pending",
      createdAt: "2025-04-03T10:45:00",
      updatedAt: "2025-04-03T10:45:00",
    },
    {
      id: 4,
      type: "maintenance",
      property: "Beach Villa",
      priority: "low",
      dueDate: "Apr 7, 2025",
      dueTime: "4:00 PM",
      assigned: "John Smith",
      status: "completed",
      description: "Replace light bulbs in living room",
      createdAt: "2025-04-02T16:20:00",
      updatedAt: "2025-04-03T11:15:00",
    },
    {
      id: 5,
      type: "inspection",
      property: "Downtown Apartment",
      priority: "medium",
      dueDate: "Apr 8, 2025",
      dueTime: "1:00 PM",
      assigned: "Maria Garcia",
      status: "pending",
      description: "Quarterly inspection",
      createdAt: "2025-04-03T13:10:00",
      updatedAt: "2025-04-03T13:10:00",
    },
  ]);
  
  const [activeTab, setActiveTab] = useState<TaskType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Get tasks count for dashboard stats
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  
  // Filter tasks based on active filters
  const filteredTasks = tasks.filter(task => {
    // Filter by task type
    if (activeTab !== "all" && task.type !== activeTab) return false;
    
    // Filter by status
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    
    // Filter by priority
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
    
    return true;
  });
  
  const handleUpdateStatus = (id: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        status: newStatus,
        updatedAt: new Date().toISOString()
      } : task
    ));
    
    toast({
      title: "Task Updated",
      description: `Task status has been changed to ${newStatus}`,
    });
  };
  
  const handleAssignTask = (id: number, staff: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        assigned: staff,
        updatedAt: new Date().toISOString()
      } : task
    ));
    
    toast({
      title: "Task Assigned",
      description: `Task has been assigned to ${staff}`,
    });
  };
  
  const handleRefreshTasks = () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      // Simulate a new task being added
      if (Math.random() > 0.5) {
        const newTask: Task = {
          id: tasks.length + 1,
          type: Math.random() > 0.5 ? "cleaning" : "maintenance",
          property: Math.random() > 0.5 ? "Beach Villa" : "Mountain Cabin",
          priority: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
          dueDate: "Today",
          dueTime: "4:30 PM",
          assigned: "Unassigned",
          status: "pending",
          description: Math.random() > 0.5 ? "Regular maintenance check" : undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setTasks(prev => [...prev, newTask]);
        
        toast({
          title: "New Task Added",
          description: `A new ${newTask.type} task has been automatically scheduled`,
        });
      }
      
      setIsRefreshing(false);
    }, 1500);
  };
  
  // Get priority badge styling
  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "low":
        return "bg-green-100 text-green-700";
    }
  };
  
  // Get status badge styling
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Live Task Dashboard</CardTitle>
            <CardDescription>Real-time view of all property operations tasks</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshTasks}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            <Button size="sm">Create Task</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold">{pendingTasks}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <h3 className="text-2xl font-bold">{inProgressTasks}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{completedTasks}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Task Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TaskType | "all")} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-1 gap-2 flex-wrap">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TaskStatus | "all")}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as TaskPriority | "all")}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
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
        
        {/* Task List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm border-b">
                <th className="py-3 px-4 font-medium">Task</th>
                <th className="py-3 px-4 font-medium">Property</th>
                <th className="py-3 px-4 font-medium">Priority</th>
                <th className="py-3 px-4 font-medium">Due</th>
                <th className="py-3 px-4 font-medium">Assigned To</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No tasks found. Adjust your filters to see more tasks.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {task.type === "cleaning" && <CalendarCheck className="h-4 w-4 text-blue-500" />}
                        {task.type === "maintenance" && <Wrench className="h-4 w-4 text-amber-500" />}
                        {task.type === "inspection" && <AlertCircle className="h-4 w-4 text-purple-500" />}
                        <span className="capitalize">{task.type}</span>
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-slate-400" />
                        {task.property}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityBadge(task.priority)}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{task.dueDate}</div>
                        {task.dueTime && <div className="text-xs text-muted-foreground">{task.dueTime}</div>}
                      </div>
                    </td>
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
                        onValueChange={(value) => handleUpdateStatus(task.id, value as TaskStatus)}
                      >
                        <SelectTrigger className={`w-[130px] ${getStatusBadge(task.status)}`}>
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
                            description: `Viewing details for ${task.type} at ${task.property}`,
                          });
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskDashboard;
