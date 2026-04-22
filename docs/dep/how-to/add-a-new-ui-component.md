---
dep:
  type: how-to
  audience: [ui-dev, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [tailwind.config.ts, src/shared/components]
  tags: [component, how-to, ui, nativewind]
  links:
    - target: ../reference/design-tokens.md
      rel: USES
    - target: ./write-a-cosmos-playground-fixture.md
      rel: NEXT
---

# How To — Add A New UI Component

**Goal:** add a reusable UI component that follows the project's purity
and styling rules.

**Prerequisites:** you have the design (figma or sketch); the design
tokens you need already exist in [design-tokens.md](../reference/design-tokens.md)
— if not, add them to `tailwind.config.ts` before starting.

## Steps

1. Decide the component's scope. Shared components live in
   `src/shared/components/<ComponentName>/`. Feature-specific components
   live in `src/features/<feature>/components/<ComponentName>/`.

2. Create the component file:

   ```tsx
   // src/shared/components/ProgressBar/ProgressBar.tsx
   import { View } from 'react-native';

   export interface ProgressBarProps {
     value: number; // 0–100
     tone?: 'default' | 'success' | 'danger';
   }

   export function ProgressBar({ value, tone = 'default' }: ProgressBarProps) {
     const fillTone =
       tone === 'success' ? 'bg-success' :
       tone === 'danger'  ? 'bg-danger'  : 'bg-primary';

     return (
       <View className="h-2 w-full bg-muted rounded-full">
         <View
           className={`h-full ${fillTone} rounded-full`}
           style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
         />
       </View>
     );
   }
   ```

3. If the component is shared, add an `index.ts` barrel:

   ```ts
   // src/shared/components/ProgressBar/index.ts
   export { ProgressBar } from './ProgressBar';
   export type { ProgressBarProps } from './ProgressBar';
   ```

4. Create a playground fixture — see
   [Write A Cosmos Playground Fixture](./write-a-cosmos-playground-fixture.md).

## Verification

- The component file imports nothing from `hooks/`, `services/`, or
  `lib/graphql.ts`.
- No inline literal values for colour, font size, font family, or spacing;
  every visual value maps to a utility from
  [Design Tokens Reference](../reference/design-tokens.md).
- The component renders with its default props under Cosmos
  (`npm run cosmos`).
- Props are typed and the type is exported.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Colour looks off in dark mode | Hard-coded hex | Replace with a token utility |
| Component depends on data from an API | Data fetching leaked into the component | Move fetching to a hook; pass data via props |
| Playground does not show the component | Missing `.playground.tsx` | Add one per the fixture how-to |

## Next

Document the component's variants in a playground fixture:
[Write A Cosmos Playground Fixture](./write-a-cosmos-playground-fixture.md).
