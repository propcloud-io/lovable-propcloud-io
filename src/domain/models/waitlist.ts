export interface WaitlistEntry {
  id?: string;
  email: string;
  name: string;
  propertyCount: number;
  source?: string;
  status: 'pending' | 'contacted' | 'registered';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  contactedAt?: Date;
}
