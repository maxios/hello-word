import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";

import {
  ChallengeIcon,
  HomeIcon,
  MealsIcon,
  MoveIcon,
} from "@/components/icons";
import { colors } from "@/constants/Colors";
import { clsx } from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { name: "home", label: "Home", Icon: HomeIcon },
  { name: "move", label: "Move", Icon: MoveIcon },
  { name: "meals", label: "Meals", Icon: MealsIcon },
  { name: "challenges", label: "challenge", Icon: ChallengeIcon },
];

export const getLabel = ({ focused, label }: any) => {
  const color = focused ? "text-high-emphasis" : "text-medium-emphasis";
  return <Text className={clsx(color, "font-body-medium")}>{label}</Text>;
};

export const getIcon = ({ focused, Icon }: any) => {
  const color = focused ? "high-emphasis" : "low-emphasis";
  return <Icon color={colors[color]} />;
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: colors.surface[12],
            default: 42,
          },
          android: {
            backgroundColor: colors.surface[12],
          },
        }),
      }}
    >
      {TABS.map(({ name, label, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            href: `/${name}`,
            title: label,
            tabBarItemStyle: {
              paddingTop: Platform.OS === "android" ? 14 : 15,
              paddingBottom:
                Platform.OS === "android" ? Math.max(16, insets.bottom + 8) : 5,
            },
            tabBarIcon: ({ focused }) => getIcon({ focused, Icon }),
            tabBarLabel: ({ focused }) => getLabel({ focused, label }),
            tabBarActiveTintColor: colors["high-emphasis"],
            tabBarInactiveTintColor: colors["medium-emphasis"],
            tabBarStyle: {
              display: name === "challenges" ? "none" : "flex",
              backgroundColor: colors.surface[12],
              borderTopWidth: 0,
              height:
                Platform.OS === "android"
                  ? Math.max(76, 76 + insets.bottom)
                  : 100,
              paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
            },
          }}
        />
      ))}
    </Tabs>
  );
}
