/**
 * Password Reset Actions Hook
 * Encapsulates password reset business logic
 */

import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useToastManager } from '@/components/Toast';
import { authService } from '../services/authService';
import { AuthError, AuthErrorCode } from '../schemas/auth.types';

export interface UsePasswordResetActionsReturn {
  requestReset: (email: string) => Promise<void>;
  isLoading: boolean;
  error: AuthError | null;
  clearError: () => void;
}

/**
 * Hook that provides password reset actions
 */
export const usePasswordResetActions = (): UsePasswordResetActionsReturn => {
  const router = useRouter();
  const { showToast } = useToastManager();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  /**
   * Request password reset
   */
  const requestReset = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await authService.requestPasswordReset(email);

      if (result.success) {
        showToast({
          message: 'Password reset email sent. Check your inbox.',
          type: 'success',
        });

        // Navigate back to login
        router.push('/auth/login');
      } else {
        const authError: AuthError = {
          code: AuthErrorCode.UNKNOWN_ERROR,
          message: result.message || 'Failed to send reset email',
          field: 'email',
          retryable: true,
        };
        setError(authError);
        showToast({
          message: authError.message,
          type: 'error',
        });
      }
    } catch (err) {
      const authError: AuthError = {
        code: AuthErrorCode.NETWORK_ERROR,
        message: 'Network error. Please check your connection.',
        field: 'general',
        retryable: true,
      };
      setError(authError);
      showToast({
        message: authError.message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [router, showToast]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    requestReset,
    isLoading,
    error,
    clearError,
  };
};