import {useActionSheet} from '@expo/react-native-action-sheet';
import {ActivityIndicator} from 'react-native';
import {MoreIcon} from '../../../icons';
import {IconButton} from '../../../IconButton';
import tokens from '../../../../theme/tokens';

interface MoreButtonProps {
  isLoading?: boolean;
  options: {
    label: string;
    onPress: () => void;
  }[];
}

export const MoreButton = ({options, isLoading}: MoreButtonProps) => {
  const {showActionSheetWithOptions} = useActionSheet();

  return (
    <IconButton
      onPress={() =>
        !isLoading &&
        showActionSheetWithOptions(
          {
            options: [...options.map((opt) => opt.label), 'Cancel'],
            cancelButtonIndex: options.length,
            cancelButtonTintColor: tokens.color.error.val,
          },
          (index) => {
            if (index === options.length || typeof index !== 'number') return;
            options[index].onPress();
          },
        )
      }
      bc={tokens.color.surface16.val}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <MoreIcon fillOpacity={1} />
      )}
    </IconButton>
  );
};
