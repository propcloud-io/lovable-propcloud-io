
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TourStep = {
  title: string;
  description: string;
  action: string;
  targetSection?: string;
};

type OnboardingTourProps = {
  module: string;
  onComplete?: () => void;
};

const OnboardingTour = ({ module, onComplete }: OnboardingTourProps) => {
  const [tourStep, setTourStep] = useState(0);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const { toast } = useToast();

  // Define tour steps based on current module
  const getTourSteps = (): TourStep[] => {
    switch (module) {
      case "dashboard":
        return [
          {
            title: "Welcome to PropCloud Dashboard",
            description: "This is your command center for managing your properties with AI assistance",
            action: "Next: Navigation"
          },
          {
            title: "Sidebar Navigation",
            description: "Use the sidebar to access all modules of the platform",
            action: "Next: Widgets",
            targetSection: "sidebar"
          },
          {
            title: "Customizable Widgets",
            description: "You can drag and rearrange these widgets according to your preferences",
            action: "Complete Tour"
          }
        ];
      case "sales":
        return [
          {
            title: "Sales Automation",
            description: "Here you can manage your pricing strategy and channel distribution",
            action: "Next: Dynamic Pricing"
          },
          {
            title: "Dynamic Pricing Engine",
            description: "Our AI analyzes market data to optimize your property pricing for maximum revenue",
            action: "Next: Channel Manager"
          },
          {
            title: "Channel Manager",
            description: "Connect to booking platforms like Airbnb and Booking.com",
            action: "Complete Tour"
          }
        ];
      case "communication":
        return [
          {
            title: "Communication Hub",
            description: "All guest messages across channels are managed here by our AI assistant",
            action: "Next: Message Center"
          },
          {
            title: "AI Guest Messaging",
            description: "The AI can respond to inquiries via multiple channels and learns from past interactions",
            action: "Next: Review Management"
          },
          {
            title: "Review Management",
            description: "Automatically collect and respond to guest reviews",
            action: "Complete Tour"
          }
        ];
      case "operations":
        return [
          {
            title: "Operations Center",
            description: "Manage cleaning, maintenance, and staff coordination",
            action: "Next: Task Scheduling"
          },
          {
            title: "Automated Scheduling",
            description: "AI assigns cleaning after checkout and manages maintenance tasks",
            action: "Next: Live Dashboard"
          },
          {
            title: "Live Task Dashboard",
            description: "Monitor real-time updates on all operational activities",
            action: "Complete Tour"
          }
        ];
      default:
        return [
          {
            title: "Welcome to PropCloud",
            description: "This is your AI-powered property management dashboard",
            action: "Next: Continue"
          },
          {
            title: "Explore Features",
            description: "Discover all the capabilities of the platform",
            action: "Complete Tour"
          }
        ];
    }
  };

  const tourSteps = getTourSteps();

  const handleNextStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
      toast({
        title: tourSteps[tourStep + 1].title,
        description: "Tour step " + (tourStep + 2) + " of " + tourSteps.length,
      });
    } else {
      setTourCompleted(true);
      toast({
        title: "Tour Completed!",
        description: `You've completed the ${module} tour`,
      });
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleRestartTour = () => {
    setTourStep(0);
    setTourCompleted(false);
    setMinimized(false);
    toast({
      title: "Tour Restarted",
      description: "Let's go through the features again",
    });
  };

  if (minimized) {
    return (
      <Button 
        onClick={() => setMinimized(false)}
        className="fixed bottom-20 right-4 md:bottom-4 z-50 bg-propcloud-600 hover:bg-propcloud-700 text-white rounded-full shadow-lg"
        size="sm"
      >
        Continue Tour
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50 w-80 shadow-lg border-2 border-propcloud-100 bg-gradient-to-br from-white to-propcloud-50 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {tourCompleted ? "Tour Complete" : tourSteps[tourStep].title}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setMinimized(true)}>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onComplete && onComplete()}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          {tourCompleted 
            ? "You've completed the tour of this section" 
            : tourSteps[tourStep].description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        {tourCompleted ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm">Tour completed! Continue exploring the dashboard.</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {tourSteps.map((_, index) => (
                <span 
                  key={index}
                  className={`block w-2 h-2 rounded-full ${
                    index === tourStep ? "bg-propcloud-600" : "bg-propcloud-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Step {tourStep + 1} of {tourSteps.length}
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          {tourCompleted ? (
            <Button size="sm" onClick={handleRestartTour} className="w-full">
              Restart Tour
            </Button>
          ) : (
            <Button size="sm" onClick={handleNextStep} className="w-full">
              {tourSteps[tourStep].action}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingTour;
