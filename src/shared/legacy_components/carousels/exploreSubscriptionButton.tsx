import {useUserQuery, useUserPurchasesQuery} from '@/graphql/generated-queries';
import {useAuthModal} from '@/context/AuthModalContext';
import {useRouter} from 'expo-router';
import React from 'react';
import {usePaymentModal} from '@/context/PaymentModalContext';
import {ChevronRightIcon} from '../icons';
import tokens from '../../theme/tokens';

export const ExploreSubscriptionButton = () => {
  const {data: userData} = useUserQuery({
    fetchPolicy: 'cache-and-network',
  });
  const {showModal: showAuthModal} = useAuthModal();
  const {showPaymentModal} = usePaymentModal();
  const {data: purchasesQuery} = useUserPurchasesQuery();
  const isSubscribed = !!purchasesQuery?.user?.subscriptionType;
  const router = useRouter();

  const handleClick = () => {
    if (!userData?.user?.id) {
      showAuthModal();
    } else if (!isSubscribed) {
      router.replace('/settings/unsubscribed-subscription');
      showPaymentModal();
    }
  };

  return {
    onPress: handleClick,
    label: 'Explore Subscription',
    rightIcon: <ChevronRightIcon color={tokens.color.brandDarkest.val} />,
  };
};
