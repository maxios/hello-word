import {ProductCardsScroll} from '../ProductCards/ProductCardsScroll';
import {Product} from '../ProductCards/types';
import {SimpleWorkoutProductCard} from '../ProductCards/ProductCard/SimpleWorkoutProductCard';
import {WorkoutProductCardFragment} from '../../graphql/generated-queries';

const ProductCardComponent = ({product}: {product: Product}) => (
  <SimpleWorkoutProductCard
    product={product as WorkoutProductCardFragment}
    isSingleCard
    isFeatured
  />
);

export const FeaturedWorkoutsScroll = ({
  featuredWorkout,
  isLoading,
  error,
}: {
  featuredWorkout?: WorkoutProductCardFragment;
  isLoading?: boolean;
  error?: any;
}) => {
  return (
    <ProductCardsScroll
      title="Featured"
      subtext="Switch things up and take on today's featured session!"
      products={featuredWorkout ? [featuredWorkout as Product] : []}
      ProductCardComponent={ProductCardComponent}
      isLoading={isLoading}
      hasError={!!error}
    />
  );
};
