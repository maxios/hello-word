import { clsx } from "clsx";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { OffRadioButtonIcon } from "../icons/OffRadioButtonIcon";
import { OnRadioButtonIcon } from "../icons/OnRadioButtonIcon";
import { RadioFieldProps, SelectOption } from "./types";

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
    <View className={clsx("w-full", className)}>
      {label && (
        <Text className="mb-3 text-sm font-medium text-foreground">
          {label}
          {required && <Text className="text-error-DEFAULT"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <View
            className={clsx(
              "w-full",
              direction === "horizontal"
                ? "flex-row flex-wrap gap-4"
                : "space-y-3",
            )}
          >
            {options.map((option: SelectOption, index: number) => (
              <TouchableOpacity
                key={option.value}
                className={clsx(
                  "flex-row items-center",
                  direction === "horizontal" && "min-w-[120px] flex-1",
                )}
                onPress={() => onChange(option.value)}
                disabled={disabled || option.disabled}
                activeOpacity={0.7}
              >
                {value === option.value ? (
                  <OnRadioButtonIcon size={20} className="mr-2 text-primary" />
                ) : (
                  <OffRadioButtonIcon
                    size={20}
                    className="mr-2 text-muted-foreground"
                  />
                )}
                <Text
                  className={clsx(
                    "text-sm text-foreground",
                    (disabled || option.disabled) && "opacity-50",
                  )}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
