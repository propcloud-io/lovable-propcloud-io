
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WelcomeCard = () => {
  return (
    <Card className="border-2 border-propcloud-100 bg-gradient-to-br from-white to-propcloud-50">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to PropCloud.io Demo</CardTitle>
        <CardDescription>
          Explore the features of our AI-powered property management assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This is a fully interactive demo showcasing PropCloud.io's capabilities.
          Feel free to explore the different sections and features.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">
            Take a Tour
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            View Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
