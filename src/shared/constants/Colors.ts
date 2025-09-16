/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ThemeConfig } from "tailwindcss/types/config";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const colors = {
  'high-emphasis': '#FFFFFF',
  'medium-emphasis': '#b3b3b3',
  'low-emphasis': '#858585',
  surface: {
    0: '#141414',
    4: '#1d1d1d',
    8: '#272727',
    12: '#303030',
    16: '#3a3a3a',
    20: '#434343',
    48: '#858585',
    light: '#4c4c4c',
    'light-transparent': 'rgba(76, 76, 76, 0.4)',
  },
  brand: {
    light: '#C3F4FF',
    mid: '#33C4EB',
    'mid-20': 'rgba(51, 196, 235, 0.2)',
    'mid-40': 'rgba(51, 196, 235, 0.4)',
    dark: '#204098',
    darkest: '#13265A',
  },
  error: {
    light: '#5CABFF',
    DEFAULT: '#F25D5D',
    dark: '#F8A0A0',
    'semantic-dark': '#BC2F2F',
  },
  warning: {
    light: '#F7D197',
    DEFAULT: '#F2B55A',
    dark: '#AE7624',
  },
  success: {
    light: '#B5E8B0',
    DEFAULT: '#85D97E',
    dark: '#4B7548',
  },
  // Semantic color mappings
  background: '#141414',
  foreground: '#FFFFFF',
  'muted-foreground': '#b3b3b3',
  border: '#858585',
  primary: '#33C4EB',
  'primary-foreground': '#FFFFFF',
} satisfies ThemeConfig['colors'];