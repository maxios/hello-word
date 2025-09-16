import React, {useState} from 'react';
import {View, Text, Button} from 'tamagui';
import FitnessLoader from './FitnessLoader';
import tokens from '../../theme/tokens';

const FitnessLoaderDemo: React.FC = () => {
  const [currentEquipment, setCurrentEquipment] = useState<
    'dumbbell' | 'barbell' | 'kettlebell' | 'cycle'
  >('dumbbell');
  const [currentSize, setCurrentSize] = useState<'small' | 'medium' | 'large'>(
    'medium',
  );

  const equipmentOptions = [
    {key: 'dumbbell', label: 'Dumbbell'},
    {key: 'barbell', label: 'Barbell'},
    {key: 'kettlebell', label: 'Kettlebell'},
    {key: 'cycle', label: 'Cycle'},
  ];

  const sizeOptions = [
    {key: 'small', label: 'Small'},
    {key: 'medium', label: 'Medium'},
    {key: 'large', label: 'Large'},
  ];

  return (
    <View flex={1} padding="$4" backgroundColor={tokens.color.surface0.val}>
      <Text
        fontSize={32}
        fontWeight="bold"
        color={tokens.color.textHighEmphasis.val}
        textAlign="center"
        marginBottom="$6"
      >
        Fitness Loader Demo
      </Text>

      {/* Equipment Selection */}
      <View marginBottom="$4">
        <Text
          fontSize={24}
          color={tokens.color.textMediumEmphasis.val}
          marginBottom="$2"
        >
          Equipment Type:
        </Text>
        <View flexDirection="row" flexWrap="wrap" gap="$2">
          {equipmentOptions.map((option) => (
            <Button
              key={option.key}
              size="$3"
              backgroundColor={
                currentEquipment === option.key
                  ? tokens.color.brandMid.val
                  : tokens.color.surface8.val
              }
              color={tokens.color.textHighEmphasis.val}
              onPress={() => setCurrentEquipment(option.key as any)}
            >
              {option.label}
            </Button>
          ))}
        </View>
      </View>

      {/* Size Selection */}
      <View marginBottom="$6">
        <Text
          fontSize={24}
          color={tokens.color.textMediumEmphasis.val}
          marginBottom="$2"
        >
          Size:
        </Text>
        <View flexDirection="row" gap="$2">
          {sizeOptions.map((option) => (
            <Button
              key={option.key}
              size="$3"
              backgroundColor={
                currentSize === option.key
                  ? tokens.color.brandMid.val
                  : tokens.color.surface8.val
              }
              color={tokens.color.textHighEmphasis.val}
              onPress={() => setCurrentSize(option.key as any)}
            >
              {option.label}
            </Button>
          ))}
        </View>
      </View>

      {/* Loader Display */}
      <View
        flex={1}
        backgroundColor={tokens.color.surface4.val}
        borderRadius="$4"
        padding="$4"
        jc="center"
        ai="center"
      >
        <FitnessLoader
          equipment={currentEquipment}
          size={currentSize}
          color={tokens.color.brandMid.val}
        />
        <Text
          fontSize={20}
          color={tokens.color.textMediumEmphasis.val}
          marginTop="$4"
          textAlign="center"
        >
          Loading with {currentEquipment} ({currentSize})
        </Text>
      </View>
    </View>
  );
};

export default FitnessLoaderDemo;
