import * as Linking from "expo-linking";
import { router, Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const initialUrl = Linking.useLinkingURL();

  useEffect(() => {
    if (initialUrl) {
      const { queryParams } = Linking.parse(initialUrl);

      console.log("queryParams", queryParams);
      if (queryParams && typeof queryParams.strng === "string") {
        router.navigate({
          pathname: queryParams.strng,
          params: queryParams,
        });
      }
    }
  }, [initialUrl]);

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={colorScheme === "light" ? "light-content" : "dark-content"}
        />
        <Slot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
