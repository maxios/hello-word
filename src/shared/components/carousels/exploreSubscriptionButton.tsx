import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ChevronRightIcon } from "../icons";

export const ExploreSubscriptionButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.replace("/settings/unsubscribed-subscription");
  };

  return {
    onPress: handleClick,
    label: "Explore Subscription",
    rightIcon: <ChevronRightIcon color={colors.brand.darkest} />,
  };
};
