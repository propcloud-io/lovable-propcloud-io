
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Sparkles, Save, Filter, MessagesSquare, RefreshCw } from "lucide-react";

const platforms = [
  { id: "airbnb", name: "Airbnb", color: "bg-red-100 text-red-700" },
  { id: "booking", name: "Booking.com", color: "bg-blue-100 text-blue-700" },
  { id: "vrbo", name: "VRBO", color: "bg-green-100 text-green-700" },
  { id: "direct", name: "Direct", color: "bg-purple-100 text-purple-700" },
  { id: "whatsapp", name: "WhatsApp", color: "bg-emerald-100 text-emerald-700" },
  { id: "messenger", name: "Messenger", color: "bg-indigo-100 text-indigo-700" },
  { id: "instagram", name: "Instagram", color: "bg-pink-100 text-pink-700" },
];

const conversations = [
  {
    id: 1,
    guest: "Sarah Johnson",
    platform: "airbnb",
    property: "Beach Villa",
    lastMessage: "Hi, what's the WiFi password for the property?",
    time: "2m ago",
    unread: true,
    avatar: "SJ",
  },
  {
    id: 2,
    guest: "Michael Brown",
    platform: "booking",
    property: "Downtown Apartment",
    lastMessage: "Is it possible to check in an hour earlier tomorrow?",
    time: "1h ago",
    unread: false,
    avatar: "MB",
  },
  {
    id: 3,
    guest: "Emma Wilson",
    platform: "whatsapp",
    property: "Mountain Cabin",
    lastMessage: "The heating doesn't seem to be working properly.",
    time: "3h ago",
    unread: true,
    avatar: "EW",
  },
  {
    id: 4,
    guest: "David Chen",
    platform: "instagram",
    property: "Beach Villa",
    lastMessage: "I'm interested in booking your property for next month.",
    time: "5h ago",
    unread: false,
    avatar: "DC",
  },
  {
    id: 5,
    guest: "Anna Martinez",
    platform: "direct",
    property: "Downtown Apartment",
    lastMessage: "Thanks for the quick response! Looking forward to our stay.",
    time: "Yesterday",
    unread: false,
    avatar: "AM",
  },
];

// Sample messages for the first conversation
const initialMessages = [
  {
    id: 1,
    sender: "guest",
    content: "Hi there! I'm checking in tomorrow and wanted to know what's the WiFi password for the Beach Villa?",
    time: "10:23 AM",
    isAI: false,
  },
  {
    id: 2,
    sender: "host",
    content: "Hello! The WiFi password is 'BeachVilla2023'. You'll also find it in the welcome booklet on the coffee table. Let me know if you need anything else!",
    time: "10:24 AM",
    isAI: true,
  },
  {
    id: 3,
    sender: "guest",
    content: "Great, thank you! One more question - what's the best way to get to the property from the airport?",
    time: "10:26 AM",
    isAI: false,
  },
];

// AI suggested responses based on the context
const suggestedResponses = {
  airport: [
    "The easiest way to reach Beach Villa from the airport is by taking a taxi, which costs around $40 and takes 30 minutes.",
    "We recommend using the airport shuttle service that runs every hour. It costs $25 per person and drops you directly at the villa.",
    "You can take bus #42 from the airport to Downtown and then transfer to bus #15 which stops right in front of the villa. This takes about 1 hour but only costs $5 per person."
  ],
  checkout: [
    "Checkout time is at 11:00 AM. You can leave the keys on the kitchen counter and simply pull the door closed behind you.",
    "For checkout, please ensure all windows are closed, turn off all appliances, and lock the door when you leave. The cleaning team will arrive at 11:30 AM.",
    "Late checkout might be possible depending on our schedule. Would you like me to check if we can offer a late checkout for your stay?"
  ],
  nearby: [
    "There are several great restaurants within walking distance. I'd recommend 'Ocean View' for seafood and 'Bella Italia' for Italian cuisine, both just 5 minutes away.",
    "The nearest grocery store is 'Market Fresh' which is a 7-minute walk from the villa. They're open daily from 7 AM to 10 PM.",
    "For entertainment, there's a movie theater and shopping mall about 15 minutes away by car. The beach is just a 3-minute walk from your door."
  ]
};

const AIMessagingCenter = () => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [isTyping, setIsTyping] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  // Function to detect message context and provide relevant suggestions
  const analyzeMessageContext = (msg: string) => {
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes("airport") || lowerMsg.includes("transportation") || lowerMsg.includes("get to") || lowerMsg.includes("arrive")) {
      return suggestedResponses.airport;
    } else if (lowerMsg.includes("checkout") || lowerMsg.includes("leave") || lowerMsg.includes("departing")) {
      return suggestedResponses.checkout;
    } else if (lowerMsg.includes("restaurant") || lowerMsg.includes("food") || lowerMsg.includes("eat") || lowerMsg.includes("store") || lowerMsg.includes("shop")) {
      return suggestedResponses.nearby;
    }
    
    return [];
  };
  
  useEffect(() => {
    // Analyze last guest message when conversation changes
    const lastGuestMessage = [...messages].reverse().find(m => m.sender === "guest");
    if (lastGuestMessage) {
      const suggestions = analyzeMessageContext(lastGuestMessage.content);
      setAiSuggestions(suggestions);
    }
  }, [messages, selectedConversation]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "host",
      content: newMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isAI: false,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate guest typing and response after a delay
    if (Math.random() > 0.5) {
      simulateGuestResponse();
    }
  };
  
  const simulateGuestResponse = () => {
    // Show typing indicator
    setIsTyping(true);
    
    // Random delay between 3-8 seconds
    const responseDelay = Math.floor(Math.random() * 5000) + 3000;
    
    setTimeout(() => {
      setIsTyping(false);
      
      const guestResponses = [
        "Thanks for the information! That's very helpful.",
        "Perfect, I appreciate your help!",
        "Great, looking forward to our stay!",
        "One more question - are there any good restaurants nearby?",
        "Got it! What time is checkout on our last day?",
      ];
      
      const randomResponse = guestResponses[Math.floor(Math.random() * guestResponses.length)];
      
      const guestMsg = {
        id: messages.length + 2,
        sender: "guest",
        content: randomResponse,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isAI: false,
      };
      
      setMessages(prev => [...prev, guestMsg]);
      
      // Update AI suggestions based on the new guest message
      setAiSuggestions(analyzeMessageContext(randomResponse));
    }, responseDelay);
  };
  
  const handleGenerateAIResponse = () => {
    setIsGeneratingAI(true);
    
    // Simulate AI generation with a small delay
    setTimeout(() => {
      // Get suggestions based on the latest guest message
      const lastGuestMessage = [...messages].reverse().find(m => m.sender === "guest");
      let suggestions = [];
      
      if (lastGuestMessage) {
        suggestions = analyzeMessageContext(lastGuestMessage.content);
      }
      
      // If we have suggestions, use one; otherwise use a default response
      if (suggestions.length > 0) {
        setNewMessage(suggestions[Math.floor(Math.random() * suggestions.length)]);
      } else {
        setNewMessage("Thank you for your message. Is there anything else I can help you with during your stay at Beach Villa?");
      }
      
      setIsGeneratingAI(false);
      
      toast({
        title: "AI Response Generated",
        description: "AI assistant has drafted a response for your review.",
      });
    }, 1200);
  };
  
  const handleSaveResponseTemplate = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Template Saved",
      description: "This response has been saved as a template for future use.",
    });
  };
  
  const handleUseSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const filteredConversations = platformFilter === "all" 
    ? conversations 
    : conversations.filter(conv => conv.platform === platformFilter);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CardTitle className="flex items-center">
          <MessagesSquare className="mr-2 h-5 w-5" />
          Guest Messaging Center
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {platforms.map(platform => (
                <SelectItem key={platform.id} value={platform.id}>{platform.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <div className="flex h-[32rem] border-t">
          {/* Conversation List */}
          <div className="w-full sm:w-1/3 lg:w-1/4 border-r overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-medium">Recent Messages</h3>
              <Badge>{conversations.filter(c => c.unread).length} New</Badge>
            </div>
            <div className="divide-y">
              {filteredConversations.map((conv) => (
                <div 
                  key={conv.id} 
                  className={`p-3 hover:bg-slate-50 cursor-pointer ${selectedConversation === conv.id ? 'bg-slate-50' : ''}`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>{conv.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <div className="flex justify-between">
                        <span className="font-medium">{conv.guest}</span>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={`text-xs ${platforms.find(p => p.id === conv.platform)?.color}`}>
                          {platforms.find(p => p.id === conv.platform)?.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">{conv.property}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unread && <div className="mt-1 w-2 h-2 rounded-full bg-propcloud-500 ml-auto"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Thread */}
          <div className="hidden sm:flex flex-col flex-1">
            <div className="p-3 border-b flex justify-between items-center">
              <div>
                <h3 className="font-medium">{conversations.find(c => c.id === selectedConversation)?.guest}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${platforms.find(p => p.id === conversations.find(c => c.id === selectedConversation)?.platform)?.color}`}>
                    {platforms.find(p => p.id === conversations.find(c => c.id === selectedConversation)?.platform)?.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{conversations.find(c => c.id === selectedConversation)?.property}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleGenerateAIResponse} disabled={isGeneratingAI}>
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1" /> AI Draft
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'host' ? 'justify-end' : ''}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'host' 
                        ? 'bg-propcloud-100 text-propcloud-900' 
                        : 'bg-slate-100'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                      {message.isAI && (
                        <Badge variant="outline" className="text-xs ml-2">AI Generated</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex">
                  <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1 items-center h-6">
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* AI suggested responses */}
            {aiSuggestions.length > 0 && (
              <div className="px-3 py-2 border-t bg-slate-50">
                <p className="text-xs text-muted-foreground mb-2">AI Suggested Responses:</p>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="text-xs text-left whitespace-normal h-auto py-1"
                      onClick={() => handleUseSuggestion(suggestion)}
                    >
                      <span className="line-clamp-2">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {newMessage && (
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={handleSaveResponseTemplate}>
                    <Save className="h-3 w-3 mr-1" /> Save as Template
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIMessagingCenter;
