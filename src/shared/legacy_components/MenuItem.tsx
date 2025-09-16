import {Pressable} from 'react-native';
import {XStack} from 'tamagui';
import {Text} from './Text';
import {ChevronRightIcon} from './icons/ChevronRightIcon';

interface MenuItemProps {
  label: string;
  onPress: () => void;
  chip?: string;
}

export const MenuItem = ({label, onPress, chip}: MenuItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <XStack
        width="100%"
        borderColor="$surface20"
        borderBottomWidth={1}
        gap={16}
        py={16}
        px={16}
        justifyContent="space-between"
      >
        <Text color={chip ? 'textHighEmphasis' : 'textMediumEmphasis'}>
          {label}
        </Text>
        <XStack ai="center" gap={8}>
          {!!chip && (
            <Text variant="uiS" withBrandMidBackground>
              {chip}
            </Text>
          )}
          <ChevronRightIcon />
        </XStack>
      </XStack>
    </Pressable>
  );
};
