import { Controller } from "react-hook-form";
import { SelectUI } from "./SelectUI";
import { SelectFieldProps } from "./types";

/**
 * react-hook-form wrapper for the component
 *
 * @param param0 SelectFieldProps<T>
 * @returns
 */
export function SelectField<T extends Record<string, any>>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  multiple = false,
  searchable = false,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: SelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <SelectUI
          label={label}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          multiple={multiple}
          searchable={searchable}
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
