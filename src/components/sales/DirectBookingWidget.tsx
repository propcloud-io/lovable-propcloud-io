
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  MessageSquare, 
  Instagram, 
  Facebook,
  Clock
} from "lucide-react";

const conversations = [
  {
    id: 1,
    platform: "Instagram",
    user: "traveler_jane",
    message: "Hi! Is your Beach Villa available next weekend? Looking for a place for 4 people.",
    time: "2 hours ago",
    status: "new"
  },
  {
    id: 2,
    platform: "Facebook",
    user: "john_smith",
    message: "What's the price for a 5-night stay at the Downtown Apartment in July?",
    time: "Yesterday",
    status: "responded"
  },
  {
    id: 3,
    platform: "Instagram",
    user: "vacation_planner22",
    message: "Do you have any special rates for long-term stays (3+ weeks)?",
    time: "2 days ago",
    status: "booked"
  }
];

const DirectBookingWidget = () => {
  const { toast } = useToast();
  
  const handleSwitchAutoResponder = (checked: boolean) => {
    toast({
      title: checked ? "AI Auto-Responder Activated" : "AI Auto-Responder Deactivated",
      description: checked 
        ? "The AI will now automatically respond to booking inquiries" 
        : "You will need to manually respond to booking inquiries"
    });
  };

  const handleViewConversation = (id: number) => {
    toast({
      title: "Opening Conversation",
      description: "Viewing conversation details"
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Social Booking Inquiries</h3>
        <div className="flex items-center space-x-2">
          <Switch id="ai-responder" onCheckedChange={handleSwitchAutoResponder} defaultChecked />
          <Label htmlFor="ai-responder" className="text-xs">AI Auto-Responder</Label>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg border border-green-100">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">AI Auto-Response Enabled</p>
            <p className="text-xs text-green-600">Responding within 2 minutes on average</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-green-200 text-green-700 bg-green-50 hover:bg-green-100">
          Configure
        </Button>
      </div>
      
      <div className="space-y-3">
        {conversations.map((convo) => (
          <Card key={convo.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${convo.platform === 'Instagram' 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-blue-100 text-blue-600'}`}
                  >
                    {convo.platform === 'Instagram' ? <Instagram className="h-4 w-4" /> : <Facebook className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{convo.user}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">{convo.message}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant={
                    convo.status === "new" ? "default" : 
                    convo.status === "responded" ? "outline" : "secondary"
                  } className="text-xs">
                    {convo.status === "new" ? "New" : 
                     convo.status === "responded" ? "Responded" : "Booked"}
                  </Badge>
                  <span className="text-xs flex items-center text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" /> {convo.time}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm">View All Inquiries</Button>
        <Button size="sm" onClick={() => {
          toast({
            title: "Setting Up Direct Booking",
            description: "Opening direct booking configuration"
          });
        }}>
          Configure Direct Booking <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default DirectBookingWidget;
