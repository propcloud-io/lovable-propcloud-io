
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Link, ExternalLink, CreditCard, User, Key, UserCog, Building, MessagesSquare, DollarSign, Bell, Lock } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSaveSettings = () => {
    setSaveLoading(true);
    setTimeout(() => {
      setSaveLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and application preferences</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="ai">AI Settings</TabsTrigger>
                <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Manage your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback>DU</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="font-medium">Profile Photo</h3>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">Upload New Photo</Button>
                          <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="Demo" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="User" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="demo@propcloud.io" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="pacific">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eastern">Eastern Time (ET)</SelectItem>
                              <SelectItem value="central">Central Time (CT)</SelectItem>
                              <SelectItem value="mountain">Mountain Time (MT)</SelectItem>
                              <SelectItem value="pacific">Pacific Time (PT)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Password</h4>
                            <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                          </div>
                          <Button variant="outline" onClick={() => {
                            toast({
                              title: "Change Password",
                              description: "Password change initiated",
                            });
                          }}>Change Password</Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => {
                            toast({
                              title: "2FA Updated",
                              description: "Two-factor authentication settings updated",
                            });
                          }} />
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Login Sessions</h4>
                            <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                          </div>
                          <Button variant="outline" onClick={() => {
                            toast({
                              title: "Sessions Viewed",
                              description: "Viewing your active login sessions",
                            });
                          }}>View Sessions</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} disabled={saveLoading}>
                        {saveLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Manage access to your PropCloud account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="py-3 px-4 font-medium">User</th>
                              <th className="py-3 px-4 font-medium">Role</th>
                              <th className="py-3 px-4 font-medium">Status</th>
                              <th className="py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>DU</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">Demo User</div>
                                    <div className="text-sm text-muted-foreground">demo@propcloud.io</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">Admin</td>
                              <td className="py-3 px-4">
                                <Badge variant="success">Active</Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="sm" onClick={() => {
                                  toast({
                                    title: "User Settings",
                                    description: "Viewing user settings",
                                  });
                                }}>Settings</Button>
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>JD</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">Jane Doe</div>
                                    <div className="text-sm text-muted-foreground">jane@example.com</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">Manager</td>
                              <td className="py-3 px-4">
                                <Badge variant="secondary">Pending</Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    toast({
                                      title: "Invitation Resent",
                                      description: "Team invitation has been resent",
                                    });
                                  }}>Resend</Button>
                                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                                    toast({
                                      title: "Invitation Cancelled",
                                      description: "Team invitation has been cancelled",
                                    });
                                  }}>Cancel</Button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <Button onClick={() => {
                        toast({
                          title: "Invite Sent",
                          description: "Team invitation has been sent",
                        });
                      }}>
                        Invite Team Member
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Property Settings</CardTitle>
                        <CardDescription>
                          Manage your property configurations
                        </CardDescription>
                      </div>
                      <Button onClick={() => {
                        toast({
                          title: "Add Property",
                          description: "New property wizard has been started",
                        });
                      }}>
                        Add Property
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="py-3 px-4 font-medium">Property</th>
                              <th className="py-3 px-4 font-medium">Type</th>
                              <th className="py-3 px-4 font-medium">Status</th>
                              <th className="py-3 px-4 font-medium">Channels</th>
                              <th className="py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "Beach Villa", type: "House", status: "Active", channels: 3 },
                              { name: "Downtown Apartment", type: "Apartment", status: "Active", channels: 2 },
                              { name: "Mountain Cabin", type: "Cabin", status: "Active", channels: 3 },
                            ].map((property, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4">
                                  <div className="font-medium">{property.name}</div>
                                </td>
                                <td className="py-3 px-4">{property.type}</td>
                                <td className="py-3 px-4">
                                  <Badge variant="success">{property.status}</Badge>
                                </td>
                                <td className="py-3 px-4">{property.channels}</td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => {
                                      toast({
                                        title: "Edit Property",
                                        description: `Editing ${property.name} settings`,
                                      });
                                    }}>Edit</Button>
                                    <Button variant="ghost" size="sm" onClick={() => {
                                      toast({
                                        title: "Property Channels",
                                        description: `Viewing ${property.name} channel settings`,
                                      });
                                    }}>Channels</Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Default Property Settings</CardTitle>
                    <CardDescription>
                      Set default settings for all properties
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="check-in-time">Default Check-in Time</Label>
                          <Select defaultValue="15:00">
                            <SelectTrigger id="check-in-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="check-out-time">Default Check-out Time</Label>
                          <Select defaultValue="11:00">
                            <SelectTrigger id="check-out-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="min-stay">Default Minimum Stay (nights)</Label>
                          <Input id="min-stay" type="number" defaultValue="2" min="1" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="max-guests">Default Maximum Guests</Label>
                          <Input id="max-guests" type="number" defaultValue="6" min="1" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cleaning-fee">Default Cleaning Fee ($)</Label>
                          <Input id="cleaning-fee" type="number" defaultValue="85" min="0" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="instant-booking">Enable Instant Booking by Default</Label>
                            <p className="text-sm text-muted-foreground">Allow guests to book without approval</p>
                          </div>
                          <Switch id="instant-booking" defaultChecked onCheckedChange={() => {
                            toast({
                              title: "Setting Updated",
                              description: "Instant booking setting has been updated",
                            });
                          }} />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={saveLoading}>
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Communication Settings</CardTitle>
                    <CardDescription>
                      Configure how the AI communicates with your guests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable AI Messaging</h3>
                          <p className="text-sm text-muted-foreground">Allow AI to handle guest communications</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "AI messaging setting has been updated",
                          });
                        }} />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">AI Personality</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-4 cursor-pointer bg-propcloud-50 border-propcloud-200">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-propcloud-500" />
                              <h4 className="font-medium">Professional</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Formal and business-like communication style
                            </p>
                          </div>
                          <div className="border rounded-lg p-4 cursor-pointer hover:bg-slate-50">
                            <h4 className="font-medium">Friendly</h4>
                            <p className="text-sm text-muted-foreground mt-2">
                              Warm and approachable communication style
                            </p>
                          </div>
                          <div className="border rounded-lg p-4 cursor-pointer hover:bg-slate-50">
                            <h4 className="font-medium">Casual</h4>
                            <p className="text-sm text-muted-foreground mt-2">
                              Relaxed and conversational communication style
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ai-language">Primary Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="ai-language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="multilingual">Multilingual Responses</Label>
                          <Switch id="multilingual" defaultChecked onCheckedChange={() => {
                            toast({
                              title: "Setting Updated",
                              description: "Multilingual response setting has been updated",
                            });
                          }} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Automatically detect and respond in the guest's language
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Response Templates</h3>
                        <div className="space-y-2">
                          <Label htmlFor="welcome-message">Welcome Message</Label>
                          <Textarea
                            id="welcome-message"
                            defaultValue="Thank you for booking with us! We're excited to welcome you to our property. Please let me know if you have any questions before your arrival."
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="check-in-instructions">Check-in Instructions</Label>
                          <Textarea
                            id="check-in-instructions"
                            defaultValue="Your check-in is scheduled for {check_in_date} at {check_in_time}. Here's how to access the property: {access_instructions}"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="check-out-reminder">Check-out Reminder</Label>
                          <Textarea
                            id="check-out-reminder"
                            defaultValue="Just a friendly reminder that your check-out is scheduled for tomorrow at {check_out_time}. Here are the check-out instructions: {checkout_instructions}"
                            rows={3}
                          />
                        </div>
                        <Button variant="outline" onClick={() => {
                          toast({
                            title: "Templates",
                            description: "Viewing all message templates",
                          });
                        }}>View All Templates</Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Advanced AI Training</h3>
                            <p className="text-sm text-muted-foreground">Train the AI with your custom data</p>
                          </div>
                          <Button variant="outline" onClick={() => {
                            toast({
                              title: "AI Training",
                              description: "Opening AI training interface",
                            });
                          }}>Train AI</Button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={saveLoading}>
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Automation Settings</CardTitle>
                    <CardDescription>
                      Configure automated tasks and workflows
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable Dynamic Pricing</h3>
                          <p className="text-sm text-muted-foreground">AI will automatically adjust prices based on demand</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Dynamic pricing setting has been updated",
                          });
                        }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Automated Review Responses</h3>
                          <p className="text-sm text-muted-foreground">AI will respond to guest reviews automatically</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Automated review response setting has been updated",
                          });
                        }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Cleaning Schedule Automation</h3>
                          <p className="text-sm text-muted-foreground">Automatically schedule cleaning based on bookings</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Cleaning schedule automation setting has been updated",
                          });
                        }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Guest Communication Automation</h3>
                          <p className="text-sm text-muted-foreground">Send automated messages for check-in/out and follow-ups</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Guest communication automation setting has been updated",
                          });
                        }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">AI-Powered Upsells</h3>
                          <p className="text-sm text-muted-foreground">Automatically suggest relevant add-ons to guests</p>
                        </div>
                        <Switch onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "AI-powered upsell setting has been updated",
                          });
                        }} />
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={saveLoading}>
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dynamic Pricing Rules</CardTitle>
                    <CardDescription>
                      Configure how the AI optimizes your property pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable Dynamic Pricing</h3>
                          <p className="text-sm text-muted-foreground">Allow AI to automatically adjust prices</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Dynamic pricing setting has been updated",
                          });
                        }} />
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="property-select">Select Property</Label>
                          <Select defaultValue="all">
                            <SelectTrigger id="property-select">
                              <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Properties</SelectItem>
                              <SelectItem value="beach">Beach Villa</SelectItem>
                              <SelectItem value="downtown">Downtown Apartment</SelectItem>
                              <SelectItem value="mountain">Mountain Cabin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="min-price">Minimum Price ($)</Label>
                            <Input id="min-price" type="number" defaultValue="99" min="0" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="max-price">Maximum Price ($)</Label>
                            <Input id="max-price" type="number" defaultValue="499" min="0" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="base-price">Base Price ($)</Label>
                          <Input id="base-price" type="number" defaultValue="199" min="0" />
                          <p className="text-xs text-muted-foreground mt-1">
                            The AI will adjust pricing from this base price
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Pricing Adjustments</h3>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="weekend">Weekend Adjustment</Label>
                              <Select defaultValue="15">
                                <SelectTrigger id="weekend">
                                  <SelectValue placeholder="Select adjustment" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="10">+10%</SelectItem>
                                  <SelectItem value="15">+15%</SelectItem>
                                  <SelectItem value="20">+20%</SelectItem>
                                  <SelectItem value="25">+25%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="holiday">Holiday Adjustment</Label>
                              <Select defaultValue="25">
                                <SelectTrigger id="holiday">
                                  <SelectValue placeholder="Select adjustment" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="15">+15%</SelectItem>
                                  <SelectItem value="20">+20%</SelectItem>
                                  <SelectItem value="25">+25%</SelectItem>
                                  <SelectItem value="30">+30%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="last-minute">Last-minute Adjustment</Label>
                              <Select defaultValue="-10">
                                <SelectTrigger id="last-minute">
                                  <SelectValue placeholder="Select adjustment" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">No change</SelectItem>
                                  <SelectItem value="-5">-5%</SelectItem>
                                  <SelectItem value="-10">-10%</SelectItem>
                                  <SelectItem value="-15">-15%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="extended-stay">Extended Stay Discount (7+ nights)</Label>
                              <Select defaultValue="-10">
                                <SelectTrigger id="extended-stay">
                                  <SelectValue placeholder="Select discount" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">No discount</SelectItem>
                                  <SelectItem value="-5">5% discount</SelectItem>
                                  <SelectItem value="-10">10% discount</SelectItem>
                                  <SelectItem value="-15">15% discount</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="demand-adjustment">Demand-based Adjustment Range</Label>
                              <Select defaultValue="15">
                                <SelectTrigger id="demand-adjustment">
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="10">±10%</SelectItem>
                                  <SelectItem value="15">±15%</SelectItem>
                                  <SelectItem value="20">±20%</SelectItem>
                                  <SelectItem value="25">±25%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Advanced Settings</h3>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Competitor-based Pricing</h4>
                            <p className="text-sm text-muted-foreground">Adjust prices based on similar properties in the area</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => {
                            toast({
                              title: "Setting Updated",
                              description: "Competitor-based pricing setting has been updated",
                            });
                          }} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Occupancy-based Pricing</h4>
                            <p className="text-sm text-muted-foreground">Adjust prices based on current occupancy rates</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => {
                            toast({
                              title: "Setting Updated",
                              description: "Occupancy-based pricing setting has been updated",
                            });
                          }} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Seasonal Pricing</h4>
                            <p className="text-sm text-muted-foreground">Apply different base prices for different seasons</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => {
                            toast({
                              title: "Setting Updated",
                              description: "Seasonal pricing setting has been updated",
                            });
                          }} />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={saveLoading}>
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Channel Pricing Rules</CardTitle>
                    <CardDescription>
                      Configure pricing rules for different booking channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable Channel-specific Pricing</h3>
                          <p className="text-sm text-muted-foreground">Set different prices for different booking channels</p>
                        </div>
                        <Switch defaultChecked onCheckedChange={() => {
                          toast({
                            title: "Setting Updated",
                            description: "Channel-specific pricing setting has been updated",
                          });
                        }} />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                              <span className="text-red-600 text-xs font-bold">Ab</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Airbnb</h4>
                              <p className="text-sm text-muted-foreground">Price adjustment for Airbnb listings</p>
                            </div>
                          </div>
                          <Select defaultValue="5">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select adjustment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No change</SelectItem>
                              <SelectItem value="5">+5%</SelectItem>
                              <SelectItem value="10">+10%</SelectItem>
                              <SelectItem value="15">+15%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-xs font-bold">Bk</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Booking.com</h4>
                              <p className="text-sm text-muted-foreground">Price adjustment for Booking.com listings</p>
                            </div>
                          </div>
                          <Select defaultValue="8">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select adjustment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No change</SelectItem>
                              <SelectItem value="5">+5%</SelectItem>
                              <SelectItem value="8">+8%</SelectItem>
                              <SelectItem value="10">+10%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                              <span className="text-green-600 text-xs font-bold">Dr</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Direct Booking</h4>
                              <p className="text-sm text-muted-foreground">Price adjustment for direct bookings</p>
                            </div>
                          </div>
                          <Select defaultValue="-5">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select adjustment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No change</SelectItem>
                              <SelectItem value="-3">-3%</SelectItem>
                              <SelectItem value="-5">-5%</SelectItem>
                              <SelectItem value="-8">-8%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={saveLoading}>
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Booking Channels</CardTitle>
                    <CardDescription>
                      Manage your booking channel integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-red-50 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-white rounded-full p-2">
                                <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                                  <span className="text-red-600 text-xs font-bold">Ab</span>
                                </div>
                              </div>
                              <h3 className="font-medium">Airbnb</h3>
                            </div>
                            <Badge variant="success">Connected</Badge>
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Status:</span>
                              <span className="text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Connected:</span>
                              <span>3 months ago</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Properties:</span>
                              <span>3/3</span>
                            </div>
                            <div className="pt-2">
                              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                                toast({
                                  title: "Manage Channel",
                                  description: "Opening Airbnb integration settings",
                                });
                              }}>Manage</Button>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-blue-50 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-white rounded-full p-2">
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-bold">Bk</span>
                                </div>
                              </div>
                              <h3 className="font-medium">Booking.com</h3>
                            </div>
                            <Badge variant="success">Connected</Badge>
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Status:</span>
                              <span className="text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Connected:</span>
                              <span>3 months ago</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Properties:</span>
                              <span>2/3</span>
                            </div>
                            <div className="pt-2">
                              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                                toast({
                                  title: "Manage Channel",
                                  description: "Opening Booking.com integration settings",
                                });
                              }}>Manage</Button>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-purple-50 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-white rounded-full p-2">
                                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                                  <span className="text-purple-600 text-xs font-bold">Vb</span>
                                </div>
                              </div>
                              <h3 className="font-medium">VRBO</h3>
                            </div>
                            <Badge variant="outline">Not Connected</Badge>
                          </div>
                          <div className="p-4 space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Connect your VRBO account to sync listings and manage bookings.
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => {
                              toast({
                                title: "Connect Channel",
                                description: "Starting VRBO connection process",
                              });
                            }}>Connect</Button>
                          </div>
                        </div>
                      </div>

                      <Button onClick={() => {
                        toast({
                          title: "Add Channel",
                          description: "Viewing available channels to connect",
                        });
                      }}>Add Channel</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Other Integrations</CardTitle>
                    <CardDescription>
                      Connect with third-party services and tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-100 p-2 rounded-full">
                                <MessagesSquare className="h-5 w-5 text-slate-600" />
                              </div>
                              <h3 className="font-medium">WhatsApp Business</h3>
                            </div>
                            <Badge variant="success">Connected</Badge>
                          </div>
                          <div className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Manage guest communications via WhatsApp
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => {
                              toast({
                                title: "Manage Integration",
                                description: "Opening WhatsApp integration settings",
                              });
                            }}>Manage</Button>
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-100 p-2 rounded-full">
                                <CreditCard className="h-5 w-5 text-slate-600" />
                              </div>
                              <h3 className="font-medium">Stripe</h3>
                            </div>
                            <Badge variant="success">Connected</Badge>
                          </div>
                          <div className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Process payments and manage direct bookings
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => {
                              toast({
                                title: "Manage Integration",
                                description: "Opening Stripe integration settings",
                              });
                            }}>Manage</Button>
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-100 p-2 rounded-full">
                                <Key className="h-5 w-5 text-slate-600" />
                              </div>
                              <h3 className="font-medium">Smart Lock System</h3>
                            </div>
                            <Badge variant="outline">Not Connected</Badge>
                          </div>
                          <div className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Automate check-in with smart lock integration
                            </p>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => {
                              toast({
                                title: "Connect Integration",
                                description: "Starting smart lock system connection process",
                              });
                            }}>Connect</Button>
                          </div>
                        </div>
                      </div>

                      <Button onClick={() => {
                        toast({
                          title: "Browse Integrations",
                          description: "Viewing available integrations marketplace",
                        });
                      }}>Browse More Integrations</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-bookings">New Bookings</Label>
                            <Switch id="email-bookings" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Email notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-cancellations">Booking Cancellations</Label>
                            <Switch id="email-cancellations" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Email notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-messages">Guest Messages</Label>
                            <Switch id="email-messages" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Email notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-reviews">New Reviews</Label>
                            <Switch id="email-reviews" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Email notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-reports">Weekly Reports</Label>
                            <Switch id="email-reports" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Email notification setting has been updated",
                              });
                            }} />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">SMS Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sms-bookings">New Bookings</Label>
                            <Switch id="sms-bookings" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "SMS notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sms-cancellations">Booking Cancellations</Label>
                            <Switch id="sms-cancellations" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "SMS notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sms-messages">Urgent Guest Messages</Label>
                            <Switch id="sms-messages" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "SMS notification setting has been updated",
                              });
                            }} />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Push Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-bookings">New Bookings</Label>
                            <Switch id="push-bookings" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Push notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-messages">Guest Messages</Label>
                            <Switch id="push-messages" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Push notification setting has been updated",
                              });
                            }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-tasks">Task Reminders</Label>
                            <Switch id="push-tasks" defaultChecked onCheckedChange={() => {
                              toast({
                                title: "Setting Updated",
                                description: "Push notification setting has been updated",
                              });
                            }} />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Quiet Hours</h3>
                            <p className="text-sm text-muted-foreground">Don't send notifications during these hours</p>
                          </div>
                          <Switch defaultChecked onCheckedChange={() => {
                            toast({
                              title: "Setting Updated",
                              description: "Quiet hours setting has been updated",
                            });
                          }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="quiet-start">Start Time</Label>
                            <Select defaultValue="22:00">
                              <SelectTrigger id="quiet-start">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="20:00">8:00 PM</SelectItem>
                                <SelectItem value="21:00">9:00 PM</SelectItem>
                                <SelectItem value="22:00">10:00 PM</SelectItem>
                                <SelectItem value="23:00">11:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quiet-end">End Time</Label>
                            <Select defaultValue="07:00">
                              <SelectTrigger id="quiet-end">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="06:00">6:00 AM</SelectItem>
                                <SelectItem value="07:00">7:00 AM</SelectItem>
                                <SelectItem value="08:00">8:00 AM</SelectItem>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} disabled={saveLoading}>
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription & Billing</CardTitle>
                    <CardDescription>
                      Manage your PropCloud subscription and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-propcloud-50 border border-propcloud-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Current Plan</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="default">Professional</Badge>
                              <span className="text-sm text-muted-foreground">$49/month</span>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline" onClick={() => {
                              toast({
                                title: "Change Plan",
                                description: "Viewing available subscription plans",
                              });
                            }}>Change Plan</Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Plan Details</h3>
                          <Badge variant="outline">Monthly Billing</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Billing Cycle</span>
                            <span>Monthly (Renews on Nov 15, 2023)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Properties Included</span>
                            <span>5 properties (3 in use)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>AI Guest Messaging</span>
                            <span>Unlimited</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Dynamic Pricing</span>
                            <span>Included</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Team Members</span>
                            <span>Up to 3 users</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Payment Method</h3>
                        <div className="flex items-center justify-between border rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded">
                              <CreditCard className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                              <div className="font-medium">Visa ending in 4242</div>
                              <div className="text-sm text-muted-foreground">Expires 08/2025</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => {
                              toast({
                                title: "Edit Payment Method",
                                description: "Opening payment method editor",
                              });
                            }}>Edit</Button>
                            <Button variant="ghost" size="sm" onClick={() => {
                              toast({
                                title: "Add Payment Method",
                                description: "Adding a new payment method",
                              });
                            }}>Add New</Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium">Billing History</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left border-b">
                                <th className="py-3 px-4 font-medium">Invoice</th>
                                <th className="py-3 px-4 font-medium">Date</th>
                                <th className="py-3 px-4 font-medium">Amount</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-3 px-4">INV-001234</td>
                                <td className="py-3 px-4">Oct 15, 2023</td>
                                <td className="py-3 px-4">$49.00</td>
                                <td className="py-3 px-4">
                                  <Badge variant="success">Paid</Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    toast({
                                      title: "Download Invoice",
                                      description: "Downloading invoice INV-001234",
                                    });
                                  }}>Download</Button>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-3 px-4">INV-001198</td>
                                <td className="py-3 px-4">Sept 15, 2023</td>
                                <td className="py-3 px-4">$49.00</td>
                                <td className="py-3 px-4">
                                  <Badge variant="success">Paid</Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    toast({
                                      title: "Download Invoice",
                                      description: "Downloading invoice INV-001198",
                                    });
                                  }}>Download</Button>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-3 px-4">INV-001156</td>
                                <td className="py-3 px-4">Aug 15, 2023</td>
                                <td className="py-3 px-4">$49.00</td>
                                <td className="py-3 px-4">
                                  <Badge variant="success">Paid</Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    toast({
                                      title: "Download Invoice",
                                      description: "Downloading invoice INV-001156",
                                    });
                                  }}>Download</Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Settings;
