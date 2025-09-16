import {bodyFont} from '@/theme/fonts';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {XStack} from 'tamagui';
import {CalendarClockIcon} from '../icons';

interface ScheduleButtonProps {
  onPress: () => void;
  label?: string;
}

export const ScheduleButton: React.FC<ScheduleButtonProps> = ({
  onPress,
  label = 'SCHEDULE',
}) => (
  <Pressable onPress={onPress}>
    <XStack fd="row" alignItems="center" jc="space-between" width={110}>
      <Text
        style={{
          fontFamily: bodyFont.face[700].normal,
          fontSize: bodyFont.size.uiLink,
          color: 'white',
        }}
      >
        {label}
      </Text>
      <CalendarClockIcon />
    </XStack>
  </Pressable>
);
