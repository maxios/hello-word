import {LoadingState} from '@/components/ListLayout/LoadingState';
import {useUserPurchasesQuery, useUserQuery} from '@/graphql/generated-queries';

export const SubscriptionGuard = ({children}: {children: React.ReactNode}) => {
  const {data: purchasesData, loading: purchasesLoading} =
    useUserPurchasesQuery();
  const {loading} = useUserQuery({
    fetchPolicy: 'cache-first',
  });

  const isSubscribed = !!purchasesData?.user?.subscriptionType;
  const isLoading = loading || purchasesLoading;

  if (isLoading) return <LoadingState />;
  if (!isSubscribed) return null;

  return children;
};
