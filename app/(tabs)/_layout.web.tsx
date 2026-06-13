import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

import { colors } from "@/constants/Colors";
import { TABS } from "@/constants/navigation";
import { WebSidebar } from "@/components/navigation/WebSidebar";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { clsx } from "clsx";

type IconComponent = React.ComponentType<{ color?: string }>;

const getLabel = ({ focused, label }: { focused: boolean; label: string }) => {
  const color = focused ? "text-high-emphasis" : "text-medium-emphasis";
  return <Text className={clsx(color, "font-body-medium")}>{label}</Text>;
};

const getIcon = ({ focused, Icon }: { focused: boolean; Icon: IconComponent }) => {
  const color = focused ? "high-emphasis" : "low-emphasis";
  return <Icon color={colors[color]} />;
};

export default function WebTabLayout() {
  const { layoutMode } = useResponsiveLayout();

  const tabs = (
    <Tabs
      tabBar={(props) =>
        layoutMode === "large" ? null : <BottomTabBar {...props} />
      }
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors["high-emphasis"],
        tabBarInactiveTintColor: colors["medium-emphasis"],
      }}
    >
      {TABS.map(({ name, label, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            href: `/${name}`,
            title: label,
            tabBarIcon: ({ focused }) => getIcon({ focused, Icon }),
            tabBarLabel: ({ focused }) => getLabel({ focused, label }),
            tabBarItemStyle: {
              paddingTop: 12,
              paddingBottom: 8,
            },
            tabBarStyle: {
              backgroundColor: colors.surface[12],
              borderTopWidth: 0,
              height: 72,
            },
          }}
        />
      ))}
    </Tabs>
  );

  if (layoutMode === "large") {
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <WebSidebar />
        <View style={{ flex: 1 }}>{tabs}</View>
      </View>
    );
  }

  if (layoutMode === "medium") {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.surface[4],
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: 768,
            backgroundColor: colors.background,
          }}
        >
          {tabs}
        </View>
      </View>
    );
  }

  return tabs;
}
