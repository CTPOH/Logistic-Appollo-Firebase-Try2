import { collection, doc, setDoc, getDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './config';
import type { AnalyticsDaily } from '../../types/firebase/analytics';

const ANALYTICS_COLLECTION = 'analytics';

export const analyticsService = {
  // Save daily analytics
  async saveDailyAnalytics(date: string, data: Omit<AnalyticsDaily, 'id'>): Promise<void> {
    await setDoc(doc(db, ANALYTICS_COLLECTION, date), data);
  },

  // Get analytics for specific date
  async getDailyAnalytics(date: string): Promise<AnalyticsDaily | null> {
    const docRef = doc(db, ANALYTICS_COLLECTION, date);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as AnalyticsDaily : null;
  },

  // Get analytics for date range
  async getAnalyticsRange(startDate: string, endDate: string): Promise<AnalyticsDaily[]> {
    const q = query(
      collection(db, ANALYTICS_COLLECTION),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as AnalyticsDaily);
  },

  // Get latest analytics
  async getLatestAnalytics(): Promise<AnalyticsDaily | null> {
    const q = query(
      collection(db, ANALYTICS_COLLECTION),
      orderBy('date', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    return doc ? { id: doc.id, ...doc.data() } as AnalyticsDaily : null;
  },
};