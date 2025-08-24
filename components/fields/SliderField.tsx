import Slider from "@react-native-community/slider";
import { clsx } from "clsx";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { SliderFieldProps } from "./types";

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
    <View className={clsx("w-full", className)}>
      {label && (
        <Text className="mb-2 text-sm font-medium text-foreground">
          {label}
          {required && <Text className="text-error-DEFAULT"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <View className="space-y-3">
            {showValue && (
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">
                  {minimumValue}
                  {valueSuffix}
                </Text>
                <Text className="text-lg font-semibold text-foreground">
                  {value || minimumValue}
                  {valueSuffix}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {maximumValue}
                  {valueSuffix}
                </Text>
              </View>
            )}

            <Slider
              value={value || minimumValue}
              onValueChange={onChange}
              minimumValue={minimumValue}
              maximumValue={maximumValue}
              step={step}
              disabled={disabled}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#E5E7EB"
              thumbStyle={{
                backgroundColor: "#3B82F6",
                width: 20,
                height: 20,
              }}
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
