import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
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

export default function HomeScreenWeb() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 80 }}
    >
      {/* Page container — max width, centered */}
      <View style={{ width: "100%", maxWidth: 900, paddingHorizontal: 40 }}>

        {/* Hero */}
        <View style={{ paddingTop: 64, paddingBottom: 48, gap: 12 }}>
          <Text className="font-heading text-heading-xl font-bold uppercase text-high-emphasis">
            {content.heading}
          </Text>
          <Text
            className="text-body-large text-medium-emphasis"
            style={{ maxWidth: 560 }}
          >
            {content.subtext}
          </Text>
          <View style={{ flexDirection: "row", gap: 12, paddingTop: 8 }}>
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
        </View>

        {/* Divider */}
        <View
          style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)", marginBottom: 48 }}
        />

        {/* Stack demos — 2-column grid */}
        <View style={{ gap: 12, marginBottom: 48 }}>
          <Text className="font-heading text-heading-xs font-bold uppercase text-medium-emphasis">
            {content.stackDemosTitle}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {demoCards.map((card) => (
              <Pressable
                key={card.href}
                onPress={() => router.push(card.href)}
                style={{ flexBasis: "calc(50% - 8px)", flexGrow: 1, minWidth: 280 }}
                className="gap-2 rounded-xl border border-surface-16 bg-surface-4 p-6 active:bg-surface-8"
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
        </View>

        {/* Routing demos — 3-column row */}
        <View style={{ gap: 12 }}>
          <Text className="font-heading text-heading-xs font-bold uppercase text-medium-emphasis">
            {content.routingDemosTitle}
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            {routingDemos.map((demo) => (
              <Pressable
                key={demo.href}
                onPress={() => router.push(demo.href)}
                style={{ flex: 1 }}
                className="gap-1 rounded-xl border border-surface-16 bg-surface-4 p-5 active:bg-surface-8"
              >
                <Text className="font-heading text-body-medium font-bold text-high-emphasis">
                  {demo.title}
                </Text>
                <Text className="text-body-small text-medium-emphasis">
                  {demo.description}
                </Text>
                <Text className="text-body-small text-brand-mid" style={{ marginTop: 8 }}>
                  Explore →
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
