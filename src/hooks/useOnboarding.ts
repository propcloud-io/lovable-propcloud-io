import { useEffect, useCallback } from 'react';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

interface OnboardingStep {
  element: string;
  intro: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  tooltipClass?: string;
}

const COMMUNICATION_STEPS: OnboardingStep[] = [
  {
    element: '.message-input',
    intro: 'Send messages to your guests through multiple platforms including WhatsApp, email, and SMS.',
    position: 'bottom'
  },
  {
    element: '.message-templates',
    intro: 'Create and manage message templates with variables like guest name, check-in time, and more.',
    position: 'left'
  },
  {
    element: '.message-history',
    intro: 'View your message history and track delivery status for all communications.',
    position: 'right'
  },
  {
    element: '.welcome-message',
    intro: 'Send automated welcome messages to new guests with personalized information.',
    position: 'top'
  }
];

export function useOnboarding() {
  const startTour = useCallback((steps: OnboardingStep[]) => {
    const tour = introJs();
    tour.setOptions({
      steps: steps,
      exitOnOverlayClick: false,
      exitOnEsc: false,
      showProgress: true,
      showBullets: true,
      overlayOpacity: 0.8,
      scrollToElement: true,
      tooltipClass: 'customTooltip'
    });
    tour.start();
  }, []);

  const startCommunicationTour = useCallback(() => {
    startTour(COMMUNICATION_STEPS);
  }, [startTour]);

  return {
    startTour,
    startCommunicationTour
  };
} 