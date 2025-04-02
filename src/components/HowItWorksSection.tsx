
import React from "react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Connect Your Channels",
    description:
      "Integrate all your booking channels including Airbnb, Booking.com, VRBO, and direct booking websites. PropCloud.io centralizes everything.",
  },
  {
    number: "02",
    title: "Train Your AI Assistant",
    description:
      "Customize your AI assistant with your preferred communication style, pricing strategy, and operational workflows.",
  },
  {
    number: "03",
    title: "Activate Automation",
    description:
      "Turn on the features you need. Let AI handle communication, pricing, operations, and marketing automatically.",
  },
  {
    number: "04",
    title: "Monitor & Optimize",
    description:
      "Watch your performance metrics improve while making adjustments to optimize revenue and guest satisfaction.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-propcloud-50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            How{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-propcloud-600 to-propcloud-400">
              PropCloud.io
            </span>{" "}
            Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform integrates seamlessly with your existing systems,
            automating everything from guest communication to revenue optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex">
                <div className="mr-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-propcloud-100 text-propcloud-600 font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-propcloud-100 transform -translate-x-1/2 hidden lg:block"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="px-8">
            <a href="#waitlist">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
