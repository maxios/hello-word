import {YStack, XStack} from 'tamagui';
import {Controller, useFormContext} from 'react-hook-form';
import {GestureResponderEvent, Image} from 'react-native';
import {Text} from '../Text';
import {CheckIcon} from '../icons/CheckIcon';

interface CheckboxCardProps {
  label?: string;
  title?: string;
  id: string;
  avatar?: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const CheckboxCard = ({
  label,
  title,
  id,
  avatar,
  isSelected,
  isDisabled,
  onPress,
}: CheckboxCardProps) => {
  return (
    <XStack
      key={id}
      flex={1}
      h={70}
      opacity={isDisabled ? 0.5 : 1}
      disabled={isDisabled}
      bw={1}
      boc={isSelected ? '$brandMid' : '$textLowEmphasis'}
      bc={isSelected ? '$brandMid40' : '$surface12'}
      p={24}
      fd="row"
      jc="space-between"
      ai="center"
      onPress={isDisabled ? () => null : onPress}
      br={4}
    >
      <XStack gap={12} ai="center">
        {!!avatar && (
          <Image
            style={{
              height: 24,
              width: 24,
              borderRadius: 50,
              resizeMode: 'contain',
            }}
            source={{uri: avatar ?? ''}}
          />
        )}
        <YStack gap={8}>
          {!!title && <Text variant="bodySEmphasis">{title}</Text>}
          {!!label && <Text>{label}</Text>}
        </YStack>
      </XStack>
      {isSelected && <CheckIcon />}
    </XStack>
  );
};

interface Option {
  id: string;
  label?: string;
  avatar?: string;
  title?: string;
}

interface MultiSelectProps {
  options: Option[];
  name: string;
  max?: number;
  min?: number;
  isRequired?: boolean;
  gap?: number;
}

export const MultiSelectGroup: React.FC<MultiSelectProps> = ({
  options,
  name,
  max,
  min,
  isRequired = true,
  gap = 16,
}) => {
  const {control, trigger} = useFormContext<Record<string, string[]>>();

  return (
    <YStack gap={gap} width="100%">
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired,
          validate: (value) =>
            (!min || value.length >= min) && (!max || value.length <= max),
        }}
        render={({field: {onChange, value}}) => (
          <>
            {options.map(({id, label, title, avatar}) => (
              <CheckboxCard
                key={id}
                label={label}
                title={title}
                avatar={avatar}
                id={id}
                isDisabled={Boolean(
                  max && value.length >= max && !value.includes(id),
                )}
                isSelected={value.includes(id)}
                onPress={() => {
                  const selected = value.includes(id)
                    ? value.filter((item: string) => item !== id)
                    : [...value, id];
                  onChange(selected);
                  trigger(name);
                }}
              />
            ))}
          </>
        )}
      />
    </YStack>
  );
};
