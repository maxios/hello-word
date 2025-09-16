import { clsx } from "clsx";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "../icons/CheckIcon";
import { CheckboxFieldProps } from "./types";

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
    <View className={clsx("w-full", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            className="flex-row items-start"
            onPress={() => onChange(!value)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <View
              className={clsx(
                "mr-3 mt-0.5 size-5 items-center justify-center rounded border",
                value
                  ? "border-primary bg-primary"
                  : "border-border bg-background",
                disabled && "opacity-50",
              )}
            >
              {value && <CheckIcon size="sm" className="text-white" />}
            </View>

            <View className="flex-1">
              {label && (
                <Text className="text-sm font-medium text-foreground">
                  {label}
                  {required && <Text className="text-error-DEFAULT"> *</Text>}
                </Text>
              )}

              {description && (
                <Text className="mt-1 text-sm text-muted-foreground">
                  {description}
                  {linkText && onLinkPress && (
                    <Text
                      className="text-primary underline"
                      onPress={onLinkPress}
                    >
                      {" "}
                      {linkText}
                    </Text>
                  )}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      {(error || helperText) && (
        <Text
          className={clsx(
            "mt-2 text-sm",
            error ? "text-error-DEFAULT" : "text-muted-foreground",
          )}
        >
          {error?.message || helperText}
        </Text>
      )}
    </View>
  );
}
