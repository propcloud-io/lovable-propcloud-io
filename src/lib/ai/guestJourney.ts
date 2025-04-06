import { Message } from '../firebase/services/communication.service';
import { BookingService, BookingStatus } from '../firebase/services/booking.service';
import { TaskService, TaskType, TaskPriority } from '../firebase/services/task.service';
import { AIService } from './vertexAI';

export class GuestJourneyAI {
  static async handleGuestMessage(message: Message): Promise<string> {
    try {
      const response = await AIService.generateChatResponse(
        message.content,
        [] // You can add chat history here if needed
      );

      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'll help you with that shortly.";
    }
  }

  static async generateWelcomeMessage(bookingId: string): Promise<string> {
    try {
      const booking = await BookingService.getBookingById(bookingId);
      
      const prompt = `Generate a warm welcome message for a guest checking into their vacation rental.
      Check-in date: ${booking.checkIn}
      Number of guests: ${booking.guests}
      Special requests: ${booking.specialRequests || 'None'}`;

      return await AIService.generateResponse(prompt, 'You are a professional property manager welcoming guests to their vacation rental.');
    } catch (error) {
      console.error('Error generating welcome message:', error);
      return "Welcome! We hope you enjoy your stay.";
    }
  }

  static async scheduleCleaningTask(bookingId: string): Promise<void> {
    try {
      const booking = await BookingService.getBookingById(bookingId);
      
      // Create cleaning task for check-out date
      await TaskService.createTask({
        propertyId: booking.propertyId,
        type: TaskType.CLEANING,
        title: 'Post-checkout cleaning',
        description: `Clean property after guest checkout. Booking ID: ${bookingId}`,
        priority: TaskPriority.HIGH,
        dueDate: booking.checkOut
      });
    } catch (error) {
      console.error('Error scheduling cleaning task:', error);
      throw new Error('Failed to schedule cleaning task');
    }
  }

  static async handleMaintenanceRequest(message: Message): Promise<void> {
    try {
      const analysis = await AIService.categorizeSupportIssue(message.content);
      const priority = this.mapPriorityToTaskPriority(analysis.priority);

      await TaskService.createTask({
        propertyId: message.bookingId,
        type: TaskType.MAINTENANCE,
        title: 'Maintenance Request',
        description: message.content,
        priority,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Due within 24 hours
      });
    } catch (error) {
      console.error('Error handling maintenance request:', error);
      throw new Error('Failed to process maintenance request');
    }
  }

  private static mapPriorityToTaskPriority(priority: string): TaskPriority {
    switch (priority) {
      case 'urgent': return TaskPriority.URGENT;
      case 'high': return TaskPriority.HIGH;
      case 'medium': return TaskPriority.MEDIUM;
      default: return TaskPriority.LOW;
    }
  }
}
