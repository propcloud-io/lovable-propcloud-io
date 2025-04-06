export type TaskType = 'cleaning' | 'maintenance' | 'check_in' | 'check_out' | 'inspection' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' | 'failed';

export interface TaskAssignment {
  staffId: string;
  assignedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  notes?: string;
}

export interface TaskEvidence {
  id: string;
  type: 'photo' | 'document' | 'note';
  url?: string;
  description?: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  type: TaskType;
  propertyId: string;
  bookingId?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  estimatedDuration: number; // in minutes
  assignment?: TaskAssignment;
  checklist?: Array<{
    id: string;
    title: string;
    completed: boolean;
    completedAt?: Date;
  }>;
  evidence?: TaskEvidence[];
  cost?: number;
  currency?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}
