import { View } from "react-native";
import { perks } from "./perks";

export const CarouselPagination = ({ index }: { index: number }) => (
  <View className="flex-row gap-2">
    {perks.map((_, i) => (
      <View
        key={i as number}
        className={`h-2 w-2 rounded-full ${index === i ? "bg-medium-emphasis" : "bg-surface-4"}`}
      />
    ))}
  </View>
);
