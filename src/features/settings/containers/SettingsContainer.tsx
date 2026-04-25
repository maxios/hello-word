import { useMemo } from "react";
import { SettingsView } from "../components/SettingsView";
import { useThemePreference } from "../hooks/useThemePreference";
import { mapColorsToSwatches, typographyScale } from "../mappers/settingsMapper";

export const SettingsContainer = () => {
  const { preference, activeScheme, setPreference } = useThemePreference();
  const swatches = useMemo(() => mapColorsToSwatches(), []);

  return (
    <SettingsView
      preference={preference}
      activeScheme={activeScheme}
      swatches={swatches}
      typography={typographyScale}
      onSelectPreference={setPreference}
    />
  );
};
