import { supabase } from '@/lib/supabase';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export interface Message {
  id?: string;
  bookingId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  read: boolean;
  createdAt?: Date;
}

export class CommunicationService {
  static async sendMessage(message: Omit<Message, 'id' | 'read' | 'createdAt'>): Promise<{ id: string }> {
    try {
      const now = new Date().toISOString();
      const messageData = {
        ...message,
        read: false,
        created_at: now
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .select('id')
        .single();

      if (error) throw error;
      return { id: data.id };
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  static async markAsRead(messageId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }

  static async getMessageById(id: string): Promise<Message> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Message not found');

      return this.mapMessageFromDb(data);
    } catch (error) {
      console.error('Error getting message:', error);
      throw error;
    }
  }

  static async getMessagesByBooking(bookingId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('bookingId', bookingId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapMessageFromDb);
    } catch (error) {
      console.error('Error getting messages by booking:', error);
      throw error;
    }
  }

  static async getConversation(senderId: string, receiverId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`senderId.eq.${senderId},receiverId.eq.${senderId}`)
        .or(`senderId.eq.${receiverId},receiverId.eq.${receiverId}`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapMessageFromDb);
    } catch (error) {
      console.error('Error getting conversation:', error);
      throw error;
    }
  }

  static async getUnreadMessageCount(userId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiverId', userId)
        .eq('read', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting unread message count:', error);
      throw error;
    }
  }

  private static mapMessageFromDb(data: any): Message {
    return {
      id: data.id,
      bookingId: data.bookingId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
      type: data.type,
      read: data.read,
      createdAt: data.created_at ? new Date(data.created_at) : undefined
    };
  }
}
