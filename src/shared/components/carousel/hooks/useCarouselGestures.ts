import { useRef } from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface UseCarouselGesturesProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled?: boolean;
  threshold?: number;
  itemWidth: number;
}

export const useCarouselGestures = ({
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
  threshold = 50,
  itemWidth,
}: UseCarouselGesturesProps) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (event) => {
      startX.value = translateX.value;
    },
    onActive: (event) => {
      if (!enabled) return;
      
      const maxTranslate = itemWidth / 3;
      const translation = Math.max(
        -maxTranslate,
        Math.min(maxTranslate, event.translationX)
      );
      
      translateX.value = startX.value + translation;
    },
    onEnd: (event) => {
      if (!enabled) {
        translateX.value = withSpring(0);
        return;
      }

      const velocity = event.velocityX;
      const translation = event.translationX;
      
      const shouldSwipe = 
        Math.abs(translation) > threshold || 
        Math.abs(velocity) > 500;

      if (shouldSwipe) {
        if (translation < 0 || velocity < -500) {
          runOnJS(onSwipeLeft)();
        } else if (translation > 0 || velocity > 500) {
          runOnJS(onSwipeRight)();
        }
      }
      
      translateX.value = withSpring(0);
    },
    onCancel: () => {
      translateX.value = withSpring(0);
    },
  });

  return {
    gestureHandler,
    translateX,
  };
};