import {XStack} from 'tamagui';
import {router} from 'expo-router';
import {RecipePlanItem, useRecipePlan} from '@/lib/hooks/useRecipePlan';
import {IconButton} from '@/components/IconButton';
import tokens from '@/theme/tokens';
import {ActivityIndicator} from 'react-native';
import RecipeDefaultImage from '@/assets/images/meals/recipe_plate.png';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useCallback, useState} from 'react';
import {useDeleteRecipePlan} from '@/lib/hooks/useDeleteRecipePlan';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';

import {
  FavouriteEntityType,
  Recipe,
  useUserQuery,
} from '../../../../graphql/generated-queries';
import {MoreIcon, SpeedometerIcon} from '../../../icons';
import {FavouriteButton} from '../FavouriteButton';

export interface MealProductCardProps {
  product: RecipePlanItem | Recipe;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
  isWithoutCategories?: boolean;
  actions?: React.ReactNode[];
  onPress?: (id: string) => void;
}

export const FavouriteAction = ({
  product,
  type,
}: {
  product: RecipePlanItem & Recipe;
  type: FavouriteEntityType;
}) => {
  if (!product?.id) {
    return null;
  }

  return <FavouriteButton id={product.id} type={type} />;
};

export const MoreAction = ({
  product,
  options,
}: {
  product: RecipePlanItem & Recipe;
  options: {[key: string]: any}[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {showActionSheetWithOptions} = useActionSheet();

  const handleActionPress = useCallback(() => {
    if (!options || options.length === 0) return;

    showActionSheetWithOptions(
      {
        options: options.map((option) => option.label),
        cancelButtonIndex: options.length - 1,
      },
      async (index) => {
        if (index === options.length - 1) return;

        setIsLoading(true);
        try {
          await options[index as number].onPress(product);
        } catch {
          // Do nothing
        } finally {
          setIsLoading(false);
        }
      },
    );
  }, [options, product, showActionSheetWithOptions]);

  return (
    <IconButton
      onPress={() => handleActionPress()}
      bc={tokens.color.surface16.val}
    >
      {isLoading ? <ActivityIndicator /> : <MoreIcon />}
    </IconButton>
  );
};

export const MealProductWrapper = ({
  product,
  ...props
}: {
  product: RecipePlanItem & Recipe;
  [key: string]: any;
}) => {
  const {onSwap} = useRecipePlan();
  const {deleteRecipePlan} = useDeleteRecipePlan();

  // Add null checks to prevent crashes
  if (!product) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  const isRecipe = product.__typename === 'Recipe';

  const actions = [
    <FavouriteAction
      key="favourite"
      product={product}
      type={isRecipe ? FavouriteEntityType.Recipe : FavouriteEntityType.Meal}
    />,
    <MoreAction
      key="more"
      product={product}
      options={[
        {
          label: 'Swap',
          onPress: () => onSwap(product, product.type || ''),
        },
        {
          label: 'Remove',
          onPress: () => deleteRecipePlan(product.scheduleId?.toString() || ''),
        },
        {label: 'Cancel'},
      ]}
    />,
  ];

  return (
    <MealProductCard
      product={product}
      actions={props.actions || actions}
      {...props}
    />
  );
};

export const MealProductCard = ({
  product,
  isSingleCard,
  isGridCard,
  isWithoutCategories,
  onPress,
  actions,
}: MealProductCardProps) => {
  const userQuery = useUserQuery();

  // Add null checks and default values to prevent crashes
  const {
    __typename,
    id,
    name,
    datoId,
    image,
    imageUrl,
    categories,
    isQuickMeal,
    calories,
    type,
  } = (product as RecipePlanItem & Recipe) || {};

  // When click on meal card it will redirect user to meal page by default
  // If onPress is passed, it will override the default behavior
  const handlePress = (id: string) => {
    if (!id) return;

    if (onPress) {
      onPress(id);
    } else if (__typename === 'Recipe' || !datoId) {
      router.navigate({
        pathname: `/recipes/${id}/summary`,
        params: {id, action: 'view'},
      });
    } else {
      router.navigate({pathname: '/recipe', params: {id}});
    }
  };

  // Render
  return (
    <BaseProductCard
      name={name || ''}
      onPress={() => handlePress(id?.toString() || '')}
      imageUrl={imageUrl || image?.responsiveImage?.src || RecipeDefaultImage}
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      aboveName={
        <XStack gap={4} flexWrap="wrap">
          {type && (
            <Text variant="uiS" withBrandMidBackground>
              {type}
            </Text>
          )}
          {!isWithoutCategories &&
            Array.isArray(categories) &&
            categories?.length > 0 &&
            categories?.map((category) => {
              let id = category;
              let name = category;

              // TODO: fix the difference between datoCMS and our database schema in cateegories
              if (typeof category === 'object') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                id = category?.id;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                name = category?.name;
              }

              return (
                <Text key={id} variant="uiS" withBrandMidBackground>
                  {name}
                </Text>
              );
            })}
          {userQuery.data?.user?.showCalories && (
            <Text variant="uiS" withBrandMidBackground>
              {`${calories || 0} kcal`}
            </Text>
          )}
        </XStack>
      }
      topRight={
        <XStack als="flex-start" gap={8}>
          {actions}
        </XStack>
      }
      belowName={
        isQuickMeal ? (
          <XStack gap={4} ai="center">
            <SpeedometerIcon />
            <Text variant="bodyS" color="textMediumEmphasis">
              Ready in 15min
            </Text>
          </XStack>
        ) : undefined
      }
    />
  );
};
