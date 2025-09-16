import {useMemo} from 'react';
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';

export const useAnimatedHeaderOpacity = () => {
  const translateY = useSharedValue(0);

  const actionBarStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateY.value,
        [0, 100],
        ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
      ),
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  return useMemo(
    () => [scrollHandler, actionBarStyle] as const,
    [scrollHandler, actionBarStyle],
  );
};
