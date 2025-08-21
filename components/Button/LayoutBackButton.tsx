import {router} from 'expo-router';
import {Pressable} from 'react-native';
import {LayoutBackButtonUI} from './LayoutBackButtonUI';

type Props = {
  onPress?: () => void;
};
export const LayoutBackButton = ({onPress}: Props) => {
  return (
    <Pressable onPress={() => onPress?.() ?? router.back()}>
      <LayoutBackButtonUI />
    </Pressable>
  );
};
