import { PressableProps } from 'react-native';

export type ButtonVariant = 
  | 'primary'    // Cyan/Brand button
  | 'secondary'  // Dark Gray button
  | 'outlined'   // Ghost button with border
  | 'text'       // Text-only button
  | 'navigation' // Back/Next buttons
  | 'fab';       // Floating Action Button

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /**
   * The variant style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;
  
  /**
   * Add content (it will override all button content)
   */
  children?: React.ReactNode;
  
  /**
   * Optional icon to show before the text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Optional icon to show after the text
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * The text content of the button (will be automatically uppercased)
   */
  label?: string;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional class names to apply to the button
   */
  className?: string;
}
