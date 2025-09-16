import React from 'react';
import {View, XStack} from 'tamagui';
import {Controller, useFormContext} from 'react-hook-form';
import {GestureResponderEvent, Pressable} from 'react-native';
import {Text} from '../Text';

type Option = {
  id: string;
  label: string;
};

const options: Option[] = [
  {id: 'monday', label: 'M'},
  {id: 'tuesday', label: 'T'},
  {id: 'wednesday', label: 'W'},
  {id: 'thursday', label: 'Th'},
  {id: 'friday', label: 'F'},
  {id: 'saturday', label: 'S'},
  {id: 'sunday', label: 'Su'},
];

const getBorderColor = (selected: boolean) =>
  selected ? '$brandMid' : '$textLowEmphasis';
const getBackgroundColor = (selected: boolean) =>
  selected ? '$brandMid40' : '$surface12';

interface ItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const Item = ({id, label, isSelected, isDisabled, onPress}: ItemProps) => (
  <Pressable
    onPress={onPress}
    disabled={isDisabled}
    style={{height: 52, flex: 1, display: 'flex'}}
  >
    <XStack
      key={id}
      opacity={isDisabled ? 0.5 : 1}
      height={52}
      flex={1}
      alignItems="center"
      justifyContent="center"
      borderWidth={1}
      borderColor={getBorderColor(isSelected)}
      backgroundColor={getBackgroundColor(isSelected)}
      borderRadius={4}
    >
      <Text>{label}</Text>
    </XStack>
  </Pressable>
);

interface AbbrDaysSelectProps {
  max: number;
}

export const AbbrDaysSelect = ({max}: AbbrDaysSelectProps) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const error = errors.days?.message;

  return (
    <View height={70}>
      <XStack gap={4} flex={1}>
        <Controller
          control={control}
          name="days"
          rules={{
            required: `Please choose ${max} days`,
            validate: (value: string[]) =>
              value.length === max || `Please choose ${max} days`,
          }}
          render={({field: {onChange, value}}) => (
            <>
              {options.map(({id, label}) => {
                const isDisabled = value.length >= max && !value.includes(id);
                return (
                  <Item
                    key={id}
                    id={id}
                    label={label}
                    isSelected={value.includes(id)}
                    isDisabled={isDisabled}
                    onPress={() => {
                      const selected = value.includes(id)
                        ? value.filter((item: string) => item !== id)
                        : [...value, id];
                      onChange(selected);
                    }}
                  />
                );
              })}
            </>
          )}
        />
      </XStack>
      {error && (
        <XStack justifyContent="flex-end">
          <Text variant="uiS" color="error">
            {error}
          </Text>
        </XStack>
      )}
    </View>
  );
};
