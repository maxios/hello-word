 
import React, {useEffect, useRef, useCallback, useMemo, useState} from 'react';
import {Animated, Easing, ActivityIndicator} from 'react-native';
import {View} from 'tamagui';
import tokens from '../../theme/tokens';
import {BarbellIcon as ExistingBarbellIcon} from '../icons/BarbellIcon';

interface FitnessLoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  equipment?: 'dumbbell' | 'barbell' | 'kettlebell' | 'cycle';
}

const FitnessLoader: React.FC<FitnessLoaderProps> = ({
  size = 'medium',
  color = tokens.color.brandMid.val,
  equipment = 'dumbbell',
}) => {
  const [hasError, setHasError] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const animationRefs = useRef<Animated.CompositeAnimation[]>([]);

  const iconSize = useMemo(
    () =>
      ({
        small: 24,
        medium: 36,
        large: 48,
      })[size],
    [size],
  );

  const animatedValues = useMemo(() => {
    try {
      return {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
        scale: scaleAnim,
        translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      };
    } catch {
      setHasError(true);
      return null;
    }
  }, [rotateAnim, scaleAnim, bounceAnim]);

  const createAnimations = useCallback(() => {
    try {
      return [
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ),
      ];
    } catch {
      setHasError(true);
      return [];
    }
  }, [rotateAnim, scaleAnim, bounceAnim]);

  useEffect(() => {
    const animations = createAnimations();
    if (!animations.length) return;

    animationRefs.current = animations;

    // Start each animation safely
    animations.forEach((anim) => {
      if (anim && typeof anim.start === 'function') {
        anim.start();
      }
    });
    return () => {
      animationRefs.current.forEach((anim) => {
        if (anim && typeof anim.stop === 'function') {
          anim.stop();
        }
      });
      rotateAnim.setValue(0);
      scaleAnim.setValue(1);
      bounceAnim.setValue(0);
      animationRefs.current = [];
    };
  }, [createAnimations, rotateAnim, scaleAnim, bounceAnim]);

  const EquipmentIcon = useMemo(() => {
    if (hasError || !animatedValues) return null;

    const {rotate, scale, translateY} = animatedValues;
    const animatedStyle = {transform: [{rotate}, {scale}, {translateY}]};

    const icons: Record<string, React.ReactNode> = {
      dumbbell: <DumbbellIcon size={iconSize} color={color} />,
      barbell: <BarbellIcon color={color} />,
      kettlebell: <KettlebellIcon size={iconSize} color={color} />,
      cycle: <CycleIcon size={iconSize} color={color} />,
    };

    return (
      <Animated.View style={animatedStyle}>
        {icons[equipment] ?? icons.dumbbell}
      </Animated.View>
    );
  }, [equipment, iconSize, color, animatedValues, hasError]);

  if (hasError || !animatedValues) {
    return (
      <View flex={1} jc="center" ai="center">
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'large'}
          color={color}
        />
      </View>
    );
  }

  return (
    <View flex={1} jc="center" ai="center">
      {EquipmentIcon}
    </View>
  );
};

const DumbbellIcon = React.memo(
  ({size, color}: {size: number; color: string}) => (
    <View width={size} height={size} jc="center" ai="center">
      <View
        width={size * 0.8}
        height={size * 0.15}
        bg={color}
        br={size * 0.075}
      />
      <View
        position="absolute"
        left={size * 0.05}
        width={size * 0.25}
        height={size * 0.6}
        bg={color}
        br={size * 0.125}
      />
      <View
        position="absolute"
        right={size * 0.05}
        width={size * 0.25}
        height={size * 0.6}
        bg={color}
        br={size * 0.125}
      />
    </View>
  ),
);

const BarbellIcon = React.memo(({color}: {color: string}) => (
  <ExistingBarbellIcon size="md" color={color} />
));

const KettlebellIcon = React.memo(
  ({size, color}: {size: number; color: string}) => (
    <View width={size} height={size} jc="center" ai="center">
      <View
        width={size * 0.6}
        height={size * 0.7}
        bg={color}
        br={size * 0.3}
        bblr={size * 0.1}
        bbrr={size * 0.1}
      />
      <View
        position="absolute"
        top={size * 0.1}
        width={size * 0.3}
        height={size * 0.15}
        bg={color}
        br={size * 0.075}
      />
    </View>
  ),
);

const CycleIcon = React.memo(({size, color}: {size: number; color: string}) => (
  <View width={size} height={size} jc="center" ai="center">
    <View
      width={size * 0.8}
      height={size * 0.8}
      br={size * 0.4}
      bw={size * 0.08}
      bc={color}
    />
    <View
      position="absolute"
      width={size * 0.3}
      height={size * 0.3}
      br={size * 0.15}
      bw={size * 0.08}
      bc={color}
    />
    <View
      position="absolute"
      width={size * 0.1}
      height={size * 0.4}
      bg={color}
      br={size * 0.05}
    />
  </View>
));

DumbbellIcon.displayName = 'DumbbellIcon';
BarbellIcon.displayName = 'BarbellIcon';
KettlebellIcon.displayName = 'KettlebellIcon';
CycleIcon.displayName = 'CycleIcon';

export default React.memo(FitnessLoader);
