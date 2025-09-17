import { Controller } from "react-hook-form";
import { TextFieldUI } from "./TextFieldUI";
import { TextFieldProps } from "./types";

/**
 * react-hook-form wrapper for the component
 *
 * @param param0 TextFieldProps<T>
 * @returns
 */
export function TextField<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  autoCapitalize = "sentences",
  autoCorrect = true,
  autoComplete,
  keyboardType = "default",
  returnKeyType = "done",
  multiline = false,
  numberOfLines = 1,
  maxLength,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <TextFieldUI
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
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
        />
      )}
    />
  );
}
