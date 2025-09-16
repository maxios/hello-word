import {XStack} from 'tamagui';
import dayjs from 'dayjs';
import {
  FavouriteEntityType,
  VideoClassProductCardFragment,
} from '@/graphql/generated-queries';
import {Text} from '@/components/Text';
import {BaseProductCard, BaseProductCardProps} from '../BaseProductCard';
import {MoreButton} from '../MoreButton';
import {useReschedule} from '../../../../lib/reschedule';
import {PlayIcon} from '../../../icons';
import {readVideoThumbnailProperties} from '../../../../lib/image';
import {FavouriteButton} from '../FavouriteButton';

export interface SeriesVideoClassProductCardProps {
  product: VideoClassProductCardFragment & {isComplete?: boolean};
  day?: number;
  isSingleCard?: BaseProductCardProps['isSingleCard'];
  isGridCard?: BaseProductCardProps['isGridCard'];
  schedule?: {
    id: string;
    fromDate: Date;
  };
}

export const SeriesVideoClassProductCard = ({
  product,
  day,
  isSingleCard,
  isGridCard,
  schedule,
}: SeriesVideoClassProductCardProps) => {
  const {id, name, thumbnail, video} = product;
  const {reschedule, isLoading} = useReschedule(schedule);
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
      isComplete={product.isComplete}
      isVideoClass
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      topRight={
        <XStack als="flex-start">
          <FavouriteButton id={id} type={FavouriteEntityType.Classes} />
          {schedule && (
            <MoreButton
              isLoading={isLoading}
              options={[
                {
                  label: 'Reschedule Class',
                  onPress: () => reschedule(),
                },
              ]}
            />
          )}
        </XStack>
      }
      aboveName={
        <XStack gap={8} ai="center">
          <Text variant="uiS" withBrandLightBackground>
            Series
          </Text>
          {!!day && (
            <>
              <XStack w={1} h={12} bc="$brandMid" />
              <Text variant="uiM">
                {schedule?.fromDate
                  ? dayjs(schedule.fromDate).format('dddd')
                  : `Day ${day}`}
              </Text>
            </>
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
