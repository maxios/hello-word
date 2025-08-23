// @ts-nocheck
import nativewind from 'nativewind/preset';
import type { Config } from 'tailwindcss';
import { colors } from './constants/Colors';

export default {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [nativewind],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Poppins-700', 'system-ui', 'sans-serif'],
        'body': ['OpenSans-600', 'system-ui', 'sans-serif'],
        'sans': ['OpenSans-400', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['3.75rem', { lineHeight: '1' }],
        'heading-lg': ['2.5rem', { lineHeight: '1' }],
        'heading-md': ['2.125rem', { lineHeight: '1.06' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.12' }],
        'heading-xs': ['1.25rem', { lineHeight: '1.12' }],
        'body-large': ['1.375rem', { lineHeight: '1.26' }],
        'body-medium': ['1.125rem', { lineHeight: '1.3' }],
        'body-small': ['0.875rem', { lineHeight: '1.4' }],
        'ui-default': ['1rem', { lineHeight: '1.25' }],
        'ui-small': ['0.75rem', { lineHeight: '1' }],
      },
      colors,
      letterSpacing: {
        ui: '0.03125rem',
      },
      spacing: {
        'input-height': '3.75rem',
        'input-height-small': '3rem',
      },
    },
  },
  plugins: [],
} satisfies Config;