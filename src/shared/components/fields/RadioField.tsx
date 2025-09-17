import { Controller } from "react-hook-form";
import { RadioUI } from "./RadioUI";
import { RadioFieldProps } from "./types";

/**
 * react-hook-form wrapper for the component
 *
 * @param param0 RadioFieldProps<T>
 * @returns
 */
export function RadioField<T extends Record<string, any>>({
  control,
  name,
  label,
  options,
  direction = "vertical",
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: RadioFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <RadioUI
          label={label}
          value={value}
          onChange={onChange}
          options={options}
          direction={direction}
          disabled={disabled}
          required={required}
          className={className}
          error={error?.message}
          helperText={helperText}
        />
      )}
    />
  );
}
