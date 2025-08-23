import { clsx } from 'clsx';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { ButtonProps } from './types';

const variantStyles = {
  primary: 'bg-brand-mid',
  secondary: 'bg-surface-12',
  outlined: 'border border-brand-mid',
  text: 'bg-transparent',
  navigation: 'bg-surface-12',
  fab: 'bg-surface-12 rounded-full',
} as const;

const textStyles = {
  primary: 'text-white',
  secondary: 'text-high-emphasis',
  outlined: 'text-brand-mid',
  text: 'text-high-emphasis',
  navigation: 'text-high-emphasis',
  fab: 'text-high-emphasis',
} as const;

const sizeStyles = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
} as const;

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled || isLoading}
      className={clsx(
        // Base styles
        'flex-row items-center justify-center rounded-full',
        'active:opacity-80',
        
        // Variant styles
        variantStyles[variant],
        
        // Size styles
        sizeStyles[size],
        
        // Disabled state
        (disabled || isLoading) && 'opacity-50',
        
        // Custom classes
        className
      )}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'outlined' ? '#33C4EB' : '#FFFFFF'} 
          className="mr-2"
        />
      ) : leftIcon ? (
        <Text className="mr-2">{leftIcon}</Text>
      ) : null}
      
      <Text 
        className={clsx(
          'font-body tracking-ui uppercase',
          textStyles[variant]
        )}
      >
        {children}
      </Text>
      
      {!isLoading && rightIcon && (
        <Text className="ml-2">{rightIcon}</Text>
      )}
    </Pressable>
  );
}
