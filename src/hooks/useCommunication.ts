import { useState, useCallback } from 'react';
import { CommunicationService } from '@/services/communicationService';
import { ApiError } from '@/services/baseApi';
import { useToast } from '@/hooks/use-toast';

export function useCommunication() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const communicationService = new CommunicationService();

  const handleGuestMessage = useCallback(async (message: {
    id: string;
    from: string;
    message: string;
    platform: 'whatsapp' | 'email' | 'sms';
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await communicationService.handleGuestMessage({
        ...message,
        timestamp: new Date().toISOString(),
        status: 'processing'
      });

      toast({
        title: 'Message Sent',
        description: 'AI response has been sent to the guest.',
      });

      return response;
    } catch (err) {
      const error = err instanceof ApiError ? err : new Error('Failed to handle guest message');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const sendAutomatedMessage = useCallback(async (
    to: string,
    template: string,
    language: string = 'en',
    components: any[] = []
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await communicationService.sendAutomatedMessage(
        to,
        template,
        language,
        components
      );

      toast({
        title: 'Message Sent',
        description: 'Automated message has been sent successfully.',
      });

      return response;
    } catch (err) {
      const error = err instanceof ApiError ? err : new Error('Failed to send automated message');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const checkMessageStatus = useCallback(async (messageId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const status = await communicationService.checkMessageStatus(messageId);
      return status;
    } catch (err) {
      const error = err instanceof ApiError ? err : new Error('Failed to check message status');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    handleGuestMessage,
    sendAutomatedMessage,
    checkMessageStatus,
    isLoading,
    error
  };
} 