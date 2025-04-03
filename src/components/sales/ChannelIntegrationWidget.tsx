
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Instagram, 
  MessageSquare, 
  Globe, 
  RefreshCw 
} from "lucide-react";

// Channel types with their statuses
const channels = [
  { 
    id: "airbnb", 
    name: "Airbnb", 
    icon: <Globe className="h-5 w-5" />, 
    color: "bg-red-100 text-red-600 border-red-200",
    status: "connected",
    lastSync: "Today at 9:30 AM"
  },
  { 
    id: "booking", 
    name: "Booking.com", 
    icon: <Globe className="h-5 w-5" />, 
    color: "bg-blue-100 text-blue-600 border-blue-200",
    status: "connected",
    lastSync: "Today at 9:30 AM" 
  },
  { 
    id: "vrbo", 
    name: "VRBO", 
    icon: <Globe className="h-5 w-5" />,
    color: "bg-green-100 text-green-600 border-green-200", 
    status: "disconnected" 
  },
  { 
    id: "direct", 
    name: "Direct Website", 
    icon: <Globe className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600 border-purple-200", 
    status: "setup_required" 
  },
  { 
    id: "instagram", 
    name: "Instagram", 
    icon: <Instagram className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-600 border-pink-200", 
    status: "connected",
    lastSync: "Today at 10:15 AM"
  },
  { 
    id: "facebook", 
    name: "Facebook", 
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-indigo-100 text-indigo-600 border-indigo-200", 
    status: "connected",
    lastSync: "Today at 10:15 AM" 
  },
];

const ChannelIntegrationWidget = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleConnect = (channelId: string) => {
    toast({
      title: "Channel Connection",
      description: `Opening connection flow for ${channelId}...`,
    });
  };
  
  const handleRefreshAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Channels Refreshed",
        description: "All channel data has been synchronized",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Connected Platforms</h3>
        <Button 
          variant="outline" 
          size="sm"
          disabled={isRefreshing}
          onClick={handleRefreshAll}
          className="text-xs"
        >
          <RefreshCw className={`h-3 w-3 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Sync All
        </Button>
      </div>
      
      <div className="space-y-3">
        {channels.map((channel) => (
          <Card key={channel.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${channel.color}`}>
                    {channel.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{channel.name}</p>
                    {channel.status === "connected" && channel.lastSync && (
                      <p className="text-xs text-muted-foreground">Last synced: {channel.lastSync}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {channel.status === "connected" ? (
                    <>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" /> Connected
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </>
                  ) : channel.status === "setup_required" ? (
                    <Button size="sm" variant="outline" onClick={() => handleConnect(channel.id)}>
                      Setup <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleConnect(channel.id)}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button className="w-full" variant="outline">
        Add New Channel
      </Button>
    </div>
  );
};

export default ChannelIntegrationWidget;
