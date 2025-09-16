import {XStack} from 'tamagui';

import {useDeletePlaneSchedule} from '@/lib/deleteWorkout';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';
import {MoreButton} from '../MoreButton';
import {
  FavouriteEntityType,
  WorkoutProductCardFragment,
} from '../../../../graphql/generated-queries';
import {useReschedule} from '../../../../lib/reschedule';
import {FavouriteButton} from '../FavouriteButton';

export interface PlanWorkoutProductCardProps {
  product: WorkoutProductCardFragment;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
  isComplete?: boolean;
  schedule?: {
    id: string;
    fromDate: Date;
  };
  planId?: string;
}

export const PlanWorkoutProductCard = ({
  product,
  isSingleCard,
  isGridCard,
  schedule,
  isComplete,
  planId,
}: PlanWorkoutProductCardProps) => {
  const {id, name, workoutType, displayImage, completionTime} = product;
  const {reschedule, isLoading} = useReschedule(schedule);
  const {deleteSchedule, isLoading: isDeleteLoading} = useDeletePlaneSchedule(
    schedule?.id,
  );
  return (
    <BaseProductCard
      name={name || ''}
      href={{
        pathname: '/workout',
        params: {
          id,
          name,
          scheduledItemId: schedule?.id || '',
          scheduledItemIdentifier: schedule?.id || '',
        },
      }}
      imageUrl={displayImage?.responsiveImage?.src || ''}
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      isComplete={isComplete}
      topRight={
        <XStack>
          <FavouriteButton id={id} type={FavouriteEntityType.Workout} />
          {schedule && (
            <MoreButton
              isLoading={isLoading || isDeleteLoading}
              options={[
                {
                  label: 'Reschedule Workout',
                  onPress: () => reschedule(),
                },
                {
                  label: 'Delete Workout',
                  onPress: () => deleteSchedule(),
                },
              ]}
            />
          )}
        </XStack>
      }
      aboveName={
        <XStack gap={4} ai="center">
          <Text variant="uiS" withBrandLightBackground>
            {planId === 'NO-PLAN' ? 'Workout' : 'Plan'}
          </Text>
          <Text variant="uiS" withBrandMidBackground>
            {workoutType}
          </Text>
        </XStack>
      }
      belowName={
        completionTime && (
          <Text variant="uiS" withBrandMidBackground>
            {completionTime}
          </Text>
        )
      }
      isGuideCard
      isTrailWorkout={false}
    />
  );
};
