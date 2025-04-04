
import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { User, Bell, Lock, Laptop, Wallet, ExternalLink, Building, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = (message: string) => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: message,
      });
      setLoading(false);
    }, 800);
  };

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
                        <CardDescription>Update your account details and preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="Alex Johnson" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="alex@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input id="company" defaultValue="Coastal Properties LLC" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <select id="timezone" className="w-full rounded-md border border-input p-2">
                            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                            <option value="America/Denver">Mountain Time (US & Canada)</option>
                            <option value="America/Chicago">Central Time (US & Canada)</option>
                            <option value="America/New_York" selected>Eastern Time (US & Canada)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketing">Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                          </div>
                          <Switch id="marketing" defaultChecked />
                        </div>
                        <Button 
                          className="mt-4"
                          onClick={() => handleSaveChanges("Your profile information has been updated")}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
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
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Email Notifications</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-bookings">Booking Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive emails when you get new bookings</p>
                            </div>
                            <Switch id="email-bookings" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-messages">Guest Messages</Label>
                              <p className="text-sm text-muted-foreground">Receive email notifications when guests send messages</p>
                            </div>
                            <Switch id="email-messages" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-reviews">Reviews</Label>
                              <p className="text-sm text-muted-foreground">Get notified when you receive new reviews</p>
                            </div>
                            <Switch id="email-reviews" defaultChecked />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">SMS Notifications</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="sms-bookings">Booking Alerts</Label>
                              <p className="text-sm text-muted-foreground">Receive text messages for new bookings</p>
                            </div>
                            <Switch id="sms-bookings" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="sms-cancellations">Cancellations</Label>
                              <p className="text-sm text-muted-foreground">Get SMS alerts for booking cancellations</p>
                            </div>
                            <Switch id="sms-cancellations" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">App Notifications</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="app-all">All App Notifications</Label>
                              <p className="text-sm text-muted-foreground">Enable or disable all in-app notifications</p>
                            </div>
                            <Switch id="app-all" defaultChecked />
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleSaveChanges("Your notification preferences have been updated")}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Security Tab Content */}
                  <TabsContent value="security" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Password</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input id="current-password" type="password" />
                            </div>
                            <div></div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input id="confirm-password" type="password" />
                            </div>
                          </div>
                          <Button variant="outline" className="mt-2"
                            onClick={() => {
                              toast({
                                title: "Password updated",
                                description: "Your password has been changed successfully",
                              });
                            }}
                          >
                            Update Password
                          </Button>
                        </div>
                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="two-factor">Two-factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                            <Switch id="two-factor" />
                          </div>
                          <Button variant="outline" className="mt-2"
                            onClick={() => {
                              toast({
                                title: "2FA Setup",
                                description: "Follow the instructions sent to your email to set up 2FA",
                              });
                            }}
                          >
                            Set Up Two-Factor Authentication
                          </Button>
                        </div>
                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Login Sessions</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-muted-foreground">MacBook Pro • New York, USA • Today at 10:30 AM</p>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" /> Active
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border">
                              <div>
                                <p className="font-medium">iPhone 13</p>
                                <p className="text-sm text-muted-foreground">iOS 16 • New York, USA • Yesterday at 3:15 PM</p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                Revoke
                              </Button>
                            </div>
                          </div>
                          <Button variant="outline" 
                            onClick={() => {
                              toast({
                                title: "All sessions terminated",
                                description: "You have been logged out from all other devices",
                              });
                            }}
                          >
                            Log Out of All Other Sessions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Properties Tab Content */}
                  <TabsContent value="properties" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Property Management</CardTitle>
                        <CardDescription>Configure your vacation rental properties</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Your Properties</h3>
                          <Button size="sm">
                            Add New Property
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="border rounded-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-50 p-4 border-b">
                              <div className="font-medium">Property</div>
                              <div className="font-medium">Status</div>
                              <div className="font-medium">Actions</div>
                            </div>
                            
                            {[
                              { name: "Oceanview Villa", location: "Miami, FL", status: "Active" },
                              { name: "Mountain Retreat", location: "Aspen, CO", status: "Active" },
                              { name: "Downtown Loft", location: "New York, NY", status: "Maintenance" },
                              { name: "Desert Oasis", location: "Scottsdale, AZ", status: "Inactive" }
                            ].map((property, index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-3 p-4 border-b hover:bg-slate-50">
                                <div>
                                  <p className="font-medium">{property.name}</p>
                                  <p className="text-sm text-muted-foreground">{property.location}</p>
                                </div>
                                <div className="flex items-center">
                                  {property.status === "Active" ? (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> {property.status}
                                    </span>
                                  ) : property.status === "Maintenance" ? (
                                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <AlertTriangle className="h-3 w-3 mr-1" /> {property.status}
                                    </span>
                                  ) : (
                                    <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-full">
                                      {property.status}
                                    </span>
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Edit</Button>
                                  <Button variant="outline" size="sm">Settings</Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">Default Property Settings</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="default-checkin">Default Check-in Time</Label>
                              <Input id="default-checkin" type="time" defaultValue="15:00" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="default-checkout">Default Check-out Time</Label>
                              <Input id="default-checkout" type="time" defaultValue="11:00" />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="auto-reply">Automatic Guest Messages</Label>
                              <p className="text-sm text-muted-foreground">Send automated messages to guests on booking, check-in, etc.</p>
                            </div>
                            <Switch id="auto-reply" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="auto-review">Request Reviews Automatically</Label>
                              <p className="text-sm text-muted-foreground">Automatically request reviews from guests after checkout</p>
                            </div>
                            <Switch id="auto-review" defaultChecked />
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleSaveChanges("Your property settings have been updated")}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Property Settings"}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Billing Tab Content */}
                  <TabsContent value="billing" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Subscription & Billing</CardTitle>
                        <CardDescription>Manage your subscription plan and payment methods</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="p-4 border rounded-lg bg-slate-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium">Professional Plan</h3>
                              <p className="text-sm text-muted-foreground">$49.99 per month, billed monthly</p>
                              <ul className="mt-2 space-y-1">
                                <li className="text-sm flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Up to 15 properties
                                </li>
                                <li className="text-sm flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Advanced analytics
                                </li>
                                <li className="text-sm flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> AI-powered messaging
                                </li>
                                <li className="text-sm flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> All integrations
                                </li>
                              </ul>
                            </div>
                            <Button variant="outline">Change Plan</Button>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm text-muted-foreground">Your next payment of $49.99 will be processed on May 1, 2025</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Payment Methods</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border">
                              <div className="flex items-center">
                                <div className="bg-slate-200 p-2 rounded mr-3">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="4" fill="#E2E8F0"/>
                                    <path d="M5 13.5H19V15.5C19 16.3284 18.3284 17 17.5 17H6.5C5.67157 17 5 16.3284 5 15.5V13.5Z" fill="#94A3B8"/>
                                    <path d="M5 8.5C5 7.67157 5.67157 7 6.5 7H17.5C18.3284 7 19 7.67157 19 8.5V10.5H5V8.5Z" fill="#94A3B8"/>
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium">Visa ending in 4242</p>
                                  <p className="text-sm text-muted-foreground">Expires 09/2026</p>
                                </div>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                            </div>
                          </div>
                          <Button variant="outline">Add Payment Method</Button>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">Billing History</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <div className="grid grid-cols-3 bg-slate-50 p-3 border-b text-sm font-medium">
                              <div>Date</div>
                              <div>Amount</div>
                              <div>Status</div>
                            </div>
                            {[
                              { date: "Apr 1, 2025", amount: "$49.99", status: "Paid" },
                              { date: "Mar 1, 2025", amount: "$49.99", status: "Paid" },
                              { date: "Feb 1, 2025", amount: "$49.99", status: "Paid" },
                            ].map((invoice, index) => (
                              <div key={index} className="grid grid-cols-3 p-3 border-b text-sm">
                                <div>{invoice.date}</div>
                                <div>{invoice.amount}</div>
                                <div>
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {invoice.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm">Download All Invoices</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Integrations Tab Content */}
                  <TabsContent value="integrations" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Connected Services</CardTitle>
                        <CardDescription>Manage your connected platforms and services</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Booking Channels</h3>
                          
                          <div className="space-y-3">
                            {[
                              { name: "Airbnb", status: "Connected", date: "Connected on Mar 15, 2025" },
                              { name: "Vrbo", status: "Connected", date: "Connected on Mar 20, 2025" },
                              { name: "Booking.com", status: "Not connected", date: "" }
                            ].map((channel, index) => (
                              <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-md border">
                                <div className="flex items-center">
                                  <div className="bg-white p-2 rounded-md mr-3 border">
                                    <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                                      {channel.name.charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium">{channel.name}</p>
                                    <p className="text-sm text-muted-foreground">{channel.date}</p>
                                  </div>
                                </div>
                                {channel.status === "Connected" ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Connected
                                    </span>
                                    <Button variant="outline" size="sm">Manage</Button>
                                  </div>
                                ) : (
                                  <Button>Connect</Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">Payment Processing</h3>
                          
                          <div className="space-y-3">
                            {[
                              { name: "Stripe", status: "Connected", date: "Connected on Feb 10, 2025" },
                              { name: "PayPal", status: "Not connected", date: "" }
                            ].map((payment, index) => (
                              <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-md border">
                                <div className="flex items-center">
                                  <div className="bg-white p-2 rounded-md mr-3 border">
                                    <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                                      {payment.name.charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium">{payment.name}</p>
                                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                                  </div>
                                </div>
                                {payment.status === "Connected" ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Connected
                                    </span>
                                    <Button variant="outline" size="sm">Manage</Button>
                                  </div>
                                ) : (
                                  <Button>Connect</Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">Property Management Tools</h3>
                          
                          <div className="space-y-3">
                            {[
                              { name: "Google Calendar", status: "Connected", date: "Connected on Mar 5, 2025" },
                              { name: "Zapier", status: "Connected", date: "Connected on Mar 8, 2025" },
                              { name: "Smart Lock API", status: "Not connected", date: "" }
                            ].map((tool, index) => (
                              <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-md border">
                                <div className="flex items-center">
                                  <div className="bg-white p-2 rounded-md mr-3 border">
                                    <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                                      {tool.name.split(' ')[0].charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium">{tool.name}</p>
                                    <p className="text-sm text-muted-foreground">{tool.date}</p>
                                  </div>
                                </div>
                                {tool.status === "Connected" ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Connected
                                    </span>
                                    <Button variant="outline" size="sm">Manage</Button>
                                  </div>
                                ) : (
                                  <Button>Connect</Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">API Access</h3>
                          <p className="text-sm text-muted-foreground">
                            Use our API to build custom integrations with your existing systems.
                          </p>
                          <Button variant="outline">
                            Generate API Key
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-6">
                        <Button 
                          onClick={() => handleSaveChanges("Your integration settings have been updated")}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Integration Settings"}
                        </Button>
                      </CardFooter>
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
