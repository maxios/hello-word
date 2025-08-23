import fade from "@/assets/images/move/fade.png";
import { BlurUpImageBackground } from "@/components/BlurUpImage";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { ChevronVertical } from "../icons/ChevronVertical";
import { PromoCardProps } from "./types";

export const PromoCard = ({
  heading,
  subtext,
  subHeading,
  image,
  href,
  cardTagText,
  onCardClick,
}: PromoCardProps) => {
  const router = useRouter();

  // Styles logic
  const cardTagStyles = cardTagText ? "justify-between" : "justify-end";

  return (
    <Pressable
      className="w-full"
      onPress={() => {
        if (href) {
          router.navigate(href);
        } else if (onCardClick) {
          onCardClick?.();
        }
      }}
    >
      <BlurUpImageBackground source={image} style={{ width: "100%" }}>
        <View className="absolute bottom-0 left-0 z-10 h-full w-full active:bg-brand-mid-20"></View>
        <View className="relative w-full overflow-hidden">
          <Image source={fade} className="w-full" resizeMode="cover" />
          <View className="absolute bottom-0 left-0 h-full w-full flex-1 flex-row items-end gap-3 px-4">
            <View className="border-l-1 border-brand-mid pb-4">
              <ChevronVertical />
            </View>
            <View
              className={clsx("flex-colf h-full flex-1 py-4", cardTagStyles)}
            >
              {/* ------ Card Tag ------ */}
              {cardTagText ? (
                <Text className="self-start bg-brand-mid p-[3px] text-ui-small font-bold uppercase">
                  {cardTagText}
                </Text>
              ) : null}

              {/* ------ Card Content ------ */}
              <View className="flex">
                {/* Heading */}
                <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
                  {heading}
                </Text>

                {/* Sub Heading */}
                {subHeading ? (
                  <Text
                    className="text-high-emphasis"
                    style={{ fontFamily: "Poppins-700" }}
                  >
                    {subHeading}
                  </Text>
                ) : null}

                {/* Subtext */}
                <Text
                  className="text-high-emphasis"
                  style={{ fontFamily: "OpenSans-600" }}
                >
                  {subtext}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </BlurUpImageBackground>
    </Pressable>
  );
};
