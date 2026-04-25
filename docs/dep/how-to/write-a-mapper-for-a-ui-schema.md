---
dep:
  type: how-to
  audience: [integrator, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [src/features/auth/mappers/authMapper.ts, src/features/auth/schemas/auth.types.ts]
  tags: [mapper, how-to, schema, transformation]
  links:
    - target: ./add-a-graphql-operation-and-regenerate-types.md
      rel: REQUIRES
    - target: ../reference/feature-directory-structure.md
      rel: USES
    - target: ../reference/collection-service-interface.md
      rel: NEXT
---

# How To — Write A Mapper For A UI Schema

**Goal:** transform a GraphQL response into the exact shape your feature's
UI schema declares, in a single pure function.

**Prerequisites:** the GraphQL operation exists and is typed
([add it first](./add-a-graphql-operation-and-regenerate-types.md)); the
feature's UI schema file exists under `schemas/`; the feature directory
follows the canonical layout.

## Steps

1. Open the feature's UI schema and identify the target interface:

   ```ts
   // src/features/catalog/schemas/catalog.types.ts
   export interface CountryDetail {
     id: string;
     name: string;
     flag: string;
     languageCount: number;
     languages: { id: string; name: string }[];
   }
   ```

2. Create `src/features/<feature>/mappers/<feature>Mapper.ts` (kebab-to-
   camelCase on the feature name) and import the generated GraphQL result
   type alongside the UI schema:

   ```ts
   // src/features/catalog/mappers/catalogMapper.ts
   import type { GetCountryQuery } from '@/src/gql/graphql';
   import type { CountryDetail } from '../schemas/catalog.types';

   export const CatalogMapper = {
     fromApi(api: GetCountryQuery['country']): CountryDetail {
       return {
         id: api.code,
         name: api.name,
         flag: api.emoji ?? '',
         languageCount: api.languages.length,
         languages: api.languages.map((l) => ({ id: l.code, name: l.name })),
       };
     },
   };
   ```

3. Export the mapper from the feature's barrel (`index.ts`):

   ```ts
   export { CatalogMapper } from './mappers/catalogMapper';
   ```

4. Invoke the mapper from the feature's service — never from a component
   or container:

   ```ts
   // src/features/catalog/services/catalogService.ts
   const result = await request(GetCountryDocument, { code });
   return CatalogMapper.fromApi(result.country);
   ```

## Verification

- The mapper file has no imports from `components/`, `containers/`,
  `hooks/`, or `services/`.
- The mapper is a pure function: called twice with the same input, it
  returns deeply-equal output.
- `tsc --noEmit` reports no type errors and the return type matches the
  UI schema exactly (no extra fields, no missing fields).
- The service's return type is the UI schema, not the raw GraphQL result.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Component receives fields that look like the API shape | Component imports GraphQL types directly | Route the data through the service + mapper |
| Mapper imports `lib/graphql.ts` | Mapper is doing fetching | Move fetching to the service; keep the mapper pure |
| Type error on `api.something` | GraphQL types stale | Re-run `npm run codegen` |

## Next

Ensure the mapper's consumer obeys the service contract:
[Collection / Service Interface Reference](../reference/collection-service-interface.md).
