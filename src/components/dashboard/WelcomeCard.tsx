
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WelcomeCard = () => {
  const [tourStep, setTourStep] = useState(0);
  const [tourCompleted, setTourCompleted] = useState(false);
  const { toast } = useToast();
  
  const tourSteps = [
    {
      title: "Welcome to PropCloud.io",
      description: "This is your AI-powered property management dashboard",
      action: "Next: Dashboard Overview",
    },
    {
      title: "Dashboard Overview",
      description: "Here you can see all your key metrics and performance indicators at a glance",
      action: "Next: Communication Hub",
    },
    {
      title: "Communication Hub",
      description: "All your guest messages across channels are managed in one place by our AI assistant",
      action: "Next: Dynamic Pricing",
    },
    {
      title: "Dynamic Pricing",
      description: "Our AI analyzes market data to optimize your property pricing for maximum revenue",
      action: "Next: Operations",
    },
    {
      title: "Operations",
      description: "Cleaning, maintenance, and staff coordination are all automated for efficiency",
      action: "Complete Tour",
    },
  ];

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
        description: "You're all set to explore the PropCloud.io dashboard",
      });
    }
  };

  const handleViewDocs = () => {
    toast({
      title: "Documentation",
      description: "PropCloud.io documentation would open in a new tab",
    });
  };

  const handleRestartTour = () => {
    setTourStep(0);
    setTourCompleted(false);
    toast({
      title: "Tour Restarted",
      description: "Let's go through the features again",
    });
  };

  return (
    <Card className="border-2 border-propcloud-100 bg-gradient-to-br from-white to-propcloud-50">
      <CardHeader>
        <CardTitle className="text-2xl">
          {tourCompleted ? "Welcome to PropCloud.io Demo" : tourSteps[tourStep].title}
        </CardTitle>
        <CardDescription>
          {tourCompleted 
            ? "Explore the features of our AI-powered property management assistant" 
            : tourSteps[tourStep].description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {tourCompleted ? (
          <>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <p>Tour completed! Feel free to explore the dashboard.</p>
            </div>
            <p>
              This is a fully interactive demo showcasing PropCloud.io's capabilities.
              Explore the different sections and features.
            </p>
          </>
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
            <p className="text-sm text-muted-foreground">
              Step {tourStep + 1} of {tourSteps.length}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4">
          {tourCompleted ? (
            <>
              <Button size="sm" onClick={handleRestartTour}>
                Restart Tour
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleViewDocs}>
                View Documentation
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={handleNextStep}>
              {tourSteps[tourStep].action}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
