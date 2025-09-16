import {Switch, XStack} from 'tamagui';
import {Text} from './Text';
import tokens from '../theme/tokens';

interface ToggleProps {
  isChecked: boolean;
  text: string;
  onChange: (isChecked: boolean) => void;
}

export const Toggle = ({text, onChange, isChecked}: ToggleProps) => {
  const updateChecked = (checked: boolean) => {
    onChange(checked);
  };

  return (
    <XStack
      backgroundColor="$surface16"
      px={16}
      py={20}
      borderRadius={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text variant="bodySEmphasis" color="textHighEmphasis">
        {text}
      </Text>
      <Switch
        size="$2"
        unstyled
        style={{
          borderColor: isChecked
            ? tokens.color.brandMid.val
            : tokens.color.textLowEmphasis.val,
          borderWidth: 1,
          borderRadius: 16,
          padding: 1,
          backgroundColor: isChecked
            ? tokens.color.brandMid40.val
            : tokens.color.surface16.val,
        }}
        checked={isChecked}
        onCheckedChange={updateChecked}
      >
        <Switch.Thumb
          unstyled
          style={{
            display: 'flex',
            // alignSelf: 'center',
            backgroundColor: tokens.color.textHighEmphasis.val,
            borderRadius: 16,
          }}
        />
      </Switch>
    </XStack>
  );
};
