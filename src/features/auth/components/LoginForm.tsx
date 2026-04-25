/**
 * Pure UI Component for Login Form
 * Only handles presentation - no business logic
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { TextField } from '@/components/fields/TextField';
import { PasswordField } from '@/components/fields/PasswordField';
import { Header } from '@/components/Header';
import {
  LoginFormData,
  LoginFormProps
} from '../schemas/auth.types';

/**
 * Pure Login Form Component
 * Receives all data and callbacks via props
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onNavigateToSignup,
  isLoading,
  error,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <AppLayout
      buttons={[
        {
          label: 'Log in',
          size: 'medium',
          onPress: handleSubmit(handleFormSubmit),
          isLoading,
        },
      ]}
    >
      <View className="w-full flex-1 gap-8">
        {/* Header */}
        <Header
          heading="Log in"
          subtext="Log in to your Flota account."
          variant="heading"
          pt={0}
        />

        {/* Form Fields */}
        <View className="w-full gap-4">
          {/* Email Field */}
          <View>
            <TextField
              control={control}
              name="email"
              label="Email"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
            {errors.email && (
              <Text className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </Text>
            )}
            {error?.field === 'email' && (
              <Text className="mt-2 text-sm text-red-500">
                {error.message}
              </Text>
            )}
          </View>

          {/* Password Field */}
          <View>
            <PasswordField
              control={control}
              name="password"
              placeholder="Password"
              secureTextEntry
              label="Password"
              autoCapitalize="none"
              returnKeyType="done"
            />
            {errors.password && (
              <Text className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </Text>
            )}
            {error?.field === 'password' && (
              <Text className="mt-2 text-sm text-red-500">
                {error.message}
              </Text>
            )}
          </View>

          {/* General Error Display */}
          {error?.field === 'general' && (
            <View className="mt-2 rounded-lg bg-red-50 p-3">
              <Text className="text-sm text-red-500">
                {error.message}
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View className="gap-3">
          <Button
            variant="text"
            size="medium"
            onPress={onForgotPassword}
            label="Forgot Your Password?"
            disabled={isLoading}
          />

          <View className="flex-row items-center justify-center gap-1">
            <Text className="text-gray-600">{`Don't have an account?`}</Text>
            <Button
              variant="text"
              size="small"
              onPress={onNavigateToSignup}
              label="Sign up"
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </AppLayout>
  );
};