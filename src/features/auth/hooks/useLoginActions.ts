/**
 * Login Actions Hook
 * Encapsulates all login-related business logic
 */

import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { StackActions , useNavigation } from '@react-navigation/native';
import { useToastManager } from '@/components/Toast';
import { authService } from '../services/authService';
import { AuthMapper } from '../mappers/authMapper';
import {
  LoginFormData,
  AuthError,
  UserSession,
  AuthErrorCode
} from '../schemas/auth.types';

export interface UseLoginActionsReturn {
  login: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error: AuthError | null;
  clearError: () => void;
}

/**
 * Hook that provides login actions and state
 */
export const useLoginActions = (): UseLoginActionsReturn => {
  const router = useRouter();
  const navigation = useNavigation();
  const { showToast } = useToastManager();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  /**
   * Handle successful login
   */
  const handleLoginSuccess = useCallback((user: UserSession) => {
    // Clear navigation stack and navigate to home
    navigation.dispatch(StackActions.popToTop());
    router.replace('/home');

    // Show success toast
    showToast({
      message: `Welcome back, ${user.firstName}!`,
      type: 'success',
    });
  }, [navigation, router, showToast]);

  /**
   * Handle login error
   */
  const handleLoginError = useCallback((error: AuthError) => {
    setError(error);

    // Show error toast for general errors
    if (error.field === 'general') {
      showToast({
        message: error.message,
        type: 'error',
      });
    }
  }, [showToast]);

  /**
   * Perform login
   */
  const login = useCallback(async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Transform form data to API format
      const apiRequest = AuthMapper.mapLoginRequest(data);

      // Call auth service
      const response = await authService.login(
        apiRequest.email_address,
        apiRequest.password
      );

      if (response.success && response.data) {
        // Map API response to UI schema
        const userSession = AuthMapper.mapUserSession(response.data);

        if (userSession) {
          handleLoginSuccess(userSession);
        } else {
          throw new Error('Failed to process user data');
        }
      } else {
        // Map API error to UI error
        const authError = AuthMapper.mapError(response.error);
        handleLoginError(authError);
      }
    } catch (err) {
      // Handle unexpected errors
      const authError: AuthError = {
        code: AuthErrorCode.UNKNOWN_ERROR,
        message: 'An unexpected error occurred. Please try again.',
        field: 'general',
        retryable: true,
      };
      handleLoginError(authError);
    } finally {
      setIsLoading(false);
    }
  }, [handleLoginSuccess, handleLoginError]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    isLoading,
    error,
    clearError,
  };
};