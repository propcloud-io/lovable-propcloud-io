
import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const availableIntegrations = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    description: 'Connect your Airbnb listings to sync bookings, calendars, and messages.',
    icon: '🏠'
  },
  {
    id: 'booking',
    name: 'Booking.com',
    description: 'Import your Booking.com properties and manage bookings in one place.',
    icon: '🔖'
  },
  {
    id: 'vrbo',
    name: 'Vrbo',
    description: 'Sync your Vrbo properties, rates, and availability automatically.',
    icon: '🏡'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and manage billing for direct bookings.',
    icon: '💳'
  },
  {
    id: 'google',
    name: 'Google Calendar',
    description: 'Sync bookings with your Google Calendar for easy scheduling.',
    icon: '📆'
  }
];

const IntegrationsStep: React.FC = () => {
  const { nextStep, prevStep } = useOnboarding();
  const { toast } = useToast();
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);

  const toggleIntegration = (integrationId: string) => {
    if (connecting) return;
    
    setSelectedIntegrations(prev => {
      if (prev.includes(integrationId)) {
        return prev.filter(id => id !== integrationId);
      } else {
        return [...prev, integrationId];
      }
    });
  };

  const connectIntegration = (integrationId: string) => {
    setConnecting(integrationId);
    
    // Simulate connecting to service
    setTimeout(() => {
      setConnecting(null);
      
      if (!selectedIntegrations.includes(integrationId)) {
        setSelectedIntegrations(prev => [...prev, integrationId]);
      }
      
      toast({
        title: "Integration successful",
        description: `Connected to ${availableIntegrations.find(i => i.id === integrationId)?.name}`,
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save this data to your backend
    localStorage.setItem('user_integrations', JSON.stringify(selectedIntegrations));
    
    toast({
      title: "Integrations saved",
      description: selectedIntegrations.length > 0 
        ? `${selectedIntegrations.length} integrations connected successfully` 
        : "You can always connect integrations later"
    });
    
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Connect Your Channels</h2>
        <p className="text-muted-foreground">
          Link your booking channels and services to streamline your operations
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableIntegrations.map(integration => (
            <Card 
              key={integration.id}
              className={`cursor-pointer transition-all ${
                selectedIntegrations.includes(integration.id) 
                  ? 'border-propcloud-400 bg-propcloud-50' 
                  : ''
              }`}
              onClick={() => toggleIntegration(integration.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{integration.icon}</span>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                  </div>
                  {selectedIntegrations.includes(integration.id) && (
                    <Check className="h-5 w-5 text-propcloud-600" />
                  )}
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  type="button"
                  variant={selectedIntegrations.includes(integration.id) ? "outline" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    connectIntegration(integration.id);
                  }}
                  disabled={connecting === integration.id}
                >
                  {connecting === integration.id
                    ? "Connecting..."
                    : selectedIntegrations.includes(integration.id)
                    ? "Connected"
                    : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row justify-between space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-8">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IntegrationsStep;
