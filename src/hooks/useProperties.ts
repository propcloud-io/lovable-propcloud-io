import { useState, useCallback, useEffect } from 'react';
import { Property, PropertyService } from '@/lib/supabase/services';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UsePropertiesResult {
  properties: Property[];
  isLoading: boolean;
  error: Error | null;
  fetchProperties: (ownerId: string) => Promise<Property[]>;
  addProperty: (property: Omit<Property, "id" | "createdAt" | "updatedAt">) => Promise<Property>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
}

export function useProperties(): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchProperties = useCallback(async (ownerId: string) => {
    if (!user) {
      setProperties([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedProperties = await PropertyService.getPropertiesByOwner(ownerId);
      setProperties(fetchedProperties);
      return fetchedProperties;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch properties');
      setError(error);
      toast({
        title: 'Error fetching properties',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const addProperty = useCallback(async (property: Omit<Property, "id" | "createdAt" | "updatedAt">) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { id } = await PropertyService.createProperty({
        ...property,
        ownerId: user.id
      });

      // Fetch the updated list of properties
      await fetchProperties(user.id);

      // Get the newly created property
      const newProperty = await PropertyService.getPropertyById(id);

      toast({
        title: 'Property added',
        description: 'Your property has been added successfully.',
      });

      return newProperty;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add property');
      setError(error);
      toast({
        title: 'Error adding property',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateProperty = useCallback(async (id: string, updates: Partial<Property>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      await PropertyService.updateProperty(id, updates);

      // Fetch the updated list of properties
      await fetchProperties(user.id);

      // Get the updated property
      const updatedProperty = await PropertyService.getPropertyById(id);

      toast({
        title: 'Property updated',
        description: 'Your property has been updated successfully.',
      });

      return updatedProperty;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update property');
      setError(error);
      toast({
        title: 'Error updating property',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [properties, toast]);

  const deleteProperty = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      await PropertyService.deleteProperty(id);

      // Update the local state
      setProperties(prev => prev.filter(p => p.id !== id));

      toast({
        title: 'Property deleted',
        description: 'Your property has been deleted successfully.',
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete property');
      setError(error);
      toast({
        title: 'Error deleting property',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Automatically fetch properties when the user changes
  useEffect(() => {
    if (user) {
      fetchProperties(user.id);
    }
  }, [user, fetchProperties]);

  return {
    properties,
    isLoading,
    error,
    fetchProperties,
    addProperty,
    updateProperty,
    deleteProperty,
  };
}
