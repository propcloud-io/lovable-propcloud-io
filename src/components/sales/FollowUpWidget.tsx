
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  CheckCircle,
  RefreshCw,
  Clock,
  Calendar,
  ArrowRight,
  Star,
  Heart
} from 'lucide-react';

const followUpData = [
  {
    id: 1,
    type: "post-stay",
    name: "Review Request",
    status: "active", 
    trigger: "3 days after checkout",
    lastSent: "Today, 8:32 AM",
    count: 5
  },
  {
    id: 2,
    type: "anniversary",
    name: "Booking Anniversary",
    status: "active",
    trigger: "1 year after booking date",
    lastSent: "Yesterday, 9:15 AM",
    count: 3
  },
  {
    id: 3,
    type: "seasonal",
    name: "Summer Special",
    status: "scheduled",
    trigger: "June 1, 2023",
    count: 0
  },
  {
    id: 4,
    type: "abandoned", 
    name: "Abandoned Booking",
    status: "active",
    trigger: "4 hours after cart abandonment",
    lastSent: "May 29, 2023",
    count: 12
  },
];

const FollowUpWidget = () => {
  const { toast } = useToast();
  const [activeType, setActiveType] = useState<string>("all");
  
  const handleToggleStatus = (id: number, checked: boolean) => {
    toast({
      title: checked ? "Follow-up Activated" : "Follow-up Paused",
      description: `${followUpData.find(f => f.id === id)?.name} has been ${checked ? 'activated' : 'paused'}`
    });
  };
  
  const filteredItems = activeType === "all" 
    ? followUpData 
    : followUpData.filter(item => item.type === activeType);
    
  return (
    <div className="space-y-4">
      <Tabs defaultValue="automated">
        <div className="flex items-center justify-between mb-3">
          <TabsList>
            <TabsTrigger value="automated">Automated</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <Button size="sm">
            <RefreshCw className="h-3 w-3 mr-2" />
            Refresh
          </Button>
        </div>
        
        <TabsContent value="automated">
          <div className="mb-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              <Badge 
                variant={activeType === "all" ? "default" : "outline"} 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveType("all")}
              >
                All
              </Badge>
              <Badge 
                variant={activeType === "post-stay" ? "default" : "outline"} 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveType("post-stay")}
              >
                <Star className="h-3 w-3 mr-1" /> Post-Stay
              </Badge>
              <Badge 
                variant={activeType === "anniversary" ? "default" : "outline"} 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveType("anniversary")}
              >
                <Calendar className="h-3 w-3 mr-1" /> Anniversary
              </Badge>
              <Badge 
                variant={activeType === "abandoned" ? "default" : "outline"} 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveType("abandoned")}
              >
                <Heart className="h-3 w-3 mr-1" /> Recovery
              </Badge>
              <Badge 
                variant={activeType === "seasonal" ? "default" : "outline"} 
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setActiveType("seasonal")}
              >
                <Calendar className="h-3 w-3 mr-1" /> Seasonal
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center 
                        ${item.type === 'post-stay' ? 'bg-yellow-100 text-yellow-600' : 
                          item.type === 'anniversary' ? 'bg-blue-100 text-blue-600' :
                          item.type === 'seasonal' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'}`}
                      >
                        {item.type === 'post-stay' ? <Star className="h-4 w-4" /> :
                         item.type === 'anniversary' ? <Calendar className="h-4 w-4" /> :
                         item.type === 'seasonal' ? <Mail className="h-4 w-4" /> :
                         <Heart className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.trigger}
                          </span>
                          {item.count > 0 && (
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {item.count} sent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Switch 
                        id={`switch-${item.id}`}
                        defaultChecked={item.status === "active"}
                        onCheckedChange={(checked) => handleToggleStatus(item.id, checked)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="pt-3 flex justify-end">
            <Button>
              Create New Follow-up <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="manual">
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <h3 className="font-medium">Manual Follow-ups</h3>
            <p className="text-sm mb-4">
              Send personalized follow-ups to guests who need special attention.
            </p>
            <Button>Create Manual Follow-up</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowUpWidget;
