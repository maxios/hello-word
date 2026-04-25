import { Slot } from "expo-router";
import { View } from "react-native";

export default function ComposeLayout() {
  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}
