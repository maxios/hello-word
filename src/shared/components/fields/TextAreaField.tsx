import { Controller } from "react-hook-form";
import { TextAreaUI } from "./TextAreaUI";
import { TextFieldProps } from "./types";

/**
 * react-hook-form wrapper for the text area field component
 *
 * @param param0 TextFieldProps<T>
 * @returns
 */
export function TextAreaField<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  numberOfLines = 4,
  maxLength,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <TextAreaUI
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={className}
          error={error?.message}
          helperText={helperText}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
        />
      )}
    />
  );
}
