import { supabase } from '@/lib/supabase';
import { PropertyType, PropertyStatus } from '@/domain/models/property';

export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Property {
  id?: string;
  ownerId: string;
  name: string;
  type: string;
  status?: string;
  address: PropertyAddress;
  basePrice: number;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  photos?: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PropertyService {
  static async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const now = new Date().toISOString();
      const propertyData = {
        ...property,
        status: property.status || PropertyStatus.ACTIVE,
        created_at: now,
        updated_at: now
      };

      const { data, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select('id')
        .single();

      if (error) throw error;
      return { id: data.id };
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Failed to create property');
    }
  }

  static async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('Failed to update property');
    }
  }

  static async deleteProperty(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw new Error('Failed to delete property');
    }
  }

  static async getPropertyById(id: string): Promise<Property> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Property not found');

      return this.mapPropertyFromDb(data);
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  }

  static async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('ownerId', ownerId);

      if (error) throw error;
      return (data || []).map(this.mapPropertyFromDb);
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  }

  static async getAllProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*');

      if (error) throw error;
      return (data || []).map(this.mapPropertyFromDb);
    } catch (error) {
      console.error('Error getting all properties:', error);
      throw error;
    }
  }

  private static mapPropertyFromDb(data: any): Property {
    return {
      id: data.id,
      ownerId: data.ownerId,
      name: data.name,
      type: data.type,
      status: data.status,
      address: data.address,
      basePrice: data.basePrice,
      amenities: data.amenities,
      maxGuests: data.maxGuests,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      squareFootage: data.squareFootage,
      photos: data.photos,
      description: data.description,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
    };
  }
}
