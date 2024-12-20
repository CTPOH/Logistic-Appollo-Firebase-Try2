import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';
import type { Shipment, ShipmentUpdate, ShipmentBasket } from '../../types/firebase/shipment';

const SHIPMENTS_COLLECTION = 'shipments';

export const shipmentsService = {
  // Create new shipment
  async createShipment(shipment: Omit<Shipment, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, SHIPMENTS_COLLECTION), shipment);
    return docRef.id;
  },

  // Get shipment by ID
  async getShipment(id: string): Promise<Shipment | null> {
    const docRef = doc(db, SHIPMENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Shipment : null;
  },

  // Update shipment
  async updateShipment(id: string, data: Partial<Shipment>): Promise<void> {
    const docRef = doc(db, SHIPMENTS_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  // Delete shipment
  async deleteShipment(id: string): Promise<void> {
    await deleteDoc(doc(db, SHIPMENTS_COLLECTION, id));
  },

  // Get shipments by status
  async getShipmentsByStatus(status: Shipment['currentStatus']): Promise<Shipment[]> {
    const q = query(
      collection(db, SHIPMENTS_COLLECTION),
      where('currentStatus', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Shipment);
  },

  // Add shipment update
  async addShipmentUpdate(shipmentId: string, update: Omit<ShipmentUpdate, 'id'>): Promise<string> {
    const docRef = await addDoc(
      collection(db, SHIPMENTS_COLLECTION, shipmentId, 'updates'),
      update
    );
    return docRef.id;
  },

  // Add basket to shipment
  async addBasket(shipmentId: string, basket: Omit<ShipmentBasket, 'id'>): Promise<string> {
    const docRef = await addDoc(
      collection(db, SHIPMENTS_COLLECTION, shipmentId, 'baskets'),
      basket
    );
    return docRef.id;
  },
};