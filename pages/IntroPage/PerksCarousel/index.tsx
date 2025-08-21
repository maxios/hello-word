import { DEVICE_WIDTH } from '@/const/const';
import { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { YStack } from 'tamagui';
import { CarouselPagination } from './CarouselPagination';
import { perks } from './perks';
import { PerksCarouselItem } from './PerksCarouselItem';

export const PerksCarousel = () => {
  const [index, setIndex] = useState(0);

  return (
    <YStack flex={1}>
      <YStack flex={1}>
        <Carousel
          loop={false}
          data={perks}
          renderItem={PerksCarouselItem}
          width={DEVICE_WIDTH}
          onSnapToItem={(indexNumber) => setIndex(indexNumber)}
        />
      </YStack>
      <YStack pb={48} pt={24} px={16}>
        <CarouselPagination index={index} />
      </YStack>
    </YStack>
  );
};
