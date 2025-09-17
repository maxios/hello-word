import { Controller } from "react-hook-form";
import { SwitchUI } from "./SwitchUI";
import { BaseFieldProps } from "./types";

/**
 * react-hook-form wrapper for the component
 *
 * @param param0 BaseFieldProps<T>
 * @returns
 */
export function SwitchField<T extends Record<string, any>>({
  control,
  name,
  label,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: BaseFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <SwitchUI
          label={label}
          required={required}
          value={value}
          onChange={onChange}
          error={error?.message}
          helperText={helperText}
          disabled={disabled}
          className={className}
        />
      )}
    />
  );
}
