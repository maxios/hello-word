import { colors } from "@/constants/Colors";
import { clsx } from "clsx";
import { Controller } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { BaseFieldProps } from "./types";

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
    <View className={clsx("w-full", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-1">
              {label && (
                <Text className="text-sm font-medium text-foreground">
                  {label}
                  {required && <Text className="text-error-DEFAULT"> *</Text>}
                </Text>
              )}
            </View>

            <Switch
              value={value}
              onValueChange={onChange}
              disabled={disabled}
              trackColor={{ false: colors.surface[4], true: colors.brand.mid }}
              thumbColor={
                value ? colors["high-emphasis"] : colors["high-emphasis"]
              }
              ios_backgroundColor={colors.surface[4]}
            />
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
