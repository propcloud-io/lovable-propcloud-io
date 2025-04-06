import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config';
import { Property } from '@/domain/models/property';

const COLLECTION = 'properties';

export class PropertyService {
  // Get all properties with pagination
  static async getProperties(pageSize = 10, lastDoc?: DocumentSnapshot) {
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
  static async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const now = new Date();
      const propertyWithDates = {
        ...property,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(collection(db, COLLECTION), propertyWithDates);
      return {
        id: docRef.id,
        ...propertyWithDates
      } as Property;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  // Update a property
  static async updateProperty(id: string, updates: Partial<Property>) {
    try {
      const docRef = doc(db, COLLECTION, id);
      const now = new Date();
      
      await updateDoc(docRef, {
        ...updates,
        updatedAt: now
      });

      // Get the updated document
      const updatedDoc = await getDoc(docRef);
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      } as Property;
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  }

  // Delete a property
  static async deleteProperty(id: string) {
    try {
      const docRef = doc(db, COLLECTION, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }

  // Get properties by owner
  static async getPropertiesByOwner(ownerId: string, pageSize = 10, lastDoc?: DocumentSnapshot) {
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
}
