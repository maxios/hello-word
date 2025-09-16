import {YStack} from 'tamagui';
import {Text} from '../Text';

export const ErrorState = ({message}: {message?: string}) => (
  <YStack flex={1} px={16} pt={24} space={10}>
    <Text backgroundColor="brandLight" variant="h2" color="brandDarkest">
      Something went wrong
    </Text>
    <Text backgroundColor="brandMid" variant="h4" color="brandDarkest">
      {message || 'Please try again'}
    </Text>
  </YStack>
);
