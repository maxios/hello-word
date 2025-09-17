import { clsx } from "clsx";
import * as ImagePicker from "expo-image-picker";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DownloadIcon } from "../icons/DownloadIcon";
import { XIcon } from "../icons/XIcon";

interface FileUIProps {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  accept?: string[];
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
  onFileSelect?: (files: any[]) => void;
}

export function FileUI({
  label,
  value,
  onChange,
  onBlur,
  accept = ["image/*"],
  multiple = false,
  maxSize,
  disabled = false,
  required = false,
  className,
  error,
  helperText,
  onFileSelect,
}: FileUIProps) {
  const pickImage = async () => {
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

          onFileSelect?.(assets);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const removeFile = () => {
    onChange(null);
  };

  const removeFileAtIndex = (index: number) => {
    if (Array.isArray(value)) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : null);
    }
  };

  return (
    <View className={clsx("w-full", className)}>
      {label && (
        <Text className="mb-2 text-body-small font-bold text-foreground">
          {label}
          {required && <Text className="text-error-DEFAULT"> *</Text>}
        </Text>
      )}

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
                    onPress={() => removeFileAtIndex(index)}
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
                  onPress={removeFile}
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
          onPress={() => !disabled && pickImage()}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <DownloadIcon size={24} className="mr-2 text-muted-foreground" />
          <Text className="text-base text-muted-foreground">
            {value ? "Add more files" : "Choose files"}
          </Text>
        </TouchableOpacity>
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