import { clsx } from "clsx";
import * as ImagePicker from "expo-image-picker";
import { Controller } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DownloadIcon } from "../icons/DownloadIcon";
import { XIcon } from "../icons/XIcon";
import { FileFieldProps } from "./types";

export function FileField<T extends Record<string, any>>({
  control,
  name,
  label,
  accept = ["image/*"],
  multiple = false,
  maxSize,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  onFileSelect,
}: FileFieldProps<T>) {
  const pickImage = async (onChange: (value: any) => void) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: multiple,
      });

      if (!result.canceled) {
        const assets = result.assets;

        if (assets && assets.length > 0) {
          if (multiple) {
            onChange(assets);
          } else {
            onChange(assets[0]);
          }

          if (onFileSelect) {
            onFileSelect(assets);
          }
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const removeFile = (onChange: (value: any) => void) => {
    onChange(null);
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
          <View className="space-y-3">
            {value ? (
              <View className="space-y-2">
                {multiple && Array.isArray(value) ? (
                  value.map((file, index) => (
                    <View
                      key={index}
                      className="bg-muted flex-row items-center justify-between rounded-md p-3"
                    >
                      <Image
                        source={{ uri: file.uri }}
                        className="size-12 rounded-md"
                      />
                      <Text className="ml-3 flex-1 text-sm text-foreground">
                        {file.fileName || `File ${index + 1}`}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newFiles = value.filter((_, i) => i !== index);
                          onChange(newFiles.length > 0 ? newFiles : null);
                        }}
                        className="p-2"
                      >
                        <XIcon size={20} className="text-error-DEFAULT" />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="bg-muted flex-row items-center justify-between rounded-md p-3">
                    <Image
                      source={{ uri: value.uri }}
                      className="size-12 rounded-md"
                    />
                    <Text className="ml-3 flex-1 text-sm text-foreground">
                      {value.fileName || "Selected file"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeFile(onChange)}
                      className="p-2"
                    >
                      <XIcon size={20} className="text-error-DEFAULT" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : null}

            <TouchableOpacity
              className={clsx(
                "flex-row items-center justify-center rounded-md border-2 border-dashed border-border p-6",
                "active:border-primary",
                disabled && "opacity-50",
              )}
              onPress={() => !disabled && pickImage(onChange)}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <DownloadIcon size={24} className="mr-2 text-muted-foreground" />
              <Text className="text-base text-muted-foreground">
                {value ? "Add more files" : "Choose files"}
              </Text>
            </TouchableOpacity>
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
