import { SimulatedDataService } from './simulatedData';
import { BaseApiService } from './baseApi';
import config from './config';

export type ChannelType = 'airbnb' | 'booking' | 'vrbo' | 'website' | 'whatsapp' | 'facebook';

export interface Channel {
  id: string;
  name: string;
  icon: string;
  type: ChannelType;
  connected: boolean;
  status: 'connected' | 'pending' | 'disconnected' | 'error';
  properties?: number;
  lastSyncDate?: Date;
  credentials?: Record<string, string>;
}

export interface ConnectChannelResponse {
  success: boolean;
  channelId: string;
  status: Channel['status'];
  properties?: number;
  error?: string;
}

/**
 * Service for managing integration with various booking and communication channels
 */
export class ChannelIntegrationService extends BaseApiService {
  private static instance: ChannelIntegrationService;
  private simulatedData: SimulatedDataService;

  private constructor() {
    super();
    this.simulatedData = SimulatedDataService.getInstance();
  }

  /**
   * Get singleton instance of ChannelIntegrationService
   */
  public static getInstance(): ChannelIntegrationService {
    if (!ChannelIntegrationService.instance) {
      ChannelIntegrationService.instance = new ChannelIntegrationService();
    }
    return ChannelIntegrationService.instance;
  }

  /**
   * Get all available channels with their connection status
   */
  public async getChannels(): Promise<Channel[]> {
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll use simulated data
      await this.simulatedData.simulateApiDelay(500);
      
      return [
        { id: 'airbnb', name: 'Airbnb', icon: '🏡', type: 'airbnb', connected: false, status: 'disconnected' },
        { id: 'booking', name: 'Booking.com', icon: '🅱️', type: 'booking', connected: false, status: 'disconnected' },
        { id: 'vrbo', name: 'VRBO/HomeAway', icon: '🏠', type: 'vrbo', connected: false, status: 'disconnected' },
        { id: 'website', name: 'Your Website', icon: '🌐', type: 'website', connected: false, status: 'disconnected' },
        { id: 'whatsapp', name: 'WhatsApp Business', icon: '💬', type: 'whatsapp', connected: false, status: 'disconnected' },
        { id: 'facebook', name: 'Facebook/Instagram', icon: '📱', type: 'facebook', connected: false, status: 'disconnected' },
      ];
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  }

  /**
   * Connect to a specific channel via OAuth or API key
   */
  public async connectChannel(channelId: ChannelType, credentials?: Record<string, string>): Promise<ConnectChannelResponse> {
    try {
      // In production, this would initiate an OAuth flow or API connection
      await this.simulatedData.simulateApiDelay(1500);
      
      // Simulate connection success with random property count
      const properties = Math.floor(Math.random() * 5) + 1;
      
      return {
        success: true,
        channelId,
        status: 'connected',
        properties,
      };
    } catch (error) {
      console.error(`Error connecting to ${channelId}:`, error);
      return {
        success: false,
        channelId,
        status: 'error',
        error: `Failed to connect to ${channelId}: ${(error as Error).message}`,
      };
    }
  }

  /**
   * Disconnect from a specific channel
   */
  public async disconnectChannel(channelId: ChannelType): Promise<ConnectChannelResponse> {
    try {
      // In production, this would revoke OAuth tokens or API access
      await this.simulatedData.simulateApiDelay(800);
      
      return {
        success: true,
        channelId,
        status: 'disconnected',
      };
    } catch (error) {
      console.error(`Error disconnecting from ${channelId}:`, error);
      return {
        success: false,
        channelId,
        status: 'error',
        error: `Failed to disconnect from ${channelId}: ${(error as Error).message}`,
      };
    }
  }

  /**
   * Sync properties with a connected channel
   */
  public async syncChannel(channelId: ChannelType): Promise<ConnectChannelResponse> {
    try {
      // In production, this would sync property data with the channel
      await this.simulatedData.simulateApiDelay(2000);
      
      // Simulate sync success with updated property count
      const properties = Math.floor(Math.random() * 10) + 1;
      
      return {
        success: true,
        channelId,
        status: 'connected',
        properties,
      };
    } catch (error) {
      console.error(`Error syncing ${channelId}:`, error);
      return {
        success: false,
        channelId,
        status: 'error',
        error: `Failed to sync with ${channelId}: ${(error as Error).message}`,
      };
    }
  }

  /**
   * Get channel settings and metadata
   */
  public async getChannelSettings(channelId: ChannelType): Promise<Record<string, any>> {
    try {
      // In production, this would fetch channel-specific settings
      await this.simulatedData.simulateApiDelay(500);
      
      return {
        channelId,
        syncEnabled: true,
        syncInterval: 'hourly',
        syncCalendars: true,
        syncPricing: true,
        lastSyncDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error fetching settings for ${channelId}:`, error);
      throw error;
    }
  }
}

export default ChannelIntegrationService.getInstance();