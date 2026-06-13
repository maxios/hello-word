import { useWindowDimensions, Platform } from "react-native";

export type LayoutMode = "mobile" | "medium" | "large";

export function useResponsiveLayout() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  let layoutMode: LayoutMode = "mobile";
  if (isWeb && width >= 1024) {
    layoutMode = "large";
  } else if (isWeb && width >= 768) {
    layoutMode = "medium";
  }

  return { layoutMode, width, isWeb };
}
