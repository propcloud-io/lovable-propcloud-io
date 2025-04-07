
import { toast } from "@/hooks/use-toast";
import { Property } from "@/domain/models/property";
import { config } from "@/services/config";

// Types for channel integration
export type ChannelType = 'airbnb' | 'booking' | 'vrbo' | 'direct' | 'instagram' | 'facebook';

export interface Channel {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  properties: number;
  lastSync?: string;
}

interface ChannelResponse {
  success: boolean;
  properties?: number;
  error?: string;
}

interface ChannelSettings {
  syncInterval: string;
  lastSyncDate: string;
  syncCalendars: boolean;
  syncPricing: boolean;
  propertyMappings: Record<string, string>;
}

const mockChannels: Channel[] = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    icon: '🏠',
    connected: false,
    status: 'disconnected',
    properties: 0,
  },
  {
    id: 'booking',
    name: 'Booking.com',
    icon: '🏨',
    connected: false,
    status: 'disconnected',
    properties: 0,
  },
  {
    id: 'vrbo',
    name: 'VRBO',
    icon: '🏡',
    connected: false,
    status: 'disconnected',
    properties: 0,
  },
  {
    id: 'direct',
    name: 'Direct Website',
    icon: '🌐',
    connected: false,
    status: 'disconnected',
    properties: 0,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    connected: false,
    status: 'disconnected',
    properties: 0,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👥',
    connected: false,
    status: 'disconnected',
    properties: 0,
  },
];

// Simulate API calls with delays
const simulateApiCall = () => new Promise<void>(resolve => setTimeout(resolve, 1500));

export const ChannelIntegrationService = {
  getChannels: async (): Promise<Channel[]> => {
    try {
      // Simulate API call
      await simulateApiCall();
      
      return [...mockChannels];
    } catch (error) {
      console.error("Error fetching channels:", error);
      toast({
        title: "Error",
        description: "Failed to load channels. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  },
  
  connectChannel: async (channelId: ChannelType): Promise<ChannelResponse> => {
    try {
      // Simulate API call
      await simulateApiCall();
      
      // Find channel and update its status
      const channelIndex = mockChannels.findIndex(c => c.id === channelId);
      if (channelIndex === -1) {
        return { success: false, error: "Channel not found" };
      }
      
      // Update channel in mock data
      mockChannels[channelIndex] = {
        ...mockChannels[channelIndex],
        connected: true,
        status: 'connected',
        properties: Math.floor(Math.random() * 10) + 1, // Random number of properties
        lastSync: new Date().toISOString(),
      };
      
      return { 
        success: true,
        properties: mockChannels[channelIndex].properties
      };
    } catch (error) {
      console.error(`Error connecting to ${channelId}:`, error);
      return { success: false, error: "Connection failed" };
    }
  },
  
  disconnectChannel: async (channelId: ChannelType): Promise<ChannelResponse> => {
    try {
      // Simulate API call
      await simulateApiCall();
      
      // Find channel and update its status
      const channelIndex = mockChannels.findIndex(c => c.id === channelId);
      if (channelIndex === -1) {
        return { success: false, error: "Channel not found" };
      }
      
      // Update channel in mock data
      mockChannels[channelIndex] = {
        ...mockChannels[channelIndex],
        connected: false,
        status: 'disconnected',
        properties: 0,
        lastSync: undefined,
      };
      
      return { success: true };
    } catch (error) {
      console.error(`Error disconnecting from ${channelId}:`, error);
      return { success: false, error: "Disconnection failed" };
    }
  },
  
  syncChannel: async (channelId: ChannelType): Promise<ChannelResponse> => {
    try {
      // Simulate API call
      await simulateApiCall();
      
      // Find channel
      const channelIndex = mockChannels.findIndex(c => c.id === channelId);
      if (channelIndex === -1) {
        return { success: false, error: "Channel not found" };
      }
      
      if (!mockChannels[channelIndex].connected) {
        return { success: false, error: "Channel not connected" };
      }
      
      // Update last sync time
      mockChannels[channelIndex] = {
        ...mockChannels[channelIndex],
        lastSync: new Date().toISOString(),
      };
      
      return { 
        success: true,
        properties: mockChannels[channelIndex].properties
      };
    } catch (error) {
      console.error(`Error syncing with ${channelId}:`, error);
      return { success: false, error: "Sync failed" };
    }
  },
  
  getChannelSettings: async (channelId: ChannelType): Promise<ChannelSettings> => {
    try {
      // Simulate API call
      await simulateApiCall();
      
      // Mock settings
      return {
        syncInterval: "Every 1 hour",
        lastSyncDate: new Date().toISOString(),
        syncCalendars: true,
        syncPricing: true,
        propertyMappings: {
          "property1": "external_id_1",
          "property2": "external_id_2",
        }
      };
    } catch (error) {
      console.error(`Error fetching settings for ${channelId}:`, error);
      throw new Error("Failed to load channel settings");
    }
  },
  
  updateChannelSettings: async (channelId: ChannelType, settings: Partial<ChannelSettings>): Promise<boolean> => {
    try {
      // Simulate API call
      await simulateApiCall();
      
      return true;
    } catch (error) {
      console.error(`Error updating settings for ${channelId}:`, error);
      return false;
    }
  }
};
