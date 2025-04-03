import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Star, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import DashboardWidget from "@/components/dashboard/DashboardWidget";

const Communication = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("messages");
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      guest: "John Smith",
      property: "Beach Villa",
      date: "Today, 10:23 AM",
      content: "Hi, what's the WiFi password for the property?",
      status: "unread",
      avatar: "JS"
    },
    {
      id: 2,
      guest: "Maria Rodriguez",
      property: "Downtown Apartment",
      date: "Yesterday, 4:15 PM",
      content: "Is it possible to check in an hour earlier tomorrow?",
      status: "responded",
      avatar: "MR"
    },
    {
      id: 3,
      guest: "David Chen",
      property: "Mountain Cabin",
      date: "Oct 15, 2023",
      content: "The heating doesn't seem to be working properly.",
      status: "pending",
      avatar: "DC"
    }
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      guest: "Sarah Johnson",
      property: "Beach Villa",
      date: "Oct 18, 2023",
      rating: 5,
      content: "Amazing property with stunning views! Everything was perfect.",
      status: "published",
      platform: "Airbnb",
      avatar: "SJ"
    },
    {
      id: 2,
      guest: "Michael Brown",
      property: "Downtown Apartment",
      date: "Oct 12, 2023",
      rating: 4,
      content: "Great location and clean apartment. The only issue was street noise at night.",
      status: "needs_response",
      platform: "Booking.com",
      avatar: "MB"
    },
    {
      id: 3,
      guest: "Emma Wilson",
      property: "Mountain Cabin",
      date: "Oct 5, 2023",
      rating: 3,
      content: "Beautiful location but the cabin needs some maintenance. The shower was leaking.",
      status: "responded",
      platform: "VRBO",
      avatar: "EW"
    }
  ]);

  const handleMessageResponse = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: "responded" } : msg
    ));
    
    toast({
      title: "Message Sent",
      description: "Your response has been sent to the guest",
    });
  };

  const handleReviewResponse = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: "responded" } : review
    ));
    
    toast({
      title: "Response Published",
      description: "Your response to the review has been published",
    });
  };

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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Properties</SelectItem>
                        <SelectItem value="beach">Beach Villa</SelectItem>
                        <SelectItem value="downtown">Downtown Apartment</SelectItem>
                        <SelectItem value="mountain">Mountain Cabin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {showOnboarding && (
                  <Card className="bg-gradient-to-r from-propcloud-50 to-blue-50 border-propcloud-100">
                    <CardHeader>
                      <CardTitle>Communication Automation</CardTitle>
                      <CardDescription>
                        Let AI handle routine guest communication while you focus on exceptional service
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Our AI can automatically respond to common guest inquiries, send check-in instructions,
                          follow up after stays, and help you manage reviews across all platforms.
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
                    <TabsTrigger value="messages">Guest Messages</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="templates">Message Templates</TabsTrigger>
                  </TabsList>
                  
                  {/* Guest Messages Tab */}
                  <TabsContent value="messages" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="md:col-span-2">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Recent Messages</CardTitle>
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Filter" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Messages</SelectItem>
                                <SelectItem value="unread">Unread</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="responded">Responded</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {messages.map((message) => (
                              <div key={message.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarFallback>{message.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-medium">{message.guest}</h3>
                                      <p className="text-sm text-muted-foreground">{message.property}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Badge variant={
                                      message.status === "unread" ? "destructive" : 
                                      message.status === "pending" ? "outline" : 
                                      "default"
                                    }>
                                      {message.status === "unread" ? "Unread" : 
                                       message.status === "pending" ? "Pending" : 
                                       "Responded"}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground ml-3">{message.date}</span>
                                  </div>
                                </div>
                                <p className="mt-3 text-sm">{message.content}</p>
                                <div className="mt-4 flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "AI Response Generated",
                                        description: "An AI response has been drafted for your review",
                                      });
                                    }}
                                  >
                                    Generate AI Response
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleMessageResponse(message.id)}
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Respond
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Communication Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                  <MessageSquare className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Response Rate</p>
                                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                                </div>
                              </div>
                              <div className="text-2xl font-bold">98%</div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                  <Clock className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Avg. Response Time</p>
                                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                                </div>
                              </div>
                              <div className="text-2xl font-bold">14m</div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-amber-100 p-2 rounded-full mr-3">
                                  <CheckCircle className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">AI Resolution Rate</p>
                                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                                </div>
                              </div>
                              <div className="text-2xl font-bold">76%</div>
                            </div>

                            <div className="pt-4">
                              <Button variant="outline" className="w-full">
                                View Detailed Analytics
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Reviews Tab */}
                  <TabsContent value="reviews" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="md:col-span-2">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Recent Reviews</CardTitle>
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Filter" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Reviews</SelectItem>
                                <SelectItem value="needs_response">Needs Response</SelectItem>
                                <SelectItem value="responded">Responded</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {reviews.map((review) => (
                              <div key={review.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarFallback>{review.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-medium">{review.guest}</h3>
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm text-muted-foreground">{review.property}</p>
                                        <Badge variant="outline" className="text-xs">{review.platform}</Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{review.date}</span>
                                  </div>
                                </div>
                                <p className="mt-3 text-sm">{review.content}</p>
                                <div className="mt-4 flex justify-end gap-2">
                                  {review.status === "needs_response" && (
                                    <>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => {
                                          toast({
                                            title: "AI Response Generated",
                                            description: "An AI response has been drafted for your review",
                                          });
                                        }}
                                      >
                                        Generate AI Response
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={() => handleReviewResponse(review.id)}
                                      >
                                        Respond
                                      </Button>
                                    </>
                                  )}
                                  {review.status === "responded" && (
                                    <Badge>Responded</Badge>
                                  )}
                                  {review.status === "published" && (
                                    <Badge variant="outline">Published</Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Review Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                                  <Star className="h-5 w-5 text-yellow-600 fill-yellow-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Average Rating</p>
                                  <p className="text-xs text-muted-foreground">All properties</p>
                                </div>
                              </div>
                              <div className="text-2xl font-bold">4.8</div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                  <MessageSquare className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Response Rate</p>
                                  <p className="text-xs text-muted-foreground">To reviews</p>
                                </div>
                              </div>
                              <div className="text-2xl font-bold">100%</div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                  <AlertCircle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Sentiment</p>
                                  <p className="text-xs text-muted-foreground">AI analysis</p>
                                </div>
                              </div>
                              <div className="text-2xl font-bold">92%</div>
                            </div>

                            <div className="pt-4">
                              <Button variant="outline" className="w-full">
                                View All Reviews
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Templates Tab */}
                  <TabsContent value="templates" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DashboardWidget title="Message Templates">
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">Check-in Instructions</h3>
                              <Badge>Automated</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sent 24 hours before guest arrival with property access details
                            </p>
                          </div>
                          
                          <div className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">Welcome Message</h3>
                              <Badge>Automated</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sent when guest checks in with property information
                            </p>
                          </div>
                          
                          <div className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">Check-out Reminder</h3>
                              <Badge>Automated</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sent day before departure with check-out instructions
                            </p>
                          </div>
                          
                          <div className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">Review Request</h3>
                              <Badge>Automated</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sent 2 days after check-out asking for a review
                            </p>
                          </div>
                          
                          <Button className="w-full">
                            Create New Template
                          </Button>
                        </div>
                      </DashboardWidget>
                      
                      <DashboardWidget title="AI Response Settings">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="ai-tone">AI Response Tone</Label>
                            <Select defaultValue="friendly">
                              <SelectTrigger id="ai-tone">
                                <SelectValue placeholder="Select tone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="friendly">Friendly & Casual</SelectItem>
                                <SelectItem value="professional">Professional & Formal</SelectItem>
                                <SelectItem value="concise">Concise & Direct</SelectItem>
                                <SelectItem value="enthusiastic">Enthusiastic & Energetic</SelectItem>
                              </SelectContent>
                            </Select>
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
                                <SelectItem value="it">Italian</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              AI will auto-detect and respond in guest's language when possible
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="auto-respond" defaultChecked />
                              <Label htmlFor="auto-respond">Auto-respond to common questions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="review-responses" defaultChecked />
                              <Label htmlFor="review-responses">Generate review responses for approval</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="follow-up" defaultChecked />
                              <Label htmlFor="follow-up">Send automated follow-ups for unresolved issues</Label>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full"
                            onClick={() => {
                              toast({
                                title: "Settings Saved",
                                description: "Your AI communication settings have been updated",
                              });
                            }}
                          >
                            Save Settings
                          </Button>
                        </div>
                      </DashboardWidget>
                    </div>
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
