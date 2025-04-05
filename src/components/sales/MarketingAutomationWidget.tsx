
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Calendar, 
  ChevronRight, 
  Megaphone, 
  DollarSign,
  BarChart
} from "lucide-react";

const MarketingAutomationWidget = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState("100");
  
  const campaigns = [
    { 
      id: 1, 
      name: "Summer Promotion", 
      status: "active", 
      platform: "Meta",
      budget: "$150",
      dates: "Jun 1 - Jul 15",
      performance: "+17%"
    },
    { 
      id: 2, 
      name: "Last Minute June Deals", 
      status: "scheduled", 
      platform: "Meta",
      budget: "$75",
      dates: "Jun 10 - Jun 20",
      performance: "N/A"
    },
  ];
  
  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "Your campaign has been created and is now in review",
    });
  };
  
  const handlePauseCampaign = (id: number) => {
    toast({
      title: "Campaign Paused",
      description: "The campaign has been paused and can be resumed at any time",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Marketing Automation</h3>
        <Button size="sm" variant="outline" className="h-7 px-2.5">
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          <span className="text-xs">Reports</span>
        </Button>
      </div>
      
      {/* Active Campaigns */}
      <div className="space-y-3">
        <h4 className="text-xs text-muted-foreground font-medium">Active Campaigns</h4>
        
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{campaign.name}</p>
                    <Badge variant={campaign.status === "active" ? "default" : "outline"} className="ml-2 text-xs">
                      {campaign.status === "active" ? "Active" : "Scheduled"}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">{campaign.platform}</span>
                    <span className="text-xs text-muted-foreground mx-1">•</span>
                    <span className="text-xs text-muted-foreground">{campaign.budget}</span>
                    <span className="text-xs text-muted-foreground mx-1">•</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-xs">{campaign.dates}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {campaign.status === "active" && campaign.performance !== "N/A" && (
                    <Badge className="bg-green-100 text-green-800 border-0 mr-3">
                      <TrendingUp className="h-3 w-3 mr-1" /> {campaign.performance}
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => campaign.status === "active" ? handlePauseCampaign(campaign.id) : null}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Campaign Creator */}
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium mb-3">Create Quick Campaign</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Daily Budget</label>
                <div className="relative">
                  <DollarSign className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Days</label>
                <Input defaultValue="15" />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="outline" className="flex-1" size="sm">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Audience</span>
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Target className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Targeting</span>
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <BarChart className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Analytics</span>
              </Button>
            </div>
            
            <Button className="w-full" onClick={handleCreateCampaign} size="sm">
              <Megaphone className="h-3.5 w-3.5 mr-1.5" />
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAutomationWidget;
