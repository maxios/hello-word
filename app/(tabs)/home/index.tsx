import { Button } from "@/components/Button";
import { PlaygroundButton } from "@/components/PlaygroundButton";
import { useTabBarPadding } from "@/hooks/useTabBarPadding";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import content from "./content/home.content";

type DemoCard = {
  title: string;
  stack: string;
  description: string;
  href: string;
};

const demoCards: DemoCard[] = [
  {
    title: content.catalogTitle,
    stack: content.catalogStack,
    description: content.catalogDescription,
    href: "/catalog",
  },
  {
    title: content.composeTitle,
    stack: content.composeStack,
    description: content.composeDescription,
    href: "/compose",
  },
  {
    title: content.settingsTitle,
    stack: content.settingsStack,
    description: content.settingsDescription,
    href: "/settings",
  },
  {
    title: content.playgroundTitle,
    stack: content.playgroundStack,
    description: content.playgroundDescription,
    href: "/playground",
  },
];

const routingDemos: { title: string; description: string; href: string }[] = [
  {
    title: content.modalRouteTitle,
    description: content.modalRouteDescription,
    href: "/modal",
  },
  {
    title: content.protectedRouteTitle,
    description: content.protectedRouteDescription,
    href: "/protected",
  },
  {
    title: content.dynamicRouteTitle,
    description: content.dynamicRouteDescription,
    href: "/catalog",
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = useTabBarPadding();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: bottomPadding,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1">
          <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
            {content.heading}
          </Text>
          <Text className="text-body-medium text-medium-emphasis">
            {content.subtext}
          </Text>
        </View>

        <View className="gap-3">
          <Text className="font-heading text-heading-sm font-bold uppercase text-high-emphasis">
            {content.stackDemosTitle}
          </Text>
          {demoCards.map((card) => (
            <Pressable
              key={card.href}
              onPress={() => router.push(card.href)}
              className="gap-2 rounded-xl border border-surface-16 bg-surface-4 p-4 active:bg-surface-8"
            >
              <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
                {card.title}
              </Text>
              <Text className="text-ui-small uppercase text-brand-mid">
                {card.stack}
              </Text>
              <Text className="text-body-small text-medium-emphasis">
                {card.description}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-3">
          <Text className="font-heading text-heading-sm font-bold uppercase text-high-emphasis">
            {content.routingDemosTitle}
          </Text>
          {routingDemos.map((demo) => (
            <Pressable
              key={demo.href}
              onPress={() => router.push(demo.href)}
              className="flex-row items-center justify-between rounded-xl border border-surface-16 bg-surface-4 p-4 active:bg-surface-8"
            >
              <View className="flex-1 gap-1 pr-3">
                <Text className="font-heading text-body-medium font-bold text-high-emphasis">
                  {demo.title}
                </Text>
                <Text className="text-body-small text-medium-emphasis">
                  {demo.description}
                </Text>
              </View>
              <Text className="text-body-medium text-brand-mid">→</Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-2 pt-4">
          <Button
            variant="outlined"
            label={content.signInButton}
            onPress={() => router.push("/auth/login")}
          />
          <Button
            variant="text"
            label={content.createAccountButton}
            onPress={() => router.push("/auth/signup")}
          />
        </View>
      </ScrollView>
      <PlaygroundButton variant="floating" />
    </View>
  );
}
