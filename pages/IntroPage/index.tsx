import strngLogo from "@/assets/images/intro/strng_logo.png";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PerksCarousel } from "./PerksCarousel";

const IntroPage = () => {
  const insets = useSafeAreaInsets();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <View className="h-full w-full flex-1 bg-background">
      <View className="relative h-full w-full flex-1">
        <View className="absolute left-[16px] top-[25px] z-10">
          <View style={{ paddingTop: insets.top - 32 }} />
          <Image source={strngLogo} />
        </View>
        <PerksCarousel />
      </View>
      <View className="flex-col justify-center gap-2 px-4">
        <Button
          variant="outlined"
          label="Start Your STRNG Workout"
          onPress={() => handleNavigation("/home")}
        />
        <Button
          variant="outlined"
          label="Get started"
          onPress={() => handleNavigation("/auth/signup")}
        />
        <Button
          variant="text"
          label="Log in"
          onPress={() => handleNavigation("/auth/new-app-perks")}
        />

        <View style={{ paddingBottom: insets.bottom }} />
      </View>
    </View>
  );
};

export default IntroPage;
