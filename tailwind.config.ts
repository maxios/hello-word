// @ts-nocheck
import nativewind from 'nativewind/preset';
import type { Config } from 'tailwindcss';
import { colors } from './src/shared/constants/Colors';

export default {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [nativewind],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      fontFamily: {
        'heading': ['Poppins-800', 'system-ui', 'sans-serif'],
        'body': ['OpenSans-600', 'system-ui', 'sans-serif'],
        'sans': ['OpenSans-400', 'system-ui', 'sans-serif'],
        'body-regular': ['OpenSans-400', 'system-ui', 'sans-serif'],
        'body-semibold': ['OpenSans-600', 'system-ui', 'sans-serif'],
        'ui-bold': ['Poppins-700', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Existing heading sizes
        'heading-xl': ['3.75rem', { lineHeight: '1' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.12' }],
        'heading-md': ['2.125rem', { lineHeight: '1.06' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.12' }],
        'heading-xs': ['1.25rem', { lineHeight: '1.12' }],
        
        // Body font variations from Tamagui
        'body-large': ['1.375rem', { lineHeight: '1.733rem', letterSpacing: '0' }], // 22px -> 1.375rem, 27.72px -> 1.733rem
        'body-large-emphasis': ['1.375rem', { lineHeight: '1.733rem', letterSpacing: '0', fontWeight: '600' }],
        'body-medium': ['1.125rem', { lineHeight: '1.463rem', letterSpacing: '0' }], // 18px -> 1.125rem, 23.4px -> 1.463rem
        'body-medium-emphasis': ['1.125rem', { lineHeight: '1.463rem', letterSpacing: '0', fontWeight: '600' }],
        'body-small': ['0.875rem', { lineHeight: '1.225rem', letterSpacing: '0' }], // 14px -> 0.875rem, 19.6px -> 1.225rem
        'body-small-emphasis': ['0.875rem', { lineHeight: '1.225rem', letterSpacing: '0', fontWeight: '600' }],
        'body-x-small': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0' }], // 12px -> 0.75rem, 15px -> 1rem
        'body-x-small-emphasis': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0', fontWeight: '600' }],
        
        // UI font variations from Tamagui
        'ui-default': ['1rem', { lineHeight: '1.25rem', letterSpacing: '0.03125rem', fontWeight: '700' }], // 16px -> 1rem, 20px -> 1.25rem, 0.5px -> 0.03125rem
        'ui-link': ['1rem', { lineHeight: '1.25rem', letterSpacing: '0.03125rem', fontWeight: '700' }],
        'ui-small': ['0.75rem', { lineHeight: '0.75rem', letterSpacing: '0.03125rem', fontWeight: '700' }], // 12px -> 0.75rem
      },
      colors,
      fontWeight: {
        'body-regular': '400',
        'body-emphasis': '600', 
        'ui': '700',
      },
      letterSpacing: {
        ui: '0.03125rem',
        'body': '0',
      },
      textTransform: {
        'ui': 'uppercase',
      },
      spacing: {
        'input-height': '3.75rem',
        'input-height-small': '3rem',
      },
    },
  },
  plugins: [],
} satisfies Config;