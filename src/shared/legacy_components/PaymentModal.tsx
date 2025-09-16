import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {YStack, XStack} from 'tamagui';
import {useRouter} from 'expo-router';
import {PurchasesPackage} from 'react-native-purchases';
import {usePaymentModal} from '../context/PaymentModalContext';
import {Text} from './Text';
import {XIcon} from './icons';
import tokens from '../theme/tokens';
import {RadioGroup} from './select-cards/radio-select';
import {Form} from './form/Form';
import {LoadingState} from './ListLayout/LoadingState';
import {useRevenueCat, SubscriptionPackageKey} from '../context/revenuecat';
import {useToastManager} from './Toast';
import {Button} from './Button';
import {formatErrorMessage} from '../lib/error';
import logEvent from '../lib/logEvents';

interface FormValues {
  paymentOption: SubscriptionPackageKey;
}

const defaultValues = {
  paymentOption: 'annual',
} satisfies FormValues;

export const PaymentModal = () => {
  const {modalPaymentVisible, hidePaymentModal} = usePaymentModal();
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const revenueCat = useRevenueCat();
  const router = useRouter();
  const {showToast} = useToastManager();

  const handleModalClose = () => {
    Keyboard.dismiss();
    hidePaymentModal();
  };

  const handleNavigation = (path: string) => {
    handleModalClose();
    setTimeout(() => {
      router.push(path);
    }, 300);
  };

  const handleRestorePurchases = async () => {
    try {
      setIsRestoring(true);
      const user = await revenueCat.purchases.restorePurchases();
      if (user.activeSubscriptions.length === 0) {
        showToast({
          message: 'No purchases to restore',
          type: 'warning',
          hasSettingsIcon: true,
        });
        return;
      }
      showToast({
        message: 'Purchases restored',
        type: 'success',
        hasSettingsIcon: true,
      });
      handleNavigation('/onboarding');
    } catch (error) {
      showToast({
        message: 'Could not restore purchases',
        type: 'error',
        hasSettingsIcon: true,
      });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalPaymentVisible}
      onRequestClose={handleModalClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <YStack flex={1} backgroundColor={String(tokens.color.surface0)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <YStack
              onPress={handleModalClose}
              alignSelf="flex-end"
              padding={24}
            >
              <XIcon />
            </YStack>

            <Form defaultValues={defaultValues}>
              <YStack paddingHorizontal={24} gap={24}>
                <YStack gap={24}>
                  <Text variant="h3">PAYMENT PLANS</Text>
                  <YStack gap={24}>
                    <Text>Choose your subscription plan.</Text>
                  </YStack>
                </YStack>

                <YStack gap={24} width="100%">
                  {revenueCat.isLoadingOfferings ? (
                    <LoadingState />
                  ) : (
                    <RadioGroup
                      name="paymentOption"
                      hasOversizedDescription
                      cardPx={16}
                      options={(
                        Object.values(revenueCat.subscriptionOptions)
                          .map((option) => {
                            const offering =
                              revenueCat.purchaseOfferings?.current?.[
                                option.packageKey
                              ];
                            if (!offering) return null;
                            return {...offering, packageKey: option.packageKey};
                          })
                          .filter(Boolean) as (PurchasesPackage & {
                          packageKey: SubscriptionPackageKey;
                        })[]
                      )
                        .sort((a, b) => b.product.price - a.product.price)
                        .filter(
                          (offering) => offering.packageType !== 'THREE_MONTH',
                        )
                        .map((offering, index) => ({
                          id: offering.packageKey,
                          label: '',
                          description: offering.product.priceString,
                          subtitle: offering.product.description,
                          cardHighlighted: index === 0,
                          trail: offering.product.introPrice,
                        }))}
                    />
                  )}

                  {revenueCat?.purchaseOfferings?.current?.monthly?.product
                    ?.introPrice !== null && (
                    <XStack mt={16}>
                      <Text textAlign="center">
                        The free trial is only available for new customers on
                        the monthly subscription option. You can cancel at
                        anytime during the free trial and you won&apos;t be
                        charged until the trial completes.
                      </Text>
                    </XStack>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isLoadingPurchase}
                    onSubmit={async (values: FormValues) => {
                      try {
                        setIsLoadingPurchase(true);
                        logEvent('user-purchase-subscription-started', {
                          paymentOption: values.paymentOption,
                        });
                        await revenueCat.subscribe(values.paymentOption);
                        showToast({
                          message: 'Purchase successful, redirecting...',
                          type: 'success',
                          hasSettingsIcon: true,
                        });
                        logEvent('user-purchase-subscription-success', {
                          paymentOption: values.paymentOption,
                        });
                        handleNavigation('/onboarding');
                      } catch (error) {
                        showToast({
                          message: formatErrorMessage(error),
                          type: 'error',
                          hasSettingsIcon: true,
                        });
                        logEvent('user-purchase-subscription-error', {
                          paymentOption: values.paymentOption,
                        });
                      } finally {
                        setIsLoadingPurchase(false);
                      }
                    }}
                    label="Pay now"
                  />
                  <Button
                    variant="text"
                    size="md"
                    isLoading={isRestoring}
                    onPress={handleRestorePurchases}
                    label="Restore Purchases"
                  />
                </YStack>
              </YStack>
            </Form>
          </ScrollView>
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
