import change1 from "@/assets/images/intro/change1.png";
import change2 from "@/assets/images/intro/change2.png";
import change3 from "@/assets/images/intro/change3.png";
import change4 from "@/assets/images/intro/change4.png";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/Button";
import { CarouselSection } from "@/components/carousels/CarouselSection";
import { APP_PADDING } from "@/const/const";
import { router } from "expo-router";
import { View } from "react-native";
import { PerksCarouselItemProps } from "../IntroPage/PerksCarousel/types";

const newAppPerks: PerksCarouselItemProps["item"][] = [
  {
    image: change1,
    title: "Subscribers",
    description:
      "The app underwent a complete redesign, aimed at enhancing both its aesthetics and functionality, ultimately providing users with an exceptional experience.",
  },
  {
    image: change2,
    title: "Improved workouts",
    description:
      "The workout features have been upgraded to provide a more enjoyable and user-friendly experience. They are now more intuitive than ever, making your fitness journey even more convenient.",
  },
  {
    image: change3,
    title: "Find what you want, faster",
    description:
      "Discover your ideal meals and workouts effortlessly with our incredible filtering system. Find exactly what you want, tailored to your preferences.",
  },
  {
    image: change4,
    title: "Build your schedule",
    description:
      "You can now schedule individual workouts, change workout days and even schedule guides.",
  },
];

const NewAppPerksPage = () => {
  return (
    <AppLayout px={0}>
      <View className="flex flex-1 justify-between">
        <View className="flex-1">
          <CarouselSection items={newAppPerks} />
        </View>
        <View style={{ paddingHorizontal: APP_PADDING }}>
          <Button
            label="Let's go"
            onPress={() => router.push("/auth/login")}
            variant="primary"
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default NewAppPerksPage;
