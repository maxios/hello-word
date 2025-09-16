import {ActivityIndicator} from 'react-native';
import {View} from 'tamagui';

export const LoadMoreListFooters: React.FC<{isLoadingMore?: boolean}> = (
  props,
) => {
  return props.isLoadingMore ? (
    <View py={20}>
      <ActivityIndicator />
    </View>
  ) : null;
};
