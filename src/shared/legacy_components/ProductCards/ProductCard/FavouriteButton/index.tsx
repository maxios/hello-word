import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  FavouriteEntityType,
  useAddFavouriteMutation,
  useDeleteFavouriteMutation,
  useGetFavouritesByTypeQuery,
  useUserPurchasesQuery,
  useUserQuery,
} from '@/graphql/generated-queries';
import {useToastManager} from '@/components/Toast';
import {HeartIcon, HeartOutlineIcon, LockIcon} from '@/components/icons';
import tokens from '@/theme/tokens';
import {IconButton} from '@/components/IconButton';
import {useAuthModal} from '@/context/AuthModalContext';
import {usePaymentModal} from '@/context/PaymentModalContext';

interface FavoriteIconProps {
  id: string;
  type: FavouriteEntityType;
  isTrailWorkout?: boolean;
}

export const FavouriteButton: React.FC<FavoriteIconProps> = ({
  id,
  type,
  isTrailWorkout,
}) => {
  const {showModal} = useAuthModal();
  const userQuery = useUserQuery({fetchPolicy: 'cache-and-network'});
  const [addFavorite, {loading: addLoading}] = useAddFavouriteMutation();
  const [deleteFavorite, {loading: deleteLoading}] =
    useDeleteFavouriteMutation();
  const {showToast} = useToastManager();

  const favouriteType: FavouriteEntityType = type as FavouriteEntityType;
  const {data: UserData} = useUserQuery({fetchPolicy: 'cache-only'});
  const userId = UserData?.user?.id;
  const purchasesQuery = useUserPurchasesQuery();
  const isSubscribed = !!purchasesQuery.data?.user?.subscriptionType;
  const hasUserPurchasedGuide =
    !!purchasesQuery.data?.user?.purchasedGuides?.find((guide) => guide.id);
  const {showPaymentModal} = usePaymentModal();
  const {data, loading, refetch} = useGetFavouritesByTypeQuery({
    variables: {type: favouriteType},
    skip: !userId,
  });
  const [isLocalFavorite, setIsLocalFavorite] = useState(false);
  const [favouriteId, setFavouriteId] = useState<string | null>(null);

  const updateFavoriteStatus = useCallback(() => {
    if (data?.getFavouritesByType) {
      const favorite = data.getFavouritesByType.find(
        (fav) => fav !== null && fav.dataId === id,
      );
      setIsLocalFavorite(!!favorite);
      setFavouriteId(favorite ? favorite.id : null);
    }
  }, [data, id]);
  useEffect(() => {
    updateFavoriteStatus();
  }, [updateFavoriteStatus]);

  const handleToggle = async () => {
    try {
      if (!userQuery.data?.user?.id) {
        showModal();
      } else if (!isSubscribed) {
        showPaymentModal();
      } else {
        if (isLocalFavorite) {
          if (favouriteId) {
            await deleteFavorite({variables: {favouriteId}});
            showToast({
              message: 'Removed from favorites',
              type: 'success',
              hasSettingsIcon: true,
            });
            await refetch({type: favouriteType});
            updateFavoriteStatus();
          }
        } else {
          await addFavorite({
            variables: {
              data: {
                dataId: id,
                type: favouriteType,
              },
            },
          });
          showToast({
            message: 'Added to favorites',
            type: 'success',
            hasSettingsIcon: true,
          });
          await refetch({type: favouriteType});
          updateFavoriteStatus();
        }
        setIsLocalFavorite(!isLocalFavorite);
      }
    } catch (error) {
      showToast({
        message: 'An error occurred. Please try again.',
        type: 'error',
        hasSettingsIcon: true,
      });
    }
  };

  const Content = useCallback(() => {
    const isLoading = loading || addLoading || deleteLoading;
    if (isLoading) {
      return <ActivityIndicator size="small" />; // Or a loading spinner
    }
    if (
      (!userQuery.data?.user?.id && !isTrailWorkout) ||
      (!isSubscribed && !hasUserPurchasedGuide && !isTrailWorkout)
    ) {
      return <LockIcon />;
    }
    return isLocalFavorite ? <HeartIcon /> : <HeartOutlineIcon />;
  }, [
    loading,
    addLoading,
    deleteLoading,
    isLocalFavorite,
    userQuery.data,
    isTrailWorkout,
    isSubscribed,
    hasUserPurchasedGuide,
  ]);

  if (loading) {
    return <ActivityIndicator size="small" />; // Or a loading spinner
  }

  return (
    <IconButton
      onPress={!loading && handleToggle}
      bc={tokens.color.surface16.val}
    >
      <Content />
    </IconButton>
  );
};
