import {GestureResponderEvent} from 'react-native';
import {YStack, XStack, RadioGroup as TamaguiRadioGroup} from 'tamagui';
import {LinearGradient} from 'expo-linear-gradient';
import {Controller, useFormContext} from 'react-hook-form';
import {Text} from '../Text';
import tokens from '../../theme/tokens';

const HighlightLabel = () => (
  <XStack
    px={8}
    py={4}
    position="absolute"
    top={-9}
    left={16}
    br={1}
    zIndex={1}
    bc="$brandLight"
  >
    <Text variant="uiS" color="surface0">
      Best Value
    </Text>
  </XStack>
);

const getBorderColor = (isSelected: boolean, cardHighlighted?: boolean) => {
  if (isSelected && cardHighlighted) {
    return '$brandMid40';
  }
  if (cardHighlighted) return '$surface12';
  if (isSelected) return '$brandMid';
  return '$textLowEmphasis';
};

interface RadioCardProps {
  id: string;
  label: string;
  description?: string;
  subtitle?: string;
  hasOversizedDescription?: boolean;
  hasCardHighlighted?: boolean;
  isSelected: boolean;
  cardPx?: number;
  onPress: (event: GestureResponderEvent) => void;
  trail?: any;
}

const RadioCard = ({
  id,
  label,
  description,
  subtitle,
  hasOversizedDescription,
  hasCardHighlighted,
  isSelected,
  cardPx,
  onPress,
  trail,
}: RadioCardProps) => {
  return (
    <TamaguiRadioGroup.Item
      value={id}
      key={id}
      unstyled
      onPress={onPress}
      position="relative"
    >
      {hasCardHighlighted && <HighlightLabel />}
      <LinearGradient
        colors={[tokens.color.brandLight.val, tokens.color.brandMid.val]}
        start={{x: 0, y: 0}}
        style={{padding: hasCardHighlighted ? 2 : 0}}
      >
        <XStack backgroundColor="$background">
          <XStack
            bw={1}
            boc={getBorderColor(isSelected, hasCardHighlighted)}
            bc={isSelected ? '$brandMid40' : '$surface12'}
            py={24}
            px={cardPx || 24}
            width="100%"
            gap={8}
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
          >
            <YStack gap={8} flex={1}>
              {(!!label || !!subtitle) && (
                <XStack gap={8} alignItems="center">
                  {label && (
                    <Text variant={subtitle ? 'bodyS' : 'bodySEmphasis'}>
                      {label}
                    </Text>
                  )}
                  {subtitle && <Text variant="bodySEmphasis">{subtitle}</Text>}
                </XStack>
              )}
              {hasOversizedDescription ? (
                <XStack pt={8}>
                  <Text variant="h2">{description}</Text>
                </XStack>
              ) : (
                <Text variant="bodyS">{description}</Text>
              )}
              {trail !== null && id === 'monthly' ? (
                <XStack pt={8}>
                  <Text variant="bodyS">{`With ${trail?.periodNumberOfUnits} ${trail?.periodUnit}  Free Trial`}</Text>
                </XStack>
              ) : (
                <XStack pt={8} />
              )}
            </YStack>
            <XStack
              borderWidth={1.5}
              borderRadius={100}
              height={22}
              width={22}
              borderColor={
                isSelected ? '$textHighEmphasis' : '$textLowEmphasis'
              }
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <XStack
                height={12}
                width={12}
                borderRadius={100}
                backgroundColor={
                  isSelected ? '$textHighEmphasis' : '$transparent'
                }
              />
            </XStack>
          </XStack>
        </XStack>
      </LinearGradient>
    </TamaguiRadioGroup.Item>
  );
};

interface RadioGroupProps {
  hasOversizedDescription?: boolean;
  cardPx?: number;
  options: {
    id: string;
    label: string;
    description?: string;
    title?: string;
    subtitle?: string;
    cardHighlighted?: boolean;
    trail?: any;
  }[];
  name: string;
}

export const RadioGroup = ({
  hasOversizedDescription,
  cardPx,
  options,
  name,
}: RadioGroupProps) => {
  const {control} = useFormContext();

  return (
    <XStack width="100%">
      <Controller
        control={control}
        name={name}
        rules={{required: true}}
        render={({field: {onChange, value}}) => {
          return (
            <TamaguiRadioGroup width="100%">
              <YStack gap={16}>
                {options.map((option) => (
                  <RadioCard
                    key={option.id}
                    hasOversizedDescription={hasOversizedDescription}
                    onPress={() => onChange(option.id)}
                    isSelected={String(value) === String(option.id)}
                    cardPx={cardPx}
                    {...option}
                  />
                ))}
              </YStack>
            </TamaguiRadioGroup>
          );
        }}
      />
    </XStack>
  );
};
