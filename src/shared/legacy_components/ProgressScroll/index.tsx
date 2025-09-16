import {YStack, View} from 'tamagui';
import {ProductCardsScroll} from '../ProductCards/ProductCardsScroll';
import {Product} from '../ProductCards/types';
import {ProgressProductCard} from '../ProductCards/ProductCard/ProgressProductCard';
import {APP_PADDING} from '../../consts/consts';
import tokens from '../../theme/tokens';
import {ConcreteVariantSvg} from '../svgs/ConcreteVariantSvg';
import {Text} from '../Text';
import {
  useProgressEntriesQuery,
  ProgressEntryProductCardFragment,
  ProgressEntry,
} from '../../graphql/generated-queries';

const ProductCardComponent = ({product}: {product: Product}) => {
  return (
    <ProgressProductCard
      product={product as ProgressEntryProductCardFragment}
    />
  );
};

export const ProgressScroll = () => {
  const {data, loading, error} = useProgressEntriesQuery({
    variables: {
      limit: 5,
    },
    fetchPolicy: 'cache-and-network',
  });

  const progressEntries = data?.progressEntries || [];

  return (
    <ProductCardsScroll
      title="Progress"
      products={progressEntries as ProgressEntry[]}
      ProductCardComponent={ProductCardComponent}
      viewAllHref="/settings/progress-list"
      isLoading={loading}
      hasError={!!error}
      emptyState={
        <YStack
          pos="relative"
          overflow="hidden"
          mx={APP_PADDING}
          bc="$surface4"
        >
          <View pos="absolute" top={0} left={0} right={0}>
            <ConcreteVariantSvg color={tokens.color.surface12.val} />
          </View>
          <YStack gap={2} px={16} py={46}>
            <Text variant="h5" withBrandMidBackground>
              No entries yet
            </Text>
            <Text variant="uiS" withWhiteBackground>
              Ready to start tracking
            </Text>
            <Text variant="uiS" withWhiteBackground>
              your progress?
            </Text>
          </YStack>
        </YStack>
      }
    />
  );
};
