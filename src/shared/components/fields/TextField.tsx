import { clsx } from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TextFieldProps } from "./types";

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={clsx("w-full", className)}>
      {label && (
        <Text className="mb-2 text-body-small font-bold text-foreground">
          {label}
          {required && <Text className="text-error-DEFAULT"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            {leftIcon && (
              <View className="absolute inset-y-0 left-3 z-10 justify-center">
                {leftIcon}
              </View>
            )}

            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              placeholderTextColor="#6B7280"
              autoCapitalize={autoCapitalize}
              autoCorrect={autoCorrect}
              autoComplete={autoComplete as any}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              multiline={multiline}
              numberOfLines={numberOfLines}
              maxLength={maxLength}
              secureTextEntry={secureTextEntry}
              editable={!disabled}
              className={clsx(
                "rounded-md border bg-background p-4 text-body-small text-foreground",
                "focus:border-primary",
                leftIcon && "pl-12",
                rightIcon && "pr-12",
                multiline && "text-top min-h-[80px]",
                isFocused && "border-primary",
                error && "border-error-DEFAULT",
                !isFocused && !error && "border-border",
                disabled && "opacity-50",
              )}
            />

            {rightIcon && (
              <TouchableOpacity
                className="absolute inset-y-0 right-3 z-10 justify-center"
                onPress={onRightIconPress}
                disabled={!onRightIconPress}
                activeOpacity={0.7}
              >
                {rightIcon}
              </TouchableOpacity>
            )}
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
