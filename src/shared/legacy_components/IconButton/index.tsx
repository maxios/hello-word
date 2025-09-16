import {Pressable} from 'react-native';
import {XStack} from 'tamagui';
import tokens from '../../theme/tokens';

interface IconButtonProps {
  onPress: () => void;
  children: React.ReactElement;
  bc?: string;
  size?: number;
  isWithBackground?: boolean;
}

export const IconButton = ({
  onPress,
  bc,
  isWithBackground,
  size = 40,
  children,
}: IconButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <XStack
        h={size}
        w={size}
        ai="center"
        jc="center"
        br={50}
        bc={isWithBackground ? tokens.color.surfaceLightTransparent.val : bc}
      >
        {children}
      </XStack>
    </Pressable>
  );
};
