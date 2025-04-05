import { BaseApiService, ApiError } from './baseApi';
import { config } from './config';
import { SimulatedDataService } from './simulatedData';

interface GenerateMessageRequest {
  prompt: string;
  context?: {
    propertyDetails?: any;
    guestHistory?: any;
    tone?: string;
    language?: string;
  };
}

interface GenerateMessageResponse {
  message: string;
  confidence: number;
  suggestedActions?: string[];
}

export class GoogleAiService extends BaseApiService {
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  private simulatedData: SimulatedDataService;

  constructor() {
    super();
    this.simulatedData = SimulatedDataService.getInstance();
  }

  async generateGuestMessage(request: GenerateMessageRequest): Promise<GenerateMessageResponse> {
    // Check if we should use simulated data
    if (!config.features.enableGoogleAI || !config.googleAI.apiKey) {
      await this.simulatedData.simulateApiDelay();
      return {
        message: this.simulatedData.generateSimulatedResponse(request.prompt),
        confidence: 0.8,
        suggestedActions: ['Check availability', 'Send property details']
      };
    }

    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/gemini-pro:generateContent?key=${config.googleAI.apiKey}`,
        {
          method: 'POST',
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: this.buildPrompt(request)
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      const data = await this.handleApiResponse<any>(response);
      
      // Parse the response and format it according to our needs
      return {
        message: data.candidates[0].content.parts[0].text,
        confidence: 0.9, // This would come from the API in a real implementation
        suggestedActions: this.extractSuggestedActions(data.candidates[0].content.parts[0].text)
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to generate guest message');
    }
  }

  private buildPrompt(request: GenerateMessageRequest): string {
    const { prompt, context } = request;
    let fullPrompt = `You are an AI assistant for a property management company. 
    Respond to the following guest inquiry in a professional and helpful manner:\n\n${prompt}\n\n`;

    if (context?.propertyDetails) {
      fullPrompt += `Property Details:\n${JSON.stringify(context.propertyDetails, null, 2)}\n\n`;
    }

    if (context?.guestHistory) {
      fullPrompt += `Guest History:\n${JSON.stringify(context.guestHistory, null, 2)}\n\n`;
    }

    if (context?.tone) {
      fullPrompt += `Please maintain a ${context.tone} tone in your response.\n\n`;
    }

    if (context?.language) {
      fullPrompt += `Please respond in ${context.language}.\n\n`;
    }

    fullPrompt += `Please provide a natural, conversational response that addresses the guest's needs.`;

    return fullPrompt;
  }

  private extractSuggestedActions(message: string): string[] {
    // This is a simple implementation. In a real system, we would use more sophisticated parsing
    const actions: string[] = [];
    
    // Look for common action indicators in the message
    if (message.toLowerCase().includes('book')) {
      actions.push('Initiate booking process');
    }
    if (message.toLowerCase().includes('price')) {
      actions.push('Send pricing information');
    }
    if (message.toLowerCase().includes('availability')) {
      actions.push('Check calendar availability');
    }
    
    return actions;
  }
} 