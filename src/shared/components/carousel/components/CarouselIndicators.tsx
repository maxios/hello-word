import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { CarouselIndicatorsProps } from '../schemas/carousel.types';

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  total,
  currentIndex,
  onDotPress,
  className = '',
}) => {
  return (
    <View className={`flex-row items-center justify-center ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <DotIndicator
          key={index}
          index={index}
          isActive={index === currentIndex}
          onPress={() => onDotPress?.(index)}
        />
      ))}
    </View>
  );
};

interface DotIndicatorProps {
  index: number;
  isActive: boolean;
  onPress: () => void;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ index, isActive, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isActive ? 1 : 0.8);
    const opacity = withSpring(isActive ? 1 : 0.5);
    const width = withSpring(isActive ? 24 : 8);

    return {
      transform: [{ scale }],
      opacity,
      width,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Go to slide ${index + 1}`}
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
          },
        ]}
        className={isActive ? 'bg-brand-mid' : 'bg-medium-emphasis'}
      />
    </Pressable>
  );
};