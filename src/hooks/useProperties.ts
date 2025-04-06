
import { useState, useCallback, useEffect } from 'react';
import { Property, PropertyService } from '@/lib/firebase/services/property.service';
import { useToast } from '@/hooks/use-toast';

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

  const fetchProperties = useCallback(async (ownerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedProperties = await PropertyService.getPropertiesByOwner(ownerId);
      // Convert to correct type
      const typedProperties = fetchedProperties.map(prop => ({
        ...prop,
        // Fill in any missing properties required by the domain model
        ownerId: prop.ownerId || '',
        name: prop.description || '',
        location: prop.address?.city || '',
        currency: 'USD',
      })) as Property[];

      setProperties(typedProperties);
      return typedProperties;
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
    setIsLoading(true);
    setError(null);

    try {
      const { id } = await PropertyService.createProperty(property as any);
      // Create a complete property to return
      const newProperty = {
        id,
        ...property,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Property;
      
      setProperties(prev => [...prev, newProperty]);
      
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
    setIsLoading(true);
    setError(null);

    try {
      await PropertyService.updateProperty(id, updates as any);
      
      // Create updated property to return and update state
      const updatedProperty = properties.find(p => p.id === id);
      if (!updatedProperty) throw new Error('Property not found');
      
      const newProperty = { 
        ...updatedProperty, 
        ...updates, 
        updatedAt: new Date() 
      } as Property;
      
      setProperties(prev => 
        prev.map(p => p.id === id ? newProperty : p)
      );
      
      toast({
        title: 'Property updated',
        description: 'Your property has been updated successfully.',
      });
      
      return newProperty;
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
    setIsLoading(true);
    setError(null);

    try {
      await PropertyService.deleteProperty(id);
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
