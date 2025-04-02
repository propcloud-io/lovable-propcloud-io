
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle } from "lucide-react";

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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
            Watch how our AI assistant handles real property management scenarios,
            from guest inquiries to dynamic pricing adjustments.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="communication">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="communication">Guest Communication</TabsTrigger>
                <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="communication">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-xl">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-propcloud-600/90 w-full h-full absolute"></div>
                    <div className="relative z-10 text-center px-4">
                      <h3 className="text-white text-2xl font-semibold mb-4">
                        AI Guest Communication Demo
                      </h3>
                      <p className="text-white/90 mb-6">
                        See how PropCloud's AI handles multiple guest inquiries simultaneously
                        across different channels.
                      </p>
                      <Button
                        size="lg"
                        className="rounded-full"
                        onClick={() => setIsPlaying(true)}
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-propcloud-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <h3 className="text-xl font-medium mb-4">Demo Video Placeholder</h3>
                      <p className="text-muted-foreground">
                        In a real implementation, this would play an embedded video
                        showcasing the AI communication features.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-propcloud-800/90 w-full h-full absolute"></div>
                  <div className="relative z-10 text-center px-4">
                    <h3 className="text-white text-2xl font-semibold mb-4">
                      Dynamic Pricing Optimization
                    </h3>
                    <p className="text-white/90 mb-6">
                      Watch how PropCloud's AI analyzes market data to suggest optimal pricing
                      strategies that maximize revenue.
                    </p>
                    <Button size="lg" className="rounded-full">
                      <PlayCircle className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operations">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-propcloud-700/90 w-full h-full absolute"></div>
                  <div className="relative z-10 text-center px-4">
                    <h3 className="text-white text-2xl font-semibold mb-4">
                      Operations Automation
                    </h3>
                    <p className="text-white/90 mb-6">
                      See how PropCloud streamlines cleaning schedules, maintenance tasks, and staff
                      coordination automatically.
                    </p>
                    <Button size="lg" className="rounded-full">
                      <PlayCircle className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </div>
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
