
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const { nextStep, skipOnboarding } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome to PropCloud.io</h2>
        <p className="text-muted-foreground">
          The AI-powered property management solution that simplifies hosting
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-slate-50 rounded-lg text-center">
          <div className="bg-propcloud-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-propcloud-600 font-bold text-lg">1</span>
          </div>
          <h3 className="font-medium mb-1">AI-Powered Messaging</h3>
          <p className="text-sm text-muted-foreground">Automated guest communication across all channels</p>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg text-center">
          <div className="bg-propcloud-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-propcloud-600 font-bold text-lg">2</span>
          </div>
          <h3 className="font-medium mb-1">Dynamic Pricing</h3>
          <p className="text-sm text-muted-foreground">Optimize your revenue with market-responsive rates</p>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg text-center">
          <div className="bg-propcloud-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-propcloud-600 font-bold text-lg">3</span>
          </div>
          <h3 className="font-medium mb-1">Operational Automation</h3>
          <p className="text-sm text-muted-foreground">Streamline cleaning, maintenance and staff coordination</p>
        </div>
      </div>
      
      <div className="flex flex-col-reverse sm:flex-row justify-between space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-8">
        <Button variant="outline" onClick={skipOnboarding}>
          Skip Setup
        </Button>
        <Button onClick={nextStep}>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
