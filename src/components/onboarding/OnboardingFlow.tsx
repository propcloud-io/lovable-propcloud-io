
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import WelcomeStep from './steps/WelcomeStep';
import ProfileStep from './steps/ProfileStep';
import PropertyStep from './steps/PropertyStep';
import IntegrationsStep from './steps/IntegrationsStep';
import CommunicationStep from './steps/CommunicationStep';
import CompleteStep from './steps/CompleteStep';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const OnboardingFlow: React.FC = () => {
  const { 
    isOnboarding, 
    currentStep, 
    progress, 
    skipOnboarding 
  } = useOnboarding();

  if (!isOnboarding) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'profile':
        return <ProfileStep />;
      case 'property':
        return <PropertyStep />;
      case 'integrations':
        return <IntegrationsStep />;
      case 'communication':
        return <CommunicationStep />;
      case 'complete':
        return <CompleteStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <Dialog open={isOnboarding} onOpenChange={(open) => !open && skipOnboarding()}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0 gap-0">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-propcloud-600">
                PropCloud<span className="text-propcloud-400">.io</span>
              </span>
              <span className="text-sm text-muted-foreground">Onboarding</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipOnboarding}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-2 mb-6" />
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;
