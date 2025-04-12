
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CompleteStep: React.FC = () => {
  const { completeOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = (destination: string) => {
    completeOnboarding();
    
    toast({
      title: "Onboarding complete",
      description: "Welcome to PropCloud.io! Your account is ready to use."
    });
    
    navigate(destination);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Your PropCloud Account is Ready!</h2>
        <p className="text-muted-foreground">
          You've successfully set up your account and are ready to start managing your properties with ease
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-6 bg-slate-50 rounded-lg text-center flex flex-col items-center">
          <Zap className="h-10 w-10 text-amber-500 mb-4" />
          <h3 className="font-medium mb-2">Explore Features</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Discover all the powerful tools PropCloud offers to streamline your property management
          </p>
          <Button 
            className="mt-auto"
            onClick={() => handleComplete('/dashboard')}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 bg-slate-50 rounded-lg text-center flex flex-col items-center">
          <CheckCircle2 className="h-10 w-10 text-propcloud-600 mb-4" />
          <h3 className="font-medium mb-2">Add Your First Property</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start managing your properties right away by setting up your first listing
          </p>
          <Button 
            variant="outline"
            className="mt-auto"
            onClick={() => handleComplete('/dashboard/operations')}
          >
            Add Property
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="bg-propcloud-50 p-4 rounded-lg border border-propcloud-100 flex items-center justify-center mt-6">
        <p className="text-sm">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@propcloud.io" className="text-propcloud-600 font-medium">
            support@propcloud.io
          </a>
        </p>
      </div>
    </div>
  );
};

export default CompleteStep;
