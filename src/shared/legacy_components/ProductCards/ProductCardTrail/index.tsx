import {YStack, XStack, View} from 'tamagui';
import {FlatList} from 'react-native';
import {Text} from '../../Text';
import {APP_PADDING} from '../../../consts/consts';
import {ProductCardsScrollProps} from '../types';
import {ErrorState} from '../../ListLayout/ErrorState';
import {LoadingState} from '../../ListLayout/LoadingState';

interface ContentsProps<P extends object> {
  emptyState: React.ReactElement | null;
  products: ProductCardsScrollProps<P>['products'];
  ProductCardComponent: ProductCardsScrollProps<P>['ProductCardComponent'];
  keyExtractor?: (item: P) => string;
}

const Contents = <P extends object>({
  emptyState,
  products,
  ProductCardComponent,
  keyExtractor,
}: ContentsProps<P>) => {
  const isEmpty = products?.length === 0;
  if (isEmpty) return <View>{emptyState}</View>;
  const product = products;
  const isSingleCard = !Array.isArray(product) || product.length === 1;

  if (isSingleCard) {
    const product = products[0];

    return (
      <XStack flex={1} px={APP_PADDING}>
        <ProductCardComponent
          product={
            (product && 'product' in product ? product.product : product) as P
          }
          isSingleCard={isSingleCard}
        />
      </XStack>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor ?? ((item: any) => item?.key)}
      horizontal
      contentContainerStyle={{paddingHorizontal: 16, gap: 16}}
      renderItem={({item, index}) => (
        <ProductCardComponent
          key={index}
          product={(item && 'product' in item ? item.product : item) as P}
        />
      )}
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

export const ProductCardTrail = <P extends object>({
  title,
  subtext,
  ProductCardComponent,
  products,
  emptyState,
  isLoading,
  hasError,
}: ProductCardsScrollProps<P>) => {
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
        />
      )}
    </YStack>
  );
};
