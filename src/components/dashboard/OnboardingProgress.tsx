
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  {
    title: "Connect Booking Channels",
    completed: true,
  },
  {
    title: "Set Up Properties",
    completed: true,
  },
  {
    title: "Configure AI Communication",
    completed: false,
  },
  {
    title: "Set Up Dynamic Pricing",
    completed: false,
  },
];

const OnboardingProgress = () => {
  const completedCount = steps.filter((step) => step.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Setup Progress</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount}/{steps.length} steps
          </span>
        </CardTitle>
        <CardDescription>Complete these steps to set up your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mr-2" />
              )}
              <span className={step.completed ? "text-muted-foreground" : ""}>{step.title}</span>
              {!step.completed && index === completedCount && (
                <Button variant="link" size="sm" className="ml-auto text-propcloud-600">
                  Complete
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {completedCount === steps.length && (
          <div className="bg-green-50 text-green-600 p-2 rounded text-sm text-center">
            All setup steps completed! Your account is fully configured.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingProgress;
