import { Button } from "@/components/Button";
import { useAuthState } from "@/features/auth";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProtectedScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthState();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
          gap: 16,
        }}
      >
        <Text className="font-heading text-heading-xl font-bold uppercase text-high-emphasis">
          Protected area
        </Text>
        <Text className="text-body-medium text-medium-emphasis">
          This screen lives under <Text className="font-bold">app/(auth-gated)/</Text>.
          The group&apos;s layout checks the auth session and redirects
          unauthenticated visitors to <Text className="font-bold">/auth/login</Text>.
        </Text>
        {user ? (
          <Text className="text-body-small text-medium-emphasis">
            Signed in as <Text className="font-bold">{user.email}</Text>
          </Text>
        ) : null}
        <View className="gap-2 pt-6">
          <Button
            variant="primary"
            label="Back to home"
            onPress={() => router.replace("/home")}
          />
          <Button
            variant="outlined"
            label="Log out"
            onPress={async () => {
              await logout();
              router.replace("/auth/login");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
