---
dep:
  type: how-to
  audience: [ui-dev, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [cosmos.config.json, package.json, src/shared/components]
  tags: [cosmos, playground, how-to, fixture]
  links:
    - target: ./add-a-new-ui-component.md
      rel: REQUIRES
---

# How To — Write A Cosmos Playground Fixture

**Goal:** add a `.playground.tsx` fixture that renders every visual
variant of a component in React Cosmos.

**Prerequisites:** the component exists and its props are exported; the
repository's Cosmos config ([cosmos.config.json](../../../cosmos.config.json))
is unchanged; `npm run cosmos` starts without errors on a clean checkout.

## Steps

1. Create the fixture file alongside the component, with a `.playground.tsx`
   suffix:

   ```tsx
   // src/shared/components/ProgressBar/ProgressBar.playground.tsx
   import { View } from 'react-native';
   import { ProgressBar } from './ProgressBar';

   export default function ProgressBarFixture() {
     return (
       <View className="p-4 gap-4">
         <ProgressBar value={0} />
         <ProgressBar value={50} />
         <ProgressBar value={100} />
         <ProgressBar value={75} tone="success" />
         <ProgressBar value={25} tone="danger" />
       </View>
     );
   }
   ```

2. Start Cosmos:

   ```bash
   npm run cosmos
   ```

3. Open the Cosmos UI at `http://localhost:5002` and select your fixture
   from the sidebar. The renderer runs at `http://localhost:5052`.

4. (Optional) Split into multiple fixtures for readability — one file per
   variant group — when a single fixture becomes harder to scan than a set:

   ```
   ProgressBar.playground.tsx          # overview: all variants
   ProgressBar.tones.playground.tsx    # tone variants only
   ```

## Verification

- The fixture file is picked up by Cosmos (visible in the sidebar).
- Each meaningful visual variant is represented in the fixture — empty,
  full, mid-range, each tone, each size.
- The fixture renders with no errors and no network calls; components are
  pure, so no fetching should occur.
- The fixture is reachable from the runtime app via the floating eye
  button in the bottom-right corner.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Fixture not in Cosmos sidebar | Wrong filename suffix | Rename to `<Component>.playground.tsx` |
| Fixture throws about missing data | Component expects live data | Feed it a synthetic fixture prop instead |
| Ports 5002 / 5052 already in use | Another Cosmos instance | Stop the other process; do not change the ports |
