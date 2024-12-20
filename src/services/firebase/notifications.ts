import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';
import type { Notification } from '../../types/firebase/notification';

const NOTIFICATIONS_COLLECTION = 'notifications';

export const notificationsService = {
  // Create notification
  async createNotification(notification: Omit<Notification, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), notification);
    return docRef.id;
  },

  // Get notification by ID
  async getNotification(id: string): Promise<Notification | null> {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Notification : null;
  },

  // Update notification
  async updateNotification(id: string, data: Partial<Notification>): Promise<void> {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  // Delete notification
  async deleteNotification(id: string): Promise<void> {
    await deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, id));
  },

  // Get user's notifications
  async getUserNotifications(userId: string): Promise<Notification[]> {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('targetUsers', 'array-contains', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Notification);
  },

  // Mark notification as read
  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, {
      [`read.${userId}`]: new Date()
    });
  },

  // Mark notification as acknowledged
  async markAsAcknowledged(notificationId: string, userId: string): Promise<void> {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, {
      [`acknowledged.${userId}`]: new Date()
    });
  },
};