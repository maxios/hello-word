import {Pressable, ImageStyle} from 'react-native';
import {View, XStack, YStack} from 'tamagui';
import {useRouter} from 'expo-router';
import {useAuthModal} from '@/context/AuthModalContext';
import {useUserPurchasesQuery, useUserQuery} from '@/graphql/generated-queries';
import {usePaymentModal} from '@/context/PaymentModalContext';
import {useMemo, useCallback, memo} from 'react';
import {Text} from '../../../../Text';
import {SimplePlayIcon} from '../../../../icons';
import {BaseProductCardProps} from '..';
import {BlurUpImage} from '../../../../BlurUpImage';

const ASPECT_RATIO = 1.06;

const VideoIcon = memo(({isVideoClass}: {isVideoClass?: boolean}) => {
  if (!isVideoClass) return null;

  return (
    <XStack
      position="absolute"
      height="100%"
      width="100%"
      ai="center"
      jc="center"
    >
      <SimplePlayIcon />
    </XStack>
  );
});

export const GridCard = memo(
  ({
    href,
    imageUrl,
    isVideoClass,
    topRight,
    aboveName,
    name,
    belowName,
    onPress,
    blurHash,
    isTrailWorkout,
    isGuideCard,
  }: BaseProductCardProps) => {
    const router = useRouter();
    const {showModal} = useAuthModal();
    const userQuery = useUserQuery({fetchPolicy: 'cache-and-network'});
    const purchasesQuery = useUserPurchasesQuery();
    const isSubscribed = !!purchasesQuery.data?.user?.subscriptionType;
    const {showPaymentModal} = usePaymentModal();

    const handlePress = useCallback(() => {
      if (!userQuery.data?.user?.id && !isTrailWorkout) {
        showModal();
      } else if (!isSubscribed && !isTrailWorkout && isGuideCard) {
        showPaymentModal();
      } else if (href) {
        router.navigate(href);
      } else if (onPress) {
        onPress();
      }
    }, [
      userQuery.data?.user?.id,
      isTrailWorkout,
      isSubscribed,
      isGuideCard,
      href,
      onPress,
      showModal,
      showPaymentModal,
      router,
    ]);

    const imageSource = useMemo(
      () => (typeof imageUrl === 'string' ? {uri: imageUrl} : imageUrl),
      [imageUrl],
    );

    const imageStyle: ImageStyle = useMemo(
      () => ({
        width: '100%',
        height: '100%',
        position: 'absolute',
      }),
      [],
    );

    return (
      <YStack flex={1} pb={16} w="100%">
        <Pressable onPress={handlePress}>
          <YStack w="100%" flex={1} jc="space-between">
            <XStack aspectRatio={ASPECT_RATIO} jc="flex-end">
              <BlurUpImage
                placeholder={blurHash}
                source={imageSource}
                style={imageStyle}
              />
              <VideoIcon isVideoClass={isVideoClass} />
              <XStack p={8}>{topRight}</XStack>
            </XStack>
            <YStack pt={12} pb={16} gap={4} flex={1}>
              {!!aboveName && aboveName}
              <Text variant="bodySEmphasis">{name}</Text>
              {!!belowName && <View pt={4}>{belowName}</View>}
            </YStack>
          </YStack>
        </Pressable>
      </YStack>
    );
  },
);
