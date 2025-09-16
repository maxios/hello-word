import {useState, useCallback, useRef, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {XStack, YStack} from 'tamagui';
import {useStytch} from '@stytch/react-native';
import {useRouter, useNavigation} from 'expo-router';
import {StackActions} from '@react-navigation/native';
import {useAuthModal} from '../context/AuthModalContext';
import {Form} from './form/Form';
import {Input} from './fields/Input';
import {EmailField} from './fields/EmailField';
import {CreatePasswordField} from './fields/CreatePasswordField';
import {PasswordField} from './fields/PasswordField';
import {Text} from './Text';
import {Button} from './Button';
import {Checkbox} from './CheckBox';
import {useRevenueCat} from '../context/revenuecat';
import {
  useIdentifyUserMutation,
  useVerifyImportedUserLazyQuery,
} from '../graphql/generated-queries';
import {CustomerIO} from '../lib/customerio';
import {formatErrorMessage} from '../lib/error';
import logEvent from '../lib/logEvents';
import {CheckIcon, XIcon} from './icons';
import tokens from '../theme/tokens';
import {DEVICE_WIDTH} from '../consts/consts';
import {ChevronHorizontal} from './svgs';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAcceptedAt: Date;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const defaultSignupValues: SignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  termsAcceptedAt: new Date(),
};

const defaultLoginValues: LoginFormValues = {
  email: '',
  password: '',
};

export const AuthModal = () => {
  const {modalVisible, hideModal} = useAuthModal();
  const [isSignupMode, setIsSignupMode] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [termsErrorMessage, setTermsErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [formValues, setFormValues] = useState<
    SignupFormValues | LoginFormValues
  >(defaultSignupValues);

  const router = useRouter();
  const navigation = useNavigation();
  const stytch = useStytch();
  const revenueCat = useRevenueCat();
  const [identifyUser] = useIdentifyUserMutation();
  const [verifyImportedUser] = useVerifyImportedUserLazyQuery();

  useEffect(() => {
    // Check if navigation is ready
    if (navigation) {
      setIsNavigationReady(true);
    }
  }, [navigation]);

  const handleModalClose = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  const handleModeSwitch = useCallback(() => {
    Keyboard.dismiss();
    setIsSignupMode((prev) => !prev);
    setFormValues(isSignupMode ? defaultLoginValues : defaultSignupValues);
    setTermsChecked(false);
    setMarketingChecked(false);
    setTermsErrorMessage('');
  }, [isSignupMode]);

  const showAuthToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setToastMessage('');
    }, 2500);
  }, []);

  const handleSignup = useCallback(
    async (data: SignupFormValues) => {
      try {
        setIsLoadingSignup(true);
        Keyboard.dismiss();

        if (!termsChecked) {
          setTermsErrorMessage('Please agree to T&Cs');
          return;
        }

        const result = await verifyImportedUser({
          fetchPolicy: 'network-only',
          variables: {email: data.email.trim().toLowerCase()},
        });

        if (result.data?.verifyImportedUser) {
          showAuthToast('Email already exists. Please log in instead.');
          setIsSignupMode(false);
          return;
        }

        await stytch.session.revoke().catch(() => {});

        await stytch.passwords.create({
          password: data.password,
          email: data.email.trim().toLowerCase(),
          session_duration_minutes: 43800,
        });

        await stytch.user.update({
          name: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
          untrusted_metadata: {
            source: 'app',
            original_created_at: new Date().toISOString(),
          },
        });

        const identifyUserResult = await identifyUser({
          fetchPolicy: 'network-only',
          variables: {
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
            },
          },
        });

        if (!identifyUserResult.data?.identifyUser?.email) {
          throw new Error(
            'Email not returned from identifyUser after signing up',
          );
        }

        await revenueCat.initializePurchasesWithUserEmail(
          identifyUserResult.data?.identifyUser?.email.trim().toLowerCase() ??
            '',
        );

        if (identifyUserResult.data?.identifyUser?.email) {
          CustomerIO.identify({
            userId: identifyUserResult.data?.identifyUser?.email,
            traits: {
              unsubscribed: !marketingChecked ? 'true' : 'false',
            },
          });
          logEvent('user-auth-created-account');
        }

        hideModal();
        if (isNavigationReady) {
          navigation.dispatch(StackActions.popToTop());
        }
        router.replace('/plans');
      } catch (error) {
        showAuthToast(formatErrorMessage(error));
      } finally {
        setIsLoadingSignup(false);
      }
    },
    [
      termsChecked,
      marketingChecked,
      identifyUser,
      verifyImportedUser,
      stytch,
      revenueCat,
      navigation,
      isNavigationReady,
      router,
      hideModal,
      showAuthToast,
    ],
  );

  const handleLogin = useCallback(
    async (data: LoginFormValues) => {
      try {
        setIsLoadingLogin(true);
        Keyboard.dismiss();

        await stytch.session.revoke().catch(() => {});

        await stytch.passwords.authenticate({
          email: data.email.trim().toLowerCase(),
          password: data.password,
          session_duration_minutes: 43800,
        });

        const identifyUserResult = await identifyUser({
          fetchPolicy: 'network-only',
        });

        if (!identifyUserResult.data?.identifyUser?.email) {
          throw new Error(
            'Email not returned from identifyUser after logging in',
          );
        }

        await revenueCat.initializePurchasesWithUserEmail(
          identifyUserResult.data?.identifyUser?.email.trim().toLowerCase() ??
            '',
        );

        if (identifyUserResult.data?.identifyUser?.email) {
          CustomerIO.identify({
            userId: identifyUserResult.data?.identifyUser?.email,
          });
          logEvent('user-auth-logged-in');
        }

        hideModal();
        if (isNavigationReady) {
          navigation.dispatch(StackActions.popToTop());
        }
        router.replace('/home');
      } catch (error) {
        showAuthToast(formatErrorMessage(error));
      } finally {
        setIsLoadingLogin(false);
      }
    },
    [
      identifyUser,
      stytch,
      revenueCat,
      navigation,
      isNavigationReady,
      router,
      hideModal,
      showAuthToast,
    ],
  );

  const handleCheckboxChange = useCallback((isChecked: boolean) => {
    setTermsChecked(isChecked);
    setTermsErrorMessage(isChecked ? '' : 'Please agree to T&Cs');
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={handleModalClose}
      statusBarTranslucent
      style={{position: 'relative', top: 0, left: 0, right: 0, bottom: 0}}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <YStack flex={1} backgroundColor={tokens.color.surface0.val}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            removeClippedSubviews
          >
            <YStack
              onPress={handleModalClose}
              alignSelf="flex-end"
              padding={24}
            >
              <XIcon />
            </YStack>

            {isSignupMode ? (
              <Form key="signup" defaultValues={formValues}>
                <YStack paddingHorizontal={24} gap={24}>
                  <YStack gap={8}>
                    <Text variant="h1">Sign up</Text>
                    <Text color="textMediumEmphasis">Add your details.</Text>
                  </YStack>

                  <YStack gap={24} width="100%">
                    <XStack gap={16}>
                      <XStack flex={1}>
                        <Input
                          name="firstName"
                          label="FIRST NAME"
                          placeholder="Jane"
                          required
                        />
                      </XStack>
                      <XStack flex={1}>
                        <Input
                          name="lastName"
                          label="LAST NAME"
                          placeholder="Doe"
                          required
                        />
                      </XStack>
                    </XStack>
                    <EmailField />
                    <CreatePasswordField />
                    <YStack gap={16}>
                      <Checkbox
                        name="terms"
                        labelElement={
                          <Text color="textMediumEmphasis">
                            Agree to the STRNG{' '}
                            <Pressable
                              onPress={() => {
                                handleModalClose();
                                router.push('/settings/terms-and-conditions');
                              }}
                            >
                              <Text
                                variant="bodySLink"
                                color="textMediumEmphasis"
                              >
                                Terms & Conditions
                              </Text>
                            </Pressable>
                          </Text>
                        }
                        isChecked={termsChecked}
                        onChange={handleCheckboxChange}
                        isRequired
                        error={termsErrorMessage}
                      />
                      <Checkbox
                        name="marketing"
                        labelElement={
                          <Text color="textMediumEmphasis">
                            Sign up to STRNG marketing emails, including
                            exclusive offers, news and more.
                          </Text>
                        }
                        isChecked={marketingChecked}
                        onChange={(isChecked) => setMarketingChecked(isChecked)}
                      />
                    </YStack>

                    <Button
                      variant="primary"
                      size="md"
                      onSubmit={handleSignup}
                      isLoading={isLoadingSignup}
                      label="Sign up"
                    />
                  </YStack>
                </YStack>
              </Form>
            ) : (
              <Form key="login" defaultValues={formValues}>
                <YStack paddingHorizontal={24} gap={24}>
                  <YStack gap={8}>
                    <Text variant="h1">Log in</Text>
                    <Text color="textMediumEmphasis">
                      Log in to your STRNG account.
                    </Text>
                  </YStack>

                  <YStack gap={16} width="100%">
                    <EmailField />
                    <PasswordField rules={{required: 'Password is required'}} />
                    <Button
                      variant="text"
                      size="sm"
                      onPress={() => {
                        handleModalClose();
                        router.push('/auth/reset-password-init');
                      }}
                      color="textMediumEmphasis"
                      label="Forgot Your Password?"
                    />
                    <Button
                      variant="primary"
                      size="md"
                      onSubmit={handleLogin}
                      isLoading={isLoadingLogin}
                      label="Log in"
                    />
                  </YStack>
                </YStack>
              </Form>
            )}
          </ScrollView>

          <YStack
            paddingHorizontal={24}
            paddingBottom={24}
            gap={16}
            backgroundColor={tokens.color.surface0.val}
            alignItems="center"
          >
            <Pressable onPress={handleModeSwitch}>
              <Text color="textMediumEmphasis" variant="bodyS">
                {isSignupMode
                  ? 'Already have an account? Log in'
                  : "Don't have an account? Sign up"}
              </Text>
            </Pressable>
          </YStack>
          {isVisible && (
            <YStack
              backgroundColor="white"
              width={DEVICE_WIDTH - 32}
              padding={16}
              borderRadius={8}
              position="absolute"
              bottom={Platform.OS === 'ios' ? 40 : 20}
              left={16}
              right={16}
              zIndex={9999}
              shadowColor="#000"
              shadowOffset={{width: 0, height: 2}}
              shadowOpacity={0.2}
              shadowRadius={4}
              elevation={5}
            >
              <XStack
                justifyContent="space-between"
                alignItems="center"
                gap={12}
                pb={4}
              >
                <XStack
                  gap={12}
                  alignItems="center"
                  onPress={() => setIsVisible(false)}
                >
                  <CheckIcon color={tokens.color.brandMid.val} size="sm" />
                  <XStack pb={2} width="88%">
                    <Text
                      variant="bodySEmphasis"
                      color="surface0"
                      textAlign="left"
                    >
                      {toastMessage}
                    </Text>
                  </XStack>
                </XStack>
                <XIcon color={tokens.color.surface20.val} size="sm" />
              </XStack>
              <XStack position="absolute" bottom={0} right={4}>
                <ChevronHorizontal color={tokens.color.brandMid.val} />
              </XStack>
            </YStack>
          )}
        </YStack>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.surface0.val,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 48,
  },
});
