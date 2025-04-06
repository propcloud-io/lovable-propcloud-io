import { Message } from '../firebase/services/communication.service';
import { TaskService, TaskType, TaskPriority } from '../firebase/services/task.service';
import { AIService } from './vertexAI';

interface SupportIssue {
  category: 'booking' | 'maintenance' | 'cleaning' | 'amenities' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requires_human: boolean;
  suggested_response: string;
}

export class SupportAI {
  static async handleSupportMessage(message: Message): Promise<{ response: string; taskCreated: boolean }> {
    try {
      const prompt = `Analyze this support message and return a JSON object with:
      - category (booking, maintenance, cleaning, amenities, or other)
      - priority (low, medium, high, or urgent)
      - requires_human (boolean)
      - suggested_response (string)

      Message: ${message.content}`;

      const response = await AIService.generateResponse(prompt);
      const analysis = JSON.parse(response) as SupportIssue;
      
      // Create task if needed
      if (analysis.requires_human || analysis.priority === 'urgent') {
        await this.createSupportTask(message, analysis);
      }

      return {
        response: analysis.suggested_response,
        taskCreated: analysis.requires_human || analysis.priority === 'urgent'
      };
    } catch (error) {
      console.error('Error handling support message:', error);
      return {
        response: "I apologize, but I'm having trouble processing your request. A support agent will assist you shortly.",
        taskCreated: true
      };
    }
  }

  private static async createSupportTask(message: Message, analysis: SupportIssue): Promise<void> {
    try {
      const priority = this.mapPriorityToTaskPriority(analysis.priority);
      const type = this.mapCategoryToTaskType(analysis.category);

      await TaskService.createTask({
        propertyId: message.bookingId, // Assuming bookingId is propertyId
        type,
        title: `Support: ${analysis.category.toUpperCase()} - ${analysis.priority.toUpperCase()}`,
        description: `Guest Message: ${message.content}\n\nAI Analysis: ${JSON.stringify(analysis, null, 2)}`,
        priority,
        dueDate: this.calculateDueDate(analysis.priority)
      });
    } catch (error) {
      console.error('Error creating support task:', error);
      throw new Error('Failed to create support task');
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

  private static mapCategoryToTaskType(category: string): TaskType {
    switch (category) {
      case 'maintenance': return TaskType.MAINTENANCE;
      case 'cleaning': return TaskType.CLEANING;
      default: return TaskType.OTHER;
    }
  }

  private static calculateDueDate(priority: string): Date {
    const now = new Date();
    switch (priority) {
      case 'urgent':
        return new Date(now.getTime() + 1 * 60 * 60 * 1000); // 1 hour
      case 'high':
        return new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours
      case 'medium':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
      default:
        return new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours
    }
  }
}
