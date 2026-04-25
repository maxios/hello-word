---
dep:
  type: how-to
  audience: [new-dev, integrator]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [CLAUDE.md, src/features/auth]
  tags: [feature, graphql, how-to, wiring]
  links:
    - target: ./add-a-graphql-operation-and-regenerate-types.md
      rel: REQUIRES
    - target: ./write-a-mapper-for-a-ui-schema.md
      rel: REQUIRES
    - target: ../reference/feature-directory-structure.md
      rel: USES
    - target: ../reference/collection-service-interface.md
      rel: USES
---

# How To — Wire A GraphQL Operation Into A Feature

**Goal:** connect a typed GraphQL operation end-to-end through a feature's
service, mapper, and action hook so a container component can consume its
result without knowing about GraphQL.

**Prerequisites:** the feature directory exists with the canonical layout;
the GraphQL operation is
[added and typed](./add-a-graphql-operation-and-regenerate-types.md); the
[mapper is written](./write-a-mapper-for-a-ui-schema.md); the UI schema
for the data exists under `schemas/`.

## Steps

1. In the feature's service, expose a method that uses `request` from
   `lib/graphql.ts` and calls the mapper:

   ```ts
   // src/features/catalog/services/catalogService.ts
   import { request } from '@/lib/graphql';
   import { GetCountryDocument } from '@/src/gql/graphql';
   import { CatalogMapper } from '../mappers/catalogMapper';
   import type { CountryDetail } from '../schemas/catalog.types';

   export const catalogService = {
     async getOne(code: string): Promise<CountryDetail> {
       const { country } = await request(GetCountryDocument, { code });
       return CatalogMapper.fromApi(country);
     },
   };
   ```

2. Wrap the service call in an action hook that also exposes loading and
   error state:

   ```ts
   // src/features/catalog/hooks/useCatalogActions.ts
   import { useCallback, useState } from 'react';
   import { catalogService } from '../services/catalogService';
   import type { CountryDetail } from '../schemas/catalog.types';

   export function useCatalogActions() {
     const [data, setData] = useState<CountryDetail | null>(null);
     const [isLoading, setLoading] = useState(false);
     const [error, setError] = useState<Error | null>(null);

     const load = useCallback(async (code: string) => {
       setLoading(true); setError(null);
       try { setData(await catalogService.getOne(code)); }
       catch (e) { setError(e as Error); }
       finally { setLoading(false); }
     }, []);

     return { data, isLoading, error, load };
   }
   ```

3. Consume the hook from a container; the container passes props into a
   pure component:

   ```tsx
   // src/features/catalog/containers/CatalogDetailContainer.tsx
   import { useEffect } from 'react';
   import { useCatalogActions } from '../hooks/useCatalogActions';
   import { CatalogDetailView } from '../components/CatalogDetailView';

   export function CatalogDetailContainer({ code }: { code: string }) {
     const { data, isLoading, error, load } = useCatalogActions();
     useEffect(() => { load(code); }, [code, load]);
     return (
       <CatalogDetailView data={data} isLoading={isLoading} error={error} />
     );
   }
   ```

4. Export the container from the feature barrel (`index.ts`):

   ```ts
   export { CatalogDetailContainer } from './containers/CatalogDetailContainer';
   ```

## Verification

- The component (`CatalogDetailView`) imports nothing from `services/`,
  `hooks/`, `lib/graphql.ts`, or `@/src/gql/`.
- The service returns the UI schema type, not the GraphQL result type.
- The container is the only file in the feature that imports both a hook
  and a component.
- `tsc --noEmit` passes.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Container file grows past ~30 lines | Business logic leaked into the container | Move it to the action hook |
| Component needs to know a GraphQL field name | UI schema and GraphQL shape diverged | Update the mapper, not the component |
| `request` called from a component | Layer boundary violated | Wrap in a service and call via a hook |
