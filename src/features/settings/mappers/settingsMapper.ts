import { colors } from "@/constants/Colors";
import type { ColorSwatch, TypographyExample } from "../schemas/settings.types";

/**
 * Flattens the design-token color tree into a UI-friendly list of swatches.
 */
export const mapColorsToSwatches = (): ColorSwatch[] => {
  const swatches: ColorSwatch[] = [];
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      swatches.push({
        name: key,
        hex: value,
        tailwindClass: `bg-${key}`,
      });
    } else if (value && typeof value === "object") {
      for (const [sub, hex] of Object.entries(value)) {
        if (typeof hex !== "string") continue;
        swatches.push({
          name: `${key}-${sub}`,
          hex,
          tailwindClass: `bg-${key}-${sub}`,
        });
      }
    }
  }
  return swatches;
};

export const typographyScale: TypographyExample[] = [
  {
    className: "font-heading text-heading-xl font-bold uppercase",
    label: "heading-xl",
    sampleText: "Heading XL",
  },
  {
    className: "font-heading text-heading-lg font-bold uppercase",
    label: "heading-lg",
    sampleText: "Heading LG",
  },
  {
    className: "font-heading text-heading-md font-bold uppercase",
    label: "heading-md",
    sampleText: "Heading MD",
  },
  {
    className: "font-heading text-heading-sm font-bold uppercase",
    label: "heading-sm",
    sampleText: "Heading SM",
  },
  {
    className: "font-heading text-heading-xs font-bold uppercase",
    label: "heading-xs",
    sampleText: "Heading XS",
  },
  {
    className: "text-body-large",
    label: "body-large",
    sampleText: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-body-medium",
    label: "body-medium",
    sampleText: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-body-small",
    label: "body-small",
    sampleText: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-body-x-small",
    label: "body-x-small",
    sampleText: "The quick brown fox jumps over the lazy dog.",
  },
  {
    className: "text-ui-default uppercase",
    label: "ui-default",
    sampleText: "UI default label",
  },
  {
    className: "text-ui-small uppercase",
    label: "ui-small",
    sampleText: "UI small tag",
  },
];
