import React from 'react';
import { View, ScrollView, Dimensions, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import { CarouselSchema, CarouselItem } from './schemas/carousel.types';
import { CarouselIndicators } from './components/CarouselIndicators';
import { CarouselControls } from './components/CarouselControls';
import { CarouselItemRenderer } from './components/CarouselItem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarouselProps extends CarouselSchema {
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToSlide: (index: number) => void;
  isAutoPlaying?: boolean;
  width?: number;
  height?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  config = {},
  currentIndex,
  onNext,
  onPrevious,
  onGoToSlide,
  onSlideChange,
  onSlidePress,
  renderItem,
  className = '',
  testID = 'carousel',
  width = SCREEN_WIDTH,
  height = 400,
}) => {
  const scrollX = useSharedValue(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const {
    showIndicators = true,
    showControls = true,
    loop = false,
    spacing = 16,
    itemsPerView = 1,
    centerMode = false,
    fadeEdges = false,
  } = config;

  const itemWidth = (width - spacing * 2) / itemsPerView;
  const snapToOffsets = items.map((_, index) => index * (itemWidth + spacing));

  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * (itemWidth + spacing),
        animated: true,
      });
    }
  }, [currentIndex, itemWidth, spacing]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const newIndex = Math.round(event.contentOffset.x / (itemWidth + spacing));
      if (onSlideChange && newIndex !== currentIndex) {
        onSlideChange(newIndex);
      }
    },
  });

  const canGoPrevious = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < items.length - itemsPerView;

  const containerStyle: ViewStyle = {
    height,
    width,
  };

  return (
    <View 
      className={`relative ${className}`}
      style={containerStyle}
      testID={testID}
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityLabel={`Carousel with ${items.length} items`}
      accessibilityHint={`Currently showing item ${currentIndex + 1} of ${items.length}`}
    >
      <Animated.ScrollView
        ref={scrollViewRef as React.Ref<Animated.ScrollView>}
        horizontal
        pagingEnabled={itemsPerView === 1}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        snapToAlignment={centerMode ? 'center' : 'start'}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: spacing,
        }}
      >
        {items.map((item, index) => {
          const inputRange = [
            (index - 1) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
          ];

          const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              scrollX.value,
              inputRange,
              centerMode ? [0.9, 1, 0.9] : [1, 1, 1]
            );

            const opacity = interpolate(
              scrollX.value,
              inputRange,
              fadeEdges ? [0.7, 1, 0.7] : [1, 1, 1]
            );

            return {
              transform: [{ scale }],
              opacity,
            };
          });

          return (
            <Animated.View
              key={item.id || index}
              style={[
                animatedStyle,
                {
                  width: itemWidth,
                  marginRight: index < items.length - 1 ? spacing : 0,
                },
              ]}
            >
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <CarouselItemRenderer
                  item={item}
                  index={index}
                  width={itemWidth}
                  height={height}
                  onPress={() => onSlidePress?.(item, index)}
                />
              )}
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {showIndicators && items.length > 1 && (
        <View className="absolute inset-x-0 bottom-4">
          <CarouselIndicators
            total={items.length}
            currentIndex={currentIndex}
            onDotPress={onGoToSlide}
          />
        </View>
      )}

      {showControls && items.length > 1 && (
        <CarouselControls
          onPrevious={onPrevious}
          onNext={onNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </View>
  );
};