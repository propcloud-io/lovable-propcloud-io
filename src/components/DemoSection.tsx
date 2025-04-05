
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, DollarSign, Calendar } from "lucide-react";

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <section id="demo" className="py-20 bg-propcloud-50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            See PropCloud.io{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
              in Action
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover how our AI assistant handles real property management scenarios,
            from automated sales to operations management.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="sales" className="animate-fade-up" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="sales">Sales Automation</TabsTrigger>
                <TabsTrigger value="communication">Guest Communication</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sales">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-white p-6 rounded-t-xl border-b">
                    <h3 className="font-semibold text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-propcloud-600" />
                      Direct Booking Automation
                    </h3>
                  </div>
                  <div className="bg-white p-6">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium">Instagram Message</h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">New Inquiry</span>
                      </div>
                      
                      {/* Simulated chat conversation */}
                      <div className="border rounded-lg p-3 mb-4">
                        <div className="flex items-start mb-3">
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0 mr-2"></div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">John Smith • 2 hours ago</p>
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <p className="text-sm">Hi, I saw your beach house on Instagram. Is it available next weekend? How much would it cost for 4 people?</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start mb-3">
                          <div className="h-8 w-8 bg-propcloud-100 rounded-full flex-shrink-0 mr-2 flex items-center justify-center">
                            <span className="text-xs font-medium text-propcloud-600">AI</span>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">PropCloud AI • 2 hours ago</p>
                            <div className="bg-propcloud-50 p-2 rounded-lg">
                              <p className="text-sm">Hello John! Yes, our Luxury Beach Villa is available next weekend (Oct 27-29). For 4 guests, the total cost would be $799 for 2 nights, including all fees. Would you like to secure this booking?</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0 mr-2"></div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">John Smith • 1 hour ago</p>
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <p className="text-sm">That sounds great! How do I book it?</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment automation */}
                      <div className="bg-white border rounded-lg p-4">
                        <h5 className="text-sm font-medium mb-2">AI Generated Booking Link</h5>
                        <div className="bg-propcloud-50 rounded-lg p-3 flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">Secure Payment Link Created</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Automatic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Sales Automation</h4>
                  <p className="text-muted-foreground mb-6">
                    Our AI assistant manages the entire sales process from inquiry to payment, turning social media conversations into direct bookings.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Direct Booking via Social Media</span>
                        <span className="text-sm text-muted-foreground">AI chatbot manages inquiries, confirms availability, and processes payments via Facebook/Instagram Messenger</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Dynamic Pricing</span>
                        <span className="text-sm text-muted-foreground">AI adjusts rates based on 20+ variables including demand, competitor rates, and local events</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Marketing Automation</span>
                        <span className="text-sm text-muted-foreground">AI creates and runs targeted campaigns to fill vacancy gaps and maximize bookings</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="communication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-white p-6 rounded-t-xl border-b">
                    <h3 className="font-semibold text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-propcloud-600" />
                      Multi-Channel Inbox
                    </h3>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <div className="bg-white rounded-lg p-3 mb-3 max-w-[80%]">
                      <p className="text-sm">Hi, I'm interested in booking your Beach Villa for next weekend. Is it available?</p>
                      <p className="text-xs text-gray-500 mt-1">Guest - Airbnb</p>
                    </div>
                    <div className="bg-propcloud-100 rounded-lg p-3 mb-3 ml-auto max-w-[80%]">
                      <p className="text-sm">Hello! Thanks for your interest in our Beach Villa. Yes, it's available for next weekend. The rate is $299 per night. Would you like me to hold it for you?</p>
                      <p className="text-xs text-gray-500 mt-1">PropCloud AI</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">That sounds great. What's the check-in process?</p>
                      <p className="text-xs text-gray-500 mt-1">Guest - Airbnb</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">AI Guest Communication</h4>
                  <p className="text-muted-foreground mb-6">
                    Our AI assistant handles inquiries across all platforms instantly, providing detailed property information, answering questions, and managing bookings.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Responds within seconds, 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Handles multiple conversation threads simultaneously</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Trained on your properties and preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operations">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-white p-6 rounded-t-xl border-b">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-propcloud-600" />
                      Operations Calendar
                    </h3>
                  </div>
                  <div className="bg-white p-4">
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div key={i} className="text-center text-xs font-medium">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(31).fill(null).map((_, i) => {
                        if (i < 2) return <div key={i} className="aspect-square"></div>;
                        const day = i - 1;
                        let bgColor = "bg-gray-100";
                        let textColor = "text-gray-700";
                        let content = null;
                        
                        if ([4, 5, 11, 12, 18, 19, 25, 26].includes(day)) {
                          bgColor = "bg-propcloud-100";
                          textColor = "text-propcloud-700";
                        }
                        
                        if ([7, 8, 9, 21, 22, 23].includes(day)) {
                          bgColor = "bg-blue-100";
                          textColor = "text-blue-700";
                          content = <div className="text-[8px] leading-tight">Booked</div>;
                        }
                        
                        if ([10, 20, 28].includes(day)) {
                          bgColor = "bg-green-100";
                          textColor = "text-green-700";
                          content = <div className="text-[8px] leading-tight">Clean</div>;
                        }

                        return (
                          <div key={i} className={`aspect-square ${bgColor} rounded p-1 flex flex-col items-center justify-center text-xs ${textColor}`}>
                            <div>{day}</div>
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">Operations Automation</h4>
                  <p className="text-muted-foreground mb-6">
                    PropCloud.io streamlines your cleaning schedules, maintenance tasks, and staff coordination automatically based on bookings.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Automatic cleaning scheduling based on check-ins/outs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Smart task assignment based on staff location and availability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Quality control checklists and photo verification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
