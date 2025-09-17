import { TrendingUpIcon } from "../icons/TrendingUpIcon";
import { TextFieldUI } from "./TextFieldUI";

interface NumberFieldUIProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
}

export function NumberFieldUI({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: NumberFieldUIProps) {
  return (
    <TextFieldUI
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      className={className}
      error={error}
      helperText={helperText}
      keyboardType="numeric"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      leftIcon={<TrendingUpIcon className="text-muted-foreground" />}
    />
  );
}
