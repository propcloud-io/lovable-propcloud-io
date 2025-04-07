import { useState, useEffect, useCallback } from 'react';
import { ChannelIntegrationService, ConnectChannelResponse } from '@/services/channelIntegrationService';
import { useToast } from '@/hooks/use-toast';

interface UseChannelIntegrationResult {
  channels: ChannelIntegrationService[];
  isLoading: boolean;
  error: Error | null;
  connectChannel: (channelId: ChannelType) => Promise<ConnectChannelResponse>;
  disconnectChannel: (channelId: ChannelType) => Promise<ConnectChannelResponse>;
  syncChannel: (channelId: ChannelType) => Promise<ConnectChannelResponse>;
  getChannelSettings: (channelId: ChannelType) => Promise<Record<string, any>>;
  refreshChannels: () => Promise<void>;
}

/**
 * Hook for managing channel integrations
 * 
 * Provides methods to connect, disconnect, and sync with different booking channels
 */
export function useChannelIntegration(): UseChannelIntegrationResult {
  const [channels, setChannels] = useState<ChannelIntegrationService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshChannels = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedChannels = await ChannelIntegrationService.getChannels();
      setChannels(fetchedChannels);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error fetching channels'));
      console.error('Error fetching channels:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshChannels();
  }, [refreshChannels]);

  const connectChannel = useCallback(async (channelId: ChannelType): Promise<ConnectChannelResponse> => {
    try {
      // Set the specific channel to pending status
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { ...channel, status: 'pending' } 
            : channel
        )
      );

      // Attempt to connect to the channel
      const response = await ChannelIntegrationService.connectChannel(channelId);
      
      // Update the channel with the response data
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { 
                ...channel, 
                connected: response.success, 
                status: response.status,
                properties: response.properties
              } 
            : channel
        )
      );

      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to connect to ${channelId}`);
      setError(error);
      
      // Set the channel to error state
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { ...channel, status: 'error' } 
            : channel
        )
      );
      
      return {
        success: false,
        channelId,
        status: 'error',
        error: error.message
      };
    }
  }, []);

  const disconnectChannel = useCallback(async (channelId: ChannelType): Promise<ConnectChannelResponse> => {
    try {
      // Set the specific channel to pending status
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { ...channel, status: 'pending' } 
            : channel
        )
      );

      // Attempt to disconnect from the channel
      const response = await ChannelIntegrationService.disconnectChannel(channelId);
      
      // Update the channel with the response data
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { 
                ...channel, 
                connected: false, 
                status: response.status,
                properties: undefined
              } 
            : channel
        )
      );

      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to disconnect from ${channelId}`);
      setError(error);
      
      // Keep the channel in its previous state
      return {
        success: false,
        channelId,
        status: 'error',
        error: error.message
      };
    }
  }, []);

  const syncChannel = useCallback(async (channelId: ChannelType): Promise<ConnectChannelResponse> => {
    try {
      // Set the specific channel to pending status for sync
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { ...channel, status: 'pending' } 
            : channel
        )
      );

      // Attempt to sync with the channel
      const response = await ChannelIntegrationService.syncChannel(channelId);
      
      // Update the channel with the response data
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId 
            ? { 
                ...channel, 
                connected: response.success, 
                status: response.status,
                properties: response.properties,
                lastSyncDate: new Date()
              } 
            : channel
        )
      );

      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to sync with ${channelId}`);
      setError(error);
      
      // Set the channel back to connected but with error
      setChannels(prevChannels => 
        prevChannels.map(channel => 
          channel.id === channelId && channel.connected
            ? { ...channel, status: 'connected' } 
            : channel
        )
      );
      
      return {
        success: false,
        channelId,
        status: 'error',
        error: error.message
      };
    }
  }, []);

  const getChannelSettings = useCallback(async (channelId: ChannelType): Promise<Record<string, any>> => {
    try {
      return await ChannelIntegrationService.getChannelSettings(channelId);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to get settings for ${channelId}`);
      setError(error);
      throw error;
    }
  }, []);

  return {
    channels,
    isLoading,
    error,
    connectChannel,
    disconnectChannel,
    syncChannel,
    getChannelSettings,
    refreshChannels
  };
}

export default useChannelIntegration;