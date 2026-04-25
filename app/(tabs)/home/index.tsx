import { Button } from "@/components/Button";
import { PlaygroundButton } from "@/components/PlaygroundButton";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DemoCard = {
  title: string;
  stack: string;
  description: string;
  href: string;
};

const demoCards: DemoCard[] = [
  {
    title: "Catalog",
    stack: "GraphQL query · codegen · 6-layer feature",
    description:
      "List + detail against a public GraphQL API. Demonstrates the full UI-as-API stack: schemas, mapper, collection, action hook, pure UI, container.",
    href: "/catalog",
  },
  {
    title: "Compose",
    stack: "react-hook-form · valibot · GraphQL mutation",
    description:
      "Every field component composed into one form. Submits via a local Yoga mock with optimistic update + server-error-to-field mapping.",
    href: "/compose",
  },
  {
    title: "Settings",
    stack: "NativeWind · design tokens · dark mode",
    description:
      "Dark-mode toggle, typography scale, and color-token gallery. Everything you need when theming a new screen.",
    href: "/settings",
  },
  {
    title: "Playground",
    stack: "React Cosmos · component catalog",
    description:
      "Browse every component's variants, fixture code, and usage guidelines.",
    href: "/playground",
  },
];

const routingDemos: { title: string; description: string; href: string }[] = [
  {
    title: "Modal route",
    description: "Demonstrates Expo Router's modal presentation at /modal.",
    href: "/modal",
  },
  {
    title: "Protected route",
    description:
      "Gated area requiring a session. Redirects to /auth/login when absent.",
    href: "/protected",
  },
  {
    title: "Dynamic route",
    description:
      "See /catalog/[code] — the detail page rendered from URL params.",
    href: "/catalog",
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 120,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1">
          <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
            Flota
          </Text>
          <Text className="text-body-medium text-medium-emphasis">
            A generic Expo + Yoga GraphQL starter. Each tab below demonstrates
            one slice of the stack.
          </Text>
        </View>

        <View className="gap-3">
          <Text className="font-heading text-heading-sm font-bold uppercase text-high-emphasis">
            Stack demos
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
            Routing demos
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
            label="Sign in"
            onPress={() => router.push("/auth/login")}
          />
          <Button
            variant="text"
            label="Create an account"
            onPress={() => router.push("/auth/signup")}
          />
        </View>
      </ScrollView>
      <PlaygroundButton variant="floating" />
    </View>
  );
}
