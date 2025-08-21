import fade from '@/assets/images/intro/fade.png';
import { BlurUpImageBackground } from '@/components/BlurUpImage';
import { Text } from '@/components/Text';
import { DEVICE_WIDTH } from '@/const/const';
import { Image, StyleSheet } from 'react-native';
import { XStack, YStack } from 'tamagui';
import { PerksCarouselItemProps } from './types';

export const PerksCarouselItem = ({item}: PerksCarouselItemProps) => {
  const {id, image, title, description} = item;
  return (
    <YStack key={id} flex={1}>
      <YStack key={id} w={DEVICE_WIDTH} flex={1}>
        <YStack position="relative" flex={1}>
          <BlurUpImageBackground source={image} style={styles.image}>
            <Image
              source={fade}
              style={{position: 'absolute', bottom: 0, width: DEVICE_WIDTH}}
            />
            <Text variant="h3">{title}</Text>
          </BlurUpImageBackground>
        </YStack>
        <XStack mt={12} px={16}>
          <Text color="textMediumEmphasis">{description}</Text>
        </XStack>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
  },
});
