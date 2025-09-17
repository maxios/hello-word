import { Controller } from "react-hook-form";
import { FileUI } from "./FileUI";
import { FileFieldProps } from "./types";

/**
 * react-hook-form wrapper for the file field component
 *
 * @param param0 FileFieldProps<T>
 * @returns
 */
export function FileField<T extends Record<string, any>>({
  control,
  name,
  label,
  accept = ["image/*"],
  multiple = false,
  maxSize,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  onFileSelect,
}: FileFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <FileUI
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          accept={accept}
          multiple={multiple}
          maxSize={maxSize}
          disabled={disabled}
          required={required}
          className={className}
          error={error?.message}
          helperText={helperText}
          onFileSelect={onFileSelect}
        />
      )}
    />
  );
}
