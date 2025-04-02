import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Send, Home, MessageSquare, Phone, Instagram, RefreshCw } from "lucide-react";

type Message = {
  id: string;
  sender: "guest" | "ai" | "host";
  content: string;
  timestamp: Date;
  attachments?: string[];
};

type Conversation = {
  id: string;
  guestName: string;
  avatar: string;
  initials: string;
  property: string;
  platform: "airbnb" | "booking" | "direct" | "instagram" | "whatsapp";
  lastMessage: string;
  lastActivity: Date;
  unread: boolean;
  messages: Message[];
};

const Communication = () => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<string | null>("conv1");
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv1",
      guestName: "John Smith",
      avatar: "",
      initials: "JS",
      property: "Beach Villa",
      platform: "airbnb",
      lastMessage: "Hi, I'm interested in booking your property for next weekend. Is it available?",
      lastActivity: new Date(Date.now() - 1000 * 60 * 5),
      unread: true,
      messages: [
        {
          id: "msg1",
          sender: "guest",
          content: "Hi, I'm interested in booking your property for next weekend. Is it available?",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        }
      ]
    },
    {
      id: "conv2",
      guestName: "Maria Garcia",
      avatar: "",
      initials: "MG",
      property: "Downtown Apartment",
      platform: "booking",
      lastMessage: "What's the check-in procedure? We'll be arriving around 6pm tomorrow.",
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: false,
      messages: [
        {
          id: "msg2",
          sender: "guest",
          content: "Hello, I've booked your Downtown Apartment for tomorrow!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        },
        {
          id: "msg3",
          sender: "ai",
          content: "Hi Maria! Welcome to PropCloud.io. We're excited to host you at our Downtown Apartment. Is there anything specific you'd like to know before your stay?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
        },
        {
          id: "msg4",
          sender: "guest",
          content: "What's the check-in procedure? We'll be arriving around 6pm tomorrow.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        }
      ]
    },
    {
      id: "conv3",
      guestName: "Robert Johnson",
      avatar: "",
      initials: "RJ",
      property: "Mountain Cabin",
      platform: "direct",
      lastMessage: "Is there parking available at the property or nearby?",
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 8),
      unread: false,
      messages: [
        {
          id: "msg5",
          sender: "guest",
          content: "Hello! I'm considering booking your Mountain Cabin.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9),
        },
        {
          id: "msg6",
          sender: "ai",
          content: "Hi Robert! The Mountain Cabin is a beautiful choice. It has 2 bedrooms, 1 bathroom, and gorgeous views of the surrounding forest. Is there anything specific you'd like to know?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8.5),
        },
        {
          id: "msg7",
          sender: "guest",
          content: "Is there parking available at the property or nearby?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        }
      ]
    },
    {
      id: "conv4",
      guestName: "Emily Chen",
      avatar: "",
      initials: "EC",
      property: "Beach Villa",
      platform: "instagram",
      lastMessage: "Thanks for the quick response! I'll check with my friends and get back to you.",
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: false,
      messages: [
        {
          id: "msg8",
          sender: "guest",
          content: "Hi, do you have availability for 4 people from July 15-20?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        },
        {
          id: "msg9",
          sender: "ai",
          content: "Hello Emily! Yes, our Beach Villa is available for those dates. The rate would be $299 per night plus a $150 cleaning fee. It has 2 bedrooms, 2 bathrooms, and direct beach access. Would you like to proceed with booking?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
        },
        {
          id: "msg10",
          sender: "guest",
          content: "Thanks for the quick response! I'll check with my friends and get back to you.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        }
      ]
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        const newUserMessage: Message = {
          id: `msg${Date.now()}`,
          sender: "host",
          content: messageInput,
          timestamp: new Date()
        };
        
        return {
          ...conv,
          lastMessage: messageInput,
          lastActivity: new Date(),
          messages: [...conv.messages, newUserMessage]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setMessageInput("");
    
    setIsTyping(true);
    
    setTimeout(() => {
      const currentConv = conversations.find(c => c.id === activeConversation);
      let aiResponse = "";
      
      if (currentConv) {
        const lastGuestMessage = [...currentConv.messages].reverse().find(m => m.sender === "guest")?.content.toLowerCase() || "";
        
        if (currentConv.platform === "airbnb" && currentConv.id === "conv1") {
          if (lastGuestMessage.includes("available") || messageInput.toLowerCase().includes("available")) {
            aiResponse = "Yes, the Beach Villa is available next weekend! The rate is $349 per night with a minimum 2-night stay. The villa features 3 bedrooms, 2 bathrooms, a private pool, and is just a 2-minute walk to the beach. Would you like to proceed with booking?";
          } else if (messageInput.toLowerCase().includes("book") || messageInput.toLowerCase().includes("reserve")) {
            aiResponse = "Great! I've reserved the Beach Villa for next weekend (Friday to Sunday). To confirm your booking, please complete payment through the Airbnb platform. I've sent you a reservation request. Let me know if you need any assistance with the booking process.";
          } else if (messageInput.toLowerCase().includes("check") || messageInput.toLowerCase().includes("arrive")) {
            aiResponse = "Check-in time is 3 PM and check-out is by 11 AM. Our self-check-in system makes arrival easy - I'll send detailed instructions including access codes 24 hours before your arrival. If you need early check-in or late check-out, please let me know and I'll check availability.";
          } else {
            aiResponse = "Thank you for your message about the Beach Villa. Is there anything specific about the property or your potential stay that you'd like to know? I'm happy to provide details about amenities, local attractions, or answer any questions you might have.";
          }
        } else if (currentConv.platform === "booking" && currentConv.id === "conv2") {
          if (messageInput.toLowerCase().includes("check") || messageInput.toLowerCase().includes("arrive") || messageInput.toLowerCase().includes("tomorrow")) {
            aiResponse = "For your check-in tomorrow at 6 PM: I've sent the access code to your email. The building is located at 123 Main Street, and your apartment is #405. The elevator is to the right of the lobby. Parking is available in the garage (level P1, spot 23). Call the front desk at 555-1234 if you need any assistance upon arrival.";
          } else if (messageInput.toLowerCase().includes("wifi") || messageInput.toLowerCase().includes("internet")) {
            aiResponse = "The WiFi network name is 'Downtown405' and the password is 'Guest2023!'. The connection is high-speed fiber (300 Mbps) that works throughout the apartment and common areas.";
          } else if (messageInput.toLowerCase().includes("extend") || messageInput.toLowerCase().includes("longer")) {
            aiResponse = "I've checked our availability, and we can extend your stay by up to 3 additional nights if needed. The rate would be the same ($179 per night). Let me know if you'd like to proceed, and I can update your reservation.";
          } else {
            aiResponse = "Thanks for reaching out about your stay at the Downtown Apartment tomorrow. I've noted your arrival time of 6 PM. The electronic keypad will be programmed for your access, and I've prepared a welcome guide with all the apartment details and local recommendations. Is there anything specific you need prepared for your arrival?";
          }
        } else if (currentConv.id === "conv3") {
          if (messageInput.toLowerCase().includes("parking") || lastGuestMessage.includes("parking")) {
            aiResponse = "Yes, there is free parking available at the Mountain Cabin. There's a private driveway with space for up to 2 vehicles. There's also overflow parking available about 100 yards down the road if needed. All parking is included in your reservation at no additional cost.";
          } else if (messageInput.toLowerCase().includes("hike") || messageInput.toLowerCase().includes("trail")) {
            aiResponse = "The cabin is perfectly located for hiking enthusiasts! There are 3 trailheads within a 5-minute walk: Bear Ridge Trail (easy, 2 miles), Summit Path (moderate, 4 miles), and Eagle's View (challenging, 6 miles). I've placed a trail map in the cabin, and there's also a digital copy in your booking confirmation email.";
          } else if (messageInput.toLowerCase().includes("cancel") || messageInput.toLowerCase().includes("refund")) {
            aiResponse = "Our cancellation policy allows for a full refund if canceled 7 days before check-in. For cancellations within 7 days of arrival, we offer a 50% refund. Would you like me to provide more information about rescheduling options?";
          } else {
            aiResponse = "Thank you for your interest in our Mountain Cabin. It's a beautiful retreat with panoramic forest views, a wood-burning fireplace, and modern amenities. The cabin is located 15 minutes from town but feels completely private and secluded. Would you like information about availability or rates for specific dates?";
          }
        } else {
          if (messageInput.toLowerCase().includes("beach") || messageInput.toLowerCase().includes("swim")) {
            aiResponse = "The Beach Villa is just 50 yards from the shoreline with a private path leading directly to the beach. The beach is quiet and not crowded, even during peak season. We provide beach chairs, umbrellas, and towels for guests. There's also a outdoor shower for rinsing off after beach time.";
          } else if (messageInput.toLowerCase().includes("discount") || messageInput.toLowerCase().includes("price") || messageInput.toLowerCase().includes("rate")) {
            aiResponse = "For your July 15-20 dates, I can offer a 10% discount since you'll be staying for 5 nights, bringing the nightly rate to $269. The total would be $1,345 plus taxes. This includes all amenities, cleaning fee, and complimentary welcome basket.";
          } else if (messageInput.toLowerCase().includes("restaurant") || messageInput.toLowerCase().includes("dining") || messageInput.toLowerCase().includes("food")) {
            aiResponse = "There are several great dining options nearby! Within walking distance (5-10 mins): Shoreline Café (casual seafood), Azure Bistro (upscale dining), and Beachcomber (great breakfast spot). I recommend making reservations for dinner places, especially during July. Would you like me to suggest any specific cuisine?";
          } else {
            aiResponse = "I'm happy to assist with your potential Beach Villa booking for 4 guests from July 15-20. The villa comfortably accommodates your group with 2 bedrooms (king bed in master, two queens in second bedroom) and a pull-out sofa if needed. Take your time discussing with your friends - this is a popular property but I can hold these dates for you for 24 hours if you'd like.";
          }
        }
      }
      
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversation) {
          const newAiMessage: Message = {
            id: `msg${Date.now()}`,
            sender: "ai",
            content: aiResponse,
            timestamp: new Date()
          };
          
          return {
            ...conv,
            lastMessage: aiResponse,
            lastActivity: new Date(),
            messages: [...conv.messages, newAiMessage]
          };
        }
        return conv;
      }));
      
      setIsTyping(false);
      
      toast({
        title: "AI Response Sent",
        description: "PropCloud AI has responded to the message"
      });
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'airbnb':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 text-xs">airbnb</Badge>;
      case 'booking':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">booking.com</Badge>;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'whatsapp':
        return <Phone className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-propcloud-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <div className="max-w-7xl mx-auto p-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Communication Hub</CardTitle>
                <CardDescription>
                  Manage all guest conversations across channels with AI assistance
                </CardDescription>
              </CardHeader>
              <Tabs defaultValue="inbox" className="flex h-[calc(100vh-220px)]">
                <TabsList className="flex flex-col h-full border-r w-48 rounded-none bg-transparent gap-0 p-0">
                  <TabsTrigger value="inbox" className="justify-start rounded-none border-b">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Inbox
                  </TabsTrigger>
                  <TabsTrigger value="automated" className="justify-start rounded-none border-b">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Auto-Responses
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="inbox" className="flex-1 p-0 m-0">
                  <div className="flex h-full">
                    <div className="w-80 border-r overflow-auto">
                      <div className="p-4 border-b">
                        <Input 
                          placeholder="Search conversations..." 
                          className="w-full"
                        />
                      </div>
                      <div>
                        {conversations.map((conversation) => (
                          <div 
                            key={conversation.id}
                            className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
                              activeConversation === conversation.id ? 'bg-slate-50' : ''
                            }`}
                            onClick={() => {
                              setActiveConversation(conversation.id);
                              setConversations(prev => prev.map(conv => 
                                conv.id === conversation.id ? { ...conv, unread: false } : conv
                              ));
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={conversation.avatar} />
                                <AvatarFallback>{conversation.initials}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium truncate">
                                    {conversation.guestName}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatDate(conversation.lastActivity)}
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground truncate">
                                  {conversation.lastMessage}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {conversation.property}
                                  </span>
                                  <span className="text-xs">
                                    {getPlatformIcon(conversation.platform)}
                                  </span>
                                  {conversation.unread && (
                                    <div className="w-2 h-2 bg-propcloud-500 rounded-full ml-auto"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      {activeConversation ? (
                        <>
                          <div className="p-4 border-b flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={conversations.find(c => c.id === activeConversation)?.avatar} />
                                <AvatarFallback>
                                  {conversations.find(c => c.id === activeConversation)?.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {conversations.find(c => c.id === activeConversation)?.guestName}
                                </div>
                                <div className="text-xs flex items-center gap-1">
                                  <span className="text-muted-foreground">
                                    {conversations.find(c => c.id === activeConversation)?.property}
                                  </span>
                                  <span>
                                    {getPlatformIcon(conversations.find(c => c.id === activeConversation)?.platform || 'direct')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Button variant="outline" size="sm" onClick={() => {
                                toast({
                                  title: "AI Configuration",
                                  description: "You can configure AI response settings for this conversation"
                                });
                              }}>
                                Configure AI
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex-1 overflow-auto p-4 bg-slate-50">
                            {conversations.find(c => c.id === activeConversation)?.messages.map(message => (
                              <div key={message.id} className="mb-4">
                                <div className={`flex ${message.sender === 'guest' ? 'justify-start' : 'justify-end'}`}>
                                  <div className={`max-w-[80%] rounded-lg p-3 ${
                                    message.sender === 'guest' 
                                      ? 'bg-white text-foreground' 
                                      : message.sender === 'ai'
                                        ? 'bg-propcloud-100 text-foreground'
                                        : 'bg-propcloud-600 text-white'
                                  }`}>
                                    {message.content}
                                    <div className="text-xs mt-1 opacity-70 text-right">
                                      {formatTime(message.timestamp)}
                                      {message.sender === 'ai' && (
                                        <span className="ml-1">· AI</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {isTyping && (
                              <div className="flex justify-start mb-4">
                                <div className="bg-propcloud-100 text-foreground max-w-[80%] rounded-lg p-3">
                                  <div className="flex space-x-1 items-center h-6">
                                    <div className="w-2 h-2 bg-propcloud-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-propcloud-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-propcloud-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type your message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                              />
                              <Button type="submit" disabled={!messageInput.trim()}>
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground italic">
                              AI assistant is enabled for this conversation
                            </div>
                          </form>
                        </>
                      ) : (
                        <div className="h-full flex items-center justify-center text-center p-6">
                          <div>
                            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No conversation selected</h3>
                            <p className="text-muted-foreground mt-2">
                              Select a conversation from the sidebar to view and respond to messages
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="automated" className="flex-1 p-6 m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Automated Responses</CardTitle>
                      <CardDescription>
                        Configure how PropCloud AI responds to common guest inquiries
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-1">Check-in Information</h4>
                          <p className="text-sm text-muted-foreground">
                            AI automatically sends check-in details 24 hours before arrival
                          </p>
                          <div className="flex mt-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Edit Template",
                                description: "You can customize the check-in message template"
                              });
                            }}>
                              Edit Template
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-1">Property Questions</h4>
                          <p className="text-sm text-muted-foreground">
                            AI responds to questions about amenities, location, etc.
                          </p>
                          <div className="flex mt-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Edit Template",
                                description: "You can customize the property information responses"
                              });
                            }}>
                              Edit Template
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-1">Post-Stay Follow-Up</h4>
                          <p className="text-sm text-muted-foreground">
                            AI sends a thank you message and review request after check-out
                          </p>
                          <div className="flex mt-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Edit Template",
                                description: "You can customize the post-stay follow-up message"
                              });
                            }}>
                              Edit Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Communication;
