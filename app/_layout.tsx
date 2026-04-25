import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
// import Toast from 'react-native-root-toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Asset, useAssets } from "expo-asset";
import { loadAsync } from "expo-font";
import * as Linking from "expo-linking";
import { router, Slot, SplashScreen, Stack, useRouter } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
// import { View } from "tamagui";
// import {ActionSheetProvider} from '@expo/react-native-action-sheet';
// import {ToastProvider} from '@/components/Toast';
// import AwardModal from '@/components/AchievementsSlider/AwardModal';
// import {
//   CioConfig,
//   CioLogLevel,
//   CioRegion,
//   CustomerIO,
// } from 'customerio-reactnative';
// import {AuthModal} from '@/components/AuthModal';
// import {PaymentModal} from '@/components/PaymentModal';
// import config from '../tamagui.config';
// import {stytch} from '../lib/stytch';
// import {RevenueCatProvider, useRevenueCat} from '../context/revenuecat';
// import {ErrorBoundary} from '../components/ErrorBoundary';
// import tokens from '../theme/tokens';
import splashImage from "@/assets/splash.png";
// import {getNextUserOnboardingStep} from '../pages/onboarding/utils';
// import {Sentry} from '../lib/sentry';
import { Button } from "@/components/Button";
import { EyeIcon } from "@/components/icons";
import { ToastProvider } from "@/components/Toast";
import { colors } from "@/constants/Colors";
// import {CombinedProvider} from '../context';
// import DeepLinkHandler from '../components/DeepLinkHandler';
// import {Modal} from '../components/Modal';
// import {useForceUpdate} from '../hooks/useForceUpdate';
// import {ForceUpdateModal} from '../components/ForceUpdateModal';
// import {HealthProvider} from '../health';

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
  const router = useRouter();
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const initialUrl = Linking.useURL();
  useEffect(() => {
    const getUrlAsync = async () => {
      if (initialUrl) {
        const { queryParams } = Linking.parse(initialUrl);
        // Deep-link handling: if a logged-in user arrives with a `?route=/catalog`
        // query param, navigate to that path. Wire this up once auth is rehydrated.
        if (queryParams && typeof queryParams.route === 'string') {
          router.navigate({ pathname: queryParams.route });
        }
      }
    };
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
      //   if (loggedInUser) setTimeout(() => getUrlAsync(), 1000);
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
    } catch (e) {
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
  //   const revenueCat = useRevenueCat();
  //   const colorScheme = useColorScheme();
  //   const {user} = useStytchUser();
  //   const {data} = useUserQuery({fetchPolicy: 'cache-only', skip: !user});
  //   const purchasesQuery = useUserPurchasesQuery();
  //   const router = useRouter();

  //   const loggedInUser = data?.user;
  let initialRouteName = "intro";

  //   // --- TEF Modal State ---
  //   const [showTefModal, setShowTefModal] = useState(false);

  //   // --- Force Update State ---
  //   const {isForceUpdateRequired, isLoading: isForceUpdateLoading} =
  //     useForceUpdate();

  //   useEffect(() => {
  //     const checkTefModal = async () => {
  //       if (!loggedInUser?.id) return;
  //       // Only show if thermicEffectOfFood is 'none' and only once per user
  //       if (loggedInUser.thermicEffectOfFood === 'none') {
  //         const storageKey = `tef_popup_shown_${loggedInUser.id}`;
  //         const alreadyShown = await AsyncStorage.getItem(storageKey);
  //         if (!alreadyShown) {
  //           setShowTefModal(true);
  //         }
  //       }
  //     };
  //     checkTefModal();
  //   }, [loggedInUser?.id, loggedInUser?.thermicEffectOfFood]);

  //   const handleTefModalClose = async () => {
  //     if (loggedInUser?.id) {
  //       const storageKey = `tef_popup_shown_${loggedInUser.id}`;
  //       await AsyncStorage.setItem(storageKey, 'true');
  //     }
  //     setShowTefModal(false);
  //   };

  //   const handleTefModalChange = async () => {
  //     if (loggedInUser?.id) {
  //       const storageKey = `tef_popup_shown_${loggedInUser.id}`;
  //       await AsyncStorage.setItem(storageKey, 'true');
  //     }
  //     setShowTefModal(false);
  //     router.navigate('/settings/meals-preferences');
  //   };

  //   if (loggedInUser) {
  //     const isSubscribed = !!purchasesQuery.data?.user?.subscriptionType;
  //     if (isSubscribed && getNextUserOnboardingStep(loggedInUser)) {
  //       initialRouteName = 'onboarding';
  //     } else {
  //       initialRouteName = '(tabs)';
  //     }
  //   }

  //   useEffect(() => {
  //     if (initialRouteName === 'onboarding') {
  //       Toast.show('Please complete your onboarding.');
  //     }

  //     if (loggedInUser) {
  //       revenueCat
  //         .initializePurchasesWithUserEmail(loggedInUser.email)
  //         .catch(() => {
  //           // Sentry.captureException(e);
  //         });
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

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

// This is the App's entry point.
const AppWithErrorBoundary = () => {
  return (
    <AnimatedAppLoader>
      <App />
    </AnimatedAppLoader>
  );
};

// Wrapper component to access Stytch user state
// const HealthProviderWrapper: React.FC<{children: ReactNode}> = ({children}) => {
//   const {user} = useStytchUser();
//   const isUserLoggedIn = !!user;

//   return (
//     <HealthProvider isUserLoggedIn={isUserLoggedIn}>{children}</HealthProvider>
//   );
// };

export default AppWithErrorBoundary;
