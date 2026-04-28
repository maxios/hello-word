import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Asset, useAssets } from "expo-asset";
import { loadAsync } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import splashImage from "@/assets/splash.png";
import { ToastProvider } from "@/components/Toast";
import { colors } from "@/constants/Colors";

// Disable Reanimated strict mode warnings
configureReanimatedLogger({
  strict: false, // Disable strict mode warnings
  level: ReanimatedLogLevel.warn,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

// Instruct SplashScreen not to hide yet, we want to do this manually

const AnimatedAppLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSplashReady, setSplashReady] = useState(false);
  const [assets, error] = useAssets([splashImage]);

  useEffect(() => {
    if (assets || error) {
      setSplashReady(true);
    }
  }, [assets, error]);

  if (!isSplashReady) {
    return <Slot />;
  }

  return (
    <AnimatedSplashScreen image={assets?.[0]}>{children}</AnimatedSplashScreen>
  );
};

const AnimatedSplashScreen: React.FC<{
  children: React.ReactNode;
  image: Asset | undefined;
}> = ({ children, image }) => {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      SplashScreen.hideAsync();

      await Promise.all([
        loadAsync({
          "OpenSans-400": require("@/assets/fonts/Open_Sans/OpenSans-Regular.ttf"),

          "OpenSans-600": require("@/assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),

          "OpenSans-700": require("@/assets/fonts/Open_Sans/OpenSans-Bold.ttf"),

          "Poppins-700": require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
        }),
      ]);
    } catch {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.surface[0],
              opacity: animation,
            },
          ]}
        >
          {image ? (
            <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 0],
                    }),
                  },
                ],
              }}
              source={splashImage}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />
          ) : null}
        </Animated.View>
      )}
    </View>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <RootSiblingParent>
          <SafeAreaProvider>
            <ToastProvider>
              <StatusBar animated barStyle="light-content" />
              <Stack
                initialRouteName="index"
                screenOptions={{ headerShown: false }}
              />
            </ToastProvider>
          </SafeAreaProvider>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const AppWithErrorBoundary = () => {
  return (
    <AnimatedAppLoader>
      <App />
    </AnimatedAppLoader>
  );
};

export default AppWithErrorBoundary;
