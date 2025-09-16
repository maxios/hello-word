import React from 'react';
import {YStack} from 'tamagui';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../Button';
import {ButtonProps} from '../Button/types';
import {APP_PADDING, DEVICE_WIDTH} from '../../consts/consts';

interface ButtonsProps {
  buttons: ButtonProps[];
  backgroundColor?: string;
}

export const Buttons = ({buttons, backgroundColor}: ButtonsProps) => {
  const insets = useSafeAreaInsets();

  return (
    <YStack
      bg={backgroundColor || '$surface0'}
      w={DEVICE_WIDTH}
      px={APP_PADDING}
      pt={APP_PADDING}
      pb={Math.max(insets.bottom, APP_PADDING)}
      gap={8}
    >
      {buttons?.map((button, idx) => {
        return <Button key={idx as number} {...button} />;
      })}
    </YStack>
  );
};
