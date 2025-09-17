 
import {YStack, XStack, View} from 'tamagui';
import {DimensionValue, Pressable} from 'react-native';
import {
  Controller,
  useFormContext,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import dayjs from 'dayjs';
import tokens from '../../theme/tokens';
import {Text} from '../Text';
import {useDatePickerModal} from '../../context/date-picker-modal';

interface DateFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Partial<UseControllerProps['rules']>;
  iconRight?: React.ReactNode;
  isRequired?: boolean;
  hasNoBorder?: boolean;
  hasNoBackground?: boolean;
  height?: DimensionValue;
  size?: 'sm' | 'md';
  backgroundColor?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateField = ({
  name,
  label,
  placeholder,
  rules,
  iconRight,
  isRequired,
  hasNoBorder,
  hasNoBackground,
  height,
  size,
  backgroundColor,
  minimumDate,
  maximumDate,
}: DateFieldProps) => {
  const {control} = useFormContext();
  const fieldState = useController({name});
  const datePickerModal = useDatePickerModal();

  const onPress = () => {
    datePickerModal.onOpenDatePicker(
      (toDate) => {
        fieldState.field.onChange(toDate);
      },
      {
        minimumDate,
        maximumDate,
        display: 'spinner',
        date: fieldState.field.value
          ? dayjs(fieldState.field.value).toDate()
          : dayjs().subtract(18, 'years').startOf('year').toDate(),
      },
    );
  };

  const error = fieldState.fieldState.error?.message;

  return (
    <YStack width="100%" gap={6}>
      {!!label && <Text variant="uiS">{label}</Text>}
      <Pressable onPress={onPress}>
        <XStack
          bw={hasNoBorder ? 0 : 1}
          boc={error ? '$error' : '$surface48'}
          bc={hasNoBackground ? 'transparent' : '$surface4'}
          br={4}
        >
          <Controller
            control={control}
            name={name}
            rules={{required: !!isRequired && 'Required', ...rules}}
            render={({field: {value}}: {field: {value: any}}) => {
              return (
                <View
                  flex={1}
                  jc="center"
                  backgroundColor={backgroundColor || 'transparent'}
                  padding={16}
                  height={
                    height ||
                    (size === 'sm'
                      ? tokens.size.inputHeightSmall.val
                      : tokens.size.inputHeight.val)
                  }
                >
                  <Text
                    color={placeholder ? 'textLowEmphasis' : 'textHighEmphasis'}
                  >
                    {dayjs(value).format('DD/MM/YYYY') || placeholder}
                  </Text>
                </View>
              );
            }}
          />
          {iconRight && (
            <XStack height="100%" alignItems="center" pr={16}>
              {iconRight}
            </XStack>
          )}
        </XStack>
      </Pressable>
      <Text variant="uiS" color="error">
        {error}
      </Text>
    </YStack>
  );
};
