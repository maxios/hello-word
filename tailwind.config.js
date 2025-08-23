/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
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
      colors: {
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
        text: {
          'high-emphasis': '#FFFFFF',
          'medium-emphasis': '#b3b3b3',
          'low-emphasis': '#858585',
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
      },
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
}