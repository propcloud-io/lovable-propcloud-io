import { useState, useCallback } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { Property } from '@/domain/models/property';
import { PropertyService } from '@/lib/firebase/services/property.service';

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refreshProperties: () => Promise<void>;
  createProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Property>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<Property>;
  deleteProperty: (id: string) => Promise<boolean>;
}

export function useProperties(pageSize = 10): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>();
  const [hasMore, setHasMore] = useState(true);

  // Load initial properties
  const loadProperties = useCallback(async (refresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await PropertyService.getProperties(
        pageSize,
        refresh ? undefined : lastDoc
      );

      if (refresh) {
        setProperties(result.properties);
      } else {
        setProperties(prev => [...prev, ...result.properties]);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.properties.length === pageSize);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load properties'));
    } finally {
      setLoading(false);
    }
  }, [pageSize, lastDoc]);

  // Load more properties
  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await loadProperties();
    }
  }, [loading, hasMore, loadProperties]);

  // Refresh properties
  const refreshProperties = useCallback(async () => {
    await loadProperties(true);
  }, [loadProperties]);

  // Create a new property
  const createProperty = useCallback(async (
    property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const newProperty = await PropertyService.createProperty(property);
      setProperties(prev => [newProperty, ...prev]);
      return newProperty;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create property');
      setError(error);
      throw error;
    }
  }, []);

  // Update a property
  const updateProperty = useCallback(async (
    id: string,
    updates: Partial<Property>
  ) => {
    try {
      const updatedProperty = await PropertyService.updateProperty(id, updates);
      setProperties(prev =>
        prev.map(p => (p.id === id ? updatedProperty : p))
      );
      return updatedProperty;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update property');
      setError(error);
      throw error;
    }
  }, []);

  // Delete a property
  const deleteProperty = useCallback(async (id: string) => {
    try {
      await PropertyService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete property');
      setError(error);
      throw error;
    }
  }, []);

  return {
    properties,
    loading,
    error,
    hasMore,
    loadMore,
    refreshProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
