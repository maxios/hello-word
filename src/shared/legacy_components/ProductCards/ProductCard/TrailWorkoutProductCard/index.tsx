import {XStack} from 'tamagui';
import {isWorkoutCompleted} from '@/lib/workoutService';
import {
  useUserQuery,
  FavouriteEntityType,
  WorkoutProductCardFragment,
} from '@/graphql/generated-queries';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';
import {MoreButton} from '../MoreButton';
import {useReschedule} from '../../../../lib/reschedule';
import {StarIcon} from '../../../icons';
import {FavouriteButton} from '../FavouriteButton';

export interface TrailWorkoutProductCardProps {
  product: WorkoutProductCardFragment;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
  isFeatured?: boolean;
  schedule?: {
    id: string;
    fromDate: Date;
  };
}

export const TrailWorkoutProductCard = ({
  product,
  isSingleCard,
  isGridCard,
  schedule,
  isFeatured,
}: TrailWorkoutProductCardProps) => {
  const {id, name, workoutType, displayImage, difficulty} = product;
  const {reschedule, isLoading} = useReschedule(schedule);
  const userQuery = useUserQuery();
  const isCompleted = !userQuery.data?.user?.id && isWorkoutCompleted(id);

  return (
    <BaseProductCard
      name={name || ''}
      href={{
        pathname: '/workout',
        params: schedule
          ? {
              id,
              name,
              scheduledItemId: schedule?.id || '',
              scheduledItemIdentifier: schedule?.id || '',
            }
          : {id, name},
      }}
      imageUrl={displayImage?.responsiveImage?.src || ''}
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      topRight={
        <XStack als="flex-start">
          <FavouriteButton
            id={id}
            type={FavouriteEntityType.Workout}
            isTrailWorkout
          />
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
          {isCompleted && (
            <Text variant="uiS" withBrandMidBackground>
              Completed
            </Text>
          )}
        </XStack>
      }
      belowName={
        isFeatured ? (
          <XStack gap={4} ai="center">
            <StarIcon />
            <Text variant="uiS">Featured</Text>
          </XStack>
        ) : undefined
      }
      isTrailWorkout
      isGuideCard={false}
    />
  );
};
