---
dep:
  type: explanation
  audience: [integrator]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [.docspec, CLAUDE.md, codegen.ts, lib/graphql.ts]
  tags: [entry-point, graphql, codegen, mappers, collections]
  links:
    - target: ../index.md
      rel: REQUIRES
    - target: ../how-to/add-a-graphql-operation-and-regenerate-types.md
      rel: NEXT
    - target: ../how-to/write-a-mapper-for-a-ui-schema.md
      rel: NEXT
    - target: ../reference/collection-service-interface.md
      rel: NEXT
    - target: ../tutorials/wire-query-mapper-collection-hook-end-to-end.md
      rel: NEXT
    - target: ../decision-records/dr-003-yoga-graphql-request-over-apollo.md
      rel: EXPLAINS
    - target: ../explanation/ui-as-api-layering.md
      rel: EXPLAINS
---

# Entry Point — API / Data Integrator

You are adding or changing how a feature gets its data. This page orients
you around the integration layer so that by the time you open the relevant
how-to, you already understand what each piece is for and why it exists as
its own thing instead of being folded into the component.

## The Data Path, End To End

The project uses **Yoga GraphQL** served at
`https://strng-payloadcms.vercel.app/api/graphql`, consumed from the client
via `graphql-request` (see [lib/graphql.ts](../../../lib/graphql.ts)). The
reason the stack stayed lightweight — rather than adopting Apollo or urql —
is that most of the app's state lives in feature-local collections rather
than in a single normalised client cache, so we traded a heavier client for
explicitly-owned data.

Types are not hand-written. Operations declared in `.graphql` files (or
inline `gql` tags) are fed through **GraphQL Code Generator** (see
[codegen.ts](../../../codegen.ts)) to produce typed operations in `src/gql/`.
Running `npm run codegen` regenerates them; `npm run codegen:watch` keeps
them in sync as you iterate.

From there the data passes through four feature-local layers, each with a
single responsibility:

- **Schemas** declare the TypeScript shape the UI expects. They are the
  contract, written independently of the API.
- **Mappers** are declarative functions that turn API payloads into that
  shape. Mappers are where all field-name differences, flattening, and
  enum translation live.
- **Collections** hold the mapped data with caching, normalisation, and
  optimistic updates. They are what UI code reads from.
- **Action hooks** wrap the whole pipeline — query, mapper, collection
  update — into a single hook the container component can call.

The reason the mapper layer exists at all is that the API shape and the UI
shape drift over time for different reasons (backend refactors, UX
redesigns). Putting a declarative mapper between them means a schema change
on either side is a one-file edit, not a component rewrite.

## What You Should Read, In Order

1. [Add A GraphQL Operation And Regenerate Types](../how-to/add-a-graphql-operation-and-regenerate-types.md) —
   the how-to for declaring a new query or mutation and running codegen.
2. [Write A Mapper For A UI Schema](../how-to/write-a-mapper-for-a-ui-schema.md) —
   the how-to for turning a GraphQL response into a UI-schema shape.
3. [Collection / Service Interface Reference](../reference/collection-service-interface.md) —
   the contract every feature's service must implement, including cache
   and optimistic-update semantics.
4. [Wire Query → Mapper → Service → Hook End-to-End](../tutorials/wire-query-mapper-collection-hook-end-to-end.md) —
   the tutorial that walks through every layer for a trivial feature.

Rationale for the client choice is in
[DR-003 — Use Yoga GraphQL Via `graphql-request`](../decision-records/dr-003-yoga-graphql-request-over-apollo.md).
The conceptual reasoning behind the layering is in
[Why UI-as-API Layering](./ui-as-api-layering.md). Legacy notes worth
skimming during the migration: [docs/ui-api-feature-guide.md](../../ui-api-feature-guide.md)
and the companion testing guide `docs/UI API Feature Testing Guide.md`
(to be renamed and superseded).

## What Success Looks Like

A successful integration introduces or updates one GraphQL operation,
regenerates types cleanly, adds or updates a mapper that conforms to an
existing UI schema, exposes a single action hook as the integration's public
surface, and leaves the UI components unchanged except for their prop input.
If a component had to learn about the API shape to accommodate your change,
the layering broke — revisit the mapper.

## Where To Go Next

If the data you are integrating belongs to a brand-new feature, start from
the [new feature developer entry point](entry-new-feature-developer.md). If
a component needs new visual states to render the new data, coordinate with
the [UI / component developer entry point](entry-ui-component-developer.md)
so that schema and component evolve together.
