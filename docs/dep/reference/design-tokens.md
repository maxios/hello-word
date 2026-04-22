---
dep:
  type: reference
  audience: [ui-dev, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [tailwind.config.ts, src/shared/constants/Colors.ts]
  tags: [design-tokens, tailwind, nativewind, typography, spacing, colors]
  links:
    - target: ../how-to/add-a-new-ui-component.md
      rel: USES
    - target: ../decision-records/dr-001-tamagui-to-nativewind.md
      rel: EXPLAINS
---

# Design Tokens Reference

All visual values consumed by components MUST come from this token set. The
tokens are declared in [tailwind.config.ts](../../../tailwind.config.ts) and
[src/shared/constants/Colors.ts](../../../src/shared/constants/Colors.ts).
The utilities listed below are the NativeWind classes generated from those
tokens.

## Font Families

| Token | Utility | Font | Usage |
|-------|---------|------|-------|
| `heading` | `font-heading` | Poppins-800 | Page and section headings |
| `body` | `font-body` | OpenSans-600 | Emphasised body copy |
| `sans` | `font-sans` | OpenSans-400 | Default body copy |
| `body-regular` | `font-body-regular` | OpenSans-400 | Explicit regular body |
| `body-semibold` | `font-body-semibold` | OpenSans-600 | Semibold body |
| `ui-bold` | `font-ui-bold` | Poppins-700 | UI chrome (buttons, tabs) |

## Heading Sizes

| Token | Utility | Size | Line Height |
|-------|---------|------|-------------|
| `heading-xl` | `text-heading-xl` | 3.75rem | 1 |
| `heading-lg` | `text-heading-lg` | 2.5rem | 1.12 |
| `heading-md` | `text-heading-md` | 2.125rem | 1.06 |
| `heading-sm` | `text-heading-sm` | 1.5rem | 1.12 |
| `heading-xs` | `text-heading-xs` | 1.25rem | 1.12 |

## Body Sizes

| Token | Utility | Size | Line Height | Notes |
|-------|---------|------|-------------|-------|
| `body-large` | `text-body-large` | 1.375rem | 1.733rem | Paragraph lead |
| `body-large-emphasis` | `text-body-large-emphasis` | 1.375rem | 1.733rem | weight 600 |
| `body-medium` | `text-body-medium` | 1.125rem | 1.463rem | Default paragraph |
| `body-medium-emphasis` | `text-body-medium-emphasis` | 1.125rem | 1.463rem | weight 600 |
| `body-small` | `text-body-small` | 0.875rem | 1.225rem | Secondary |
| `body-small-emphasis` | `text-body-small-emphasis` | 0.875rem | 1.225rem | weight 600 |
| `body-x-small` | `text-body-x-small` | 0.75rem | 1rem | Captions, labels |
| `body-x-small-emphasis` | `text-body-x-small-emphasis` | 0.75rem | 1rem | weight 600 |

## UI (Interactive Chrome) Sizes

| Token | Utility | Size | Line Height | Letter Spacing | Weight |
|-------|---------|------|-------------|----------------|--------|
| `ui-default` | `text-ui-default` | 1rem | 1.25rem | 0.03125rem | 700 |
| `ui-link` | `text-ui-link` | 1rem | 1.25rem | 0.03125rem | 700 |
| `ui-small` | `text-ui-small` | 0.75rem | 0.75rem | 0.03125rem | 700 |

## Font Weights (semantic)

| Token | Utility | Value |
|-------|---------|-------|
| `body-regular` | `font-body-regular` | 400 |
| `body-emphasis` | `font-body-emphasis` | 600 |
| `ui` | `font-ui` | 700 |

## Letter Spacing

| Token | Utility | Value |
|-------|---------|-------|
| `ui` | `tracking-ui` | 0.03125rem |
| `body` | `tracking-body` | 0 |

## Spacing

| Token | Utility | Value |
|-------|---------|-------|
| `input-height` | `h-input-height` | 3.75rem |
| `input-height-small` | `h-input-height-small` | 3rem |

All other spacing follows the default Tailwind 4px scale (`gap-2`, `p-4`,
etc.). Do not introduce custom pixel values.

## Border Width

| Token | Utility | Value |
|-------|---------|-------|
| `1` | `border-1` | 1px |

## Colours

Colour tokens are defined in
[src/shared/constants/Colors.ts](../../../src/shared/constants/Colors.ts) and
merged into Tailwind via the `colors` key in `tailwind.config.ts`. Consume
them via standard Tailwind colour utilities (`bg-*`, `text-*`, `border-*`).
Do not hard-code hex values.

## Text Transform

| Token | Utility | Value |
|-------|---------|-------|
| `ui` | `uppercase` (or custom) | uppercase |

## Usage Constraint

Components MUST NOT contain literal values for the properties listed above.
If a required visual value is missing from the token set, add it to
`tailwind.config.ts` first; do not inline.

## Cross-References

How to add a component that consumes these tokens:
[Add a New UI Component](../how-to/add-a-new-ui-component.md).
Why the token system replaced Tamagui: [DR-001](../decision-records/dr-001-tamagui-to-nativewind.md).
