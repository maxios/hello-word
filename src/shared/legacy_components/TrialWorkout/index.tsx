import {YStack} from 'tamagui';
import {Text} from 'react-native';
import {TrailWorkoutProductCard} from '../ProductCards/ProductCard/TrailWorkoutProductCard';
import {ProductCardTrail} from '../ProductCards/ProductCardTrail';

export const TrialWorkout = ({
  trialWorkout,
  isLoading,
  error,
}: {
  trialWorkout?: any;
  isLoading?: boolean;
  error?: any;
}) => {
  return (
    <YStack>
      <ProductCardTrail
        title="Hit Start Feel STRNG"
        subtext="Try a full workout—no signup, no strings."
        products={trialWorkout || []}
        ProductCardComponent={TrailWorkoutProductCard}
        isLoading={isLoading}
        hasError={!!error?.error}
        emptyState={<Text>Trial workout not found</Text>}
      />
    </YStack>
  );
};
