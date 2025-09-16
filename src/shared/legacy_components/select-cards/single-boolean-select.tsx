import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {XStack} from 'tamagui';
import {Pressable} from 'react-native';
import {Text} from '../Text';

interface SingleBooleanSelectProps {
  icon: React.ReactNode;
  label: string;
  name: string;
}

export const SingleBooleanSelect: React.FC<SingleBooleanSelectProps> = ({
  name,
  icon,
  label,
}) => {
  const {control} = useFormContext<Record<string, boolean>>();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <Pressable onPress={() => onChange(!value)}>
          <XStack
            flex={1}
            bc={value ? '$brandMid40' : '$surface16'}
            bw={1}
            boc={value ? '$brandMid' : '$surface16'}
            br={4}
            p={16}
            gap={12}
            alignItems="center"
          >
            {icon}
            <Text
              variant="bodyS"
              textAlign="center"
              color={value ? 'textHighEmphasis' : 'textMediumEmphasis'}
            >
              {label}
            </Text>
          </XStack>
        </Pressable>
      )}
    />
  );
};
