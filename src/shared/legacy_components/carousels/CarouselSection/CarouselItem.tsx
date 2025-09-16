import {StyleSheet, Image} from 'react-native';
import {YStack} from 'tamagui';
import {Text} from '../../Text';
import {DEVICE_WIDTH} from '../../../consts/consts';

export interface CarouselItemData {
  image: any;
  title: string;
  description: string;
}

interface CarouselItemProps {
  item: CarouselItemData;
  isFirst: boolean;
  isLast: boolean;
  imageHeight?: number;
}

export const CarouselItem = ({
  item,
  isFirst,
  isLast,
  imageHeight = 332,
}: CarouselItemProps) => {
  const {image, title, description} = item;

  return (
    <YStack
      gap={24}
      width={DEVICE_WIDTH - 40}
      mr={isLast ? 16 : 0}
      ml={isFirst ? 16 : 0}
    >
      <Image
        source={image}
        style={{...styles.image, height: imageHeight || 332}}
      />
      <YStack gap={8} pr={16}>
        <Text variant="h3" withWhiteBackground>
          {title}
        </Text>
        <Text color="textMediumEmphasis">{description}</Text>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 8,
  },
});
