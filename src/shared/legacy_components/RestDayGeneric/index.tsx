import {View, YStack} from 'tamagui';
import {APP_PADDING} from '../../consts/consts';
import tokens from '../../theme/tokens';
import {ConcreteSvg} from '../svgs';
import {Text} from '../Text';

export const RestDayGeneric = () => {
  return (
    <YStack bc="$surface4" pos="relative" overflow="hidden" mx={APP_PADDING}>
      <View
        pos="absolute"
        top={0}
        left={0}
        right={0}
        mt={-40}
        transform={[{rotate: '-2deg'}]}
      >
        <ConcreteSvg color={tokens.color.surface8.val} />
      </View>
      <YStack gap={2} px={16} py={32}>
        <Text variant="h5" withBrandMidBackground>
          Rest Day
        </Text>
        <Text variant="uiS" withWhiteBackground>
          You&apos;ve earned it.
        </Text>
      </YStack>
    </YStack>
  );
};
