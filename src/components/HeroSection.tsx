
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="space-y-8 max-w-xl mx-auto text-center">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-block py-1 px-3 rounded-full bg-propcloud-100 text-propcloud-800 text-sm font-medium mb-4">
                NOW IN PRIVATE BETA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-foreground">All-in-One</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
                Property Management
              </span>{" "}
              <span className="text-foreground">Platform</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Automate your entire property management workflow with AI-powered tools for communication, bookings, 
              dynamic pricing, operations, and analytics - all in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up justify-center" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="px-8">
                <a href="#waitlist">
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="animate-fade-up pt-2 text-muted-foreground text-sm" style={{ animationDelay: "0.5s" }}>
              🔒 Early access spots limited. Join the waitlist to secure your spot.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
