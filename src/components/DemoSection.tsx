
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, DollarSign, Calendar } from "lucide-react";

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState("communication");

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
            from guest inquiries to dynamic pricing adjustments.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="communication" className="animate-fade-up" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="communication">Guest Communication</TabsTrigger>
                <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="communication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-white p-6 rounded-t-xl border-b">
                    <h3 className="font-semibold text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-propcloud-600" />
                      Guest Conversation
                    </h3>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <div className="bg-white rounded-lg p-3 mb-3 max-w-[80%]">
                      <p className="text-sm">Hi, I'm interested in booking your Beach Villa for next weekend. Is it available?</p>
                      <p className="text-xs text-gray-500 mt-1">Guest - 2:34 PM</p>
                    </div>
                    <div className="bg-propcloud-100 rounded-lg p-3 mb-3 ml-auto max-w-[80%]">
                      <p className="text-sm">Hello! Thanks for your interest in our Beach Villa. Yes, it's available for next weekend. The rate is $299 per night. Would you like me to hold it for you?</p>
                      <p className="text-xs text-gray-500 mt-1">PropCloud AI - 2:35 PM</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">That sounds great. What's the check-in process?</p>
                      <p className="text-xs text-gray-500 mt-1">Guest - 2:38 PM</p>
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
                  <Button className="mt-6" onClick={() => window.location.href = "/dashboard/communication"}>
                    Try Demo Dashboard
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-white p-6 rounded-t-xl border-b">
                    <h3 className="font-semibold text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-propcloud-600" />
                      Dynamic Pricing Engine
                    </h3>
                  </div>
                  <div className="bg-white p-4">
                    <div className="mb-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Current Price</span>
                        <span className="text-sm font-medium">$249/night</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Recommended</span>
                        <span className="text-sm font-medium text-green-600">$299/night</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full mt-2">
                        <div className="h-full bg-gradient-to-r from-propcloud-400 to-propcloud-600 rounded-full" style={{width: "82%"}}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Min: $199</span>
                        <span>Optimal</span>
                        <span>Max: $349</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between p-2 bg-green-50 rounded border border-green-100">
                        <span className="text-sm">Local event detected</span>
                        <span className="text-sm text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 rounded border border-blue-100">
                        <span className="text-sm">Weekend premium</span>
                        <span className="text-sm text-blue-600">+10%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-amber-50 rounded border border-amber-100">
                        <span className="text-sm">Competitive analysis</span>
                        <span className="text-sm text-amber-600">+5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3">Dynamic Pricing Intelligence</h4>
                  <p className="text-muted-foreground mb-6">
                    Our AI constantly analyzes market data, seasonal trends, and competitor rates to optimize your property pricing for maximum revenue.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Analyzes 20+ variables to set optimal prices</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Automatically adjusts for local events and demand shifts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-propcloud-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-propcloud-600 rounded-full"></div>
                      </div>
                      <span>Average 15-30% revenue increase for properties</span>
                    </li>
                  </ul>
                  <Button className="mt-6" onClick={() => window.location.href = "/dashboard/pricing"}>
                    Try Demo Dashboard
                  </Button>
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
                  <Button className="mt-6" onClick={() => window.location.href = "/dashboard"}>
                    Try Demo Dashboard
                  </Button>
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
