import {RecipePlanItem} from '@/lib/hooks/useRecipePlan';
import {ProductCardsScroll} from '../ProductCards/ProductCardsScroll';
import {Product} from '../ProductCards/types';
import {MealProductCard} from '../ProductCards/ProductCard/MealProductCard';
import {MealProductCardFragment} from '../../graphql/generated-queries';

const ProductCardComponent = ({product}: {product: Product}) => {
  return <MealProductCard product={product as unknown as RecipePlanItem} />;
};

export const RecipeInspirationScroll = ({
  recipeSuggestions,
  isLoading,
  error,
}: {
  recipeSuggestions?: MealProductCardFragment[];
  isLoading?: boolean;
  error?: any;
}) => {
  return (
    <ProductCardsScroll
      title="Recipe Inspiration"
      subtext="Recipes to hit today's macros."
      products={recipeSuggestions as Product[]}
      ProductCardComponent={ProductCardComponent}
      isLoading={isLoading}
      hasError={!!error}
    />
  );
};
