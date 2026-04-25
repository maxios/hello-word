import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
  ColorSwatch,
  ThemePreference,
  TypographyExample,
} from "../schemas/settings.types";

export interface SettingsViewProps {
  preference: ThemePreference;
  activeScheme: "light" | "dark" | null;
  swatches: ColorSwatch[];
  typography: TypographyExample[];
  onSelectPreference: (pref: ThemePreference) => void;
}

const PREFERENCE_OPTIONS: { label: string; value: ThemePreference }[] = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export const SettingsView = ({
  preference,
  activeScheme,
  swatches,
  typography,
  onSelectPreference,
}: SettingsViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + 120,
        gap: 24,
      }}
    >
      <View className="gap-1">
        <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
          Settings
        </Text>
        <Text className="text-body-small text-medium-emphasis">
          Theme · tokens · typography. The three things you need open when
          styling a new screen.
        </Text>
      </View>

      <Section title="Theme preference">
        <View className="flex-row gap-2">
          {PREFERENCE_OPTIONS.map((option) => {
            const active = preference === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => onSelectPreference(option.value)}
                className={`flex-1 rounded-full px-4 py-3 ${
                  active ? "bg-brand-mid" : "bg-surface-8"
                }`}
              >
                <Text
                  className={`text-center text-ui-small uppercase ${
                    active ? "text-brand-darkest" : "text-medium-emphasis"
                  }`}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text className="text-body-x-small text-medium-emphasis">
          Active scheme: {activeScheme ?? "—"}
        </Text>
      </Section>

      <Section title="Color tokens">
        <Text className="text-body-x-small text-medium-emphasis">
          Defined in <Text className="font-bold">src/shared/constants/Colors.ts</Text>
          , consumed via NativeWind classes like <Text className="font-bold">bg-brand-mid</Text>.
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {swatches.map((swatch) => (
            <View
              key={swatch.name}
              className="w-[31%] overflow-hidden rounded-lg border border-surface-16"
            >
              <View
                className="h-12 w-full"
                style={{ backgroundColor: swatch.hex }}
              />
              <View className="gap-0.5 bg-surface-8 p-2">
                <Text className="text-body-x-small-emphasis text-high-emphasis">
                  {swatch.name}
                </Text>
                <Text className="text-body-x-small text-medium-emphasis">
                  {swatch.hex}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Typography scale">
        <Text className="text-body-x-small text-medium-emphasis">
          Defined in <Text className="font-bold">tailwind.config.ts</Text> under{" "}
          <Text className="font-bold">theme.extend.fontSize</Text>.
        </Text>
        <View className="gap-3 rounded-xl border border-surface-16 bg-surface-4 p-4">
          {typography.map((t) => (
            <View key={t.label} className="gap-1">
              <Text className="text-body-x-small uppercase text-medium-emphasis">
                {t.label}
              </Text>
              <Text className={`${t.className} text-high-emphasis`}>
                {t.sampleText}
              </Text>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="gap-3">
    <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
      {title}
    </Text>
    {children}
  </View>
);
