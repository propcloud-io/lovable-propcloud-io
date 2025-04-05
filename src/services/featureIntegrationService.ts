import { ApiError } from './baseApi';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: string;
  relatedBookingId?: string;
  relatedPropertyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'task' | 'booking' | 'message' | 'payment';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}

class FeatureIntegrationService {
  private static instance: FeatureIntegrationService;
  private isInitialized = false;
  private tasks: Task[] = [];
  private notifications: Notification[] = [];

  private constructor() {}

  static getInstance(): FeatureIntegrationService {
    if (!FeatureIntegrationService.instance) {
      FeatureIntegrationService.instance = new FeatureIntegrationService();
    }
    return FeatureIntegrationService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  // Task Management
  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newTask: Task = {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.tasks.push(newTask);
      return newTask;
    } catch (error) {
      throw new ApiError('Failed to create task', error);
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.tasks;
    } catch (error) {
      throw new ApiError('Failed to fetch tasks', error);
    }
  }

  // Notification Management
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        read: false
      };
      this.notifications.push(newNotification);
      return newNotification;
    } catch (error) {
      throw new ApiError('Failed to create notification', error);
    }
  }

  async getNotifications(): Promise<Notification[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.notifications;
    } catch (error) {
      throw new ApiError('Failed to fetch notifications', error);
    }
  }

  // Cross-feature Integration Methods
  async handleMaintenanceRequest(bookingId: string, propertyId: string, description: string): Promise<void> {
    try {
      // Create a maintenance task
      await this.createTask({
        title: 'Maintenance Request',
        description,
        status: 'pending',
        priority: 'medium',
        relatedBookingId: bookingId,
        relatedPropertyId: propertyId
      });

      // Create a notification
      await this.createNotification({
        type: 'task',
        title: 'New Maintenance Request',
        message: `Maintenance request created for booking ${bookingId}`,
        relatedId: bookingId,
        read: false
      });
    } catch (error) {
      throw new ApiError('Failed to handle maintenance request', error);
    }
  }

  async handleBookingStatusChange(bookingId: string, status: string): Promise<void> {
    try {
      // Create a notification for booking status change
      await this.createNotification({
        type: 'booking',
        title: 'Booking Status Updated',
        message: `Booking ${bookingId} status changed to ${status}`,
        relatedId: bookingId,
        read: false
      });

      // If booking is cancelled, create a cleanup task
      if (status === 'cancelled') {
        await this.createTask({
          title: 'Cleanup Cancelled Booking',
          description: `Clean up and process refund for cancelled booking ${bookingId}`,
          status: 'pending',
          priority: 'high',
          relatedBookingId: bookingId
        });
      }
    } catch (error) {
      throw new ApiError('Failed to handle booking status change', error);
    }
  }

  async handlePaymentStatusChange(bookingId: string, status: string): Promise<void> {
    try {
      // Create a notification for payment status change
      await this.createNotification({
        type: 'payment',
        title: 'Payment Status Updated',
        message: `Payment status for booking ${bookingId} changed to ${status}`,
        relatedId: bookingId,
        read: false
      });

      // If payment is completed, create a check-in preparation task
      if (status === 'paid') {
        await this.createTask({
          title: 'Prepare for Check-in',
          description: `Prepare property for check-in of booking ${bookingId}`,
          status: 'pending',
          priority: 'medium',
          relatedBookingId: bookingId
        });
      }
    } catch (error) {
      throw new ApiError('Failed to handle payment status change', error);
    }
  }
}

export const featureIntegrationService = FeatureIntegrationService.getInstance(); 