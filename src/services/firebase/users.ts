import { collection, doc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';
import type { User, UserRole } from '../../types/firebase/user';

const USERS_COLLECTION = 'users';

export const usersService = {
  // Create or update user
  async setUser(id: string, user: Omit<User, 'id'>): Promise<void> {
    await setDoc(doc(db, USERS_COLLECTION, id), user);
  },

  // Get user by ID
  async getUser(id: string): Promise<User | null> {
    const docRef = doc(db, USERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
  },

  // Update user
  async updateUser(id: string, data: Partial<User>): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await deleteDoc(doc(db, USERS_COLLECTION, id));
  },

  // Get users by role
  async getUsersByRole(role: UserRole): Promise<User[]> {
    const q = query(
      collection(db, USERS_COLLECTION),
      where('role', '==', role),
      where('active', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as User);
  },
};