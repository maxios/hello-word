export type ThemePreference = "system" | "light" | "dark";

export interface ColorSwatch {
  name: string;
  hex: string;
  tailwindClass: string;
}

export interface TypographyExample {
  className: string;
  label: string;
  sampleText: string;
}
