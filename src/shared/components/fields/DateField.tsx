import { Controller } from "react-hook-form";
import { DateUI } from "./DateUI";
import { DateFieldProps } from "./types";

/**
 * react-hook-form wrapper for the date field component
 *
 * @param param0 DateFieldProps<T>
 * @returns
 */
export function DateField<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder = "Select date",
  mode = "date",
  minimumDate,
  maximumDate,
  display = "default",
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: DateFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <DateUI
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          mode={mode}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          display={display}
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
