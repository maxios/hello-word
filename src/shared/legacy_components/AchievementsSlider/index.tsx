import React from 'react';
import {View, XStack, YStack} from 'tamagui';
import {APP_PADDING} from '@/consts/consts';
import {Text} from '../Text';
import {RoughEdgeTop} from '../RoughEdge/top';
import {RoughEdgeBottom} from '../RoughEdge/bottom';
import {Button} from '../Button';
import AwardComponent from './AwardComponent';

const AchievementsSlider: React.FC<Record<string, any>> = ({
  selectedDate,
  scheduleData,
}) => {
  return (
    <YStack>
      <YStack gap={8} px={APP_PADDING} pb={16}>
        <Text variant="h5"> STRNG ACHIEVEMENTS</Text>
      </YStack>
      <RoughEdgeTop />
      <XStack flex={1} bc="$surface8" zIndex={1}>
        <AwardComponent
          selectedDate={selectedDate}
          scheduleData={scheduleData}
        />
      </XStack>

      <RoughEdgeBottom />
      <View px={APP_PADDING}>
        <Button
          variant="secondary"
          label="view your ACHIEVEMENTS"
          href="/achievements"
        />
      </View>
    </YStack>
  );
};

export {AchievementsSlider};
