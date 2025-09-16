import {APP_PADDING} from '@/consts/consts';
import {YStack, XStack, Input} from 'tamagui';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {Pressable} from 'react-native';
import {BottomSheet} from '../BottomSheet';

type SheetInputProps = {
  control: any;
  name: string;
  children: React.ReactNode;
};

export const SheetInput = ({control, name, children}: SheetInputProps) => {
  const {field} = useController({
    control,
    name,
  });

  const {onChange} = field;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(field.value);

  const toggle = () => setIsVisible(!isVisible);
  const close = () => setIsVisible(false);

  const onConfirm = () => onChange(inputValue);

  return (
    <Pressable onPress={toggle}>
      {children}
      <BottomSheet
        visible={isVisible}
        onBackButtonPress={toggle}
        onBackdropPress={close}
      >
        <YStack
          btrr={16}
          btlr={16}
          bc="$surface8"
          py={24}
          px={APP_PADDING}
          gap={24}
        >
          <XStack jc="center" ai="center">
            <YStack width="100%">
              <Input
                keyboardType="numeric"
                value={inputValue}
                onChange={(e) => setInputValue(e.nativeEvent.text)}
                onSubmitEditing={onConfirm}
                returnKeyType="done"
              />
            </YStack>
          </XStack>
        </YStack>
      </BottomSheet>
    </Pressable>
  );
};
