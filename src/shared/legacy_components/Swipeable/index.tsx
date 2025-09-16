import {
  RectButton,
  Swipeable as NativeSwipeable,
  SwipeableProps,
} from 'react-native-gesture-handler';
import {Text} from '@/components/Text';
import {useCallback} from 'react';

interface Props extends SwipeableProps {
  children: React.ReactNode;
}

/**
 * The default wrapper for Swipeable from react-native-gesture-handler
 *
 * It is used in a row item in FlatList to add a delete button to the right
 */
export const DeleteSwipeable = ({children, ...swipeableProps}: Props) => {
  const DeleteAction = useCallback(() => {
    return (
      <RectButton
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 8,
          zIndex: -1,
          flex: 1,
        }}
      >
        <Text variant="bodyM">Delete</Text>
      </RectButton>
    );
  }, []);

  return (
    <NativeSwipeable {...swipeableProps} renderRightActions={DeleteAction}>
      {children}
    </NativeSwipeable>
  );
};
