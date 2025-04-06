import { db } from '../config';
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  read: boolean;
  createdAt: Date;
}

export class CommunicationService {
  private static collection = 'messages';

  static async sendMessage(message: Omit<Message, 'id' | 'read' | 'createdAt'>): Promise<{ id: string }> {
    try {
      const messageData = {
        ...message,
        read: false,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collection), messageData);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  static async getMessagesByBooking(bookingId: string): Promise<Message[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('bookingId', '==', bookingId),
        orderBy('createdAt', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
    } catch (error) {
      console.error('Error getting messages:', error);
      throw new Error('Failed to get messages');
    }
  }

  static async getUnreadMessageCount(userId: string): Promise<number> {
    try {
      const q = query(
        collection(db, this.collection),
        where('receiverId', '==', userId),
        where('read', '==', false)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw new Error('Failed to get unread count');
    }
  }
}
