import { MagnifyingGlassIcon } from "../icons/MagnifyingGlassIcon";
import { XIcon } from "../icons/XIcon";
import { TextFieldUI } from "./TextFieldUI";

interface SearchFieldUIProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onClear?: () => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
}

export function SearchFieldUI({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onClear,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: SearchFieldUIProps) {
  const hasValue = value && value.length > 0;

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

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
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      leftIcon={<MagnifyingGlassIcon className="text-muted-foreground" />}
      rightIcon={
        hasValue ? <XIcon className="text-muted-foreground" /> : undefined
      }
      onRightIconPress={hasValue ? handleClear : undefined}
    />
  );
}
