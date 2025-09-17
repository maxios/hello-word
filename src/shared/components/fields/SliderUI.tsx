import Slider from "@react-native-community/slider";
import { clsx } from "clsx";
import { Text, View } from "react-native";

interface SliderUIProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  showValue?: boolean;
  valueSuffix?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
}

export function SliderUI({
  label,
  value,
  onChange,
  onBlur,
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
}: SliderUIProps) {
  return (
    <View className={clsx("w-full", className)}>
      {label && (
        <Text className="mb-2 text-body-small font-bold text-foreground">
          {label}
          {required && <Text className="text-error-DEFAULT"> *</Text>}
        </Text>
      )}

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

      {(error || helperText) && (
        <Text
          className={clsx(
            "mt-2 text-sm",
            error ? "text-error-DEFAULT" : "text-muted-foreground",
          )}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
}