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
          'absolute bottom-20 right-4 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg z-50',
          className
        )}
      >
        <Text className="text-primary-foreground text-xl">🧪</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={clsx(
        'flex-row items-center p-3 bg-primary rounded-lg',
        className
      )}
    >
      <Text className="text-xl mr-2">🧪</Text>
      <Text className="text-primary-foreground font-medium">
        Component Playground
      </Text>
    </TouchableOpacity>
  );
};
