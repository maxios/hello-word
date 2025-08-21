import tokens from '../../theme/tokens';
import { ButtonProps } from './types';

export const getHeight = (size: string) => {
  switch (size) {
    case 'sm':
      return 35;
    case 'md':
      return 59;
    case 'lg':
      return 68;
    case 'input_small':
      // Add 2px to account for border
      return tokens.size.inputHeightSmall.val + 2;
    default:
      return 59;
  }
};

export const getBackgroundColor = (variant?: string, disabled?: boolean) => {
  switch (true) {
    case disabled:
      return '$surfaceLight';
    case variant === 'primary':
      return '$brandMid';
    case variant === 'secondary':
      return '$surface4';
    case variant === 'text':
      return '$transparent';
    case variant === 'subtle':
      return '$surface8';
    default:
      return '$brandMid';
  }
};

export const getBorderRadius = (variant?: string) => {
  switch (variant) {
    case 'subtle':
      return 4;
    default:
      return 50;
  }
};

export const getLabelColor = (
  color?: ButtonProps['color'],
  variant?: string,
  disabled?: boolean,
) => {
  switch (true) {
    case !!color:
      return color;
    case disabled:
      return 'textHighEmphasis';
    case variant === 'primary':
      return 'brandDarkest';
    case variant === 'secondary':
      return 'textHighEmphasis';
    case variant === 'text':
      return 'textHighEmphasis';
    default:
      return 'textHighEmphasis';
  }
};

export const getSublabelColor = (variant?: string, disabled?: boolean) => {
  switch (true) {
    case disabled:
      return 'textMediumEmphasis';
    case variant === 'primary':
      return 'brandDark';
    default:
      return 'textMediumEmphasis';
  }
};
