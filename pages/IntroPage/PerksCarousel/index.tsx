import { DEVICE_WIDTH } from "@/const/const";
import { useState } from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselPagination } from "./CarouselPagination";
import { perks } from "./perks";
import { PerksCarouselItem } from "./PerksCarouselItem";

export const PerksCarousel = () => {
  const [index, setIndex] = useState(0);

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Carousel
          loop={false}
          data={perks}
          renderItem={PerksCarouselItem}
          width={DEVICE_WIDTH}
          onSnapToItem={(indexNumber) => setIndex(indexNumber)}
        />
      </View>
      <View className="px-[16px] pb-[48px] pt-[24px]">
        <CarouselPagination index={index} />
      </View>
    </View>
  );
};
