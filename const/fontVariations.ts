/**
 * Font variations constants for easy usage with TailwindCSS/NativeWind
 * Converted from Tamagui bodyFont configuration
 */

export const FontVariations = {
  // Body font variations
  bodyLarge: 'text-body-large font-body-regular', // 22px, line-height 27.72px, weight 400
  bodyLargeEmphasis: 'text-body-large-emphasis font-body-semibold', // 22px, line-height 27.72px, weight 600
  
  bodyMedium: 'text-body-medium font-body-regular', // 18px, line-height 23.4px, weight 400
  bodyMediumEmphasis: 'text-body-medium-emphasis font-body-semibold', // 18px, line-height 23.4px, weight 600
  
  bodySmall: 'text-body-small font-body-regular', // 14px, line-height 19.6px, weight 400
  bodySmallEmphasis: 'text-body-small-emphasis font-body-semibold', // 14px, line-height 19.6px, weight 600
  
  // UI font variations (with uppercase transform and increased letter spacing)
  uiDefault: 'text-ui-default font-ui-bold uppercase tracking-ui', // 16px, line-height 20px, weight 700, uppercase, letter-spacing 0.5px
  uiLink: 'text-ui-link font-ui-bold uppercase tracking-ui', // 16px, line-height 20px, weight 700, uppercase, letter-spacing 0.5px
  uiSmall: 'text-ui-small font-ui-bold uppercase tracking-ui', // 12px, line-height 12px, weight 700, uppercase, letter-spacing 0.5px
} as const;

/**
 * Individual style properties for more granular control
 */
export const FontProperties = {
  sizes: {
    bodyLarge: 'text-body-large', // 22px
    bodyMedium: 'text-body-medium', // 18px
    bodySmall: 'text-body-small', // 14px
    uiDefault: 'text-ui-default', // 16px
    uiSmall: 'text-ui-small', // 12px
  },
  weights: {
    regular: 'font-body-regular', // 400
    emphasis: 'font-body-semibold', // 600
    ui: 'font-ui-bold', // 700
  },
  families: {
    bodyRegular: 'font-body-regular', // OpenSans-400
    bodySemibold: 'font-body-semibold', // OpenSans-600
    uiBold: 'font-ui-bold', // Poppins-700
  },
  letterSpacing: {
    body: 'tracking-body', // 0
    ui: 'tracking-ui', // 0.5px
  },
  transforms: {
    ui: 'uppercase',
    none: 'normal-case',
  }
} as const;

/**
 * Helper function to combine font variation classes with additional styles
 */
export const combineFontStyles = (
  variation: keyof typeof FontVariations,
  additionalClasses?: string
): string => {
  const baseClasses = FontVariations[variation];
  return additionalClasses ? `${baseClasses} ${additionalClasses}` : baseClasses;
};

/**
 * Type definitions for better TypeScript support
 */
export type FontVariationType = keyof typeof FontVariations;
export type FontSizeType = keyof typeof FontProperties.sizes;
export type FontWeightType = keyof typeof FontProperties.weights;
export type FontFamilyType = keyof typeof FontProperties.families;
