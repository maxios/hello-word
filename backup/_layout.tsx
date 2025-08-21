import {
  Slot,
  SplashScreen,
  Stack,
  useRouter
} from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {ApolloProvider} from '@apollo/client';
import { loadAsync } from 'expo-font';
// import {RootSiblingParent} from 'react-native-root-siblings';
import { Asset, useAssets } from 'expo-asset';
import { Animated, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { TamaguiProvider, Theme, View } from 'tamagui';
// import {ActionSheetProvider} from '@expo/react-native-action-sheet';
// import {StytchProvider, useStytchUser} from '@stytch/react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
// import Toast from 'react-native-root-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
// import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../tamagui.config';
// import {hydrateApolloClient, client} from '../lib/apollo';
// import {stytch} from '../lib/stytch';
// import {RevenueCatProvider, useRevenueCat} from '../context/revenuecat';
// import {ErrorBoundary} from '../components/ErrorBoundary';
import splashImage from '../assets/splash.png';
import tokens from '../theme/tokens';
// import {
//   useUserLazyQuery,
//   useUserPurchasesQuery,
//   useUserQuery,
// } from '../graphql/generated-queries';
// import {getNextUserOnboardingStep} from '../pages/onboarding/utils';
// import {Sentry} from '../lib/sentry';
// import '../lib/patch-console';
// import {CombinedProvider} from '../context';
// import DeepLinkHandler from '../components/DeepLinkHandler';
// import {Modal} from '../components/Modal';
// import {useForceUpdate} from '../hooks/useForceUpdate';
// import {ForceUpdateModal} from '../components/ForceUpdateModal';
// import {HealthProvider} from '../health';

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync();

const AnimatedAppLoader: React.FC<{children: React.ReactNode}> = ({
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
}> = ({children, image}) => {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  // const [getUser] = useUserLazyQuery();
  // const router = useRouter();
  const [isSplashAnimationComplete, setAnimationComplete] = useState(true);

  // const {user} = useStytchUser();
  // const {data} = useUserQuery({fetchPolicy: 'cache-only', skip: !user});
  // const loggedInUser = data?.user;
  // const initialUrl = Linking.useURL();
  // useEffect(() => {
  //   const getUrlAsync = async () => {
  //     if (initialUrl) {
  //       const {queryParams} = Linking.parse(initialUrl);
  //       if (loggedInUser) {
  //         if (queryParams && typeof queryParams.strng === 'string') {
  //           router.navigate({
  //             pathname: queryParams.strng,
  //           });
  //         }
  //       }
  //     }
  //   };
  //   if (isAppReady) {
  //     Animated.timing(animation, {
  //       toValue: 0,
  //       duration: 700,
  //       useNativeDriver: true,
  //     }).start(() => setAnimationComplete(true));
  //     if (loggedInUser) setTimeout(() => getUrlAsync(), 1000);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAppReady, loggedInUser]);

  const onImageLoaded = useCallback(async () => {
    try {
      SplashScreen.hideAsync();

      await Promise.all([
        // hydrateApolloClient(),
        loadAsync({
           
          'OpenSans-400': require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
           
          'OpenSans-600': require('../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
           
          'OpenSans-700': require('../assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
           
          'Poppins-700': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
        }),
        // stytch.user
        //   .get()
        //   .then((user) => {
        //     if (user) return getUser({fetchPolicy: 'network-only'});
        //     return null;
        //   })
        //   .catch((e) => {
        //     if (e.error_type === 'user_unauthenticated') return;
        //     // eslint-disable-next-line no-console
        //     console.warn('error getting user', e);
        //     // TODO: Capture in sentry
        //   }),
      ]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
     
  }, []);

  // useEffect(() => {
    // client
    //   .resetStore()
    //   .then(() => {})
    //   .catch(() => {});
  // }, []);

  return (
    <View flex={1}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: tokens.color.surface0.val,
              opacity: animation,
            },
          ]}
        >
          {image ? (
            <Animated.Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
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
  // const revenueCat = useRevenueCat();
  const colorScheme = useColorScheme();
  // const {user} = useStytchUser();
  // const {data} = useUserQuery({fetchPolicy: 'cache-only', skip: !user});
  // const purchasesQuery = useUserPurchasesQuery();
  const router = useRouter();

  // const loggedInUser = data?.user;
  let initialRouteName = 'intro';

  // --- TEF Modal State ---
  const [showTefModal, setShowTefModal] = useState(false);

  // --- Force Update State ---
  // const {isForceUpdateRequired, isLoading: isForceUpdateLoading} =
    // useForceUpdate();

  // useEffect(() => {
  //   const checkTefModal = async () => {
  //     if (!loggedInUser?.id) return;
  //     // Only show if thermicEffectOfFood is 'none' and only once per user
  //     if (loggedInUser.thermicEffectOfFood === 'none') {
  //       const storageKey = `tef_popup_shown_${loggedInUser.id}`;
  //       const alreadyShown = await AsyncStorage.getItem(storageKey);
  //       if (!alreadyShown) {
  //         setShowTefModal(true);
  //       }
  //     }
  //   };
  //   checkTefModal();
  // }, [loggedInUser?.id, loggedInUser?.thermicEffectOfFood]);

  const handleTefModalClose = async () => {
    // if (loggedInUser?.id) {
    //   const storageKey = `tef_popup_shown_${loggedInUser.id}`;
    //   await AsyncStorage.setItem(storageKey, 'true');
    // }
    setShowTefModal(false);
  };

  const handleTefModalChange = async () => {
    // if (loggedInUser?.id) {
    //   const storageKey = `tef_popup_shown_${loggedInUser.id}`;
    //   await AsyncStorage.setItem(storageKey, 'true');
    // }
    setShowTefModal(false);
    router.navigate('/settings/meals-preferences');
  };

  // if (loggedInUser) {
  //   const isSubscribed = !!purchasesQuery.data?.user?.subscriptionType;
  //   if (isSubscribed && getNextUserOnboardingStep(loggedInUser)) {
  //     initialRouteName = 'onboarding';
  //   } else {
  //     initialRouteName = '(tabs)';
  //   }
  // }

  useEffect(() => {
    if (initialRouteName === 'onboarding') {
      // Toast.show('Please complete your onboarding.');
    }

    // if (loggedInUser) {
    //   revenueCat
    //     .initializePurchasesWithUserEmail(loggedInUser.email)
    //     .catch(() => {
    //       // Sentry.captureException(e);
    //     });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView>
      {/* <ActionSheetProvider> */}
        {/* <CombinedProvider> */}
          <TamaguiProvider config={config}>
            {/* <RootSiblingParent> */}
              <Theme name={colorScheme}>
                <SafeAreaProvider>
                  {/* <DeepLinkHandler> */}
                    <StatusBar animated barStyle="light-content" />

                    {/* TEF Modal */}
                    {/* {showTefModal && (
                      <Modal
                        isVisible={showTefModal}
                        closeModal={handleTefModalClose}
                        header="Smarter Macros. Stronger You."
                        subheader="We’ve updated how your macros are calculated for better accuracy and goal alignment. Switch to the new system ?"
                        buttons={[
                          {
                            label: 'Upgrade Now',
                            onPress: handleTefModalChange,
                            variant: 'primary',
                            noWrap: true,
                          },
                          {
                            label: 'Maybe Later',
                            onPress: handleTefModalClose,
                            variant: 'secondary',
                            noWrap: true,
                          },
                        ]}
                        buttonFlexDirection="row"
                      />
                    )} */}

                    {/* Introduction Video */}

                    <Stack
                      initialRouteName={initialRouteName}
                      screenOptions={{headerShown: false}}
                    />
                  {/* </DeepLinkHandler> */}
                  {/* <AwardModal /> */}
                  {/* <AuthModal /> */}
                  {/* <PaymentModal /> */}
                  {/* <ForceUpdateModal
                    isVisible={isForceUpdateRequired && !isForceUpdateLoading}
                  /> */}
                </SafeAreaProvider>
              </Theme>
            {/* </RootSiblingParent> */}
          </TamaguiProvider>
        {/* </CombinedProvider> */}
      {/* </ActionSheetProvider> */}
    </GestureHandlerRootView>
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

export default AppWithErrorBoundary;
