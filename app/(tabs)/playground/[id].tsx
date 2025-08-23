import { useColorScheme } from "@/hooks/useColorScheme";
import { clsx } from "clsx";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import components to showcase
import { playground } from "@/components";
import { EyeIcon, EyeSlashIcon } from "@/components/icons";
import { ComponentShowcase } from "@/components/playground/ComponentShowcase";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();

  const colorScheme = useColorScheme();
  const { components, usageGuidelines, bestPractices } =
    playground[id as keyof typeof playground];

  const [showCode, setShowCode] = useState(false);

  return (
    <View
      className={clsx("flex-1 bg-background", colorScheme === "dark" && "dark")}
    >
      <SafeAreaView className="flex-1">
        {/* Header Controls */}
        <View className="flex-row items-center justify-between border-b border-border p-4">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">{name}</Text>
            <Text className="text-muted-foreground">
              {usageGuidelines.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowCode(!showCode)}
            className="bg-card ml-4 flex-row items-center rounded-md border border-border px-3 py-2"
          >
            {showCode ? (
              <EyeSlashIcon className="mr-2 h-4 w-4 text-foreground" />
            ) : (
              <EyeIcon className="mr-2 h-4 w-4 text-foreground" />
            )}
            <Text className="text-sm font-medium text-foreground">
              {showCode ? "Hide Code" : "Show Code"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Usage Guidelines */}
          <View className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
            <Text className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
              {usageGuidelines.title}
            </Text>
            <Text className="text-sm leading-5 text-blue-800 dark:text-blue-200">
              {usageGuidelines.content}
            </Text>
          </View>

          {/* Components */}
          {components.map((comp: PlaygroundComponent) => (
            <ComponentShowcase
              key={comp.id}
              component={comp}
              showCode={showCode}
            />
          ))}

          {/* Best Practices */}
          <View className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
            <Text className="mb-2 font-semibold text-green-900 dark:text-green-100">
              {bestPractices.title}
            </Text>
            <View className="space-y-1">
              {bestPractices.practices.map(
                (practice: string, index: number) => (
                  <Text
                    key={index}
                    className="text-sm text-green-800 dark:text-green-200"
                  >
                    • {practice}
                  </Text>
                ),
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
