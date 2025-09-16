/**
 * Data Mapper for Authentication
 * Transforms external API responses to UI-friendly schemas
 */

import {
  UserSession,
  AuthError,
  AuthErrorCode,
  LoginFormData,
  SignupFormData
} from '../schemas/auth.types';

// Mapper configuration for user session
const userSessionMapper = {
  id: 'user_id',
  email: 'email_address',
  displayName: {
    path: 'display_name',
    fallback: (data: any) => `${data.first_name} ${data.last_name}`.trim(),
  },
  firstName: 'first_name',
  lastName: 'last_name',
  avatarUrl: 'profile_image_url',
  isEmailVerified: {
    path: 'email_verified',
    fallback: false,
  },
  createdAt: 'created_at',
  lastLoginAt: 'last_login_at',
};

// Error code mapping from API to UI error codes
const errorCodeMap: Record<string, AuthErrorCode> = {
  'invalid_credentials': AuthErrorCode.INVALID_CREDENTIALS,
  'email_not_found': AuthErrorCode.EMAIL_NOT_FOUND,
  'weak_password': AuthErrorCode.PASSWORD_TOO_WEAK,
  'email_exists': AuthErrorCode.EMAIL_ALREADY_EXISTS,
  'network_error': AuthErrorCode.NETWORK_ERROR,
  'session_expired': AuthErrorCode.SESSION_EXPIRED,
  'email_not_verified': AuthErrorCode.VERIFICATION_REQUIRED,
};

// Generic path resolver with dot notation support
const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    return current[key];
  }, obj);
};

/**
 * Core mapping engine for auth data
 */
export class AuthMapper {
  /**
   * Map API user response to UserSession schema
   */
  static mapUserSession(apiData: any): UserSession | null {
    if (!apiData) return null;

    const result: any = {};

    for (const [key, mapping] of Object.entries(userSessionMapper)) {
      const value = this.processMapping(apiData, mapping);
      if (value !== undefined) {
        result[key] = value;
      }
    }

    // Handle computed displayName
    if (!result.displayName && (result.firstName || result.lastName)) {
      result.displayName = `${result.firstName || ''} ${result.lastName || ''}`.trim();
    }

    return result as UserSession;
  }

  /**
   * Map API error to AuthError schema
   */
  static mapError(apiError: any): AuthError {
    if (!apiError) {
      return {
        code: AuthErrorCode.UNKNOWN_ERROR,
        message: 'An unknown error occurred',
        retryable: false,
      };
    }

    const errorCode = errorCodeMap[apiError.error_code] || AuthErrorCode.UNKNOWN_ERROR;

    return {
      code: errorCode,
      message: apiError.error_message || this.getDefaultErrorMessage(errorCode),
      field: this.mapErrorField(apiError.error_field),
      retryable: this.isRetryableError(errorCode),
    };
  }

  /**
   * Transform login form data to API request format
   */
  static mapLoginRequest(formData: LoginFormData): any {
    return {
      email_address: formData.email.toLowerCase().trim(),
      password: formData.password,
    };
  }

  /**
   * Transform signup form data to API request format
   */
  static mapSignupRequest(formData: SignupFormData): any {
    return {
      email_address: formData.email.toLowerCase().trim(),
      password: formData.password,
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      accept_terms: formData.acceptTerms,
    };
  }

  /**
   * Private helper methods
   */
  private static processMapping(data: any, mapping: any): any {
    // Simple string path
    if (typeof mapping === 'string') {
      return getValueByPath(data, mapping);
    }

    // Object with path and options
    if (mapping.path) {
      let value = getValueByPath(data, mapping.path);

      // Apply transformation if provided
      if (mapping.transform && value !== undefined) {
        value = mapping.transform(value);
      }

      // Use fallback if value is undefined
      if (value === undefined && mapping.fallback !== undefined) {
        value = typeof mapping.fallback === 'function'
          ? mapping.fallback(data)
          : mapping.fallback;
      }

      return value;
    }

    // Nested object mapping
    if (typeof mapping === 'object' && !Array.isArray(mapping)) {
      const result: any = {};
      for (const [key, subMapping] of Object.entries(mapping)) {
        const value = this.processMapping(data, subMapping);
        if (value !== undefined) {
          result[key] = value;
        }
      }
      return result;
    }

    return undefined;
  }

  private static mapErrorField(field?: string): 'email' | 'password' | 'general' | undefined {
    if (!field) return 'general';

    const fieldMap: Record<string, 'email' | 'password' | 'general'> = {
      'email': 'email',
      'email_address': 'email',
      'password': 'password',
      'credentials': 'general',
    };

    return fieldMap[field.toLowerCase()] || 'general';
  }

  private static isRetryableError(code: AuthErrorCode): boolean {
    const retryableErrors = [
      AuthErrorCode.NETWORK_ERROR,
    ];
    return retryableErrors.includes(code);
  }

  private static getDefaultErrorMessage(code: AuthErrorCode): string {
    const messages: Record<AuthErrorCode, string> = {
      [AuthErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
      [AuthErrorCode.EMAIL_NOT_FOUND]: 'No account found with this email',
      [AuthErrorCode.PASSWORD_TOO_WEAK]: 'Password is too weak',
      [AuthErrorCode.EMAIL_ALREADY_EXISTS]: 'An account with this email already exists',
      [AuthErrorCode.NETWORK_ERROR]: 'Network error. Please check your connection',
      [AuthErrorCode.SESSION_EXPIRED]: 'Your session has expired. Please log in again',
      [AuthErrorCode.VERIFICATION_REQUIRED]: 'Please verify your email to continue',
      [AuthErrorCode.UNKNOWN_ERROR]: 'An error occurred. Please try again',
    };
    return messages[code];
  }
}