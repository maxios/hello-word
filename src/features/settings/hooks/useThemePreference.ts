/**
 * Action hook: reads + persists the user's theme preference.
 *
 * Persistence uses AsyncStorage so the choice survives app restarts.
 * NativeWind's `useColorScheme` hook is the source of truth for the active
 * scheme — we just drive it based on what's stored.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import type { ThemePreference } from "../schemas/settings.types";

const STORAGE_KEY = "flota:theme-preference";

export interface UseThemePreferenceResult {
  preference: ThemePreference;
  activeScheme: "light" | "dark" | null;
  setPreference: (pref: ThemePreference) => Promise<void>;
}

export const useThemePreference = (): UseThemePreferenceResult => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "light" || saved === "dark" || saved === "system") {
          setPreferenceState(saved);
          setColorScheme(saved);
        }
      })
      .catch(() => {
        // Swallow — we fall back to "system" default.
      });
  }, [setColorScheme]);

  const setPreference = useCallback(
    async (pref: ThemePreference) => {
      setPreferenceState(pref);
      setColorScheme(pref);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, pref);
      } catch {
        // Intentionally ignored — the runtime scheme is already updated.
      }
    },
    [setColorScheme],
  );

  return {
    preference,
    activeScheme: colorScheme ?? null,
    setPreference,
  };
};
