import {YStack, XStack} from 'tamagui';
import {Controller, useFormContext} from 'react-hook-form';
import {Text} from '../Text';

interface ItemProps {
  id: string;
  btlr: number;
  btrr: number;
  bbrr: number;
  bblr: number;
  label: string;
  icon: React.ReactNode;
  onChange: (value: string | string[] | null) => void;
  value: string | string[];
  type: 'single' | 'multi';
  gap?: number;
  isDisabled?: boolean;
}

const Item = ({
  id,
  btlr,
  btrr,
  bbrr,
  bblr,
  label,
  icon,
  onChange,
  value,
  type,
  gap,
  isDisabled,
}: ItemProps) => {
  const isSelected =
    type === 'multi' ? value.includes(id) : String(value) === id;

  return (
    <YStack
      flex={1}
      opacity={isDisabled ? 0.5 : 1}
      bc={isSelected ? '$brandMid40' : '$surface16'}
      bw={1}
      boc={isSelected ? '$brandMid' : '$surface16'}
      btlr={gap ? 4 : btlr}
      btrr={gap ? 4 : btrr}
      bbrr={gap ? 4 : bbrr}
      bblr={gap ? 4 : bblr}
      p={16}
      onPress={() => {
        if (isDisabled) return;
        if (type === 'multi') {
          if (isSelected && Array.isArray(value)) {
            onChange(value.filter((v: string) => v !== id));
          } else onChange([...value, id]);
        } else if (isSelected) {
          onChange(null);
        } else onChange(id);
      }}
      gap={4}
      alignItems="center"
    >
      {icon}
      <Text
        variant="bodyS"
        textAlign="center"
        color={isSelected ? 'textHighEmphasis' : 'textMediumEmphasis'}
      >
        {label}
      </Text>
    </YStack>
  );
};

export interface RowRadioSelectProps {
  options: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  name: string;
  type?: 'single' | 'multi';
  gap?: number;
  isHorizontal?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export const RowRadioSelect = ({
  options,
  name,
  type = 'single',
  gap,
  isHorizontal,
  isDisabled,
  isRequired,
}: RowRadioSelectProps) => {
  const {control, trigger} = useFormContext();
  const isGridOf4 = options.length === 4 && !isHorizontal;

  return (
    <YStack width="100%" br={4} bc={gap ? undefined : '$surface20'} gap={1}>
      <Controller
        control={control}
        name={name}
        rules={{required: isRequired}}
        render={({field: {onChange, value}}) => {
          if (isGridOf4) {
            return (
              <>
                <XStack gap={1} flex={1}>
                  {[options[0], options[1]].map(
                    ({value: id, label, icon}, index) => (
                      <Item
                        key={id}
                        id={id}
                        btlr={index === 0 ? 4 : 0}
                        btrr={index === 1 ? 4 : 0}
                        bblr={0}
                        bbrr={0}
                        label={label}
                        icon={icon}
                        onChange={(...args) => {
                          onChange(...args);
                          trigger(name);
                        }}
                        value={value}
                        type={type}
                        isDisabled={isDisabled}
                      />
                    ),
                  )}
                </XStack>
                <XStack gap={1} flex={1}>
                  {[options[2], options[3]].map(
                    ({value: id, label, icon}, index) => (
                      <Item
                        key={id}
                        id={id}
                        btlr={0}
                        btrr={0}
                        bblr={index === 0 ? 4 : 0}
                        bbrr={index === 1 ? 4 : 0}
                        label={label}
                        icon={icon}
                        onChange={(...args) => {
                          onChange(...args);
                          trigger(name);
                        }}
                        value={value}
                        type={type}
                        isDisabled={isDisabled}
                      />
                    ),
                  )}
                </XStack>
              </>
            );
          }
          return (
            <XStack
              gap={gap || 1}
              flex={1}
              br={4}
              bc={gap ? undefined : '$surface20'}
            >
              {options?.map(({value: id, label, icon}, index) => (
                <Item
                  key={id}
                  id={id}
                  btlr={index === 0 ? 4 : 0}
                  btrr={index === options.length - 1 ? 4 : 0}
                  bblr={index === 0 ? 4 : 0}
                  bbrr={index === options.length - 1 ? 4 : 0}
                  label={label}
                  icon={icon}
                  onChange={(...args) => {
                    onChange(...args);
                    trigger(name);
                  }}
                  value={value}
                  type={type}
                  gap={gap}
                  isDisabled={isDisabled}
                />
              ))}
            </XStack>
          );
        }}
      />
    </YStack>
  );
};
