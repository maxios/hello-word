import DateTimePicker from "@react-native-community/datetimepicker";
import { clsx } from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { CalendarBlankIcon } from "../icons/CalendarBlankIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { DateFieldProps } from "./types";

export function DateField<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder = "Select date",
  mode = "date",
  minimumDate,
  maximumDate,
  display = "default",
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: DateFieldProps<T>) {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    if (mode === "date") {
      return date.toLocaleDateString();
    } else if (mode === "time") {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleString();
    }
  };

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
          <>
            <TouchableOpacity
              className={clsx(
                "flex-row items-center justify-between rounded-md border bg-background px-4 py-3",
                "focus:border-primary",
                error && "border-error-DEFAULT",
                !error && "border-border",
                disabled && "opacity-50",
              )}
              onPress={() => !disabled && setShowPicker(true)}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <View className="flex-1 flex-row items-center">
                <CalendarBlankIcon
                  size={20}
                  className="mr-3 text-muted-foreground"
                />
                <Text
                  className={clsx(
                    "flex-1 text-base",
                    value ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {value ? formatDate(value) : placeholder}
                </Text>
              </View>
              <ChevronDownIcon size={20} className="text-muted-foreground" />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={value || new Date()}
                mode={mode}
                display={display}
                onChange={(event, selectedDate) => {
                  setShowPicker(Platform.OS === "ios");
                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
            )}
          </>
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
