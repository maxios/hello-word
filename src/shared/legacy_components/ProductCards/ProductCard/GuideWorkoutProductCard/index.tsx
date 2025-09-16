import {XStack} from 'tamagui';
import dayjs from 'dayjs';
import {FavouriteEntityType} from '@/graphql/generated-queries';
import {useDeleteGuideSchedule} from '@/lib/deleteWorkout';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {Text} from '../../../Text';
import {MoreButton} from '../MoreButton';
import {useReschedule} from '../../../../lib/reschedule';
import {WorkoutWithScheduledDate} from '../../../../pages/GuidePage';
import {WorkoutProductCardProps} from '../../types';
import {FavouriteButton} from '../FavouriteButton';

export interface GuideWorkoutProductCardProps {
  product: WorkoutWithScheduledDate | WorkoutProductCardProps;
  day?: number;
  workoutType?: string;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
  isComplete?: boolean;
  schedule?: {
    id: string;
    fromDate: Date;
  };
  isHomePage?: boolean;
}

export const GuideWorkoutProductCard = ({
  product,
  day,
  workoutType,
  isSingleCard,
  isGridCard,
  isComplete,
  schedule,
  isHomePage,
}: GuideWorkoutProductCardProps) => {
  const {id, name, displayImage} = product;
  const {schedule: productSchedule} =
    'schedule' in product ? product : {schedule: null};
  const {reschedule, isLoading} = useReschedule(schedule);
  const {deleteGuideSchedule, isLoading: isDeleteLoading} =
    useDeleteGuideSchedule(schedule?.id);
  const showDay = !!day || !!productSchedule?.fromDate;

  const OptionsArray = [
    {
      label: 'Reschedule Workout',
      onPress: () => reschedule(),
    },
    isHomePage && {
      label: 'Delete Workout',
      onPress: () => deleteGuideSchedule(),
    },
  ].filter(
    (option): option is {label: string; onPress: () => void} => !!option,
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
              options={OptionsArray}
            />
          )}
        </XStack>
      }
      aboveName={
        <XStack gap={8} ai="center">
          <Text variant="uiS" withBrandDarkBackground>
            Guide
          </Text>
          {!!workoutType && (
            <Text variant="uiS" withBrandMidBackground>
              {workoutType}
            </Text>
          )}
          {showDay && (
            <>
              <XStack w={1} h={12} bc="$brandMid" />
              <Text variant="uiM">
                {schedule?.fromDate
                  ? dayjs(schedule?.fromDate).utc().format('dddd')
                  : `Day ${day}`}
              </Text>
            </>
          )}
        </XStack>
      }
      isGuideCard={false}
      isTrailWorkout={false}
    />
  );
};
