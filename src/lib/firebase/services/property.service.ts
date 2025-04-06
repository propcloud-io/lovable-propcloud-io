
import { db } from '../config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, serverTimestamp, getDoc } from 'firebase/firestore';

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
  type: string;
  address: PropertyAddress;
  basePrice: number;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  photos?: string[];
  description?: string;
  createdAt?: any;
  updatedAt?: any;
}

export class PropertyService {
  private static collection = 'properties';

  static async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> {
    try {
      const propertyData = {
        ...property,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collection), propertyData);
      return { id: docRef.id };
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Failed to create property');
    }
  }

  static async getPropertyById(id: string): Promise<Property> {
    try {
      const docRef = doc(db, this.collection, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Property not found');
      }

      return { id: docSnap.id, ...docSnap.data() } as Property;
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  }

  static async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.collection),
        where('ownerId', '==', ownerId)
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

  static async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      const propertyRef = doc(db, this.collection, id);
      await updateDoc(propertyRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('Failed to update property');
    }
  }

  static async deleteProperty(id: string): Promise<void> {
    try {
      const propertyRef = doc(db, this.collection, id);
      await deleteDoc(propertyRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw new Error('Failed to delete property');
    }
  }

  // Additional methods can be added here
}
