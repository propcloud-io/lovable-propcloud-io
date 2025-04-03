
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Star, Settings } from "lucide-react";
import DashboardWidget from "@/components/dashboard/DashboardWidget";

// Import our new communication components
import AIMessagingCenter from "@/components/communication/AIMessagingCenter";
import ReviewManagement from "@/components/communication/ReviewManagement";
import AIChatbotCustomization from "@/components/communication/AIChatbotCustomization";

const Communication = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("messages");
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Communication</h1>
                    <p className="text-muted-foreground">
                      Manage guest messages and reviews with AI assistance
                    </p>
                  </div>
                  <Button 
                    variant="default"
                    onClick={() => {
                      toast({
                        title: "Communication Settings",
                        description: "Opening communication settings panel",
                      });
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>

                {showOnboarding && (
                  <Card className="bg-gradient-to-r from-propcloud-50 to-blue-50 border-propcloud-100">
                    <CardHeader>
                      <CardTitle>AI Communication Automation</CardTitle>
                      <CardDescription>
                        Let AI handle routine guest communication while you focus on exceptional service
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Our AI can automatically respond to common guest inquiries across all platforms, help manage reviews,
                          and provide personalized responses based on your property details and guest history.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              toast({
                                title: "Tour Started",
                                description: "Let's walk through the Communication features",
                              });
                            }}
                          >
                            Take a Quick Tour
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={() => setShowOnboarding(false)}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="messages" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" /> Guest Messages
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="flex items-center">
                      <Star className="h-4 w-4 mr-2" /> Reviews
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" /> AI Customization
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Guest Messages Tab */}
                  <TabsContent value="messages" className="space-y-6">
                    <AIMessagingCenter />
                  </TabsContent>
                  
                  {/* Reviews Tab */}
                  <TabsContent value="reviews" className="space-y-6">
                    <ReviewManagement />
                  </TabsContent>
                  
                  {/* Settings Tab */}
                  <TabsContent value="settings" className="space-y-6">
                    <AIChatbotCustomization />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <MobileNavigation />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Communication;
