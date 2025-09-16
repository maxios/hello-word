import {XStack} from 'tamagui';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';
import {MoreButton} from '../MoreButton';
import {
  FavouriteEntityType,
  WorkoutProductCardFragment,
} from '../../../../graphql/generated-queries';
import {useReschedule} from '../../../../lib/reschedule';
import {StarIcon} from '../../../icons';
import {FavouriteButton} from '../FavouriteButton';

export interface SimpleWorkoutProductCardProps {
  product: WorkoutProductCardFragment;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
  isFeatured?: boolean;
  schedule?: {
    id: string;
    fromDate: Date;
  };
}

export const SimpleWorkoutProductCard = ({
  product,
  isSingleCard,
  isGridCard,
  schedule,
  isFeatured,
}: SimpleWorkoutProductCardProps) => {
  const {id, name, workoutType, displayImage, difficulty, completionTime} =
    product;
  const {reschedule, isLoading} = useReschedule(schedule);

  return (
    <BaseProductCard
      name={name || ''}
      href={{
        pathname: '/workout',
        params: schedule
          ? {id, name, scheduledItemId: schedule?.id}
          : {id, name},
      }}
      imageUrl={displayImage?.responsiveImage?.src || ''}
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      topRight={
        <XStack als="flex-start">
          <FavouriteButton id={id} type={FavouriteEntityType.Workout} />
          {schedule && (
            <MoreButton
              isLoading={isLoading}
              options={[
                {
                  label: 'Reschedule Workout',
                  onPress: () => reschedule(),
                },
              ]}
            />
          )}
        </XStack>
      }
      aboveName={
        <XStack gap={4} ai="center">
          <Text
            variant="uiS"
            withBrandLightBackground={workoutType === 'Gym'}
            withBrandDarkBackground={workoutType === 'Home'}
            withBrandMidBackground={
              workoutType !== 'Gym' && workoutType !== 'Home'
            }
          >
            {workoutType}
          </Text>
          {difficulty && (
            <Text variant="uiS" withBrandMidBackground>
              {difficulty}
            </Text>
          )}
        </XStack>
      }
      belowName={
        <XStack gap={4} ai="center">
          {completionTime && (
            <Text variant="uiS" withBrandMidBackground>
              {completionTime}
            </Text>
          )}
          {isFeatured && (
            <>
              <StarIcon />
              <Text variant="uiS">Featured</Text>
            </>
          )}
        </XStack>
      }
      isTrailWorkout={false}
      isGuideCard
    />
  );
};
