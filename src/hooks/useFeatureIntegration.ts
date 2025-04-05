import { useState, useEffect } from 'react';
import { featureIntegrationService } from '@/services/featureIntegrationService';
import { Task, Notification } from '@/services/featureIntegrationService';

export function useFeatureIntegration() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeIntegration();
  }, []);

  const initializeIntegration = async () => {
    try {
      setIsLoading(true);
      await featureIntegrationService.initialize();
      await Promise.all([
        fetchTasks(),
        fetchNotifications()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize feature integration'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await featureIntegrationService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
    }
  };

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await featureIntegrationService.getNotifications();
      setNotifications(fetchedNotifications);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
    }
  };

  const handleMaintenanceRequest = async (bookingId: string, propertyId: string, description: string) => {
    try {
      await featureIntegrationService.handleMaintenanceRequest(bookingId, propertyId, description);
      await Promise.all([fetchTasks(), fetchNotifications()]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to handle maintenance request'));
      throw err;
    }
  };

  const handleBookingStatusChange = async (bookingId: string, status: string) => {
    try {
      await featureIntegrationService.handleBookingStatusChange(bookingId, status);
      await Promise.all([fetchTasks(), fetchNotifications()]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to handle booking status change'));
      throw err;
    }
  };

  const handlePaymentStatusChange = async (bookingId: string, status: string) => {
    try {
      await featureIntegrationService.handlePaymentStatusChange(bookingId, status);
      await Promise.all([fetchTasks(), fetchNotifications()]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to handle payment status change'));
      throw err;
    }
  };

  return {
    tasks,
    notifications,
    isLoading,
    error,
    handleMaintenanceRequest,
    handleBookingStatusChange,
    handlePaymentStatusChange,
    refreshTasks: fetchTasks,
    refreshNotifications: fetchNotifications
  };
} 