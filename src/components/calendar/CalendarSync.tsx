
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { IntegrationPlaceholder } from '@/components/ui/integration-placeholder';

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

      <IntegrationPlaceholder
        title="Connect Calendar"
        description="Connect your booking calendars to avoid double bookings and keep everything in sync."
        icon={<Calendar className="h-8 w-8" />}
        integrations={[
          { name: 'Google Calendar', connected: true },
          { name: 'Airbnb', connected: false },
          { name: 'Booking.com', connected: false },
          { name: 'Vrbo/HomeAway', connected: false },
          { name: 'iCal Import', connected: true },
        ]}
      />
    </div>
  );
}
