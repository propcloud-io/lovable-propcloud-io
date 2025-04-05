import { GoogleAiService } from './googleAiService';
import { WhatsAppService } from './whatsappService';
import { ApiError } from './baseApi';

interface GuestMessage {
  id: string;
  from: string;
  message: string;
  timestamp: string;
  platform: 'whatsapp' | 'email' | 'sms';
  status: 'received' | 'processing' | 'sent' | 'failed';
}

interface MessageResponse {
  success: boolean;
  messageId: string;
  response: string;
  suggestedActions?: string[];
}

export class CommunicationService {
  private googleAi: GoogleAiService;
  private whatsapp: WhatsAppService;

  constructor() {
    this.googleAi = new GoogleAiService();
    this.whatsapp = new WhatsAppService();
  }

  async handleGuestMessage(message: GuestMessage): Promise<MessageResponse> {
    try {
      // Generate AI response
      const aiResponse = await this.googleAi.generateGuestMessage({
        prompt: message.message,
        context: {
          tone: 'professional',
          language: 'en' // We can add language detection later
        }
      });

      // Send response via WhatsApp
      const whatsappResponse = await this.whatsapp.sendMessage({
        to: message.from,
        message: aiResponse.message
      });

      return {
        success: true,
        messageId: whatsappResponse.messageId,
        response: aiResponse.message,
        suggestedActions: aiResponse.suggestedActions
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to handle guest message');
    }
  }

  async sendAutomatedMessage(
    to: string,
    template: string,
    language: string = 'en',
    components: any[] = []
  ): Promise<MessageResponse> {
    try {
      const response = await this.whatsapp.sendTemplateMessage(
        to,
        template,
        language,
        components
      );

      return {
        success: true,
        messageId: response.messageId,
        response: 'Template message sent successfully'
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to send automated message');
    }
  }

  async checkMessageStatus(messageId: string): Promise<{
    status: string;
    timestamp: string;
  }> {
    try {
      return await this.whatsapp.getMessageStatus(messageId);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to check message status');
    }
  }
} 