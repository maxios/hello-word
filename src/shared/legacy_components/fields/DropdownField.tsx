import {YStack, XStack} from 'tamagui';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {
  Controller,
  useFormContext,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import tokens from '../../theme/tokens';
import {Text} from '../Text';
import {ChevronDownIcon} from '../icons/ChevronDownIcon';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: {label: string; value: string}[];
  rules?: UseControllerProps['rules'];
  isRequired?: boolean;
  hasNoBorder?: boolean;
  hasNoBackground?: boolean;
}

export const Dropdown = ({
  name,
  label,
  placeholder,
  options,
  rules,
  isRequired,
  hasNoBorder,
  hasNoBackground,
}: InputProps) => {
  const {control} = useFormContext();
  const fieldState = useController({name});
  const error = fieldState.fieldState.error?.message;
  const {showActionSheetWithOptions} = useActionSheet();

  const onPress = (onChange: (arg1: string) => void) => {
    showActionSheetWithOptions(
      {
        options: [...options.map((option) => option.label), 'Cancel'],
        cancelButtonIndex: options.length,
        title: 'Add photo',
      },
      (selectedIndex: number | undefined) => {
        if (
          typeof selectedIndex === 'number' &&
          selectedIndex !== options.length
        ) {
          onChange(options[selectedIndex].value);
        }
      },
    );
  };

  return (
    <YStack width="100%" gap={6}>
      {!!label && <Text variant="uiS">{label}</Text>}
      <Controller
        name={name}
        control={control}
        rules={{required: !!isRequired && 'Required', ...rules}}
        render={({field: {onChange, value}}) => (
          <TouchableWithoutFeedback onPress={() => onPress(onChange)}>
            <XStack
              bw={hasNoBorder ? 0 : 1}
              boc={error ? '$error' : '$surface48'}
              bc={hasNoBackground ? 'transparent' : '$surface4'}
              br={4}
              padding={16}
              justifyContent="space-between"
              alignItems="center"
              alignContent="center"
            >
              <Text variant="bodyS">{value || placeholder}</Text>
              <XStack height="100%" alignItems="center" pr={4}>
                <ChevronDownIcon color={tokens.color.textHighEmphasis.val} />
              </XStack>
            </XStack>
          </TouchableWithoutFeedback>
        )}
      />
      <XStack alignItems="flex-end">
        <Text variant="uiS" color="error">
          {error || ' '}
        </Text>
      </XStack>
    </YStack>
  );
};
