---
dep:
  type: how-to
  audience: [new-dev, ui-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [cosmos.config.json, src/features/auth]
  tags: [cosmos, playground, how-to, feature, fixture]
  links:
    - target: ./write-a-cosmos-playground-fixture.md
      rel: REQUIRES
    - target: ../reference/feature-directory-structure.md
      rel: USES
---

# How To — Add A Cosmos Fixture For A Feature Component

**Goal:** expose a feature-local component in the Cosmos playground using
synthetic data, so the component can be reviewed visually without a live
backend.

**Prerequisites:** the component lives under
`src/features/<feature>/components/`; the UI schema for its props exists
under `schemas/`; you already know
[how to write a Cosmos fixture](./write-a-cosmos-playground-fixture.md).

## Steps

1. Build a synthetic fixture of the UI schema the component expects. Do
   NOT call into the feature's service — the fixture must be static:

   ```ts
   // src/features/meal-plan/components/MealPlanView.fixtures.ts
   import type { MealPlan } from '../schemas/mealPlan.types';

   export const mealPlanEmpty: MealPlan = {
     id: 'sample-empty', title: 'Empty Plan', totalCalories: 0, items: [],
   };

   export const mealPlanFull: MealPlan = {
     id: 'sample-full',
     title: 'High-Protein Day',
     totalCalories: 2400,
     items: [
       { id: '1', name: 'Oats & Berries' },
       { id: '2', name: 'Chicken Salad' },
       { id: '3', name: 'Salmon & Rice' },
     ],
   };
   ```

2. Create the `.playground.tsx` fixture next to the component:

   ```tsx
   // src/features/meal-plan/components/MealPlanView.playground.tsx
   import { View } from 'react-native';
   import { MealPlanView } from './MealPlanView';
   import { mealPlanEmpty, mealPlanFull } from './MealPlanView.fixtures';

   export default function MealPlanViewFixture() {
     return (
       <View className="p-4 gap-6">
         <MealPlanView data={null} isLoading error={null} />
         <MealPlanView data={null} isLoading={false} error={new Error('Fetch failed')} />
         <MealPlanView data={mealPlanEmpty} isLoading={false} error={null} />
         <MealPlanView data={mealPlanFull} isLoading={false} error={null} />
       </View>
     );
   }
   ```

3. Start Cosmos:

   ```bash
   npm run cosmos
   ```

## Verification

- The fixture file renders the component in every state the component
  cares about: loading, error, empty, populated.
- The fixture imports ONLY the pure component and fixture data — no
  hooks, no services, no GraphQL client.
- The fixture is visible in the Cosmos sidebar at
  `http://localhost:5002` and renders at `http://localhost:5052`.
- The fixture is reachable at runtime via the floating eye button in the
  bottom-right corner of the app.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Fixture hangs on start | Imports a hook that fetches | Remove the hook; pass data as a prop |
| Fixture shows only the happy path | Missing states | Add loading, error, empty variants |
| Fixture data diverges from UI schema | Fixture hand-written without type | Import the UI schema type and annotate |
