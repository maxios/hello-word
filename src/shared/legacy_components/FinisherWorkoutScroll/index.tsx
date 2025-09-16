import {YStack} from 'tamagui';
import {useRouter} from 'expo-router';
import {Text} from 'react-native';
import {SimpleWorkoutProductCard} from '../ProductCards/ProductCard/SimpleWorkoutProductCard';
import {ProductCardsFinishers} from '../ProductCards/ProductCardFinishers';

export const FinisherWorkoutsScroll = ({
  finisherWorkout,
  isLoading,
  error,
}: {
  finisherWorkout?: any;
  isLoading?: boolean;
  error?: any;
}) => {
  const router = useRouter();
  return (
    <YStack>
      <ProductCardsFinishers
        title="Finishers"
        subtext="Add a finisher to take your workout to the next level ."
        products={finisherWorkout || []}
        ProductCardComponent={SimpleWorkoutProductCard}
        isLoading={!isLoading}
        hasError={!!error?.error}
        emptyState={<Text>No finishers found</Text>}
        onSeeAllPress={() => router.navigate('/move/finishers')}
      />
    </YStack>
  );
};
