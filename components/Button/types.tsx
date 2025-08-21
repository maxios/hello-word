import {DimensionValue} from 'react-native';
import {TextProps} from '../Text/types';

export interface ButtonProps {
  testID?: string;
  size?: 'sm' | 'md' | 'lg' | 'input_small';
  variant?: 'primary' | 'secondary' | 'text' | 'subtle';
  fullWidth?: boolean;
  label: string | React.ReactElement;
  sublabel?: string;
  rightIcon?: React.ReactElement | null;
  leftIcon?: React.ReactElement;
  onPress?: () => void;
  onSubmit?: (data?: any) => void;
  disabled?: boolean;
  replace?: boolean;
  href?:
    | string
    | {
        pathname: string;
        params?: any;
      };
  ariaLabel?: string;
  disableButtonUntilValid?: boolean;
  color?: TextProps['color'];
  borderColor?: string;
  isLoading?: boolean;
  width?: DimensionValue;
  noWrap?: boolean;
  px?: number;
  backgroundColor?: string;
}

export interface FormButtonProps extends Omit<ButtonProps, 'onPress'> {
  onSubmit: (data?: any) => void;
}
