import strngLogo from '@/assets/images/intro/strng_logo.png';
import { Buttons } from '@/components/Buttons';
import { Image, Platform } from 'react-native';
import { View, YStack } from 'tamagui';
import { PerksCarousel } from './PerksCarousel';

const IntroPage = () => {
  return (
    <YStack height="100%" bc="$background">
      <YStack w="100%" pos="relative" flex={1}>
        <View
          pos="absolute"
          t={Platform.OS === 'android' ? 25 : 55}
          m={16}
          zi={1}
        >
          <Image source={strngLogo} />
        </View>
        <PerksCarousel />
      </YStack>
      <Buttons
        buttons={[
          {
            testID: 'try-workout',
            label: 'Start Your STRNG Workout',
            href: '/home',
            variant: 'secondary',
          },
          {
            testID: 'get-started',
            label: 'Get started',
            href: '/auth/signup',
            variant: 'secondary',
          },
          {
            testID: 'log-in',
            label: 'Log in',
            size: 'sm',
            variant: 'text',
            href: '/auth/new-app-perks',
          },
        ]}
      />
    </YStack>
  );
};

export default IntroPage;
