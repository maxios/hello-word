import { Controller } from "react-hook-form";
import { SliderUI } from "./SliderUI";
import { SliderFieldProps } from "./types";

/**
 * react-hook-form wrapper for the slider field component
 *
 * @param param0 SliderFieldProps<T>
 * @returns
 */
export function SliderField<T extends Record<string, any>>({
  control,
  name,
  label,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  showValue = true,
  valueSuffix = "",
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: SliderFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <SliderUI
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          showValue={showValue}
          valueSuffix={valueSuffix}
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
