import { Button } from "@/components/Button";
import { router, Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-heading text-heading-xl font-bold uppercase text-high-emphasis">
          Modal route
        </Text>
        <Text className="text-body-medium text-medium-emphasis">
          This screen lives at <Text className="font-bold">app/modal.tsx</Text>.
          It opts into modal presentation via the local Stack.Screen config —
          the root stack doesn&apos;t need to know about it.
        </Text>
        <Text className="text-body-medium text-medium-emphasis">
          Use a modal for focused, transient flows: edit dialogs, media viewers,
          onboarding steps. Avoid them for persistent navigation destinations.
        </Text>

        <View className="gap-2 pt-4">
          <Button
            variant="primary"
            label="Close"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
