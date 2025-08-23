import { useColorScheme } from "@/hooks/useColorScheme";
import { clsx } from "clsx";
import Constants from "expo-constants";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function PlaygroundLayout() {
  const colorScheme = useColorScheme();

  // Only show playground in development or if explicitly enabled
  const showPlayground =
    Constants.expoConfig?.extra?.enablePlayground || __DEV__;

  if (!showPlayground) {
    return (
      <View
        className={clsx(
          "flex-1 items-center justify-center bg-background p-4",
          colorScheme === "dark" && "dark",
        )}
      >
        <Text className="mb-4 text-center text-lg text-muted-foreground">
          Component Playground is not available in this environment
        </Text>
        <Text className="text-center text-sm text-muted-foreground">
          Enable it by setting enablePlayground: true in your app config
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={clsx("flex-1", colorScheme === "dark" && "dark")}>
        <Slot />
      </View>
    </GestureHandlerRootView>
  );
}
