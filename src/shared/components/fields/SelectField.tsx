import { clsx } from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "../icons/CheckIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SelectFieldProps } from "./types";

export function SelectField<T extends Record<string, any>>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  multiple = false,
  searchable = false,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
}: SelectFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase()),
      )
    : options;

  const getDisplayValue = (value: any) => {
    if (multiple && Array.isArray(value)) {
      return value
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .join(", ");
    }
    return options.find((opt) => opt.value === value)?.label || placeholder;
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
              onPress={() => !disabled && setIsOpen(true)}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <Text
                className={clsx(
                  "text-base",
                  value ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {getDisplayValue(value)}
              </Text>
              <ChevronDownIcon size={20} className="text-muted-foreground" />
            </TouchableOpacity>

            <Modal
              visible={isOpen}
              transparent
              animationType="slide"
              onRequestClose={() => setIsOpen(false)}
            >
              <View className="flex-1 justify-end bg-black/50">
                <View className="max-h-[70%] rounded-t-xl bg-background">
                  <View className="flex-row items-center justify-between border-b border-border p-4">
                    <Text className="text-lg font-semibold text-foreground">
                      {label || "Select Option"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsOpen(false)}
                      className="p-2"
                    >
                      <Text className="text-lg text-primary">Done</Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView className="p-4">
                    {filteredOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        className={clsx(
                          "flex-row items-center justify-between rounded-md px-2 py-3",
                          "active:bg-muted",
                        )}
                        onPress={() => {
                          if (multiple) {
                            const currentValue = Array.isArray(value)
                              ? value
                              : [];
                            const newValue = currentValue.includes(option.value)
                              ? currentValue.filter((v) => v !== option.value)
                              : [...currentValue, option.value];
                            onChange(newValue);
                          } else {
                            onChange(option.value);
                            setIsOpen(false);
                          }
                        }}
                        disabled={option.disabled}
                      >
                        <Text
                          className={clsx(
                            "text-base",
                            option.disabled
                              ? "text-muted-foreground"
                              : "text-foreground",
                          )}
                        >
                          {option.label}
                        </Text>

                        {multiple ? (
                          <View
                            className={clsx(
                              "size-5 items-center justify-center rounded border",
                              Array.isArray(value) &&
                                value.includes(option.value)
                                ? "border-primary bg-primary"
                                : "border-border bg-background",
                            )}
                          >
                            {Array.isArray(value) &&
                              value.includes(option.value) && (
                                <CheckIcon size={12} className="text-white" />
                              )}
                          </View>
                        ) : (
                          value === option.value && (
                            <CheckIcon size={20} className="text-primary" />
                          )
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
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
