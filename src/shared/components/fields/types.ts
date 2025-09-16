import { Control, FieldError, FieldValues, Path } from 'react-hook-form';

export interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
}

export interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoComplete?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
}

export interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  description?: string;
  linkText?: string;
  onLinkPress?: () => void;
}

export interface RadioFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: SelectOption[];
  direction?: 'horizontal' | 'vertical';
}

export interface DateFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  display?: 'default' | 'spinner' | 'calendar' | 'clock';
}

export interface SliderFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  showValue?: boolean;
  valueSuffix?: string;
}

export interface FileFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  accept?: string[];
  multiple?: boolean;
  maxSize?: number; // in bytes
  onFileSelect?: (files: File[]) => void;
}
