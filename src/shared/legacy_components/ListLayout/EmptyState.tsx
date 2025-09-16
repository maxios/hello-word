import {YStack} from 'tamagui';
import {Text} from '../Text';

export const EmptyState = () => (
  <YStack>
    <YStack px={16} pt={24} space={6}>
      <Text variant="h3" withWhiteBackground>
        If at first you
      </Text>
      <Text variant="h3" withWhiteBackground>
        don&apos;t succeed
      </Text>
      <Text variant="h3" withBrandMidBackground>
        try, try, try again
      </Text>
    </YStack>
    <YStack px={16} pt={24} space={24}>
      <Text variant="bodyM" color="textLowEmphasis">
        We couldn&apos;t find any matching your search.
      </Text>
      <Text variant="bodyM" color="textLowEmphasis">
        Try changing your search terms or using filters instead.
      </Text>
    </YStack>
  </YStack>
);
