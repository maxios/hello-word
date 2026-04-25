---
dep:
  type: how-to
  audience: [integrator, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [codegen.ts, lib/graphql.ts, package.json]
  tags: [graphql, codegen, how-to, operations]
  links:
    - target: ../reference/collection-service-interface.md
      rel: USES
    - target: ./write-a-mapper-for-a-ui-schema.md
      rel: NEXT
---

# How To — Add A GraphQL Operation And Regenerate Types

**Goal:** add a new GraphQL query or mutation so it is callable from a
feature's service with full TypeScript types and, if desired, a React Query
hook.

**Prerequisites:** running `npm install`; feature directory exists; a live
connection to the GraphQL endpoint in `EXPO_PUBLIC_GRAPHQL_URL` (defaults to
`https://countries.trevorblades.com/graphql` — codegen introspects the schema
over HTTP).

## Steps

1. Create a `.graphql` file inside the feature, or add a `gql` tagged
   template in a `.ts`/`.tsx` file under `src/`:

   ```graphql
   # src/features/catalog/queries/getCountry.graphql
   query GetCountry($code: ID!) {
     country(code: $code) {
       code
       name
       emoji
       languages { code name }
     }
   }
   ```

2. Run codegen:

   ```bash
   npm run codegen
   ```

   For iterative work, run the watcher instead:

   ```bash
   npm run codegen:watch
   ```

3. Import the generated operation in the feature's service from
   `src/gql/`:

   ```ts
   // src/features/catalog/services/catalogService.ts
   import { request } from '@/lib/graphql';
   import { GetCountryDocument } from '@/src/gql/graphql';

   export const catalogService = {
     getOne: (code: string) => request(GetCountryDocument, { code }),
     // ...other methods
   };
   ```

4. (Optional) Use the generated React Query hook from `src/gql/hooks.ts`
   when the operation is meant to be consumed directly from a container:

   ```ts
   import { useGetCountryQuery } from '@/src/gql/hooks';
   ```

   Prefer this path only when the operation does not require
   feature-local caching, optimistic updates, or error translation.
   Otherwise wrap it in the service.

## Verification

- `npm run codegen` exits with status 0.
- `src/gql/graphql.ts` contains a typed document for the new operation.
- `src/gql/hooks.ts` contains a hook for the new operation if codegen was
  configured to emit one.
- `tsc --noEmit` (or the IDE) reports no type errors when the new operation
  is imported in the feature's service.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Cannot find module '@/src/gql/graphql'` | Codegen did not run | Run `npm run codegen` |
| Codegen exits with schema-fetch error | Endpoint unreachable | Verify network to the URL in `EXPO_PUBLIC_GRAPHQL_URL` (default `countries.trevorblades.com`) |
| Types missing for custom scalar | Scalar not mapped in codegen | Add to `scalars` in [codegen.ts](../../../codegen.ts) |

## Next

Write the mapper that turns the operation's response into your UI schema:
[Write A Mapper For A UI Schema](./write-a-mapper-for-a-ui-schema.md).
