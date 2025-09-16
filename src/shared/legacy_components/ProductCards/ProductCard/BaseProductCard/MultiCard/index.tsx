import {ImageBackground, Pressable, ViewStyle} from 'react-native';
import {XStack, YStack} from 'tamagui';
import {useRouter} from 'expo-router';
import {useAuthModal} from '@/context/AuthModalContext';
import {useUserPurchasesQuery, useUserQuery} from '@/graphql/generated-queries';
import {isWorkoutCompleted} from '@/lib/workoutService';
import {usePaymentModal} from '@/context/PaymentModalContext';
import {useMemo, useCallback, memo, useEffect, useState} from 'react';
import {Text} from '../../../../Text';
import {CheckDecagramIcon} from '../../../../icons';
import {BaseProductCardProps} from '..';
import fade from '../../../../../assets/images/move/fade.png';
import {BlurUpImageBackground} from '../../../../BlurUpImage';

const CARD_HEIGHT = 388;
const CARD_WIDTH = 232;

const DoneIndicator = memo(
  ({
    isComplete,
    isWorkoutCompletedStatus,
  }: {
    isComplete?: boolean;
    isWorkoutCompletedStatus: boolean;
  }) => {
    const shouldShow = Boolean(isComplete || isWorkoutCompletedStatus);

    if (!shouldShow) return null;

    return (
      <XStack ai="center" gap={5}>
        <CheckDecagramIcon size={32} />
        <Text withBrandMidBackground variant="uiS">
          Done
        </Text>
      </XStack>
    );
  },
);

export const MultiCard = memo(
  ({
    href,
    imageUrl,
    isComplete,
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
    const [localIsComplete, setLocalIsComplete] = useState(isComplete);

    const workoutId = useMemo(
      () =>
        typeof href === 'object' && 'params' in href
          ? href.params.id
          : undefined,
      [href],
    );

    const isWorkoutCompletedStatus = useMemo(
      () =>
        workoutId && !userQuery.data?.user?.id && isWorkoutCompleted(workoutId),
      [workoutId, userQuery.data?.user?.id],
    );

    // Update local completion status when workout is completed
    useEffect(() => {
      if (!workoutId) return undefined;

      const checkCompletion = () => {
        const completed = isWorkoutCompleted(workoutId);
        setLocalIsComplete(completed);
      };

      // Check immediately
      checkCompletion();

      // Set up interval to check periodically
      const interval = setInterval(checkCompletion, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    }, [workoutId]);

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

    const imageBackgroundStyle: ViewStyle = useMemo(
      () => ({
        width: '100%',
        height: '100%',
      }),
      [],
    );

    return (
      <YStack h={CARD_HEIGHT} w={CARD_WIDTH}>
        <Pressable onPress={handlePress}>
          <BlurUpImageBackground
            placeholder={blurHash}
            source={imageSource}
            style={imageBackgroundStyle}
          >
            <YStack
              bc="$brandMid"
              h="100%"
              w="100%"
              pos="absolute"
              opacity={localIsComplete || isComplete ? 0.16 : 0}
            />
            <XStack height="100%">
              <YStack jc="space-between" flex={1}>
                <XStack jc="space-between">
                  <XStack p={12}>
                    <DoneIndicator
                      isComplete={localIsComplete || isComplete}
                      isWorkoutCompletedStatus={isWorkoutCompletedStatus}
                    />
                  </XStack>
                  <XStack p={8}>{topRight}</XStack>
                </XStack>
                <ImageBackground source={fade}>
                  <YStack p={12} pb={32} gap={12} pos="relative">
                    {!!aboveName && aboveName}
                    <Text variant="h5" withWhiteBackground>
                      {name}
                    </Text>
                    {!!belowName && belowName}
                  </YStack>
                </ImageBackground>
              </YStack>
            </XStack>
          </BlurUpImageBackground>
        </Pressable>
      </YStack>
    );
  },
);
