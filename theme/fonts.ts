import {createFont} from 'tamagui';

const headingFont = createFont({
  family: 'Poppins-700',
  size: {
    10: 60,
    9: 40,
    8: 34,
    7: 24,
    6: 20,
  },
  lineHeight: {
    10: 60,
    9: 40,
    8: 36,
    7: 26.88,
    6: 22.4,
  },
  transform: {
    // 10: "uppercase",
  },
});

const bodyFont = createFont({
  family: 'OpenSans-600',
  size: {
    bodyLarge: 22,
    bodyLargeEmphasis: 22,
    bodyMedium: 18,
    bodyMediumEmphasis: 18,
    bodySmall: 14,
    true: 14,
    bodySmallEmphasis: 14,
    uiDefault: 16,
    uiLink: 16,
    uiSmall: 12,
  },
  lineHeight: {
    bodyLarge: 27.72,
    bodyLargeEmphasis: 27.72,
    bodyMedium: 23.4,
    bodyMediumEmphasis: 23.4,
    bodySmall: 19.6,
    true: 19.6,
    bodySmallEmphasis: 19.6,
    uiDefault: 20,
    uiLink: 20,
    uiSmall: 12,
  },
  weight: {
    bodyLarge: 400,
    bodyLargeEmphasis: 600,
    bodyMedium: 400,
    bodyMediumEmphasis: 600,
    bodySmall: 400,
    true: 400,
    bodySmallEmphasis: 600,
    uiDefault: 700,
    uiLink: 700,
    uiSmall: 700,
  },
  letterSpacing: {
    bodyLarge: 0,
    bodyLargeEmphasis: 0,
    bodyMedium: 0,
    bodyMediumEmphasis: 0,
    true: 0,
    bodySmall: 0,
    bodySmallEmphasis: 0,
    uiDefault: 0.5,
    uiLink: 0.5,
    uiSmall: 0.5,
  },
  transform: {
    bodyLarge: 'none',
    bodyLargeEmphasis: 'none',
    bodyMedium: 'none',
    bodyMediumEmphasis: 'none',
    true: 'none',
    bodySmall: 'none',
    bodySmallEmphasis: 'none',
    uiDefault: 'uppercase',
    uiLink: 'uppercase',
    uiSmall: 'uppercase',
  },
  face: {
    400: {normal: 'OpenSans-400'},
    600: {normal: 'OpenSans-600'},
    700: {normal: 'Poppins-700'},
  },
});

export {headingFont, bodyFont};
