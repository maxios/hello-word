import { View, Pressable, Text, Platform } from "react-native";
import { usePathname, router } from "expo-router";
import { colors } from "@/constants/Colors";
import { TABS } from "@/constants/navigation";

export function WebSidebar() {
  const pathname = usePathname();

  if (Platform.OS !== "web") return null;

  return (
    <View
      style={{
        width: 240,
        backgroundColor: colors.surface[4],
        borderRightWidth: 1,
        borderRightColor: colors.surface[16],
        paddingTop: 32,
      }}
    >
      <Text
        style={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          fontSize: 18,
          fontWeight: "700",
          fontFamily: "Poppins-700",
          color: colors["high-emphasis"],
          textTransform: "uppercase",
        }}
      >
        Flota
      </Text>
      {TABS.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Pressable
            key={tab.name}
            onPress={() => router.push(tab.href as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 20,
              backgroundColor: isActive ? colors.surface[8] : "transparent",
              borderLeftWidth: isActive ? 3 : 0,
              borderLeftColor: isActive ? colors.brand.mid : "transparent",
              marginLeft: isActive ? 0 : 3,
            }}
          >
            <tab.Icon
              color={
                isActive ? colors["high-emphasis"] : colors["low-emphasis"]
              }
            />
            <Text
              style={{
                marginLeft: 12,
                color: isActive
                  ? colors["high-emphasis"]
                  : colors["medium-emphasis"],
                fontFamily: "OpenSans-600",
                fontSize: 16,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
