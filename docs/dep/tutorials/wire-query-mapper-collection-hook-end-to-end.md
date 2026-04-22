---
dep:
  type: tutorial
  audience: [integrator, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [lib/graphql.ts, codegen.ts, src/features/auth]
  tags: [tutorial, graphql, mapper, service, hook, end-to-end]
  links:
    - target: ./scaffold-your-first-feature.md
      rel: REQUIRES
    - target: ../reference/collection-service-interface.md
      rel: TEACHES
    - target: ../reference/feature-directory-structure.md
      rel: TEACHES
---

# Tutorial — Wire Query → Mapper → Service → Hook End-To-End

In this tutorial you will replace the static data in the `greeting`
feature built in the previous tutorial with a real Yoga GraphQL query,
passed through a mapper and a service, and exposed to the container
through an updated action hook. By the end you will have touched every
layer of the UI-as-API architecture in one small feature.

## What You Will Build

- A GraphQL query declared in the feature
- Generated TypeScript types for the query
- A mapper that turns the query's response into the UI schema
- A service exposing `getCurrent()` that returns the UI schema
- An updated action hook that calls the service
- A container that is unchanged — proof the layering paid off

## Prerequisites

- You completed [Scaffold Your First Feature](./scaffold-your-first-feature.md)
  and have `src/features/greeting/` in place.
- You have network access to the GraphQL endpoint
  `https://strng-payloadcms.vercel.app/api/graphql`.
- The project's codegen tooling works: `npm run codegen` exits cleanly on
  a fresh checkout.

## Step 1 — Declare The Query

For tutorial purposes we'll reuse an existing field on the schema — pick
any root query that returns a single object with identifiable string
fields. Create the query file:

```graphql
# src/features/greeting/queries/getGreeting.graphql
query GetGreeting {
  meTODO: me {
    id
    firstName
    welcomeMessage
  }
}
```

Replace `meTODO`/`me` and the fields with a query that exists on the
live schema — your IDE or `src/gql/introspection.json` can tell you what
is available.

**Expected:** the file exists under the feature's `queries/` directory.

## Step 2 — Generate Types

```bash
npm run codegen
```

**Expected:** `src/gql/graphql.ts` now contains `GetGreetingDocument`
and `GetGreetingQuery` types; `tsc --noEmit` passes.

## Step 3 — Write The Mapper

Create `mappers/greetingMapper.ts`:

```ts
import type { GetGreetingQuery } from '@/src/gql/graphql';
import type { Greeting } from '../schemas/greeting.types';

export const GreetingMapper = {
  fromApi(api: GetGreetingQuery['me']): Greeting {
    return {
      recipient: api.firstName ?? 'Friend',
      message: api.welcomeMessage ?? 'Welcome to strnger-app.',
    };
  },
};
```

**Expected:** the mapper is a pure function; no imports from
`services/`, `components/`, or `lib/graphql.ts`.

## Step 4 — Write The Service

Create `services/greetingService.ts`:

```ts
import { request } from '@/lib/graphql';
import { GetGreetingDocument } from '@/src/gql/graphql';
import { GreetingMapper } from '../mappers/greetingMapper';
import type { Greeting } from '../schemas/greeting.types';

export const greetingService = {
  async getCurrent(): Promise<Greeting> {
    const { me } = await request(GetGreetingDocument);
    return GreetingMapper.fromApi(me);
  },
};
```

**Expected:** the service returns `Greeting`, not the raw GraphQL type.

## Step 5 — Update The Action Hook

Replace the static implementation with one that calls the service:

```ts
// src/features/greeting/hooks/useGreetingActions.ts
import { useCallback, useState } from 'react';
import { greetingService } from '../services/greetingService';
import type { Greeting } from '../schemas/greeting.types';

export function useGreetingActions() {
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try { setGreeting(await greetingService.getCurrent()); }
    finally { setIsLoading(false); }
  }, []);

  return { greeting, isLoading, refresh };
}
```

**Expected:** the hook imports the service, not the GraphQL client
directly.

## Step 6 — Confirm The Container Is Untouched

Open `containers/GreetingContainer.tsx`. It should not need any edit —
this is the proof that the layering paid off. The container's contract
with the hook (`{ greeting, isLoading, refresh }`) has not changed, even
though everything underneath has.

**Expected:** no diff on the container file.

## Step 7 — Verify

1. Run `npm run codegen` one more time to confirm everything is in sync.
2. Start the dev server (`npm run dev`) and navigate to a route that
   mounts `GreetingContainer`.
3. Tap the refresh button. You should see the greeting populate from
   live data.
4. Start Cosmos (`npm run cosmos`). Your fixture still renders because it
   feeds the component synthetic data directly — it never touched the
   new layers.

## What You Built

You now have a feature that touches every UI-as-API layer: schema,
mapper, service, hook, component, container. You changed the data source
without changing the UI. You exercised codegen. You kept the playground
working without backend access. This is the shape every real feature in
the codebase aims for.

## Next

Dig into the individual layers:
- [Collection / Service Interface Reference](../reference/collection-service-interface.md)
  for the contract your service will grow to satisfy as the feature adds
  mutations and caching.
- [Feature Directory Structure](../reference/feature-directory-structure.md)
  for the canonical layout as the feature grows.
