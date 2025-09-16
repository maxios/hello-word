import {ActivityIndicator} from 'react-native';
import {View} from 'tamagui';
import tokens from '../../theme/tokens';

export const LoadingState = ({size = 'large'}: {size?: 'large' | 'small'}) => (
  <View flex={1} jc="center" ai="center">
    <ActivityIndicator size={size} color={tokens.color.brandMid.val} />
  </View>
);
