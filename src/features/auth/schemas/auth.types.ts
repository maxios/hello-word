/**
 * UI Schema definitions for authentication features
 * These interfaces define the exact data contracts that UI components expect
 */

// UI Schema - What the login form component expects
export interface LoginFormData {
  email: string;
  password: string;
}

// UI Schema - What the signup form component expects
export interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

// UI Schema - User session data structure for UI
export interface UserSession {
  id: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

// UI Schema - Authentication state for the app
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserSession | null;
  error: AuthError | null;
}

// UI Schema - Standardized auth error structure
export interface AuthError {
  code: AuthErrorCode;
  message: string;
  field?: 'email' | 'password' | 'general';
  retryable: boolean;
}

// Enum for auth error codes
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  PASSWORD_TOO_WEAK = 'PASSWORD_TOO_WEAK',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  VERIFICATION_REQUIRED = 'VERIFICATION_REQUIRED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// UI Schema - Password reset flow
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Validation rules for forms
export const ValidationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  firstName: {
    required: 'First name is required',
    minLength: {
      value: 2,
      message: 'First name must be at least 2 characters',
    },
  },
  lastName: {
    required: 'Last name is required',
    minLength: {
      value: 2,
      message: 'Last name must be at least 2 characters',
    },
  },
  acceptTerms: {
    required: 'You must accept the terms and conditions',
  },
} as const;

// Props for pure UI components
export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onForgotPassword: () => void;
  onNavigateToSignup: () => void;
  isLoading: boolean;
  error: AuthError | null;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  onNavigateToLogin: () => void;
  isLoading: boolean;
  error: AuthError | null;
}