import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface IntegrationPlaceholderProps {
  title: string;
  description: string;
  platform: string;
  onConnect?: () => void;
}

export function IntegrationPlaceholder({
  title,
  description,
  platform,
  onConnect
}: IntegrationPlaceholderProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-muted rounded-lg">
          <Info className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {onConnect && (
            <Button
              variant="outline"
              size="sm"
              onClick={onConnect}
              className="mt-2"
            >
              Connect {platform}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
} 