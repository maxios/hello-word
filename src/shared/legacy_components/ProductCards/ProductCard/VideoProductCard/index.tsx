import {XStack} from 'tamagui';
import {useDeleteVideoSchedule} from '@/lib/deleteWorkout';
import {BaseProductCard} from '../BaseProductCard';
import {Text} from '../../../Text';
import {PlayIcon} from '../../../icons';
import {
  FavouriteEntityType,
  VideoClassProductCardFragment,
} from '../../../../graphql/generated-queries';
import {MoreButton} from '../MoreButton';
import {useReschedule} from '../../../../lib/reschedule';
import {readVideoThumbnailProperties} from '../../../../lib/image';
import {FavouriteButton} from '../FavouriteButton';

const Time = ({duration}: {duration: number}) => {
  const numHours = duration ? Math.floor(duration / 3600) : 0;
  const numMinutes = duration ? Math.floor((duration % 3600) / 60) : 0;
  const numSeconds = duration ? Math.floor(duration % 60) : 0;

  return (
    <XStack ai="center">
      {numHours > 0 && (
        <Text variant="uiS" withBrandMidBackground>
          {`${numHours} ${numHours === 1 ? 'hour' : 'hours'}`}
        </Text>
      )}
      {numMinutes > 0 && (
        <Text variant="uiS" withBrandMidBackground>
          {`${numMinutes} ${numMinutes === 1 ? 'min' : 'mins'}`}
        </Text>
      )}
      {numSeconds > 0 && !numHours && (
        <Text variant="uiS" withBrandMidBackground>
          {`${numSeconds} ${numSeconds === 1 ? 'sec' : 'secs'}`}
        </Text>
      )}
    </XStack>
  );
};

interface VideoChipsProps {
  duration?: number | null;
  categories: VideoClassProductCardFragment['categories'];
  isSeries?: boolean;
}

export const VideoChips = ({
  duration,
  categories,
  isSeries,
}: VideoChipsProps) => {
  return (
    <XStack gap={4} ai="center" flexWrap="wrap">
      {isSeries && (
        <Text variant="uiS" withBrandLightBackground>
          Series
        </Text>
      )}
      {!!duration && (
        <XStack pb={2}>
          <Time duration={duration} />
        </XStack>
      )}

      {!!categories &&
        categories.map((category) => (
          <Text key={category.id} variant="uiS" withBrandMidBackground>
            {category.name}
          </Text>
        ))}
    </XStack>
  );
};

export interface VideoProductCardProps {
  product: VideoClassProductCardFragment;
  isGridCard?: boolean;
  isSingleCard?: boolean;
  schedule?: {
    id: string;
    fromDate: Date;
  };
  isSeries?: boolean;
  isComplete?: boolean;
}

export const VideoProductCard = ({
  product,
  isGridCard,
  isSingleCard,
  schedule,
  isSeries,
  isComplete,
}: VideoProductCardProps) => {
  const {id, name, video, categories, thumbnail} = product;
  const {duration} = video?.video || {};
  const {reschedule, isLoading} = useReschedule(schedule);
  const {deleteVideoSchedule, isLoading: isDeleteLoading} =
    useDeleteVideoSchedule(schedule?.id);
  const thumbProps = readVideoThumbnailProperties(thumbnail, video);

  return (
    <BaseProductCard
      imageUrl={thumbProps.thumbnailUrl.uri}
      blurHash={thumbProps.blurHash || ''}
      name={name || ''}
      href={{
        pathname: '/video-class',
        params: {id, videoSeriesScheduleId: schedule?.id || ''},
      }}
      isComplete={isComplete}
      isVideoClass
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      aboveName={
        <VideoChips
          duration={duration}
          categories={categories}
          isSeries={isSeries}
        />
      }
      topRight={
        <XStack als="flex-start">
          <FavouriteButton id={id} type={FavouriteEntityType.Classes} />
          {schedule && (
            <MoreButton
              isLoading={isLoading || isDeleteLoading}
              options={[
                {
                  label: 'Reschedule Video Class',
                  onPress: () => reschedule(),
                },
                {
                  label: 'Delete Video Class',
                  onPress: () => deleteVideoSchedule(),
                },
              ]}
            />
          )}
        </XStack>
      }
      belowName={
        <XStack gap={4} ai="center">
          <PlayIcon size={16} />
          <Text variant="uiS">Video class</Text>
        </XStack>
      }
      isGuideCard
      isTrailWorkout={false}
    />
  );
};
