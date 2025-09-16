import {SafeAreaView as RNSafeAreaView} from 'react-native';
import tokens from '../theme/tokens';

export const SafeAreaView: React.FC<{
  children?: React.ReactNode;
}> = ({children}) => {
  return (
    <RNSafeAreaView style={{backgroundColor: tokens.color.surface0.val}}>
      {children}
    </RNSafeAreaView>
  );
};
