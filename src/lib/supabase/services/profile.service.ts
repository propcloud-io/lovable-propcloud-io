import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  companyName?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProfileService {
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw error;
      }

      return {
        id: data.id,
        username: data.username,
        fullName: data.full_name,
        avatarUrl: data.avatar_url,
        companyName: data.company_name,
        role: data.role,
        createdAt: data.created_at ? new Date(data.created_at) : undefined,
        updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
      };
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  }

  static async updateProfile(userId: string, updates: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (updates.username !== undefined) updateData.username = updates.username;
      if (updates.fullName !== undefined) updateData.full_name = updates.fullName;
      if (updates.avatarUrl !== undefined) updateData.avatar_url = updates.avatarUrl;
      if (updates.companyName !== undefined) updateData.company_name = updates.companyName;
      if (updates.role !== undefined) updateData.role = updates.role;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  static async uploadAvatar(userId: string, file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error } = await supabase.storage
        .from('user-content')
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from('user-content')
        .getPublicUrl(filePath);

      // Update the user's profile with the new avatar URL
      await this.updateProfile(userId, {
        avatarUrl: data.publicUrl
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }
}
