import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Lock, Laptop, Wallet, ExternalLink, Building } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset>
            <DashboardNavbar />
            <div className="p-6 pb-20 md:pb-6">
              <div className="max-w-5xl mx-auto space-y-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                  <p className="text-muted-foreground">
                    Manage your account settings and preferences
                  </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                    <TabsTrigger value="account" className="flex items-center">
                      <User className="h-4 w-4 mr-2" /> Account
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center">
                      <Lock className="h-4 w-4 mr-2" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="properties" className="flex items-center">
                      <Building className="h-4 w-4 mr-2" /> Properties
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2" /> Billing
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> Integrations
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Account Settings */}
                  <TabsContent value="account" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Profile form fields would go here */}
                        <Button 
                          className="mt-4"
                          onClick={() => {
                            toast({
                              title: "Profile updated",
                              description: "Your profile information has been saved",
                            })
                          }}
                        >
                          Save Changes
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Notifications Settings */}
                  <TabsContent value="notifications" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Control when and how you receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive email notifications about bookings and messages</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive text message alerts for urgent matters</p>
                          </div>
                          <Switch id="sms-notifications" />
                        </div>
                        <Button 
                          className="mt-4"
                          onClick={() => {
                            toast({
                              title: "Notification settings saved",
                              description: "Your notification preferences have been updated",
                            })
                          }}
                        >
                          Save Preferences
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Security Tab Content */}
                  <TabsContent value="security" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your security preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="two-factor">Two-factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                        <Button 
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            toast({
                              title: "Password reset requested",
                              description: "Check your email for instructions to reset your password",
                            })
                          }}
                        >
                          Change Password
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Other tab contents would go here */}
                  <TabsContent value="properties">
                    <Card>
                      <CardHeader>
                        <CardTitle>Property Settings</CardTitle>
                        <CardDescription>Manage property-specific configurations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Property settings content will go here</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="billing">
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing & Subscription</CardTitle>
                        <CardDescription>Manage your subscription and payment methods</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Billing settings content will go here</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="integrations">
                    <Card>
                      <CardHeader>
                        <CardTitle>Integrations & API</CardTitle>
                        <CardDescription>Connect with third-party services</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Integrations content will go here</p>
                      </CardContent>
                    </Card>
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

export default Settings;
