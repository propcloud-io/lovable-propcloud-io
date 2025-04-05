
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  CreditCard,
  MessageCircle,
  Star
} from "lucide-react";

const FollowUpWidget = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("followups");
  
  const followUps = [
    { 
      id: 1, 
      type: "abandoned", 
      guest: "Emma Wilson", 
      property: "Lake View Apartment",
      status: "pending",
      scheduledFor: "Today, 3:00 PM",
      message: "We noticed you didn't complete your booking. Need any help?"
    },
    { 
      id: 2, 
      type: "checkout", 
      guest: "David Brown", 
      property: "Mountain Cabin",
      status: "sent",
      sentAt: "Yesterday, 10:15 AM",
      message: "How was your stay? We'd love to hear your feedback!"
    },
  ];
  
  const upsells = [
    { 
      id: 1, 
      type: "early_checkin", 
      guest: "Michael Smith", 
      property: "Beach House",
      price: "$35",
      status: "pending",
      arrival: "Jun 15, 2023"
    },
    { 
      id: 2, 
      type: "airport_transfer", 
      guest: "Sarah Johnson", 
      property: "City Loft",
      price: "$65",
      status: "accepted",
      arrival: "Jul 3, 2023"
    },
  ];
  
  const automationToggles = [
    { id: "abandoned", label: "Abandoned Booking Reminders", enabled: true },
    { id: "pre_arrival", label: "Pre-arrival Information", enabled: true },
    { id: "review", label: "Review Requests", enabled: true },
    { id: "upsell", label: "Upsell Opportunities", enabled: true },
  ];
  
  const handleToggleAutomation = (id: string) => {
    const automation = automationToggles.find(a => a.id === id);
    if (automation) {
      automation.enabled = !automation.enabled;
      
      toast({
        title: automation.enabled ? `${automation.label} Enabled` : `${automation.label} Disabled`,
        description: automation.enabled 
          ? `Automatic messages will be sent for ${automation.label.toLowerCase()}` 
          : `${automation.label} messages will not be sent automatically`
      });
    }
  };
  
  const handleSendNow = (id: number) => {
    toast({
      title: "Message Sent",
      description: "The follow-up message has been sent",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
          <h3 className="text-sm font-medium">Follow-ups & Upsells</h3>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-3">
          <TabsTrigger value="followups">Follow-ups</TabsTrigger>
          <TabsTrigger value="upsells">Upsells</TabsTrigger>
        </TabsList>
        
        <TabsContent value="followups" className="mt-0 space-y-3">
          {followUps.map((followUp) => (
            <Card key={followUp.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{followUp.guest}</p>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {followUp.type === "abandoned" ? "Abandoned Booking" : "Post-Checkout"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{followUp.property}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">
                        {followUp.status === "pending" ? followUp.scheduledFor : followUp.sentAt}
                      </span>
                    </div>
                    <p className="text-xs italic mt-2 text-muted-foreground">{followUp.message}</p>
                  </div>
                  <div>
                    {followUp.status === "pending" ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSendNow(followUp.id)}
                        className="h-7 text-xs"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send Now
                      </Button>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 border-0">
                        Sent
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Automation toggles */}
          <Card>
            <CardContent className="p-3">
              <h4 className="text-xs font-medium mb-3">Automation Settings</h4>
              
              <div className="space-y-3">
                {automationToggles.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {automation.id === "abandoned" && <MessageCircle className="h-3.5 w-3.5 text-muted-foreground mr-2" />}
                      {automation.id === "pre_arrival" && <Clock className="h-3.5 w-3.5 text-muted-foreground mr-2" />}
                      {automation.id === "review" && <Star className="h-3.5 w-3.5 text-muted-foreground mr-2" />}
                      {automation.id === "upsell" && <CreditCard className="h-3.5 w-3.5 text-muted-foreground mr-2" />}
                      <span className="text-xs">{automation.label}</span>
                    </div>
                    <Switch 
                      checked={automation.enabled}
                      onCheckedChange={() => handleToggleAutomation(automation.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upsells" className="mt-0 space-y-3">
          {upsells.map((upsell) => (
            <Card key={upsell.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{upsell.guest}</p>
                      <Badge 
                        variant="outline" 
                        className={`ml-2 text-xs ${upsell.status === "accepted" ? "bg-green-100 text-green-800 border-green-200" : ""}`}
                      >
                        {upsell.status === "accepted" ? "Accepted" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{upsell.property}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">Arrival: {upsell.arrival}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {upsell.type === "early_checkin" ? "Early Check-in" : "Airport Transfer"}
                      </Badge>
                      <span className="text-sm font-bold ml-2">{upsell.price}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="outline" size="sm" className="w-full">
            <CreditCard className="h-3.5 w-3.5 mr-1.5" />
            Manage Upsell Offerings
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowUpWidget;
