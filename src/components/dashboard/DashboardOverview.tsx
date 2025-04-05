import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageSquare, 
  Building2, 
  Users, 
  DollarSign, 
  Settings,
  Bell,
  ClipboardList
} from 'lucide-react';
import { useFeatureIntegration } from '@/hooks/useFeatureIntegration';
import { useBookings } from '@/hooks/useBookings';

export function DashboardOverview() {
  const { notifications, tasks } = useFeatureIntegration();
  const { stats } = useBookings();

  const quickActions = [
    {
      title: 'New Booking',
      icon: Calendar,
      href: '/bookings/new'
    },
    {
      title: 'Guest Message',
      icon: MessageSquare,
      href: '/communications'
    },
    {
      title: 'Add Property',
      icon: Building2,
      href: '/properties/new'
    },
    {
      title: 'Staff Management',
      icon: Users,
      href: '/staff'
    }
  ];

  const recentTasks = tasks.slice(0, 5);
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span>{notifications.length} notifications</span>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(action => (
          <Card key={action.title} className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <action.icon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">Quick action</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <ClipboardList className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map(notification => (
                <div key={notification.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{stats?.occupancyRate || 0}%</div>
              <div className="text-sm text-muted-foreground">Occupancy Rate</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">${stats?.monthlyRevenue || 0}</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{stats?.averageRating || 0}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 