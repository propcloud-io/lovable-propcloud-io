import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export interface IntegrationPlaceholderProps {
  title: string;
  description: string;
  onConnect: () => void;
  icon?: string;
}

export function IntegrationPlaceholder({
  title,
  description,
  onConnect,
  icon = 'plus'
}: IntegrationPlaceholderProps) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" onClick={onConnect} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
} 