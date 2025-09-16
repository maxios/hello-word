import React from 'react';
import {useFormContext, useFormState} from 'react-hook-form';
import {ActivityIndicator, Pressable, View as RNView} from 'react-native';
import {XStack, YStack} from 'tamagui';
import {Link} from 'expo-router';
import {Text} from '../Text';

import {ButtonProps, FormButtonProps} from './types';
import {
  getBackgroundColor,
  getBorderRadius,
  getHeight,
  getLabelColor,
  getSublabelColor,
} from './utils';
import tokens from '../../theme/tokens';

const FormButton = ({
  width,
  disabled,
  ariaLabel,
  size,
  leftIcon,
  rightIcon,
  variant,
  label,
  sublabel,
  disableButtonUntilValid,
  onSubmit,
  isLoading,
  testID,
}: FormButtonProps) => {
  const {handleSubmit, control} = useFormContext();
  const {isValid} = useFormState({control});

  const finalDisabled = disabled || (disableButtonUntilValid && !isValid);

  return (
    <BaseButton
      testID={testID}
      ariaLabel={ariaLabel}
      size={size}
      isLoading={isLoading}
      width={width}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      variant={variant}
      onPress={handleSubmit(onSubmit)}
      disabled={finalDisabled}
      label={label}
      sublabel={sublabel}
    />
  );
};

const BaseButton = React.forwardRef<typeof RNView, ButtonProps>(
  (
    {
      size = 'md',
      width,
      leftIcon,
      rightIcon,
      variant = 'primary',
      disabled,
      label,
      sublabel,
      onPress,
      ariaLabel,
      borderColor,
      color,
      isLoading,
      noWrap,
      px,
      testID,
    },
    ref,
  ) => {
    const backgroundColor = getBackgroundColor(variant, disabled);
    const labelColor: ButtonProps['color'] = getLabelColor(
      color,
      variant,
      disabled,
    );

    const getBorderColor = () => {
      if (disabled) return '$surfaceLight';
      if (borderColor) return borderColor;
      if (variant === 'secondary') return '$brandMid';
      return backgroundColor;
    };

    return (
      <Pressable
        testID={testID}
        onPress={isLoading ? () => null : onPress}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{width}}
        ref={ref as React.Ref<RNView>}
      >
        <YStack
          height={getHeight(size)}
          backgroundColor={backgroundColor}
          alignItems="center"
          justifyContent="center"
          width={width}
          px={px ?? 32}
          borderRadius={getBorderRadius(variant)}
          gap={9}
          borderColor={getBorderColor()}
          borderWidth={1}
        >
          {isLoading ? (
            <ActivityIndicator
              color={
                labelColor ? tokens.color[labelColor]?.val : 'textHighEmphasis'
              }
            />
          ) : (
            <>
              <XStack gap={12} ai="center">
                {!!leftIcon && leftIcon}
                <Text variant="uiM" color={labelColor} noWrap={noWrap}>
                  {label}
                </Text>
                {!!rightIcon && rightIcon}
              </XStack>
              {!!sublabel && (
                <Text variant="uiS" color={getSublabelColor(variant, disabled)}>
                  {sublabel}
                </Text>
              )}
            </>
          )}
        </YStack>
      </Pressable>
    );
  },
);

export const Button = ({
  href,
  replace,
  size = 'md',
  variant = 'primary',
  onSubmit,
  ...buttonProps
}: ButtonProps) => {
  const width = buttonProps.fullWidth ? '100%' : 'auto';

  if (onSubmit) {
    return (
      <FormButton
        variant={variant}
        onSubmit={onSubmit}
        {...buttonProps}
        width={width}
      />
    );
  }

  if (href) {
    return (
      <Link
        replace={replace}
        href={href}
        asChild
        disabled={buttonProps.disabled}
      >
        <BaseButton size={size} variant={variant} {...buttonProps} />
      </Link>
    );
  }

  return (
    <BaseButton
      size={size}
      variant={variant}
      isLoading={buttonProps.isLoading}
      {...buttonProps}
    />
  );
};
