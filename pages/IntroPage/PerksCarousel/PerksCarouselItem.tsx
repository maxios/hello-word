import fade from "@/assets/images/intro/fade.png";
import { BlurUpImageBackground } from "@/components/BlurUpImage";
import { DEVICE_WIDTH } from "@/const/const";
import { Image, StyleSheet, Text, View } from "react-native";
import { PerksCarouselItemProps } from "./types";

export const PerksCarouselItem = ({ item }: PerksCarouselItemProps) => {
  const { id, image, title, description } = item;
  return (
    <View key={id} className="vw flex-1">
      <View className="relative flex-1">
        <BlurUpImageBackground source={image} style={styles.image}>
          <Image
            source={fade}
            style={{ position: "absolute", bottom: 0, width: DEVICE_WIDTH }}
          />
          <Text className="text-heading-lg font-bold uppercase text-high-emphasis">
            {title}
          </Text>
        </BlurUpImageBackground>
      </View>
      <View className="mt-8 px-4">
        <Text className="text-body-medium text-medium-emphasis">
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingLeft: 16,
    paddingRight: 16,
    position: "relative",
  },
});
