import { Controller } from "react-hook-form";
import { CheckboxUI } from "./CheckboxUI";
import { CheckboxFieldProps } from "./types";

/**
 * react-hook-form wrapper for the component
 *
 * @param param0 CheckboxFieldProps<T>
 * @returns
 */
export function CheckboxField<T extends Record<string, any>>({
  control,
  name,
  label,
  description,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  linkText,
  onLinkPress,
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <CheckboxUI
          label={label}
          description={description}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={className}
          error={error?.message}
          helperText={helperText}
          linkText={linkText}
          onLinkPress={onLinkPress}
        />
      )}
    />
  );
}
