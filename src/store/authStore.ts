import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  login: (user: User) => void;
  logout: () => void;
}

// Helper to generate a unique session ID
const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      sessionId: null,
      login: (user) => set({
        user,
        isAuthenticated: true,
        sessionId: generateSessionId(),
      }),
      logout: () => set({
        user: null,
        isAuthenticated: false,
        sessionId: null,
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for session persistence
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionId: state.sessionId,
      }),
    }
  )
);