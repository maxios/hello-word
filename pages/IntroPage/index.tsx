import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PerksCarousel } from "./PerksCarousel";

const IntroPage = () => {
  const insets = useSafeAreaInsets();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <View className="size-full flex-1 bg-background">
      <View className="relative size-full flex-1">
        <View className="absolute left-4 top-6 z-10">
          <View style={{ paddingTop: insets.top - 32 }} />
          <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
            Flota
          </Text>
        </View>
        <PerksCarousel />
      </View>
      <View className="flex-col justify-center gap-2 px-4">
        <Button
          variant="primary"
          label="Explore the demos"
          onPress={() => handleNavigation("/home")}
        />
        <Button
          variant="outlined"
          label="Create an account"
          onPress={() => handleNavigation("/auth/signup")}
        />
        <Button
          variant="text"
          label="Log in"
          onPress={() => handleNavigation("/auth/login")}
        />

        <View style={{ paddingBottom: insets.bottom }} />
      </View>
    </View>
  );
};

export default IntroPage;
