---
dep:
  type: explanation
  audience: [new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [.docspec, CLAUDE.md]
  tags: [entry-point, onboarding, micro-product, ui-as-api]
  links:
    - target: ../index.md
      rel: REQUIRES
    - target: ../tutorials/scaffold-your-first-feature.md
      rel: NEXT
    - target: ../tutorials/wire-query-mapper-collection-hook-end-to-end.md
      rel: NEXT
    - target: ../reference/feature-directory-structure.md
      rel: NEXT
    - target: ../how-to/wire-graphql-operation-into-a-feature.md
      rel: NEXT
    - target: ../how-to/add-a-cosmos-fixture-for-a-feature-component.md
      rel: NEXT
    - target: ../explanation/micro-product-methodology.md
      rel: EXPLAINS
    - target: ../explanation/ui-as-api-layering.md
      rel: EXPLAINS
---

# Entry Point — New Feature Developer

You have been asked to ship a feature in strnger-app and this is your first
one. This page exists to orient you before you write any code: it explains
the two ideas that shape how features are built in this repository, and then
hands you off to the specific documents you'll need in sequence.

## The Two Ideas That Shape This Codebase

Every feature in strnger-app is built under two overlapping conventions. You
will feel friction if you try to deviate from them, because tooling,
playgrounds, tests, and review expectations all assume they hold.

**The first idea is the micro-product methodology.** A feature is not a
folder of loose files; it is a *complete vertical slice* — UI, business
logic, data access, playground fixtures, tests, and documentation — shipped
together. The unit of contribution is the feature-as-product, not the
pull-request-as-increment. This exists so that any feature can be pointed at
as a working example of every architectural layer, which in turn is what
makes the project replicable and teachable.

**The second idea is UI-as-API.** Inside a feature, responsibilities are
split into sharply defined layers: UI schemas declare the data contract
components expect; mappers transform API payloads into that shape;
collections hold the normalised data; action hooks encapsulate the business
logic; pure UI components render props and raise callbacks; containers wire
everything together. UI components are not allowed to fetch data, contain
business logic, or know about GraphQL. The payoff is that each layer can be
tested, reused, and replaced independently.

Together, these two ideas mean that when you ship a feature, you are shipping
six small things that each obey one rule, not one large thing that does
everything.

## What You Should Read, In Order

The remaining onboarding material is split into purpose-specific documents.
Read them in the order listed; each assumes the previous is done.

1. [Scaffold Your First Feature](../tutorials/scaffold-your-first-feature.md) —
   a tutorial that walks you through a minimal feature under the UI-as-API
   layout.
2. [Wire Query → Mapper → Service → Hook End-to-End](../tutorials/wire-query-mapper-collection-hook-end-to-end.md) —
   a follow-up tutorial that adds a real Yoga GraphQL call through every
   layer.
3. [Wire A GraphQL Operation Into A Feature](../how-to/wire-graphql-operation-into-a-feature.md) —
   a how-to for the same wiring once the tutorials are behind you.
4. [Add A Cosmos Fixture For A Feature Component](../how-to/add-a-cosmos-fixture-for-a-feature-component.md) —
   a how-to for exposing feature components to the playground.
5. [Feature Directory Structure](../reference/feature-directory-structure.md) —
   the canonical layout and file-naming conventions.

Deeper context on the two ideas that shape the code:
[Why Micro-Product Methodology](./micro-product-methodology.md) and
[Why UI-as-API Layering](./ui-as-api-layering.md).

## What Success Looks Like

By the end of your first week you should be able to open a pull request that
introduces a new feature directory in the project layout, wires at least one
GraphQL query through a mapper and collection into a container component,
exposes a pure UI component with a matching `.playground.tsx`, and does not
mix concerns across the UI-as-API layers. If any of those four things feels
unclear after reading the linked material, the documentation has failed and
you should flag it.

## Where To Go Next

Return to the [documentation root](../index.md) to see sibling entry points
for related roles — UI/component work, API integration, and releases — which
you will eventually touch as well.
