---
dep:
  type: tutorial
  audience: [new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [CLAUDE.md, src/features/auth]
  tags: [tutorial, feature, scaffold, onboarding]
  links:
    - target: ../reference/feature-directory-structure.md
      rel: TEACHES
    - target: ./wire-query-mapper-collection-hook-end-to-end.md
      rel: NEXT
---

# Tutorial — Scaffold Your First Feature

In this tutorial you will create a minimal feature called `catalog`
that follows the project's micro-product layout. By the end you will have
a working directory under `src/features/catalog/` with one pure UI
component rendered through a container, exposed via the feature barrel and
visible in the Cosmos playground. No GraphQL yet — that comes next.

## What You Will Build

- A new feature directory at `src/features/catalog/`
- A UI schema at `schemas/catalog.types.ts`
- A pure component `CatalogView`
- A container `CatalogContainer`
- A trivial action hook `useCatalogActions`
- A `.playground.tsx` fixture visible in Cosmos
- A barrel `index.ts` exporting the feature's public surface

## Prerequisites

- You have cloned the repository and run `npm install`.
- You can start the app with `npm run dev` on at least one platform.
- You have read [Why Micro-Product Methodology](../explanation/micro-product-methodology.md)
  and [Why UI-as-API Layering](../explanation/ui-as-api-layering.md).

## Step 1 — Create The Directory Skeleton

Inside `src/features/`, create:

```
catalog/
├── components/
├── containers/
├── hooks/
├── mappers/
├── schemas/
├── services/
├── index.ts
└── README.md
```

Add a one-paragraph `README.md` describing the feature's purpose.

**Expected:** the directory exists; `git status` shows the new files as
untracked.

## Step 2 — Declare The UI Schema

Create `schemas/catalog.types.ts`:

```ts
export interface CountrySummary {
  id: string;
  name: string;
  flag: string;
}

export interface CatalogViewProps {
  items: CountrySummary[];
  isLoading: boolean;
  onRefresh: () => void;
}
```

**Expected:** TypeScript compiles; no imports from other layers.

## Step 3 — Write The Pure Component

Create `components/CatalogView.tsx`:

```tsx
import { Text, Pressable, View, FlatList } from 'react-native';
import type { CatalogViewProps } from '../schemas/catalog.types';

export function CatalogView({ items, isLoading, onRefresh }: CatalogViewProps) {
  return (
    <View className="p-4 gap-3">
      <Text className="text-heading-md font-heading">
        {items.length > 0 ? `${items.length} countries` : 'No items yet'}
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-body-medium">{item.flag} {item.name}</Text>
        )}
      />
      <Pressable onPress={onRefresh} disabled={isLoading} className="p-3 bg-primary rounded-md">
        <Text className="text-ui-default text-white">
          {isLoading ? 'Loading…' : 'Refresh'}
        </Text>
      </Pressable>
    </View>
  );
}
```

**Expected:** the component has no imports from `hooks/`, `services/`, or
`lib/graphql.ts`.

## Step 4 — Write The Action Hook

Create `hooks/useCatalogActions.ts`. Since there is no backend yet, the
hook returns static data with a simulated delay:

```ts
import { useCallback, useState } from 'react';
import type { CountrySummary } from '../schemas/catalog.types';

export function useCatalogActions() {
  const [items, setItems] = useState<CountrySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setItems([
      { id: 'US', name: 'United States', flag: '🇺🇸' },
      { id: 'JP', name: 'Japan', flag: '🇯🇵' },
    ]);
    setIsLoading(false);
  }, []);

  return { items, isLoading, refresh };
}
```

**Expected:** the hook imports only the schema; no UI imports.

## Step 5 — Write The Container

Create `containers/CatalogContainer.tsx`:

```tsx
import { CatalogView } from '../components/CatalogView';
import { useCatalogActions } from '../hooks/useCatalogActions';

export function CatalogContainer() {
  const { items, isLoading, refresh } = useCatalogActions();
  return <CatalogView items={items} isLoading={isLoading} onRefresh={refresh} />;
}
```

**Expected:** the container is short and obvious — it wires one hook's
output to one component's input.

## Step 6 — Export From The Barrel

Fill in `index.ts`:

```ts
export { CatalogView } from './components/CatalogView';
export { CatalogContainer } from './containers/CatalogContainer';
export { useCatalogActions } from './hooks/useCatalogActions';
export * from './schemas/catalog.types';
```

**Expected:** other modules can import from `@/src/features/catalog`.

## Step 7 — Add A Playground Fixture

Create `components/CatalogView.playground.tsx`:

```tsx
import { View } from 'react-native';
import { CatalogView } from './CatalogView';

export default function CatalogViewFixture() {
  return (
    <View className="p-4 gap-6">
      <CatalogView items={[]} isLoading={false} onRefresh={() => {}} />
      <CatalogView items={[]} isLoading onRefresh={() => {}} />
      <CatalogView
        items={[
          { id: 'US', name: 'United States', flag: '🇺🇸' },
          { id: 'JP', name: 'Japan', flag: '🇯🇵' },
        ]}
        isLoading={false}
        onRefresh={() => {}}
      />
    </View>
  );
}
```

Run Cosmos:

```bash
npm run cosmos
```

**Expected:** the fixture appears in the sidebar at
`http://localhost:5002` and renders all three states.

## What You Built

You now have a minimal feature in `src/features/catalog/` that obeys the
project's layering contract: the UI schema is the boundary, the component
is pure, the hook holds the (trivial) business logic, the container
orchestrates them, and everything is re-exported from one barrel. The
playground renders it without touching any backend.

## Next

Replace the hook's static data with a real Yoga GraphQL call, typed via
codegen and routed through a mapper and service:
[Wire Query → Mapper → Collection → Hook End-to-End](./wire-query-mapper-collection-hook-end-to-end.md).
