
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ExternalLink, CheckCircle2 } from 'lucide-react';

export interface IntegrationPlaceholderProps {
  title: string;
  description: string;
  onConnect?: () => void;
  platform?: string;
  integrations?: Array<{ name: string; connected: boolean }>;
}

export const IntegrationPlaceholder = ({
  title,
  description,
  onConnect,
  platform,
  integrations = []
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
        {integrations.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center gap-1 bg-background border px-3 py-1 rounded-full text-xs">
                {integration.name}
                {integration.connected && <CheckCircle2 className="h-3 w-3 text-green-500" />}
              </div>
            ))}
          </div>
        )}
        {onConnect && (
          <Button variant="outline" onClick={onConnect}>
            Connect {platform || "Integration"} <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
