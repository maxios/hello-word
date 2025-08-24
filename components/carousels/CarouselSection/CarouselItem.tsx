import { Image, Text, View } from "react-native";

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

export const CarouselItem = ({ item, isFirst, isLast }: CarouselItemProps) => {
  const { image, title, description } = item;

  return (
    <View className="flex flex-col justify-between gap-6 px-4">
      <Image
        className="rounded-2xl"
        source={image}
        resizeMethod="resize"
        resizeMode="cover"
        style={{ height: 455, width: "100%" }}
      />
      <View className="flex flex-row flex-wrap gap-y-2 pr-4">
        {title.split(" ").map((word, index) => (
          <Text
            key={index}
            allowFontScaling={false}
            className="font-ui-bold self-start bg-white px-1 text-heading-lg uppercase text-black"
          >
            {word}
          </Text>
        ))}
        <Text className="text-body-small text-medium-emphasis">
          {description}
        </Text>
      </View>
    </View>
  );
};
