import { Controller } from "react-hook-form";
import { SearchFieldUI } from "./SearchFieldUI";
import { TextFieldProps } from "./types";

/**
 * react-hook-form wrapper for the search field component
 *
 * @param param0 TextFieldProps<T>
 * @returns
 */
export function SearchField<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <SearchFieldUI
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
        />
      )}
    />
  );
}
