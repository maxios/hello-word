import React from 'react';
import { View, Pressable } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { CarouselControlsProps } from '../schemas/carousel.types';

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className = '',
}) => {
  return (
    <>
      <View className={`absolute left-4 top-1/2 -translate-y-1/2 ${className}`}>
        <Pressable
          onPress={onPrevious}
          disabled={!canGoPrevious}
          className={`w-10 h-10 rounded-full bg-surface-12 items-center justify-center ${
            !canGoPrevious ? 'opacity-30' : ''
          }`}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Previous slide"
          accessibilityState={{ disabled: !canGoPrevious }}
        >
          <ChevronLeftIcon className="w-6 h-6" color="#fff" />
        </Pressable>
      </View>

      <View className={`absolute right-4 top-1/2 -translate-y-1/2 ${className}`}>
        <Pressable
          onPress={onNext}
          disabled={!canGoNext}
          className={`w-10 h-10 rounded-full bg-surface-12 items-center justify-center ${
            !canGoNext ? 'opacity-30' : ''
          }`}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Next slide"
          accessibilityState={{ disabled: !canGoNext }}
        >
          <ChevronRightIcon className="w-6 h-6" color="#fff" />
        </Pressable>
      </View>
    </>
  );
};