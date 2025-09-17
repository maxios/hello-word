import React from 'react';
import {View, Text as RNText} from 'react-native';
import {XStack} from 'tamagui';
import tokens from '../../theme/tokens';
import {TextProps, WrapperProps} from './types';
import {styles, wordContainerStyles} from './styles';

const Wrapper = ({
  variant = 'uiM',
  backgroundColor,
  hasBackgroundColor,
  color,
  noWrap,
  children,
}: WrapperProps) => {
  const {height, marginBottom, paddingTop, paddingX} =
    wordContainerStyles[variant];
  let finalChildren = children;
  if (typeof children === 'number') finalChildren = String(children);
  if (typeof finalChildren !== 'string') return children;

  return (
    <XStack
      flexWrap={noWrap ? 'nowrap' : 'wrap'}
      marginBottom={-marginBottom}
      marginRight={hasBackgroundColor ? 0 : -paddingX}
      marginLeft={hasBackgroundColor ? 0 : -paddingX}
    >
      {finalChildren.split(' ').map((word: string, idx: number) => (
        <View
           
          key={`${word}-${idx}`}
          style={{
            height: hasBackgroundColor ? height + paddingX * 2 : height,
            marginBottom,
            backgroundColor,
            paddingTop: hasBackgroundColor ? paddingX : 0,
            paddingBottom: hasBackgroundColor ? paddingX : 0,
          }}
        >
          <RNText
            style={{
              paddingTop,
              paddingRight: paddingX,
              paddingLeft: paddingX,
              color,
              ...styles[variant],
            }}
            allowFontScaling={false}
          >
            {word}
          </RNText>
        </View>
      ))}
    </XStack>
  );
};

export const Text = ({
  variant = 'bodyS',
  color,
  backgroundColor,
  withWhiteBackground,
  withBrandDarkBackground,
  withBrandMidBackground,
  withBrandLightBackground,
  children,
  textAlign,
  noWrap,
}: TextProps) => {
  const hasBackgroundColor =
    !!backgroundColor ||
    withWhiteBackground ||
    withBrandDarkBackground ||
    withBrandMidBackground ||
    withBrandLightBackground;

  const getColor = () => {
    switch (true) {
      case !!color:
        return color ? tokens.color[color].val : 'white';
      case withWhiteBackground:
        return tokens.color.surface0.val;
      case withBrandDarkBackground:
        return tokens.color.brandLight.val;
      case withBrandMidBackground || withBrandLightBackground:
        return tokens.color.brandDarkest.val;
      default:
        return tokens.color.textHighEmphasis.val;
    }
  };

  const getBackgroundColor = () => {
    switch (true) {
      case !!backgroundColor:
        return tokens.color[backgroundColor || 'transparent'].val;
      case withWhiteBackground:
        return 'white';
      case withBrandDarkBackground:
        return tokens.color.brandDark.val;
      case withBrandMidBackground:
        return tokens.color.brandMid.val;
      case withBrandLightBackground:
        return tokens.color.brandLight.val;
      default:
        return 'transparent';
    }
  };

  const isBodyVariant =
    variant === 'bodyL' ||
    variant === 'bodyLEmphasis' ||
    variant === 'bodyM' ||
    variant === 'bodyMEmphasis' ||
    variant === 'bodyS' ||
    variant === 'bodyXS' ||
    variant === 'bodySLink' ||
    variant === 'bodySEmphasis';

  if (isBodyVariant) {
    return (
      <RNText
        allowFontScaling={false}
        style={{
          ...styles[variant],
          textAlign,
          color: getColor(),
          flexWrap: noWrap ? 'nowrap' : 'wrap',
        }}
      >
        {children}
      </RNText>
    );
  }

  return (
    <Wrapper
      variant={variant}
      backgroundColor={getBackgroundColor()}
      color={getColor()}
      hasBackgroundColor={hasBackgroundColor}
      noWrap={noWrap}
    >
      {children}
    </Wrapper>
  );
};
