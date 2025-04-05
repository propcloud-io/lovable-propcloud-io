import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, RefreshCw, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { IntegrationPlaceholder } from '@/components/ui/integration-placeholder';
import { useCalendar } from '@/hooks/useCalendar';

export function CalendarSync() {
  const {
    calendars,
    isLoading,
    error,
    syncCalendar,
    connectCalendar
  } = useCalendar();

  const handleSync = async (calendarId: string) => {
    try {
      await syncCalendar(calendarId);
    } catch (error) {
      console.error('Failed to sync calendar:', error);
    }
  };

  const handleConnect = async (type: 'google' | 'outlook' | 'apple') => {
    try {
      await connectCalendar(type);
    } catch (error) {
      console.error('Failed to connect calendar:', error);
    }
  };

  const renderStatusIcon = (status: 'connected' | 'disconnected' | 'error') => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="h-5 w-5" />
            <p>Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Sync
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calendars.map(calendar => (
              <div
                key={calendar.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {renderStatusIcon(calendar.status)}
                  <div>
                    <h3 className="font-medium">{calendar.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last synced: {new Date(calendar.lastSync).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSync(calendar.id)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <IntegrationPlaceholder
              title="Google Calendar"
              description="Sync your Google Calendar to manage bookings and events"
              onConnect={() => handleConnect('google')}
            />
            <IntegrationPlaceholder
              title="Outlook Calendar"
              description="Connect your Outlook Calendar for seamless event management"
              onConnect={() => handleConnect('outlook')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 