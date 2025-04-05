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
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
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

          {/* Dashboard Preview - Actual dashboard screenshot */}
          <div className="relative h-[500px] rounded-2xl shadow-xl animate-fade-up overflow-hidden" style={{ animationDelay: "0.4s" }}>
            {/* Dashboard Header */}
            <div className="h-14 bg-white">
              <div className="flex items-center">
                <span className="text-lg font-bold text-propcloud-600">
                  PropCloud<span className="text-propcloud-400">.io</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-propcloud-100 flex items-center justify-center">
                  <span className="text-sm font-medium">PC</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex h-[calc(100%-3.5rem)]">
              {/* Sidebar */}
              <div className="w-48 border-r h-full py-2 px-3">
                <div className="space-y-1">
                  {[
                    { name: "Dashboard", active: true },
                    { name: "Analytics", active: false },
                    { name: "Communication", active: false },
                    { name: "Bookings", active: false },
                    { name: "Sales Automation", active: false },
                    { name: "Operations", active: false },
                    { name: "Settings", active: false }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center px-2 py-1.5 rounded-md text-sm ${
                        item.active
                          ? "bg-propcloud-50 text-propcloud-600"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="w-4 h-4 mr-2 bg-current opacity-60 rounded-sm" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 overflow-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
                  <p className="text-sm text-gray-500">Here's what's happening with your properties today</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Total Revenue", value: "$12,845", change: "+5.2%" },
                    { label: "Occupancy Rate", value: "76%", change: "+2.1%" },
                    { label: "Bookings", value: "48", change: "+12" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-xs text-green-600">{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="col-span-2 bg-white border rounded-lg p-4 h-48 flex items-center justify-center">
                    <div className="text-gray-400">Revenue Chart</div>
                  </div>
                  <div className="bg-white border rounded-lg p-4 h-48 flex items-center justify-center">
                    <div className="text-gray-400">Guest Communication</div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Recent Bookings</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex justify-between border-b pb-2">
                        <div className="text-sm">Beach Villa</div>
                        <div className="text-sm text-gray-500">Oct 15 - Oct 20</div>
                        <div className="text-sm">$1,240</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
