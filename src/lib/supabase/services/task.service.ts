import { supabase } from '@/lib/supabase';

export enum TaskType {
  CLEANING = 'CLEANING',
  MAINTENANCE = 'MAINTENANCE',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  OTHER = 'OTHER'
}

export enum TaskStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Task {
  id?: string;
  propertyId: string;
  bookingId?: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  assignedTo?: string;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TaskService {
  static async createTask(task: Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const now = new Date().toISOString();
      const taskData = {
        ...task,
        due_date: task.dueDate.toISOString(),
        status: TaskStatus.PENDING,
        created_at: now,
        updated_at: now
      };

      // Remove properties that are already mapped to snake_case
      delete taskData.dueDate;

      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select('id')
        .single();

      if (error) throw error;
      return { id: data.id };
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }

  static async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    try {
      const updateData: any = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      // Convert Date objects to ISO strings
      if (updates.dueDate) {
        updateData.due_date = updates.dueDate.toISOString();
        delete updateData.dueDate;
      }
      
      if (updates.completedAt) {
        updateData.completed_at = updates.completedAt.toISOString();
        delete updateData.completedAt;
      }

      const { error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }

  static async deleteTask(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }

  static async getTaskById(id: string): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Task not found');

      return this.mapTaskFromDb(data);
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  }

  static async getTasksByProperty(propertyId: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('propertyId', propertyId);

      if (error) throw error;
      return (data || []).map(this.mapTaskFromDb);
    } catch (error) {
      console.error('Error getting tasks by property:', error);
      throw error;
    }
  }

  static async getTasksByBooking(bookingId: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('bookingId', bookingId);

      if (error) throw error;
      return (data || []).map(this.mapTaskFromDb);
    } catch (error) {
      console.error('Error getting tasks by booking:', error);
      throw error;
    }
  }

  static async getTasksByAssignee(assignedTo: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('assignedTo', assignedTo);

      if (error) throw error;
      return (data || []).map(this.mapTaskFromDb);
    } catch (error) {
      console.error('Error getting tasks by assignee:', error);
      throw error;
    }
  }

  private static mapTaskFromDb(data: any): Task {
    return {
      id: data.id,
      propertyId: data.propertyId,
      bookingId: data.bookingId,
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status,
      priority: data.priority,
      dueDate: new Date(data.due_date),
      assignedTo: data.assignedTo,
      completedAt: data.completed_at ? new Date(data.completed_at) : undefined,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
    };
  }
}
