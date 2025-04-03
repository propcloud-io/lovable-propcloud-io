
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MessageSquare, 
  Instagram, 
  Target, 
  Users, 
  Calendar, 
  Clock, 
  BarChart 
} from "lucide-react";

const campaigns = [
  {
    id: "welcome",
    name: "Welcome Series",
    type: "email",
    status: "active",
    stats: { sent: 124, opened: 98, converted: 32 },
    nextRun: "Automatic"
  },
  {
    id: "review",
    name: "Review Request",
    type: "email",
    status: "active",
    stats: { sent: 86, opened: 64, converted: 27 },
    nextRun: "Automatic"
  },
  {
    id: "reactivation",
    name: "Return Guest Offer",
    type: "email",
    status: "scheduled",
    stats: { sent: 0, opened: 0, converted: 0 },
    nextRun: "Jun 15, 2023"
  },
  {
    id: "social_ad",
    name: "Summer Special",
    type: "ad",
    status: "active",
    stats: { impressions: 5840, clicks: 423, conversions: 18 },
    nextRun: "Running"
  }
];

const MarketingAutomationWidget = () => {
  const [activeView, setActiveView] = useState("all");
  const [activeTab, setActiveTab] = useState("campaigns");
  
  const filteredCampaigns = activeView === "all" 
    ? campaigns 
    : campaigns.filter(c => c.type === activeView);
    
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-3">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <Button size="sm">
            Create Campaign
          </Button>
        </div>
        
        <TabsContent value="campaigns" className="space-y-4">
          <ToggleGroup type="single" value={activeView} onValueChange={(val) => val && setActiveView(val)}>
            <ToggleGroupItem value="all" aria-label="All campaigns">All</ToggleGroupItem>
            <ToggleGroupItem value="email" aria-label="Email campaigns">Email</ToggleGroupItem>
            <ToggleGroupItem value="ad" aria-label="Ad campaigns">Ads</ToggleGroupItem>
          </ToggleGroup>
          
          <div className="space-y-3">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center 
                        ${campaign.type === 'email' 
                          ? 'bg-blue-100 text-blue-600 border-blue-200' 
                          : 'bg-purple-100 text-purple-600 border-purple-200'}`}
                      >
                        {campaign.type === 'email' ? <Mail className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{campaign.name}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Next: {campaign.nextRun}
                          </span>
                          {campaign.type === 'email' ? (
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {campaign.stats.sent} sent
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <BarChart className="h-3 w-3 mr-1" />
                              {campaign.stats.impressions} impressions
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant={campaign.status === "active" ? "default" : "outline"} className="text-xs">
                        {campaign.status === "active" ? "Active" : "Scheduled"}
                      </Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="text-center py-8 text-muted-foreground">
            <BarChart className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <h3 className="font-medium">Campaign Analytics</h3>
            <p className="text-sm">
              Campaign analytics will appear here once you have active campaigns.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingAutomationWidget;
