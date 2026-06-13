/**
 * Pure UI: renders detail for a single catalog item.
 */

import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTabBarPadding } from "@/hooks/useTabBarPadding";
import type { CatalogDetail } from "../schemas/catalog.types";
import content from "../content/catalogDetail.content";

export interface CatalogDetailViewProps {
  detail: CatalogDetail | null;
  isLoading: boolean;
  error: Error | null;
  onBack: () => void;
  onRetry: () => void;
}

export const CatalogDetailView = ({
  detail,
  isLoading,
  error,
  onBack,
  onRetry,
}: CatalogDetailViewProps) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = useTabBarPadding();

  if (isLoading && !detail) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator />
      </View>
    );
  }

  if (error && !detail) {
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

  if (!detail) {
    return null;
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: bottomPadding,
          gap: 20,
        }}
      >
        <Pressable onPress={onBack} className="self-start py-2">
          <Text className="text-body-small text-brand-mid">{content.back}</Text>
        </Pressable>

        <View className="items-center gap-2">
          <Text className="text-[80px] leading-[88px]">{detail.flag}</Text>
          <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
            {detail.name}
          </Text>
          <Text className="text-body-medium text-medium-emphasis">
            {detail.nativeName}
          </Text>
        </View>

        <View className="gap-3 rounded-xl border border-surface-16 bg-surface-4 p-4">
          <Row label={content.capitalLabel} value={detail.capital ?? content.emptyValue} />
          <Row label={content.currencyLabel} value={detail.currency ?? content.emptyValue} />
          <Row label={content.phoneCodeLabel} value={`+${detail.phoneCode}`} />
          <Row label={content.continentLabel} value={detail.continent.name} />
        </View>

        {detail.languages.length > 0 ? (
          <Section title={content.languagesTitle}>
            {detail.languages.map((lang) => (
              <Text
                key={lang.code}
                className="text-body-small text-medium-emphasis"
              >
                {lang.name} ({lang.nativeName})
              </Text>
            ))}
          </Section>
        ) : null}

        {detail.states.length > 0 ? (
          <Section title={content.statesTitle({ count: detail.states.length })}>
            <View className="flex-row flex-wrap gap-2">
              {detail.states.map((state, idx) => (
                <View
                  key={`${state.code ?? "state"}-${idx}`}
                  className="rounded-full bg-surface-8 px-3 py-1"
                >
                  <Text className="text-body-x-small text-medium-emphasis">
                    {state.name}
                  </Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}
      </ScrollView>
    </View>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between">
    <Text className="text-body-small text-medium-emphasis">{label}</Text>
    <Text className="text-body-small-emphasis text-high-emphasis">{value}</Text>
  </View>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="gap-2">
    <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
      {title}
    </Text>
    <View className="gap-2 rounded-xl border border-surface-16 bg-surface-4 p-4">
      {children}
    </View>
  </View>
);
