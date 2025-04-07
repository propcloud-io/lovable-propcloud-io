
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ExternalLink } from 'lucide-react';

export interface IntegrationPlaceholderProps {
  title: string;
  description: string;
  onConnect: () => void;
  platform?: string;
}

export const IntegrationPlaceholder = ({
  title,
  description,
  onConnect,
  platform
}: IntegrationPlaceholderProps) => {
  return (
    <Card className="border-dashed bg-muted/50 mb-6">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {description}
          </p>
        </div>
        <Button variant="outline" onClick={onConnect}>
          Connect {platform || "Integration"} <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
