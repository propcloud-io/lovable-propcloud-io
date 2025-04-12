
import React, { createContext, useContext, useState, useEffect } from 'react';

type OnboardingStep = 'welcome' | 'profile' | 'property' | 'integrations' | 'communication' | 'complete';

interface OnboardingContextType {
  isOnboarding: boolean;
  currentStep: OnboardingStep;
  progress: number;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  goToStep: (step: OnboardingStep) => void;
}

const defaultContext: OnboardingContextType = {
  isOnboarding: false,
  currentStep: 'welcome',
  progress: 0,
  startOnboarding: () => {},
  completeOnboarding: () => {},
  nextStep: () => {},
  prevStep: () => {},
  skipOnboarding: () => {},
  goToStep: () => {}
};

const OnboardingContext = createContext<OnboardingContextType>(defaultContext);

export const useOnboarding = () => useContext(OnboardingContext);

const ONBOARDING_STEPS: OnboardingStep[] = [
  'welcome',
  'profile',
  'property',
  'integrations',
  'communication',
  'complete'
];

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  
  // Load onboarding state from localStorage on initial render
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboarding_completed') === 'true';
    const savedStep = localStorage.getItem('onboarding_step') as OnboardingStep || 'welcome';
    
    if (!onboardingCompleted) {
      // Don't auto-start onboarding here anymore
      // Just set the current step from saved state
      setCurrentStep(savedStep);
    }
  }, []);
  
  // Calculate progress based on current step
  const calculateProgress = (step: OnboardingStep): number => {
    const stepIndex = ONBOARDING_STEPS.indexOf(step);
    return Math.round((stepIndex / (ONBOARDING_STEPS.length - 1)) * 100);
  };
  
  const progress = calculateProgress(currentStep);
  
  const startOnboarding = () => {
    setIsOnboarding(true);
    setCurrentStep('welcome');
    localStorage.setItem('onboarding_started', 'true');
    localStorage.removeItem('onboarding_completed');
  };
  
  const completeOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem('onboarding_completed', 'true');
  };
  
  const nextStep = () => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      const nextStep = ONBOARDING_STEPS[currentIndex + 1];
      setCurrentStep(nextStep);
      localStorage.setItem('onboarding_step', nextStep);
    } else {
      completeOnboarding();
    }
  };
  
  const prevStep = () => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = ONBOARDING_STEPS[currentIndex - 1];
      setCurrentStep(prevStep);
      localStorage.setItem('onboarding_step', prevStep);
    }
  };
  
  const skipOnboarding = () => {
    completeOnboarding();
  };
  
  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    localStorage.setItem('onboarding_step', step);
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        currentStep,
        progress,
        startOnboarding,
        completeOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        goToStep
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
