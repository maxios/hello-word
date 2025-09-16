import {View, YStack} from 'tamagui';
import {APP_PADDING} from '../../consts/consts';
import tokens from '../../theme/tokens';
import {ChevronRightIcon} from '../icons';
import {ConcreteSvg} from '../svgs';
import {Text} from '../Text';
import {Button} from '../Button';

export const RestDayToday = () => {
  return (
    <YStack bc="$surface4" pos="relative" overflow="hidden" mx={APP_PADDING}>
      <View
        pos="absolute"
        top={0}
        left={0}
        right={0}
        mt={-20}
        transform={[{rotate: '-5deg'}]}
      >
        <ConcreteSvg color={tokens.color.surface8.val} />
      </View>
      <YStack gap={2} px={16} py={32}>
        <Text variant="h4" withBrandMidBackground>
          Rest Day
        </Text>
        <Text variant="uiM" withWhiteBackground>
          You haven&apos;t scheduled
        </Text>
        <Text variant="uiM" withWhiteBackground>
          anything for today.
        </Text>
      </YStack>
      <Button
        variant="secondary"
        label="Browse move"
        href="/move/home"
        rightIcon={<ChevronRightIcon />}
      />
    </YStack>
  );
};
