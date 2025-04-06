import { db } from '../config';
import { collection, addDoc, updateDoc, doc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

export enum TaskType {
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance',
  INSPECTION = 'inspection',
  OTHER = 'other'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Task {
  id: string;
  propertyId: string;
  type: TaskType;
  title: string;
  description: string;
  assigneeId?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  completedAt?: Date;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class TaskService {
  private static collection = 'tasks';

  static async createTask(task: Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const taskData = {
        ...task,
        status: TaskStatus.PENDING,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collection), taskData);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }

  static async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    try {
      const taskRef = doc(db, this.collection, id);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }

  static async getTasksByProperty(propertyId: string): Promise<Task[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('propertyId', '==', propertyId),
        orderBy('dueDate', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw new Error('Failed to get tasks');
    }
  }

  static async getTasksByAssignee(assigneeId: string): Promise<Task[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('assigneeId', '==', assigneeId),
        where('status', 'in', [TaskStatus.PENDING, TaskStatus.IN_PROGRESS]),
        orderBy('dueDate', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
    } catch (error) {
      console.error('Error getting assignee tasks:', error);
      throw new Error('Failed to get assignee tasks');
    }
  }

  static async completeTask(id: string, notes?: string): Promise<void> {
    try {
      await this.updateTask(id, {
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
        notes: notes
      });
    } catch (error) {
      console.error('Error completing task:', error);
      throw new Error('Failed to complete task');
    }
  }
}
