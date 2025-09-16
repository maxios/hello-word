import { playground } from "@/components";
import { CategoryCard } from "@/components/playground/CategoryCard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { clsx } from "clsx";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

// Component categories overview
const categories: PlaygroundCategory[] = Object.entries(playground).map(
  ([key, value]) => ({
    id: key,
    name: value.meta?.name ?? key,
    icon: value.meta?.icon ?? key,
    description: value.meta?.description ?? key,
    componentCount: value.meta?.componentCount ?? 0,
  }),
);

export default function PlaygroundOverview() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <View
      className={clsx("flex-1 bg-background", colorScheme === "dark" && "dark")}
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 p-4">
          {/* Welcome Section */}
          <View className="mb-8">
            <Text className="mb-4 text-3xl font-bold text-foreground">
              🧪 Component Playground
            </Text>
            <Text className="text-lg leading-6 text-muted-foreground">
              Explore and test your design system components in an interactive
              environment. Use the drawer menu to navigate between different
              component categories.
            </Text>
          </View>

          {/* Features Section */}
          <View className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
            <Text className="mb-3 text-lg font-bold text-blue-900 dark:text-blue-100">
              ✨ Features
            </Text>
            <View className="space-y-2">
              <Text className="text-blue-800 dark:text-blue-200">
                • Live component rendering with real-time updates
              </Text>
              <Text className="text-blue-800 dark:text-blue-200">
                • Code examples for each component variation
              </Text>
              <Text className="text-blue-800 dark:text-blue-200">
                • Dark mode and theme testing
              </Text>
              <Text className="text-blue-800 dark:text-blue-200">
                • Responsive design testing on devices
              </Text>
            </View>
          </View>

          {/* Categories Overview */}
          <View className="mb-6">
            <Text className="mb-4 text-2xl font-bold text-foreground">
              Component Categories
            </Text>
            <Text className="mb-6 text-muted-foreground">
              Tap on a category below or use the drawer menu to explore
              components.
            </Text>

            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() =>
                  router.push({
                    pathname: `/playground/${category.id}`,
                    params: category,
                  })
                }
              />
            ))}
          </View>

          {/* Getting Started */}
          <View className="bg-muted mb-8 rounded-xl p-4">
            <Text className="mb-3 text-lg font-bold text-foreground">
              🚀 Getting Started
            </Text>
            <Text className="leading-6 text-muted-foreground">
              Open the drawer menu (☰) or swipe from the left to navigate
              between component categories. Each category contains live examples
              of components with their code implementations.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
