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
    <YStack className="flex-1">
      <YStack className="flex-1">
        <Carousel
          loop={false}
          data={perks}
          renderItem={PerksCarouselItem}
          width={DEVICE_WIDTH}
          onSnapToItem={(indexNumber) => setIndex(indexNumber)}
        />
      </YStack>
      <YStack className="pb-[48px] pt-[24px] px-[16px]">
        <CarouselPagination index={index} />
      </YStack>
    </YStack>
  );
};
