import {XStack, YStack} from 'tamagui';
import {Pressable} from 'react-native';
import {Text} from './Text';

interface SwitchProps {
  label: string;
  value: string | undefined;
  items: {
    heading: string;
    subheading: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}

export const Switch = ({items, label, onChange, value}: SwitchProps) => {
  const handleSelect = (index: number) => {
    onChange(items[index].value);
  };

  return (
    <YStack gap={8}>
      <Text variant="uiS" color="textHighEmphasis">
        {label}
      </Text>
      <XStack>
        {items.map((item, index) => (
          <Pressable
            onPress={() => handleSelect(index)}
            key={item.value}
            style={{
              flexGrow: 1,
            }}
          >
            <YStack
              gap={8}
              borderTopLeftRadius={index === 0 ? 4 : 0}
              borderBottomLeftRadius={index === 0 ? 4 : 0}
              borderTopRightRadius={index === items.length - 1 ? 4 : 0}
              borderBottomRightRadius={index === items.length - 1 ? 4 : 0}
              backgroundColor={
                item.value === value ? '$brandMid40' : '$surface16'
              }
              borderWidth={1}
              borderColor={item.value === value ? '$brandMid' : '$surface16'}
              alignItems="center"
              justifyContent="center"
              px={8}
              py={24}
              flexGrow={1}
            >
              <Text variant="uiS" color="textHighEmphasis">
                {item.heading}
              </Text>
              <Text variant="bodyS" color="textHighEmphasis">
                {item.subheading}
              </Text>
            </YStack>
          </Pressable>
        ))}
      </XStack>
    </YStack>
  );
};
