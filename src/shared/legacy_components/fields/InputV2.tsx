/* eslint-disable react/no-unused-prop-types */
import {YStack, XStack} from 'tamagui';
import {DimensionValue, TextInput, TextInputProps} from 'react-native';
import {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import {
  FieldError,
  Merge,
  FieldErrorsImpl,
  useController,
} from 'react-hook-form';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import tokens from '../../theme/tokens';
import {Text} from '../Text';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  size?: 'sm' | 'md';
  iconRight?: React.ReactNode;
  control: any;
  secureTextEntry?: boolean;
  isFocusedOverride?: boolean;
  setIsFocusedOverride?: (isFocused: boolean) => void;
  mask?: {
    type: TextInputMaskTypeProp;
    options?: TextInputMaskOptionProp;
  };
  noBorder?: boolean;
  noBackground?: boolean;
  height?: DimensionValue;
  backgroundColor?: string;
}

export const getBorderColor = (
  isFocused: boolean,
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined,
) => {
  switch (true) {
    case isFocused:
      return '$brandMid';
    case !!error:
      return '$error';
    default:
      return '$surface48';
  }
};

export type InputRef = {focus: () => void};

export const InputV2 = forwardRef<InputRef, InputProps>(
  (
    {
      name,
      label,
      placeholder,
      iconRight,
      secureTextEntry,
      textContentType,
      control,
      isFocusedOverride,
      setIsFocusedOverride,
      mask,
      keyboardType,
      noBorder,
      noBackground,
      height,
      size,
      backgroundColor,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocusedLocal] = useState(isFocusedOverride || false);
    const {field, fieldState} = useController({
      control,
      name,
    });
    const inputRef = useRef<TextInput | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        },
      }),
      [],
    );

    const error = fieldState.error?.message;

    const setIsFocused = setIsFocusedOverride || setIsFocusedLocal;

    const InputComponent = useCallback(() => {
      const inputProps = {
        style: {
          flex: 1,
          backgroundColor: backgroundColor || 'transparent',
          color: tokens.color.textHighEmphasis.val,
          padding: 16,
          height:
            height ||
            (size === 'sm'
              ? tokens.size.inputHeightSmall.val
              : tokens.size.inputHeight.val),
        },
        placeholder,
        placeholderTextColor: tokens.color.textLowEmphasis.val,
        underlineColorAndroid: 'transparent',
        onChangeText: field.onChange,
        value:
          typeof field.value === 'number' ? String(field.value) : field.value,
        onFocus: () => setIsFocused(true),
        onBlur: () => {
          setIsFocused(false);
          field.onBlur();
        },
        secureTextEntry,
        textContentType,
        ...rest,
      };

      if (mask) {
        return (
          <TextInputMask
            {...inputProps}
            refInput={(input) => {
              inputRef.current = input;
            }}
            type={mask.type}
            options={mask.options}
          />
        );
      }

      return (
        <TextInput
          {...inputProps}
          ref={(input) => {
            inputRef.current = input || null;
          }}
          keyboardType={keyboardType}
          returnKeyType={
            keyboardType === 'numeric' || keyboardType === 'number-pad'
              ? 'done'
              : undefined
          }
        />
      );
    }, [
      backgroundColor,
      field,
      height,
      keyboardType,
      mask,
      placeholder,
      rest,
      secureTextEntry,
      setIsFocused,
      size,
      textContentType,
    ]);

    return (
      <YStack width="100%" gap={6}>
        {!!label && <Text variant="uiS">{label}</Text>}

        <InputComponent />
        <XStack
          bw={noBorder ? 0 : 1}
          boc={getBorderColor(isFocusedOverride || isFocused, error)}
          bc={noBackground ? 'transparent' : '$surface4'}
          br={4}
        >
          {iconRight && (
            <XStack height="100%" alignItems="center" pr={16}>
              {iconRight}
            </XStack>
          )}
        </XStack>
        <Text variant="uiS" color="error">
          {error}
        </Text>
      </YStack>
    );
  },
);
