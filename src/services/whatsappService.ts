import { BaseApiService, ApiError } from './baseApi';
import { config } from './config';
import { SimulatedDataService } from './simulatedData';

interface SendMessageRequest {
  to: string;
  message: string;
  template?: string;
  language?: string;
}

interface SendMessageResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
}

export class WhatsAppService extends BaseApiService {
  private readonly baseUrl = 'https://graph.facebook.com/v17.0';
  private simulatedData: SimulatedDataService;

  constructor() {
    super();
    this.simulatedData = SimulatedDataService.getInstance();
  }

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    // Check if we should use simulated data
    if (!config.features.enableWhatsApp || !config.whatsapp.apiKey) {
      await this.simulatedData.simulateApiDelay();
      return {
        success: true,
        messageId: this.simulatedData.generateMessageId(),
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/${config.whatsapp.phoneNumberId}/messages`,
        {
          method: 'POST',
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: request.to,
            type: 'text',
            text: {
              body: request.message
            }
          }),
          headers: {
            'Authorization': `Bearer ${config.whatsapp.apiKey}`
          }
        }
      );

      const data = await this.handleApiResponse<any>(response);
      
      return {
        success: true,
        messageId: data.messages[0].id,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to send WhatsApp message');
    }
  }

  async sendTemplateMessage(
    to: string,
    template: string,
    language: string = 'en',
    components: any[] = []
  ): Promise<SendMessageResponse> {
    // Check if we should use simulated data
    if (!config.features.enableWhatsApp || !config.whatsapp.apiKey) {
      await this.simulatedData.simulateApiDelay();
      return {
        success: true,
        messageId: this.simulatedData.generateMessageId(),
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/${config.whatsapp.phoneNumberId}/messages`,
        {
          method: 'POST',
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: to,
            type: 'template',
            template: {
              name: template,
              language: {
                code: language
              },
              components: components
            }
          }),
          headers: {
            'Authorization': `Bearer ${config.whatsapp.apiKey}`
          }
        }
      );

      const data = await this.handleApiResponse<any>(response);
      
      return {
        success: true,
        messageId: data.messages[0].id,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to send WhatsApp template message');
    }
  }

  async getMessageStatus(messageId: string): Promise<{
    status: string;
    timestamp: string;
  }> {
    // Check if we should use simulated data
    if (!config.features.enableWhatsApp || !config.whatsapp.apiKey) {
      await this.simulatedData.simulateApiDelay();
      return {
        status: this.simulatedData.generateSimulatedStatus(),
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${config.whatsapp.apiKey}`
          }
        }
      );

      const data = await this.handleApiResponse<any>(response);
      
      return {
        status: data.statuses[0].status,
        timestamp: data.statuses[0].timestamp
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to get message status');
    }
  }
} 