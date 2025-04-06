export type MessageChannel = 'email' | 'sms' | 'whatsapp' | 'messenger' | 'airbnb' | 'booking' | 'system';

export interface Message {
  id: string;
  conversationId: string;
  channel: MessageChannel;
  direction: 'inbound' | 'outbound';
  content: string;
  attachments?: Array<{
    id: string;
    type: 'image' | 'document' | 'video';
    url: string;
    name: string;
  }>;
  metadata: {
    sender: {
      id: string;
      type: 'guest' | 'host' | 'staff' | 'system' | 'ai';
      name: string;
    };
    recipient: {
      id: string;
      type: 'guest' | 'host' | 'staff' | 'system';
      name: string;
    };
  };
  status: 'sent' | 'delivered' | 'read' | 'failed';
  aiProcessed: boolean;
  aiSummary?: string;
  intent?: string;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
}

export interface Conversation {
  id: string;
  bookingId?: string;
  propertyId?: string;
  guestId?: string;
  channel: MessageChannel;
  status: 'active' | 'resolved' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastMessageAt: Date;
  unreadCount: number;
  assignedTo?: string;
  tags?: string[];
  aiSummary?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}
