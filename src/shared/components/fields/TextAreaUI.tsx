import { SubjectIcon } from "../icons/SubjectIcon";
import { TextFieldUI } from "./TextFieldUI";

interface TextAreaUIProps {
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
  numberOfLines?: number;
  maxLength?: number;
}

export function TextAreaUI({
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
  numberOfLines = 4,
  maxLength,
}: TextAreaUIProps) {
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
      multiline={true}
      numberOfLines={numberOfLines}
      autoCapitalize="sentences"
      autoCorrect={true}
      returnKeyType="done"
      maxLength={maxLength}
      leftIcon={<SubjectIcon className="text-muted-foreground" />}
    />
  );
}
