import { HouseIcon } from "@/components/icons/HouseIcon";
import { TextFieldUI } from "./TextFieldUI";

interface PhoneFieldUIProps {
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

export function PhoneFieldUI({
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
}: PhoneFieldUIProps) {
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
      keyboardType="phone-pad"
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="tel"
      returnKeyType="done"
      leftIcon={<HouseIcon className="text-muted-foreground" />}
    />
  );
}