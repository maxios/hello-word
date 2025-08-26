/**
 * Example usage of font variations in React Native components
 * This file demonstrates how to use the converted Tamagui font styles with NativeWind
 */

import { Text, View } from "react-native";
import {
  FontProperties,
  FontVariations,
  combineFontStyles,
} from "./fontVariations";

export const FontVariationsExample = () => {
  return (
    <View className="space-y-4 p-4">
      {/* Using predefined font variations */}
      <Text className={FontVariations.bodyLarge}>
        Body Large - This is regular body text (22px, weight 400)
      </Text>

      <Text className={FontVariations.bodyLargeEmphasis}>
        Body Large Emphasis - This is emphasized body text (22px, weight 600)
      </Text>

      <Text className={FontVariations.bodyMedium}>
        Body Medium - Regular medium body text (18px, weight 400)
      </Text>

      <Text className={FontVariations.bodyMediumEmphasis}>
        Body Medium Emphasis - Emphasized medium text (18px, weight 600)
      </Text>

      <Text className={FontVariations.bodySmall}>
        Body Small - Regular small body text (14px, weight 400)
      </Text>

      <Text className={FontVariations.bodySmallEmphasis}>
        Body Small Emphasis - Emphasized small text (14px, weight 600)
      </Text>

      {/* UI elements with uppercase transform */}
      <Text className={FontVariations.uiDefault}>
        UI Default Button Text (16px, weight 700, uppercase)
      </Text>

      <Text className={FontVariations.uiLink}>
        UI Link Text (16px, weight 700, uppercase)
      </Text>

      <Text className={FontVariations.uiSmall}>
        UI Small Text (12px, weight 700, uppercase)
      </Text>

      {/* Using individual properties for custom combinations */}
      <Text
        className={`${FontProperties.sizes.bodyMedium} ${FontProperties.weights.emphasis} text-blue-500`}
      >
        Custom: Medium size with emphasis weight and blue color
      </Text>

      {/* Using the helper function */}
      <Text className={combineFontStyles("bodyLarge", "italic text-red-500")}>
        Combined: Body Large with red color and italic
      </Text>
    </View>
  );
};

/**
 * Example migration from Tamagui to NativeWind
 */

// ❌ OLD Tamagui way:
// <Text fontSize="bodyLarge" fontWeight="400">Body Large Text</Text>
// <Text fontSize="bodyLargeEmphasis" fontWeight="600">Body Large Emphasis</Text>
// <Text fontSize="uiDefault" fontWeight="700" textTransform="uppercase">UI DEFAULT</Text>

// ✅ NEW NativeWind way:
// <Text className={FontVariations.bodyLarge}>Body Large Text</Text>
// <Text className={FontVariations.bodyLargeEmphasis}>Body Large Emphasis</Text>
// <Text className={FontVariations.uiDefault}>UI DEFAULT</Text>

// ✅ Or mix and match:
// <Text className="text-body-large font-body-regular text-blue-500">Custom Body Large</Text>
// <Text className="text-ui-default font-ui-bold uppercase tracking-ui text-white">Custom UI Text</Text>

