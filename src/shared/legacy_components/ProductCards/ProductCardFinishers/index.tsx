import {YStack, XStack, View} from 'tamagui';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '../../Text';
import {APP_PADDING} from '../../../consts/consts';
import {ProductCardsScrollProps} from '../types';
import {ChevronRightIcon} from '../../icons';
import {ErrorState} from '../../ListLayout/ErrorState';
import {LoadingState} from '../../ListLayout/LoadingState';

interface ContentsProps<P extends object> {
  emptyState: React.ReactElement | null;
  products: ProductCardsScrollProps<P>['products'];
  ProductCardComponent: ProductCardsScrollProps<P>['ProductCardComponent'];
  onSeeAllPress: () => void;
}

const Contents = <P extends object>({
  emptyState,
  products,
  ProductCardComponent,
  onSeeAllPress,
}: ContentsProps<P>) => {
  const isEmpty = products?.length === 0;
  const isSingleCard = products?.length === 1;

  if (isEmpty) return <View>{emptyState}</View>;
  if (isSingleCard) {
    const product = products[0];

    return (
      <XStack flex={1} px={APP_PADDING}>
        <ProductCardComponent
          product={
            (product && 'product' in product ? product.product : product) as P
          }
        />
      </XStack>
    );
  }

  return (
    <FlatList
      data={[...products, {isSeeAllCard: true}]}
      horizontal
      contentContainerStyle={{paddingHorizontal: 16, gap: 16}}
      renderItem={({item}) =>
        'isSeeAllCard' in item ? ( // Type guard to check for 'isSeeAllCard'
          <TouchableOpacity style={styles.card} onPress={onSeeAllPress}>
            <Text variant="h5">SEE ALL FINISHERS</Text>
            <ChevronRightIcon />
          </TouchableOpacity>
        ) : (
          <ProductCardComponent
            product={(item && 'product' in item ? item.product : item) as P}
          />
        )
      }
    />
  );
};

const LoadingOrError = ({isLoading}: {isLoading?: boolean}) => {
  if (isLoading)
    return (
      <View mx={16} bc="$surface4" h={388}>
        <LoadingState />
      </View>
    );
  return <ErrorState />;
};

export const ProductCardsFinishers = <P extends object>({
  title,
  subtext,
  ProductCardComponent,
  products,
  emptyState,
  isLoading,
  hasError,
  onSeeAllPress,
}: ProductCardsScrollProps<P> & {onSeeAllPress: () => void}) => {
  return (
    <YStack gap={24}>
      {!!title && (
        <YStack gap={8} px={APP_PADDING}>
          <XStack ai="center" jc="space-between" flex={1} mr={-34}>
            <Text variant="h5">{title}</Text>
          </XStack>
          {!!subtext && <Text color="textMediumEmphasis">{subtext}</Text>}
        </YStack>
      )}
      {(isLoading || hasError) && !products ? (
        <LoadingOrError isLoading={isLoading} />
      ) : (
        <Contents
          emptyState={emptyState ?? null}
          products={products}
          ProductCardComponent={ProductCardComponent}
          onSeeAllPress={onSeeAllPress}
        />
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    marginVertical: 10,
  },
  cardText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 8,
  },
});
