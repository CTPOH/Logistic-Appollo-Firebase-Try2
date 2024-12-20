import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, sessionId, login, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // Handle session validation
    const validateSession = () => {
      if (!sessionId && isAuthenticated) {
        handleLogout();
      }
    };

    // Check session on mount
    validateSession();

    // Handle storage events for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-storage') {
        const newState = JSON.parse(e.newValue || '{}');
        const oldState = JSON.parse(e.oldValue || '{}');

        // Handle logout in other tabs
        if (oldState.state?.isAuthenticated && !newState.state?.isAuthenticated) {
          handleLogout();
        }

        // Handle new login in other tabs with same user
        if (
          newState.state?.user?.id === user?.id &&
          newState.state?.sessionId !== sessionId
        ) {
          handleLogout();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, sessionId, isAuthenticated]);

  return {
    user,
    isAuthenticated,
    login,
    logout: handleLogout,
  };
};