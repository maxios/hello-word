/**
 * Auth State Hook
 * Manages global authentication state
 */

import { useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { AuthMapper } from '../mappers/authMapper';
import { AuthState, UserSession } from '../schemas/auth.types';

export interface UseAuthStateReturn extends AuthState {
  checkAuth: () => Promise<void>;
  setUser: (user: UserSession | null) => void;
  logout: () => Promise<void>;
}

/**
 * Hook that provides authentication state management
 */
export const useAuthState = (): UseAuthStateReturn => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  /**
   * Check authentication status
   */
  const checkAuth = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Check if user is authenticated
      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        // Get stored session
        const sessionData = await authService.getStoredSession();

        if (sessionData) {
          const user = AuthMapper.mapUserSession(sessionData);
          setState({
            isAuthenticated: true,
            isLoading: false,
            user,
            error: null,
          });
        } else {
          setState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: null,
          });
        }
      } else {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
      }
    } catch {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    }
  }, []);

  /**
   * Set user state
   */
  const setUser = useCallback((user: UserSession | null) => {
    setState(prev => ({
      ...prev,
      isAuthenticated: !!user,
      user,
      error: null,
    }));
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      await authService.logout();

      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    } catch {
      // Even if logout fails, clear local state
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...state,
    checkAuth,
    setUser,
    logout,
  };
};