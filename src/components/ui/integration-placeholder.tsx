
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface IntegrationPlaceholderProps {
  title: string;
  description: string;
  platform?: string;
  onConnect: () => void;
}

const IntegrationPlaceholder: React.FC<IntegrationPlaceholderProps> = ({
  title,
  description,
  platform,
  onConnect
}) => {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {platform && (
          <p className="text-sm text-muted-foreground mb-4">
            Connect to {platform} to enable this feature
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={onConnect} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationPlaceholder;
