import {SizableText, View, XStack, YStack} from 'tamagui';
import {Pressable} from 'react-native';
import {useController} from 'react-hook-form';
import {CheckIcon, PlusIcon} from './icons';
import tokens from '../theme/tokens';

interface Option {
  label: string;
  value: string;
}

interface Props {
  title: string;
  placeholder: string;
  name: string;
  options: Option[];
}

const MultiSelectFilter: React.FC<Props> = (props) => {
  const {field} = useController({name: props.name, rules: {required: false}});
  const value = field.value as string[];
  const selectedOptions = value.map((v) => {
    return props.options.find((option) => option.value === v) as Option;
  });
  return (
    <YStack space={8}>
      <SizableText size="$uiDefault" color="$textHighEmphasis">
        {props.title}
      </SizableText>
      {value.length > 0 ? (
        <XStack space={8} flexWrap="wrap">
          {[...selectedOptions].map((option) => {
            return (
              <Pressable
                key={option.label}
                onPress={() =>
                  field.onChange(
                    value.filter((v: string) => v !== option.value),
                  )
                }
              >
                <XStack
                  mb={16}
                  borderColor="$brandMid"
                  borderWidth={1}
                  p={16}
                  borderRadius={8}
                  overflow="hidden"
                  backgroundColor="$brandMid40"
                  space={4}
                >
                  <CheckIcon size="md" />
                  <SizableText
                    key={option.label}
                    size="$bodySmall"
                    color="$textHighEmphasis"
                  >
                    {option.label}
                  </SizableText>
                </XStack>
              </Pressable>
            );
          })}
        </XStack>
      ) : (
        <View h={52} justifyContent="center">
          <SizableText size="$bodySmall" color="$textLowEmphasis">
            {props.placeholder}
          </SizableText>
        </View>
      )}

      {props.options.map((option) => {
        return (
          <Pressable
            onPress={() =>
              field.onChange(
                value.includes(option.value)
                  ? value.filter((v: string) => v !== option.value)
                  : [...value, option.value],
              )
            }
          >
            <XStack
              justifyContent="space-between"
              borderBottomColor="$surface16"
              borderBottomWidth={1}
              py={16}
            >
              <SizableText size="$bodySmall" color="$textHighEmphasis">
                {option.label}
              </SizableText>
              {value.includes(option.value) ? (
                <CheckIcon size="md" color={tokens.color.brandMid.val} />
              ) : (
                <PlusIcon />
              )}
            </XStack>
          </Pressable>
        );
      })}
    </YStack>
  );
};

export {MultiSelectFilter};
