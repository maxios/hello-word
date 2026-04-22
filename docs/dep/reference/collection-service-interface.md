---
dep:
  type: reference
  audience: [integrator, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [CLAUDE.md, src/features/auth/services/authService.ts]
  tags: [services, collections, data, cache, normalization]
  links:
    - target: ../how-to/write-a-mapper-for-a-ui-schema.md
      rel: USES
    - target: ../tutorials/wire-query-mapper-collection-hook-end-to-end.md
      rel: TEACHES
    - target: ../explanation/ui-as-api-layering.md
      rel: EXPLAINS
---

# Collection / Service Interface Reference

Feature-local data access lives in the `services/` directory of each feature.
A *service* exposes the collection surface — queries, mutations, caching,
optimistic updates — as a single object. This reference defines the shape
every service MUST implement.

## File Location

| Path | Required |
|------|----------|
| `src/features/<feature>/services/<feature>Service.ts` | Yes |

## Module Export

| Export | Type | Required |
|--------|------|----------|
| `<feature>Service` | `object` | Yes — the single entry point |

## Required Method Set

A service MUST expose the following method groups. Methods not applicable to
a given feature MAY be omitted, but MUST NOT be implemented with a different
signature.

### Query Methods

| Method | Signature | Returns |
|--------|-----------|---------|
| `getOne` | `(id: string) => Promise<UISchema>` | Single entity mapped to UI schema |
| `getMany` | `(filter?: FilterInput) => Promise<UISchema[]>` | Array of entities mapped to UI schema |
| `getCurrent` | `() => Promise<UISchema \| null>` | Session-scoped current entity (e.g., user, active plan) |

### Mutation Methods

| Method | Signature | Returns |
|--------|-----------|---------|
| `create` | `(input: CreateInput) => Promise<UISchema>` | Created entity, UI-mapped |
| `update` | `(id: string, input: UpdateInput) => Promise<UISchema>` | Updated entity, UI-mapped |
| `remove` | `(id: string) => Promise<void>` | — |

### Cache Methods

| Method | Signature | Returns |
|--------|-----------|---------|
| `invalidate` | `(id?: string) => void` | — |
| `prime` | `(entity: UISchema) => void` | — |
| `optimistic` | `(patch: Partial<UISchema>) => RollbackFn` | Function that reverts the optimistic patch |

## Argument and Return Constraints

| Constraint | Description |
|------------|-------------|
| Return type | Services MUST return UI-schema types, never raw GraphQL response types |
| Mapper invocation | All transformation MUST go through the feature's mapper; services do not inline field renames |
| Network client | Services MUST use `request` or `graphqlClient` from [lib/graphql.ts](../../../lib/graphql.ts) — no other HTTP client |
| Error surface | Services MUST throw typed errors (never return raw GraphQL errors) |

## Error Types

| Error | Thrown When |
|-------|-------------|
| `NotFoundError` | `getOne`/`getCurrent` resolves to no entity |
| `ValidationError` | Mutation input fails local validation before the network call |
| `NetworkError` | Transport failure (timeout, offline, non-2xx) |
| `<Feature>Error` | Domain-specific failure (e.g., `AuthError` from `auth.types.ts`) |

## Cache Semantics

| Aspect | Behaviour |
|--------|-----------|
| Scope | Per-feature, in-memory; no shared normalised cache across features |
| Invalidation | Explicit via `invalidate(id?)`; no automatic TTL |
| Optimistic updates | `optimistic(patch)` returns a rollback function the caller MUST invoke on mutation failure |
| Persistence | None by default; features that persist MUST layer Expo SecureStore or AsyncStorage explicitly |

## Reference Implementation

`src/features/auth/services/authService.ts`.

## Cross-References

How to write the mapper a service depends on:
[Write a Mapper for a UI Schema](../how-to/write-a-mapper-for-a-ui-schema.md).
End-to-end wiring walkthrough:
[Wire Query → Mapper → Collection → Hook End-to-End](../tutorials/wire-query-mapper-collection-hook-end-to-end.md).
