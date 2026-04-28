import React from 'react';
import { View, ActivityIndicator, Text, Pressable } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Carousel } from '../Carousel';
import { useCarouselActions } from '../hooks/useCarouselActions';
import { useCarouselGestures } from '../hooks/useCarouselGestures';
import { useCarouselData } from '../hooks/useCarouselData';
import { CarouselSchema } from '../schemas/carousel.types';

interface CarouselContainerProps extends Omit<CarouselSchema, 'items'> {
  items?: CarouselSchema['items'];
  fetchData?: () => Promise<CarouselSchema['items']>;
  cacheKey?: string;
  width?: number;
  height?: number;
  enableCache?: boolean;
}

export const CarouselContainer: React.FC<CarouselContainerProps> = ({
  items: staticItems,
  fetchData,
  cacheKey,
  enableCache = true,
  config = {},
  onSlideChange,
  onSlidePress,
  renderItem,
  className,
  testID,
  width,
  height,
}) => {
  const { items, isLoading, error, refetch } = useCarouselData({
    items: staticItems,
    fetchData,
    cacheKey,
    enableCache,
  });

  const {
    currentIndex,
    isAutoPlaying,
    next,
    previous,
    goToSlide,
  } = useCarouselActions(items.length, config, onSlideChange);

  const { gesture, translateX } = useCarouselGestures({
    onSwipeLeft: next,
    onSwipeRight: previous,
    enabled: config.enableGestures !== false,
    itemWidth: width || 300,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center" style={{ height: height || 400 }}>
        <ActivityIndicator size="large" color="#666" />
        <Text className="mt-2 text-medium-emphasis">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4" style={{ height: height || 400 }}>
        <Text className="mb-2 text-lg text-high-emphasis">Error loading carousel</Text>
        <Text className="mb-4 text-center text-medium-emphasis">{error.message}</Text>
        <Pressable onPress={refetch} className="rounded bg-brand-mid px-4 py-2">
          <Text className="font-bold text-white">Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!items || items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center" style={{ height: height || 400 }}>
        <Text className="text-medium-emphasis">No items to display</Text>
      </View>
    );
  }

  const carouselElement = (
    <Carousel
      items={items}
      config={config}
      currentIndex={currentIndex}
      onNext={next}
      onPrevious={previous}
      onGoToSlide={goToSlide}
      onSlideChange={onSlideChange}
      onSlidePress={onSlidePress}
      renderItem={renderItem}
      className={className}
      testID={testID}
      width={width}
      height={height}
      isAutoPlaying={isAutoPlaying}
    />
  );

  if (config.enableGestures === false) {
    return carouselElement;
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={{ transform: [{ translateX: translateX }] }}>
        {carouselElement}
      </Animated.View>
    </GestureDetector>
  );
};