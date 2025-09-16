/**
 * Login Container Component
 * Orchestrates data and actions for LoginForm
 */

import React from 'react';
import { useRouter } from 'expo-router';
import { LoginForm } from '../components/LoginForm';
import { useLoginActions } from '../hooks/useLoginActions';
import { LoginFormData } from '../schemas/auth.types';

/**
 * Container that connects login actions to the pure UI component
 */
export const LoginContainer: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useLoginActions();

  // Handle form submission
  const handleSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  // Handle navigation to forgot password
  const handleForgotPassword = () => {
    router.push('/auth/reset-password-init');
  };

  // Handle navigation to signup
  const handleNavigateToSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onForgotPassword={handleForgotPassword}
      onNavigateToSignup={handleNavigateToSignup}
      isLoading={isLoading}
      error={error}
    />
  );
};