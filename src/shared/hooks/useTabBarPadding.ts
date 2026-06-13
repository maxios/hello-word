import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsiveLayout } from "./useResponsiveLayout";

export function useTabBarPadding() {
  const { layoutMode } = useResponsiveLayout();
  const insets = useSafeAreaInsets();

  if (layoutMode === "large") {
    return insets.bottom + 16;
  }
  return insets.bottom + 120;
}
