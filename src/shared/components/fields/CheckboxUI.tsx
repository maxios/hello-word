import { clsx } from "clsx";
import { Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "../icons/CheckIcon";

interface CheckboxUIProps {
  label?: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
  linkText?: string;
  onLinkPress?: () => void;
}

export function CheckboxUI({
  label,
  description,
  value,
  onChange,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  linkText,
  onLinkPress,
}: CheckboxUIProps) {
  return (
    <View className={clsx("w-full", className)}>
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