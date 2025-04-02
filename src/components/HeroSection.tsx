
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-block py-1 px-3 rounded-full bg-propcloud-100 text-propcloud-800 text-sm font-medium mb-4">
                NOW IN PRIVATE BETA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-foreground">AI-Powered</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
                Property Management
              </span>{" "}
              <span className="text-foreground">Assistant</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Automate guest communication, booking management, dynamic pricing, 
              and operations so you can focus on growth while maximizing revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="px-8">
                <a href="#waitlist">
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-6">
                <a href="#demo">Watch Demo</a>
              </Button>
            </div>
            <div className="animate-fade-up pt-2 text-muted-foreground text-sm" style={{ animationDelay: "0.5s" }}>
              🔒 Early access spots limited. Join the waitlist to secure your spot.
            </div>
          </div>

          <div className="relative h-[500px] bg-gradient-to-br from-propcloud-50 to-propcloud-100 rounded-2xl shadow-xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This would be replaced with an actual image or animation */}
              <div className="p-6 bg-white rounded-xl shadow-md w-5/6 h-4/5">
                <div className="w-full h-12 bg-propcloud-50 rounded mb-4 flex items-center px-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-propcloud-600 font-medium">PropCloud Dashboard</div>
                </div>
                <div className="w-full h-1/3 bg-propcloud-50 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-24 bg-propcloud-50 rounded"></div>
                  <div className="h-24 bg-propcloud-50 rounded"></div>
                </div>
                <div className="w-full h-1/4 bg-propcloud-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
