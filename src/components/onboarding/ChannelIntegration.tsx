import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Check, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { useChannelIntegration } from "@/hooks/useChannelIntegration";
import { Channel, ChannelType } from "@/services/channelIntegrationService";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const ChannelIntegration = () => {
  const {
    channels,
    isLoading,
    error,
    connectChannel,
    disconnectChannel,
    syncChannel,
    getChannelSettings,
    refreshChannels
  } = useChannelIntegration();

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [channelSettings, setChannelSettings] = useState<Record<string, any> | null>(null);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  // Handle channel connection
  const handleConnectChannel = async (channelId: string) => {
    try {
      const response = await connectChannel(channelId as ChannelType);
      
      if (response.success) {
        toast({
          title: "Channel connected",
          description: `Successfully connected to ${channelId}. ${response.properties} properties found.`,
        });
      } else {
        toast({
          title: "Connection failed",
          description: response.error || "Failed to connect to channel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(`Error connecting to ${channelId}:`, err);
      toast({
        title: "Connection error",
        description: "An unexpected error occurred during connection.",
        variant: "destructive",
      });
    }
  };

  // Handle channel disconnection
  const handleDisconnectChannel = async (channelId: string) => {
    try {
      const response = await disconnectChannel(channelId as ChannelType);
      
      if (response.success) {
        toast({
          title: "Channel disconnected",
          description: `Successfully disconnected from ${channelId}.`,
        });
      } else {
        toast({
          title: "Disconnection failed",
          description: response.error || "Failed to disconnect from channel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(`Error disconnecting from ${channelId}:`, err);
      toast({
        title: "Disconnection error",
        description: "An unexpected error occurred during disconnection.",
        variant: "destructive",
      });
    }
  };

  // Handle manual sync of a channel
  const handleSyncChannel = async (channelId: string) => {
    if (!channels.find(c => c.id === channelId)?.connected) return;
    
    setIsSyncing(channelId);
    try {
      const response = await syncChannel(channelId as ChannelType);
      
      if (response.success) {
        toast({
          title: "Channel synced",
          description: `Successfully synced ${response.properties} properties from ${channelId}.`,
        });
      } else {
        toast({
          title: "Sync failed",
          description: response.error || "Failed to sync with channel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(`Error syncing with ${channelId}:`, err);
      toast({
        title: "Sync error",
        description: "An unexpected error occurred during sync.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(null);
    }
  };

  // Open channel settings dialog
  const handleViewSettings = async (channel: Channel) => {
    setSelectedChannel(channel);
    
    if (channel.connected) {
      try {
        const settings = await getChannelSettings(channel.id as ChannelType);
        setChannelSettings(settings);
        setIsSettingsOpen(true);
      } catch (err) {
        console.error(`Error fetching settings for ${channel.id}:`, err);
        toast({
          title: "Error loading settings",
          description: "Could not load channel settings. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // If not connected, show info about the channel
      window.open(`https://example.com/learn/${channel.id}`, '_blank');
    }
  };

  // Status badge for each channel
  const ChannelStatusBadge = ({ status }: { status: Channel['status'] }) => {
    switch (status) {
      case 'connected':
        return (
          <Badge variant="success">
            <Check className="h-3 w-3 mr-1" /> Connected
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> Connecting...
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" /> Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            Not Connected
          </Badge>
        );
    }
  };

  // If there's an error loading channels
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <h3 className="text-xl font-semibold">Failed to load channels</h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't load your available channels. Please try again or contact support if the problem persists.
        </p>
        <Button onClick={() => refreshChannels()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Connect Your Channels</h2>
        <p className="text-muted-foreground">
          Integrate all your booking channels to enable seamless property syncing, 
          unified messaging, and cross-platform automation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          // Loading skeletons
          Array(6).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Skeleton className="h-4 w-24" />
              </CardFooter>
            </Card>
          ))
        ) : (
          // Actual channel cards
          channels.map(channel => (
            <Card key={channel.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{channel.icon}</span>
                    <CardTitle>{channel.name}</CardTitle>
                  </div>
                  <ChannelStatusBadge status={channel.status} />
                </div>
                <CardDescription>
                  {channel.connected 
                    ? `${channel.properties} properties synchronized` 
                    : `Connect to sync your ${channel.name} listings`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {channel.connected 
                      ? 'Syncing active' 
                      : 'Enable two-way synchronization'}
                  </span>
                  <div className="flex items-center space-x-2">
                    {channel.connected && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={channel.status === 'pending' || isSyncing === channel.id}
                              onClick={() => handleSyncChannel(channel.id)}
                            >
                              <RefreshCw 
                                className={`h-4 w-4 ${isSyncing === channel.id ? 'animate-spin' : ''}`} 
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sync {channel.name} properties</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <Switch 
                      checked={channel.connected} 
                      disabled={channel.status === 'pending'}
                      onCheckedChange={() => 
                        channel.connected 
                          ? handleDisconnectChannel(channel.id) 
                          : handleConnectChannel(channel.id)
                      } 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="link" 
                  className="px-0" 
                  disabled={channel.status === 'pending'}
                  onClick={() => handleViewSettings(channel)}
                >
                  {channel.connected ? 'View settings' : 'Learn more'} <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Channel Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedChannel && (
                <div className="flex items-center space-x-2">
                  <span>{selectedChannel.icon}</span>
                  <span>{selectedChannel.name} Settings</span>
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              Configure synchronization settings for this channel.
            </DialogDescription>
          </DialogHeader>
          
          {channelSettings && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sync interval</p>
                  <p className="text-sm text-muted-foreground">
                    {channelSettings.syncInterval}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Last synced</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(channelSettings.lastSyncDate).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Calendar sync</p>
                  <p className="text-sm text-muted-foreground">
                    {channelSettings.syncCalendars ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Price sync</p>
                  <p className="text-sm text-muted-foreground">
                    {channelSettings.syncPricing ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <h4 className="text-sm font-medium mb-2">Properties connected</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedChannel?.properties} properties are currently synchronized with this channel.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(`https://example.com/channel-help/${selectedChannel?.id}`, '_blank')}
            >
              View documentation
            </Button>
            <Button
              onClick={() => setIsSettingsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChannelIntegration;