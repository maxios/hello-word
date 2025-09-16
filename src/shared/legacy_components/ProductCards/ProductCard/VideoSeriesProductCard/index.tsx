import {View, XStack} from 'tamagui';
import {BaseProductCard} from '../BaseProductCard';
import {Text} from '../../../Text';
import {LockIcon, PlayIcon} from '../../../icons';
import {MoreButton} from '../MoreButton';
import {useReschedule} from '../../../../lib/reschedule';
import {
  useUserPurchasesQuery,
  useUserQuery,
  VideoSeriesProductCardFragment,
} from '../../../../graphql/generated-queries';
import {readVideoThumbnailProperties} from '../../../../lib/image';

interface VideoSeriesChipsProps {
  numSeriesWeeks: number;
  classesPerWeek: number;
}

export const VideoSeriesChips = ({
  numSeriesWeeks,
  classesPerWeek,
}: VideoSeriesChipsProps) => {
  return (
    <XStack gap={4} ai="center" flexWrap="wrap">
      <Text variant="uiS" withBrandMidBackground>
        {`${numSeriesWeeks} ${numSeriesWeeks === 1 ? 'week' : 'weeks'}`}
      </Text>
      <Text variant="uiS" withBrandMidBackground>
        {`${classesPerWeek}x a week`}
      </Text>
    </XStack>
  );
};

export interface VideoSeriesProductCardProps {
  product: VideoSeriesProductCardFragment;
  isGridCard?: boolean;
  isSingleCard?: boolean;
  schedule?: {
    id: string;
    fromDate: Date;
  };
}

const renderTopRight = ({
  schedule,
  isLoading,
  reschedule,
  hasUser,
  isSubscribed,
}: {
  schedule?: {id: string; fromDate: Date};
  isLoading: boolean;
  reschedule: () => void;
  hasUser: boolean;
  isSubscribed: boolean;
}) => {
  if (schedule) {
    return (
      <MoreButton
        isLoading={isLoading}
        options={[
          {
            label: 'Reschedule Series',
            onPress: () => reschedule(),
          },
        ]}
      />
    );
  }

  if (!hasUser || !isSubscribed) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(20, 20, 20, 0.6)',
          borderRadius: 4,
          padding: 4,
        }}
      >
        <LockIcon />
      </View>
    );
  }

  return null;
};

export const VideoSeriesProductCard = ({
  product,
  isGridCard,
  isSingleCard,
  schedule,
}: VideoSeriesProductCardProps) => {
  const {id, name, introVideo, seriesWeeks, classesPerWeek, thumbnail} =
    product;
  const {reschedule, isLoading} = useReschedule(schedule);
  const thumbProps = readVideoThumbnailProperties(thumbnail, introVideo);
  const userQuery = useUserQuery();
  const purchasesQuery = useUserPurchasesQuery();

  return (
    <BaseProductCard
      imageUrl={thumbProps.thumbnailUrl.uri}
      blurHash={thumbProps.blurHash || ''}
      name={name || ''}
      href={{pathname: '/video-series/[id]', params: {id}}}
      isGridCard={isGridCard}
      isSingleCard={isSingleCard}
      aboveName={
        <VideoSeriesChips
          numSeriesWeeks={seriesWeeks.length}
          classesPerWeek={classesPerWeek}
        />
      }
      topRight={renderTopRight({
        schedule,
        isLoading,
        reschedule,
        hasUser: !!userQuery.data?.user?.id,
        isSubscribed: !!purchasesQuery.data?.user?.subscriptionType,
      })}
      belowName={
        <XStack gap={4} ai="center">
          <PlayIcon size={16} />
          <Text variant="uiS">Video series</Text>
        </XStack>
      }
      isGuideCard
      isTrailWorkout={false}
    />
  );
};
