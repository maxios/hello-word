/**
 * Pure UI: renders a list of catalog items. Receives data + callbacks as
 * props and owns no state, no fetching logic, no navigation side-effects.
 */

import { useTabBarPadding } from "@/hooks/useTabBarPadding";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { CatalogListItem } from "../schemas/catalog.types";
import content from "../content/catalogList.content";

export interface CatalogListViewProps {
  items: CatalogListItem[];
  isLoading: boolean;
  error: Error | null;
  onItemPress: (code: string) => void;
  onRetry: () => void;
}

export const CatalogListView = ({
  items,
  isLoading,
  error,
  onItemPress,
  onRetry,
}: CatalogListViewProps) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = useTabBarPadding();

  if (isLoading && items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator />
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-background px-6">
        <Text className="text-center text-body-medium text-high-emphasis">
          {content.loadError}
        </Text>
        <Text className="text-center text-body-small text-medium-emphasis">
          {error.message}
        </Text>
        <Pressable
          onPress={onRetry}
          className="rounded-full bg-brand-mid px-6 py-3"
        >
          <Text className="text-ui-default text-brand-darkest">{content.retry}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.code}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 16,
        paddingBottom: bottomPadding,
        gap: 8,
      }}
      ListHeaderComponent={
        <View className="mb-4 gap-1">
          <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
            {content.heading}
          </Text>
          <Text className="text-body-small text-medium-emphasis">
            {content.itemSummary({ count: items.length })}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onItemPress(item.code)}
          className="flex-row items-center gap-3 rounded-xl border border-surface-16 bg-surface-4 p-4 active:bg-surface-8"
        >
          <Text className="text-heading-md">{item.flag}</Text>
          <View className="flex-1">
            <Text className="text-body-medium-emphasis text-high-emphasis">
              {item.name}
            </Text>
            <Text className="text-body-small text-medium-emphasis">
              {item.nativeName} · {item.continent}
            </Text>
          </View>
          <Text className="text-body-medium text-brand-mid">→</Text>
        </Pressable>
      )}
    />
  );
};
