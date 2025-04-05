import { config } from './config';

export class SimulatedDataService {
  private static instance: SimulatedDataService;
  private messageCounter = 1;

  private constructor() {}

  static getInstance(): SimulatedDataService {
    if (!SimulatedDataService.instance) {
      SimulatedDataService.instance = new SimulatedDataService();
    }
    return SimulatedDataService.instance;
  }

  generateMessageId(): string {
    return `sim_${Date.now()}_${this.messageCounter++}`;
  }

  async simulateApiDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  generateSimulatedResponse(message: string): string {
    const responses = [
      "Thank you for your message. I'll help you with that right away.",
      "I understand your request. Let me assist you with that.",
      "I'll look into this for you and get back to you shortly.",
      "Thank you for reaching out. I'll handle this for you.",
      "I'll process your request and respond as soon as possible."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  generateSimulatedStatus(): 'sent' | 'failed' | 'processing' {
    const statuses: ('sent' | 'failed' | 'processing')[] = ['sent', 'failed', 'processing'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
} 