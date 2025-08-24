import { Header } from "@/components/Header";
import { PromoCard } from "@/components/PromoCard";
import { ScrollView, View } from "react-native";
import { promoCards } from "./consts";

export const MovePage = () => {
  return (
    <View className="bg-surface-8">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          heading="Move"
          subtext="Enhance your fitness journey with our additional multi-week program guides, extra workouts and engaging follow along classes."
          pt={0}
        />
        <View className="flex bg-surface-0 px-4 pb-60">
          {promoCards.map(({ heading, subtext, image, href }) => {
            const shouldHighlight = false;
            const isGuidesCard = heading === "Guides";

            return (
              <PromoCard
                key={heading}
                heading={heading}
                subtext={subtext}
                image={image}
                href={shouldHighlight ? undefined : href}
                cardTagText={isGuidesCard ? "Moving soon!" : undefined}
                isCardHighlighted={shouldHighlight}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
