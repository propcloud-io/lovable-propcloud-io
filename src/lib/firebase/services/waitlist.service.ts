import { db } from '../config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface WaitlistEntry {
  name: string;
  email: string;
  propertyCount: number;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class WaitlistService {
  static async addToWaitlist(entry: Omit<WaitlistEntry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      // Prepare the entry with default values
      const waitlistEntry = {
        ...entry,
        status: 'pending' as const,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'waitlist'), waitlistEntry);

      // Send notification via Express server
      const response = await fetch(`${API_URL}/api/waitlist/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entryId: docRef.id,
          ...entry
        }),
      });

      if (!response.ok) {
        console.error('Failed to send notification:', await response.text());
      }

      return { id: docRef.id };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      throw new Error('Failed to add to waitlist');
    }
  }
}
