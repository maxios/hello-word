import { shorthands } from '@tamagui/shorthands';
import { createTamagui } from 'tamagui';
import { bodyFont, headingFont } from './theme/fonts';
import themes from './theme/themes';
import tokens from './theme/tokens';

const config = createTamagui({
  defaultTheme: 'dark',
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
    true: bodyFont,
  },
  themes,
  tokens,
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
   
  export interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
