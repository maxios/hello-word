import React, {useEffect, useState} from 'react';
import {YStack, XStack} from 'tamagui';
import {StyleSheet, View} from 'react-native';
import {useFormContext, useWatch} from 'react-hook-form';
import {PasswordField} from './PasswordField';
import {Text} from '../Text';
import tokens from '../../theme/tokens';
import {CheckIcon} from '../icons';

export const CreatePasswordField = () => {
  const {control} = useFormContext();
  const value = useWatch({control, name: 'password'});
  const [isFocusedOverride, setIsFocusedOverride] = useState(false);
  const {
    formState: {errors},
    clearErrors,
  } = useFormContext();

  const passwordsChecks = [
    {
      label: '10-20 characters',
      isPassing: value?.length >= 10 && value?.length <= 20,
    },
    {
      label: 'At least 1 upper case',
      isPassing: value?.match(/[A-Z]/),
    },
    {
      label: 'At least 1 lower case',
      isPassing: value?.match(/[a-z]/),
    },
    {
      label: 'At least 1 symbol or number',
      isPassing:
        value?.match(/[0-9]/) ||
        value?.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/),
    },
    {
      label: 'Password has no space',
      isPassing: !value?.includes(' '),
    },
  ];

  const isPasswordValid = passwordsChecks.every(({isPassing}) => isPassing);

  useEffect(() => {
    if (isPasswordValid && errors.password) {
      clearErrors('password');
    }
  }, [isPasswordValid, errors.password, clearErrors]);

  return (
    <YStack position="relative">
      {value && isFocusedOverride && (
        <YStack
          position="absolute"
          top={-100}
          right={0}
          bc="$surface20"
          py={12}
          px={16}
        >
          {passwordsChecks.map(({label, isPassing}) => (
            <XStack key={label} gap={4} alignItems="center">
              <CheckIcon
                size="sm"
                color={
                  tokens.color[isPassing ? 'success' : 'textLowEmphasis'].val
                }
              />
              <Text color={isPassing ? 'success' : 'textLowEmphasis'}>
                {label}
              </Text>
            </XStack>
          ))}
          <View style={styles.triangle} />
        </YStack>
      )}
      <PasswordField
        isFocusedOverride={isFocusedOverride}
        setIsFocusedOverride={setIsFocusedOverride}
        label="Create Password"
        rules={{
          required: 'Password is required',
          validate: {
            isPassing: () => isPasswordValid || 'Must match criteria',
          },
        }}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: tokens.color.surface20.val,
    position: 'absolute',
    bottom: -10,
    right: 6,
    transform: [{rotate: '180deg'}],
  },
});
