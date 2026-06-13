import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadAsync } from "expo-font";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "@/components/Toast";
import "../global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

export default function WebRootLayout() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    loadAsync({
      "OpenSans-400": require("@/assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
      "OpenSans-600": require("@/assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
      "OpenSans-700": require("@/assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
      "Poppins-700": require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
    }).then(() => setFontsReady(true));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ToastProvider>
          <View className="flex-1 bg-background">
            {fontsReady && <Stack screenOptions={{ headerShown: false }} />}
          </View>
        </ToastProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
