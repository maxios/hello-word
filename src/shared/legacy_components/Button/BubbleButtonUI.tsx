import {Text} from '@/components/Text';
import {XStack} from 'tamagui';
import {PlusIcon} from '../icons';

/**
 * Button minimal
 */
export const BubbleButtonUI = ({
  item,
  icon,
  style,
}: {
  item: {name: string};
  icon?: React.ReactNode;
  style?: any;
}) => {
  return (
    <XStack bg="$surface4" p={8} gap={8} ai="center" br={8} style={style}>
      <XStack ai="center" jc="center" w={20} h={20} bc="$surface8" br={50}>
        {icon ?? <PlusIcon />}
      </XStack>
      <Text variant="uiS" color="textHighEmphasis">
        {item.name}
      </Text>
    </XStack>
  );
};
