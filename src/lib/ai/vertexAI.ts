import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI with your GCP project and location
const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const location = 'us-central1';  // or your preferred region
const vertexAI = new VertexAI({ project: projectId, location });

// Get the model
const model = vertexAI.preview.getGenerativeModel({
  model: 'gemini-pro'
});

export class AIService {
  static async generateResponse(prompt: string, context: string = ''): Promise<string> {
    try {
      const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      });

      const response = result.response;
      return response.candidates[0].content.parts[0].text || '';
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }> {
    try {
      const prompt = `Analyze the sentiment of this text and return a JSON object with 'sentiment' (positive, negative, or neutral) and 'score' (between -1 and 1):

${text}`;

      const response = await this.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return { sentiment: 'neutral', score: 0 };
    }
  }

  static async extractEntities(text: string): Promise<Array<{
    entity: string;
    type: string;
    importance: number;
  }>> {
    try {
      const prompt = `Extract key entities from this text and return them as a JSON array. Each object should have 'entity', 'type', and 'importance' (0-1) properties:

${text}`;

      const response = await this.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error extracting entities:', error);
      return [];
    }
  }

  static async summarizeText(text: string, maxLength: number = 150): Promise<string> {
    try {
      const prompt = `Summarize this text in no more than ${maxLength} characters:

${text}`;

      return await this.generateResponse(prompt);
    } catch (error) {
      console.error('Error summarizing text:', error);
      return text;
    }
  }

  static async generateChatResponse(
    userMessage: string,
    chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
  ): Promise<string> {
    try {
      // Format chat history for context
      const formattedHistory = chatHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `${formattedHistory}\nuser: ${userMessage}\nassistant:`;

      return await this.generateResponse(prompt, 'You are a helpful property management assistant.');
    } catch (error) {
      console.error('Error generating chat response:', error);
      return "I apologize, but I'm having trouble processing your request right now.";
    }
  }

  static async suggestPricing(propertyDetails: any): Promise<{
    suggestedPrice: number;
    factors: Array<{ factor: string; impact: number }>;
    explanation: string;
  }> {
    try {
      const prompt = `Analyze these property details and suggest pricing:
${JSON.stringify(propertyDetails, null, 2)}

Return a JSON object with:
- suggestedPrice (number)
- factors (array of objects with factor and impact properties)
- explanation (string)`;

      const response = await this.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error suggesting pricing:', error);
      throw new Error('Failed to generate pricing suggestion');
    }
  }

  static async categorizeSupportIssue(issue: string): Promise<{
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    requiresHumanAttention: boolean;
    suggestedResponse: string;
  }> {
    try {
      const prompt = `Categorize this support issue and return a JSON object with category, priority, requiresHumanAttention, and suggestedResponse:

${issue}`;

      const response = await this.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error categorizing support issue:', error);
      return {
        category: 'general',
        priority: 'medium',
        requiresHumanAttention: true,
        suggestedResponse: "I'll connect you with our support team for assistance."
      };
    }
  }
}
