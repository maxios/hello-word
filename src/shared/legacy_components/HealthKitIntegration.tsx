import React from 'react';
import {ScrollView} from 'react-native';
import {YStack} from 'tamagui';
import HealthKitStats from '../health/components/HealthKitStats';
import {Text} from './Text';

/**
 * Example of how to integrate HealthKit into your existing app screens
 * This component shows how to add health data to a screen alongside other content
 */
const HealthKitIntegration: React.FC = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#141414'}}>
      <YStack gap={24} p={20}>
        {/* Your existing content */}
        <YStack gap={16}>
          <Text variant="h3" color="textHighEmphasis">
            Welcome Back!
          </Text>
          <Text color="textMediumEmphasis">
            Here&apos;s your daily overview including your health data from
            Apple Health.
          </Text>
        </YStack>

        {/* HealthKit Integration */}
        <HealthKitStats />

        {/* More of your existing content */}
        <YStack gap={16}>
          <Text variant="h4" color="textHighEmphasis">
            Today&apos;s Workout
          </Text>
          <Text color="textMediumEmphasis">
            Your workout recommendations based on your activity level.
          </Text>
        </YStack>

        {/* You can add more components here */}
      </YStack>
    </ScrollView>
  );
};

export default HealthKitIntegration;
