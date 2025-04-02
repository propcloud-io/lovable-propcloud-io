
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Pause } from "lucide-react";

const DemoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (videoId: string) => {
    setActiveVideo(videoId);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

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
          <Tabs defaultValue="communication" className="animate-fade-up">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="communication">Guest Communication</TabsTrigger>
                <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="communication">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-xl">
                {!isPlaying || activeVideo !== "communication" ? (
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
                        onClick={() => handlePlay("communication")}
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black relative">
                    <video 
                      className="w-full h-full object-contain" 
                      controls 
                      autoPlay 
                      onPause={handlePause}
                    >
                      <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                      AI Communication Demo
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Instant responses to guest inquiries across all connected platforms</li>
                  <li>Trained AI that handles booking questions, property details, and local recommendations</li>
                  <li>Seamless escalation to human staff when needed</li>
                  <li>Multilingual support for global guests</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-xl">
                {!isPlaying || activeVideo !== "pricing" ? (
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
                      <Button 
                        size="lg" 
                        className="rounded-full"
                        onClick={() => handlePlay("pricing")}
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black relative">
                    <video 
                      className="w-full h-full object-contain" 
                      controls 
                      autoPlay
                      onPause={handlePause}
                    >
                      <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                      Dynamic Pricing Demo
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Real-time market analysis and competitor tracking</li>
                  <li>Seasonal demand forecasting and event-based price adjustments</li>
                  <li>Custom rules engine for fine-grained control</li>
                  <li>Profit margin optimization across all booking channels</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="operations">
              <div className="aspect-video relative bg-black rounded-xl overflow-hidden shadow-xl">
                {!isPlaying || activeVideo !== "operations" ? (
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
                      <Button 
                        size="lg" 
                        className="rounded-full"
                        onClick={() => handlePlay("operations")}
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black relative">
                    <video 
                      className="w-full h-full object-contain" 
                      controls 
                      autoPlay
                      onPause={handlePause}
                    >
                      <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                      Operations Demo
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Automated cleaning and maintenance scheduling</li>
                  <li>Smart task assignment to staff based on location and availability</li>
                  <li>Quality control checklists and photo verification</li>
                  <li>Real-time issue reporting and resolution tracking</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
