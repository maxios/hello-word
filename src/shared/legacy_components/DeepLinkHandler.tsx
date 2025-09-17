import {useEffect} from 'react';
import * as Linking from 'expo-linking';
import {useRouter} from 'expo-router';
import {useStytchUser} from '@stytch/react-native';
import {useUserQuery} from '@/graphql/generated-queries';

const DeepLinkHandler = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const {user} = useStytchUser();
  const {data} = useUserQuery({fetchPolicy: 'cache-and-network', skip: !user});
  const loggedInUser = data?.user;
  const url = Linking.useURL();
  useEffect(() => {
    const handleDeepLink = () => {
      if (!loggedInUser) {
        router.navigate({
          pathname: 'intro',
        });
        return;
      }
      if (url) {
        const {queryParams} = Linking.parse(url);
        if (loggedInUser) {
          if (queryParams && typeof queryParams.strng === 'string') {
            router.navigate({
              pathname: queryParams.strng,
            });
          }
        }
      }
    };

    const initializeDeepLink = async () => {
      if (url) {
        handleDeepLink();
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    initializeDeepLink();

    return () => {
      subscription.remove();
    };
  }, [loggedInUser, router, url]);

   
  return <>{children}</>;
};

export default DeepLinkHandler;
