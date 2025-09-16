import {TextStyle} from 'react-native';

export const headingBaseStyles = {
  fontFamily: 'Poppins-700',
  textTransform: 'uppercase',
} as const satisfies TextStyle;

export const bodyBaseStyles = {
  fontFamily: 'OpenSans-400',
  flexWrap: 'wrap',
} as const satisfies TextStyle;

export const bodyEmphasisBaseStyles = {
  fontFamily: 'OpenSans-600',
} as const satisfies TextStyle;

export const uiBaseStyles = {
  fontFamily: 'Poppins-700',
  textTransform: 'uppercase',
} as const satisfies TextStyle;

export const styles = {
  h1: {
    ...headingBaseStyles,
    fontSize: 60,
    lineHeight: 60,
  },
  h2: {
    ...headingBaseStyles,
    fontSize: 40,
    lineHeight: 40,
  },
  h3: {
    ...headingBaseStyles,
    fontSize: 34,
    lineHeight: 34,
  },
  h4: {
    ...headingBaseStyles,
    fontSize: 24,
    lineHeight: 24,
  },
  h5: {
    ...headingBaseStyles,
    fontSize: 20,
    lineHeight: 20,
  },
  bodyL: {
    ...bodyBaseStyles,
    fontSize: 22,
    lineHeight: 27.72,
  },
  bodyLEmphasis: {
    ...bodyEmphasisBaseStyles,
    fontSize: 22,
    lineHeight: 27.72,
  },
  bodyM: {
    ...bodyBaseStyles,
    fontSize: 18,
    lineHeight: 23.4,
  },
  bodyMEmphasis: {
    ...bodyEmphasisBaseStyles,
    fontSize: 18,
    lineHeight: 23.4,
  },
  bodyS: {
    ...bodyBaseStyles,
    fontSize: 14,
    lineHeight: 19.6,
  },
  bodyXS: {
    ...bodyBaseStyles,
    fontSize: 11,
    lineHeight: 19.6,
  },
  bodySLink: {
    ...bodyBaseStyles,
    fontSize: 14,
    lineHeight: 19.6,
    textDecorationLine: 'underline',
  },
  bodySEmphasis: {
    ...bodyEmphasisBaseStyles,
    fontSize: 14,
    lineHeight: 19.6,
  },
  uiM: {
    ...uiBaseStyles,
    fontSize: 16,
    lineHeight: 16,
  },
  uiMLink: {
    ...uiBaseStyles,
    fontSize: 16,
    lineHeight: 16,
    textDecorationLine: 'underline',
  },
  uiS: {
    ...uiBaseStyles,
    fontSize: 12,
    lineHeight: 12,
  },
} as const satisfies Record<string, TextStyle>;

export const wordContainerStyles = {
  h1: {
    height: 45,
    marginBottom: 8,
    paddingTop: 5,
    paddingX: 7,
  },
  h2: {
    height: 31,
    marginBottom: 7,
    paddingTop: 4,
    paddingX: 6,
  },
  h3: {
    height: 26,
    marginBottom: 6,
    paddingTop: 3,
    paddingX: 5,
  },
  h4: {
    height: 18,
    marginBottom: 5,
    paddingTop: 2,
    paddingX: 4,
  },
  h5: {
    height: 16,
    marginBottom: 4,
    paddingTop: 2,
    paddingX: 3,
  },
  uiM: {
    height: 13,
    marginBottom: 2,
    paddingTop: 2,
    paddingX: 3,
  },
  uiMLink: {
    height: 17,
    marginBottom: 2,
    paddingTop: 2,
    paddingX: 3,
  },
  uiS: {
    height: 11,
    marginBottom: 2,
    paddingTop: 2,
    paddingX: 2,
  },
  bodyXS: {
    height: 11,
    marginBottom: 2,
    paddingTop: 2,
    paddingX: 2,
  },
};
