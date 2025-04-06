import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileService, UserProfile } from '@/lib/supabase/services';

interface UseProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (updates: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userProfile = await ProfileService.getProfile(user.id);
        setProfile(userProfile);
        setError(null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setIsLoading(true);
      await ProfileService.updateProfile(user.id, updates);
      
      // Refresh the profile
      const updatedProfile = await ProfileService.getProfile(user.id);
      setProfile(updatedProfile);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setIsLoading(true);
      const avatarUrl = await ProfileService.uploadAvatar(user.id, file);
      
      // Refresh the profile
      const updatedProfile = await ProfileService.getProfile(user.id);
      setProfile(updatedProfile);
      setError(null);
      
      return avatarUrl;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError(err instanceof Error ? err : new Error('Failed to upload avatar'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadAvatar
  };
}
