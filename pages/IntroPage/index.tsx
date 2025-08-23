import strngLogo from '@/assets/images/intro/strng_logo.png';
import { Buttons } from '@/components/Buttons';
import { Image } from 'react-native';
import { View, YStack } from 'tamagui';

const IntroPage = () => {
  return (
    <YStack className="h-full bg-background">
      <YStack className="relative w-full flex-1">
        <View className="absolute top-[25px] left-[16px] z-10">
          <Image source={strngLogo} />
        </View>
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
