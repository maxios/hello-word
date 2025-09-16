import {YStack, XStack, RadioGroup as TamaguiRadioGroup} from 'tamagui';
import {View} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
import {Text} from '../Text';
import {BlurUpImageBackground} from '../BlurUpImage';

const getBorderColor = (selected: boolean, error?: string) => {
  if (selected) {
    return '$brandMid';
  }
  if (error) {
    return '$error';
  }
  return '$textLowEmphasis';
};

const getBackgroundColor = (selected: boolean, error?: string) => {
  if (selected) {
    return '$brandMid20';
  }
  if (error) {
    return '$error';
  }
  return '$transparent';
};

const getOverlayColor = (selected: boolean) => {
  if (selected) {
    return '$blueGradient';
  }
  return '$imageGradient';
};

interface ImageCardProps {
  label?: string;
  title?: string;
  image: any;
  cardHeight: number;
  isDisabled?: boolean;
  id: string;
  error?: string;
  isSelected: boolean;
  onPress: (value: string) => void;
}

const ImageCard = ({
  label,
  title,
  image,
  id,
  error,
  isSelected,
  cardHeight,
  isDisabled,
  onPress,
}: ImageCardProps) => {
  const twoLineTextHeight = 96;
  const oneLineTextHeight = 72;

  const bottomOffset = cardHeight - twoLineTextHeight;
  const largeBottomOffset = cardHeight - oneLineTextHeight;

  return (
    <TamaguiRadioGroup.Item
      value={id}
      unstyled
      width="100%"
      borderWidth={1}
      borderColor={getBorderColor(isSelected, error)}
      disabled={isDisabled}
      onPress={() => onPress(id)}
    >
      <BlurUpImageBackground
        source={image}
        style={{
          height: cardHeight,
          width: '100%',
          opacity: isDisabled ? 0.3 : 1,
        }}
      >
        <View>
          <XStack
            height="100%"
            width="100%"
            bg={getBackgroundColor(isSelected, error)}
          >
            {label && (
              <YStack
                px={24}
                py={32}
                width="100%"
                height="100%"
                position="relative"
                bg="$imageGradient"
                justifyContent="flex-end"
                zIndex={2}
              >
                <Text variant="h4">{label}</Text>
              </YStack>
            )}
            {!label && (
              <YStack
                gap={8}
                px={16}
                pt={16}
                width="100%"
                height={oneLineTextHeight}
                position="relative"
                top={bottomOffset + 36}
                bg="$imageGradient"
                zIndex={2}
              >
                <Text variant="h4">{title}</Text>
              </YStack>
            )}
            {!title && (
              <YStack
                gap={8}
                width="100%"
                px={16}
                pt={16}
                height={oneLineTextHeight}
                position="relative"
                top={largeBottomOffset}
                bg={getOverlayColor(isSelected)}
                zIndex={2}
              >
                <Text variant="bodyL">{label}</Text>
              </YStack>
            )}
          </XStack>
        </View>
      </BlurUpImageBackground>
    </TamaguiRadioGroup.Item>
  );
};

/*
 * Only used in onboarding trainer screens
 */
export const ImageSelectGroup = ({
  options,
  name,
  isDisabled,
}: {
  options: Omit<ImageCardProps, 'isSelected' | 'onPress'>[];
  isDisabled?: (value: string) => boolean;
  name: string;
}) => {
  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{required: true}}
      render={({
        field: {onChange, value},
      }: {
        field: {onChange: any; value: any};
      }) => {
        return (
          <TamaguiRadioGroup>
            <YStack gap={16} width="100%">
              {options.map((option) => (
                <ImageCard
                  key={option.id}
                  title={option.title}
                  onPress={() => onChange(option.id)}
                  isSelected={value === option.id}
                  isDisabled={isDisabled ? isDisabled(option.id) : false}
                  {...option}
                />
              ))}
            </YStack>
          </TamaguiRadioGroup>
        );
      }}
    />
  );
};
