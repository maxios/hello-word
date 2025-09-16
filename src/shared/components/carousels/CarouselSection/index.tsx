import { DEVICE_WIDTH } from "@/const/const";
import { PerksCarouselItemProps } from "@/pages/IntroPage/PerksCarousel/types";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Button } from "../../Button/Button";
import { ButtonProps } from "../../Button/types";
import { CarouselItem, CarouselItemData } from "./CarouselItem";

export const CarouselSection = ({
  header,
  button,
  items,
}: {
  header?: React.ReactNode;
  button?: ButtonProps;
  items: PerksCarouselItemProps["item"][];
}) => {
  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: CarouselItemData;
    index: number;
  }) => (
    <CarouselItem
      item={item}
      isFirst={index === 0}
      isLast={index === items.length - 1}
    />
  );

  return (
    <View className="flex flex-1 flex-col gap-6">
      <View className="px-4">{header}</View>
      <View className="flex-1">
        <Carousel
          loop={false}
          data={items}
          renderItem={renderCarouselItem}
          width={DEVICE_WIDTH}
        />
      </View>
      {!!button && (
        <View className="px-4 pt-6">
          <Button {...button} />
        </View>
      )}
    </View>
  );
};
