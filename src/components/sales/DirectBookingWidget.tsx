
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Instagram, Facebook, Sparkles, Calendar, CheckCircle } from "lucide-react";

const DirectBookingWidget = () => {
  const { toast } = useToast();
  const [enabledChannels, setEnabledChannels] = useState({
    instagram: true,
    facebook: true,
    whatsapp: false,
  });
  
  const [recentInquiries, setRecentInquiries] = useState([
    { 
      id: 1, 
      guest: "Michael Smith", 
      platform: "instagram", 
      property: "Beach House", 
      dates: "Jul 15-20",
      status: "pending",
      time: "2h ago"
    },
    { 
      id: 2, 
      guest: "Sarah Johnson", 
      platform: "facebook", 
      property: "Mountain Cabin", 
      dates: "Jun 10-12",
      status: "confirmed",
      time: "Yesterday"
    },
  ]);
  
  const handleToggleChannel = (channel: keyof typeof enabledChannels) => {
    setEnabledChannels({
      ...enabledChannels,
      [channel]: !enabledChannels[channel]
    });
    
    toast({
      title: enabledChannels[channel] ? `${channel} Disabled` : `${channel} Enabled`,
      description: enabledChannels[channel] 
        ? `Direct booking via ${channel} is now disabled` 
        : `Direct booking via ${channel} is now enabled`
    });
  };
  
  const handleAcceptBooking = (id: number) => {
    setRecentInquiries(recentInquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: "confirmed" } : inquiry
    ));
    
    toast({
      title: "Booking Confirmed",
      description: "The booking has been confirmed and the guest has been notified",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
          <h3 className="text-sm font-medium">Direct Booking via Social</h3>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Instagram className="h-4 w-4 text-pink-500" />
            <span className="text-sm">Instagram DM</span>
          </div>
          <Switch 
            checked={enabledChannels.instagram}
            onCheckedChange={() => handleToggleChannel('instagram')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Facebook className="h-4 w-4 text-blue-600" />
            <span className="text-sm">Facebook Messenger</span>
          </div>
          <Switch 
            checked={enabledChannels.facebook}
            onCheckedChange={() => handleToggleChannel('facebook')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-green-500" />
            <span className="text-sm">WhatsApp</span>
            <Badge variant="outline" className="text-xs ml-1">Coming Soon</Badge>
          </div>
          <Switch 
            checked={enabledChannels.whatsapp}
            onCheckedChange={() => handleToggleChannel('whatsapp')}
            disabled
          />
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        <h4 className="text-xs text-muted-foreground font-medium">Recent Booking Inquiries</h4>
        
        {recentInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{inquiry.guest}</p>
                    <Badge variant="outline" className={`text-xs ml-2 ${
                      inquiry.platform === 'instagram' ? 'bg-pink-50 text-pink-700' : 
                      inquiry.platform === 'facebook' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {inquiry.platform.charAt(0).toUpperCase() + inquiry.platform.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1 gap-1">
                    <span className="text-xs text-muted-foreground">{inquiry.property}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-xs">{inquiry.dates}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">{inquiry.time}</span>
                  {inquiry.status === "pending" ? (
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptBooking(inquiry.id)}
                      className="mt-1 h-7 text-xs"
                    >
                      Accept
                    </Button>
                  ) : (
                    <Badge className="bg-green-100 text-green-800 border-0 mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        View All Booking Inquiries
      </Button>
    </div>
  );
};

export default DirectBookingWidget;
