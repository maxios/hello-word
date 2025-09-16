import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon, DownloadIcon } from "../icons";

export const CodeBlock: React.FC<{ code: string; visible: boolean }> = ({
  code,
  visible,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy to clipboard");
    }
  };

  if (!visible) return null;

  return (
    <View className="bg-muted mt-3 rounded-md p-3">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-xs font-medium text-muted-foreground">Code</Text>
        <TouchableOpacity
          onPress={handleCopy}
          className="flex-row items-center space-x-1 rounded-md bg-background/50 px-2 py-1"
        >
          {copied ? (
            <>
              <CheckIcon size="sm" color="#22c55e" />
              <Text className="text-xs font-medium text-green-500">
                Copied!
              </Text>
            </>
          ) : (
            <>
              <DownloadIcon width={14} height={14} />
              <Text className="text-xs font-medium text-muted-foreground">
                Copy
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <Text className="font-mono text-sm text-muted-foreground">{code}</Text>
    </View>
  );
};
