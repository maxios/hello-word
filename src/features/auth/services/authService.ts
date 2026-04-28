/**
 * Authentication Service Layer
 * Handles all external API communication and token management.
 *
 * Storage strategy:
 *   - Tokens live in expo-secure-store (Keychain on iOS, EncryptedSharedPreferences
 *     on Android) so they survive app restarts and are OS-protected.
 *   - User profile JSON lives in AsyncStorage — it is non-sensitive and larger
 *     than the 2KB SecureStore limit.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'flota_auth_token',
  REFRESH_TOKEN: 'flota_refresh_token',
  USER_SESSION: 'flota_user_session',
} as const;

// SecureStore isn't available on web — fall back to AsyncStorage there.
const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return AsyncStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  async deleteItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

// Mock API responses (replace with actual API integration)
interface ApiLoginResponse {
  success: boolean;
  data?: {
    user_id: string;
    email_address: string;
    first_name: string;
    last_name: string;
    profile_image_url?: string;
    email_verified: boolean;
    created_at: string;
    last_login_at: string;
    session: {
      access_token: string;
      refresh_token: string;
      expires_at: string;
    };
  };
  error?: {
    error_code: string;
    error_message: string;
    error_field?: string;
  };
}

type ApiSignupResponse = ApiLoginResponse;

class AuthService {
  private baseUrl = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<ApiLoginResponse> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock successful response for development
      const mockResponse: ApiLoginResponse = {
        success: true,
        data: {
          user_id: 'user_123',
          email_address: email,
          first_name: 'John',
          last_name: 'Doe',
          email_verified: true,
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          session: {
            access_token: 'mock_access_token_' + Date.now(),
            refresh_token: 'mock_refresh_token_' + Date.now(),
            expires_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour
          },
        },
      };

      // Store tokens if login successful
      if (mockResponse.success && mockResponse.data) {
        await this.storeSession(mockResponse.data);
      }

      return mockResponse;
    } catch {
      return {
        success: false,
        error: {
          error_code: 'NETWORK_ERROR',
          error_message: 'Failed to connect to server',
        },
      };
    }
  }

  /**
   * Sign up with user details
   */
  async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<ApiSignupResponse> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/auth/signup`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, firstName, lastName }),
      // });
      // const data = await response.json();

      // Mock successful response for development
      const mockResponse: ApiSignupResponse = {
        success: true,
        data: {
          user_id: 'user_' + Date.now(),
          email_address: email,
          first_name: firstName,
          last_name: lastName,
          email_verified: false,
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          session: {
            access_token: 'mock_access_token_' + Date.now(),
            refresh_token: 'mock_refresh_token_' + Date.now(),
            expires_at: new Date(Date.now() + 3600000).toISOString(),
          },
        },
      };

      // Store tokens if signup successful
      if (mockResponse.success && mockResponse.data) {
        await this.storeSession(mockResponse.data);
      }

      return mockResponse;
    } catch {
      return {
        success: false,
        error: {
          error_code: 'NETWORK_ERROR',
          error_message: 'Failed to connect to server',
        },
      };
    }
  }

  /**
   * Logout and clear session
   */
  async logout(): Promise<void> {
    try {
      // TODO: Call logout endpoint if needed
      // await fetch(`${this.baseUrl}/auth/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAccessToken()}`,
      //   },
      // });

      // Clear stored session
      await this.clearSession();
    } catch {
      // Still clear local session even if API call fails
      await this.clearSession();
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAccessToken();
      if (!token) return false;

      // TODO: Validate token with server
      // const response = await fetch(`${this.baseUrl}/auth/validate`, {
      //   headers: { 'Authorization': `Bearer ${token}` },
      // });
      // return response.ok;

      // For now, just check if token exists
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get stored user session
   */
  async getStoredSession(): Promise<any | null> {
    try {
      const sessionStr = await AsyncStorage.getItem(STORAGE_KEYS.USER_SESSION);
      return sessionStr ? JSON.parse(sessionStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await secureStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) return false;

      // TODO: Implement token refresh
      // const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refresh_token: refreshToken }),
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
      //   return true;
      // }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(_email: string): Promise<{ success: boolean; message?: string }> {
    // TODO: Implement password reset request with actual API call
    return {
      success: true,
      message: 'Password reset email sent',
    };
  }

  /**
   * Private helper methods
   */
  private async storeSession(data: ApiLoginResponse['data']): Promise<void> {
    if (!data) return;

    await Promise.all([
      secureStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.session.access_token),
      secureStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.session.refresh_token),
      AsyncStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(data)),
    ]);
  }

  private async clearSession(): Promise<void> {
    await Promise.all([
      secureStorage.deleteItem(STORAGE_KEYS.AUTH_TOKEN),
      secureStorage.deleteItem(STORAGE_KEYS.REFRESH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION),
    ]);
  }

  private async getAccessToken(): Promise<string | null> {
    return secureStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}

// Export singleton instance
export const authService = new AuthService();