import { db } from '../config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, serverTimestamp, orderBy, limit, startAfter } from 'firebase/firestore';

export interface Property {
  id?: string;
  type: string;
  status: string;
  basePrice: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  amenities: string[];
  description: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum PropertyStatus {
  ACTIVE,
  INACTIVE
}

const COLLECTION = 'properties';

export class PropertyService {
  // Get all properties with pagination
  static async getProperties(pageSize = 10, lastDoc?: any) {
    try {
      let q = query(
        collection(db, COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      return {
        properties: snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Property)),
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  }

  // Get a single property by ID
  static async getProperty(id: string) {
    try {
      const docRef = doc(db, COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Property not found');
      }

      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Property;
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  }

  // Create a new property
  static async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const propertyData = {
        ...property,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: property.status || PropertyStatus.ACTIVE
      };

      const docRef = await addDoc(collection(db, COLLECTION), propertyData);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Failed to create property');
    }
  }

  // Update a property
  static async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('Failed to update property');
    }
  }

  // Delete a property
  static async deleteProperty(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw new Error('Failed to delete property');
    }
  }

  // Get properties by owner
  static async getPropertiesByOwner(ownerId: string, pageSize = 10, lastDoc?: any) {
    try {
      let q = query(
        collection(db, COLLECTION),
        where('ownerId', '==', ownerId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      return {
        properties: snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Property)),
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      console.error('Error getting properties by owner:', error);
      throw error;
    }
  }

  static async getProperties(userId: string): Promise<Property[]> {
    try {
      const q = query(
        collection(db, COLLECTION),
        where('ownerId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Property));
    } catch (error) {
      console.error('Error getting properties:', error);
      throw new Error('Failed to get properties');
    }
  }
}
