
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Channel = {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  status: "connected" | "disconnected" | "connecting" | "error";
};

const ChannelIntegration = () => {
  const { toast } = useToast();
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "airbnb",
      name: "Airbnb",
      logo: "https://cdn-icons-png.flaticon.com/512/2111/2111320.png",
      connected: true,
      status: "connected"
    },
    {
      id: "booking",
      name: "Booking.com",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968704.png",
      connected: true,
      status: "connected"
    },
    {
      id: "vrbo",
      name: "Vrbo",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968642.png",
      connected: false,
      status: "disconnected"
    },
    {
      id: "expedia",
      name: "Expedia",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
      connected: false,
      status: "disconnected"
    },
    {
      id: "direct",
      name: "Direct Website",
      logo: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
      connected: true,
      status: "connected"
    }
  ]);

  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleToggleChannel = (channelId: string) => {
    setIsLoading(channelId);
    
    // Simulate API call
    setTimeout(() => {
      setChannels(channels.map(channel => {
        if (channel.id === channelId) {
          const newConnected = !channel.connected;
          
          toast({
            title: `${channel.name} ${newConnected ? "connected" : "disconnected"}`,
            description: newConnected 
              ? "Channel integration established successfully" 
              : "Channel has been disconnected"
          });
          
          return {
            ...channel,
            connected: newConnected,
            status: newConnected ? "connected" : "disconnected"
          };
        }
        return channel;
      }));
      
      setIsLoading(null);
    }, 1500);
  };

  const handleRefreshConnection = (channelId: string) => {
    setIsLoading(channelId);
    
    // Simulate API call
    setTimeout(() => {
      setChannels(channels.map(channel => {
        if (channel.id === channelId) {
          toast({
            title: `${channel.name} connection refreshed`,
            description: "Integration status updated successfully"
          });
          
          return channel;
        }
        return channel;
      }));
      
      setIsLoading(null);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Channel Integrations</span>
          <Button size="sm" variant="outline">Add Channel</Button>
        </CardTitle>
        <CardDescription>
          Connect your property listings from various booking channels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {channels.map(channel => (
          <div key={channel.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                <img 
                  src={channel.logo} 
                  alt={channel.name} 
                  className="h-6 w-6 object-contain" 
                  onError={(e) => {
                    e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/1006/1006771.png";
                  }}
                />
              </div>
              <div>
                <div className="font-medium">{channel.name}</div>
                <div className="text-xs flex items-center gap-1">
                  {channel.status === "connected" && (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Connected</span>
                    </>
                  )}
                  {channel.status === "disconnected" && (
                    <>
                      <AlertCircle className="h-3 w-3 text-slate-400" />
                      <span className="text-slate-500">Disconnected</span>
                    </>
                  )}
                  {channel.status === "error" && (
                    <>
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <span className="text-red-600">Connection error</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {channel.connected && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8" 
                  onClick={() => handleRefreshConnection(channel.id)}
                  disabled={isLoading === channel.id}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading === channel.id ? "animate-spin" : ""}`} />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Switch 
                  id={`channel-${channel.id}`}
                  checked={channel.connected}
                  disabled={isLoading === channel.id}
                  onCheckedChange={() => handleToggleChannel(channel.id)}
                />
                <Label htmlFor={`channel-${channel.id}`} className="sr-only">
                  {channel.connected ? "Disconnect" : "Connect"} {channel.name}
                </Label>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChannelIntegration;
