import { clsx } from 'clsx';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface PlaygroundButtonProps {
  className?: string;
  variant?: 'floating' | 'inline';
}

export const PlaygroundButton: React.FC<PlaygroundButtonProps> = ({ 
  className, 
  variant = 'floating' 
}) => {
  const router = useRouter();

  // Only show in development or if explicitly enabled
  const showPlayground = Constants.expoConfig?.extra?.enablePlayground || __DEV__;

  if (!showPlayground) {
    return null;
  }

  const handlePress = () => {
    router.push('/playground');
  };

  if (variant === 'floating') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        className={clsx(
          'absolute bottom-20 right-4 z-50 size-14 items-center justify-center rounded-full bg-primary shadow-lg',
          className
        )}
      >
        <Text className="text-xl text-primary-foreground">🧪</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={clsx(
        'flex-row items-center rounded-lg bg-primary p-3',
        className
      )}
    >
      <Text className="mr-2 text-xl">🧪</Text>
      <Text className="font-medium text-primary-foreground">
        Component Playground
      </Text>
    </TouchableOpacity>
  );
};
