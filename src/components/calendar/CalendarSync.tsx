
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, Clock, Calendar as CalendarIcon } from 'lucide-react';

export function CalendarSync() {
  const [syncing, setSyncing] = React.useState(false);
  const [lastSynced, setLastSynced] = React.useState<Date | null>(null);

  const handleSync = () => {
    setSyncing(true);
    // Simulate syncing process
    setTimeout(() => {
      setSyncing(false);
      setLastSynced(new Date());
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Calendar Sync</h3>
          {lastSynced && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last synced: {lastSynced.toLocaleString()}
            </p>
          )}
        </div>
        <Button 
          onClick={handleSync} 
          disabled={syncing}
        >
          {syncing ? (
            <>
              <span className="animate-spin mr-2">&#8635;</span>
              Syncing...
            </>
          ) : (
            <>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Sync Now
            </>
          )}
        </Button>
      </div>

      <Card className="border-dashed bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Connect Calendar</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Connect your booking calendars to avoid double bookings and keep everything in sync.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'Google Calendar', connected: true },
              { name: 'Airbnb', connected: false },
              { name: 'Booking.com', connected: false },
              { name: 'Vrbo/HomeAway', connected: false },
              { name: 'iCal Import', connected: true },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center gap-1 bg-background border px-3 py-1 rounded-full text-xs">
                {integration.name}
                {integration.connected && <CheckCircle2 className="h-3 w-3 text-green-500" />}
              </div>
            ))}
          </div>
          <Button variant="outline">
            Manage Calendar Connections
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
