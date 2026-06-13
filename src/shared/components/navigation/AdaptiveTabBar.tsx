import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export function AdaptiveTabBar(props: BottomTabBarProps) {
  // Always call hook unconditionally (Rules of Hooks)
  const { layoutMode } = useResponsiveLayout();

  if (Platform.OS !== "web") {
    return <BottomTabBar {...props} />;
  }

  if (layoutMode === "large") {
    return null;
  }

  return <BottomTabBar {...props} />;
}
