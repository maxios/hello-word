import {XStack, Checkbox as TamaguiCheckBox, YStack} from 'tamagui';
import {CheckIcon} from './icons';
import {Text} from './Text';

interface CheckboxProps {
  name: string;
  labelElement: React.ReactElement;
  isChecked: boolean;
  isRequired?: boolean;
  onChange?: (isChecked: boolean) => void;
  error?: string;
}

export const Checkbox = ({
  name,
  labelElement,
  isChecked,
  isRequired,
  onChange,
  error,
}: CheckboxProps) => {
  return (
    <YStack>
      <XStack gap={8} alignContent="flex-start" justifyContent="flex-start">
        <TamaguiCheckBox
          borderRadius={2}
          borderColor="$textHighEmphasis"
          borderWidth={1}
          name={name}
          margin={8}
          checked={isChecked}
          required={isRequired}
          onCheckedChange={(isChecked: boolean) => {
            onChange?.(isChecked);
          }}
        >
          <TamaguiCheckBox.Indicator>
            <XStack m={2}>
              <CheckIcon size="sm" />
            </XStack>
          </TamaguiCheckBox.Indicator>
        </TamaguiCheckBox>
        <XStack pt={7} flex={1}>
          {labelElement}
        </XStack>
      </XStack>
      {error && (
        <XStack alignItems="flex-end" pl={44} width="100%">
          <Text variant="uiS" color="error">
            {error}
          </Text>
        </XStack>
      )}
    </YStack>
  );
};
