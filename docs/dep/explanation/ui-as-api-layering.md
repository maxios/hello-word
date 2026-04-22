---
dep:
  type: explanation
  audience: [new-dev, ui-dev, integrator]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [CLAUDE.md, src/features/auth]
  tags: [architecture, ui-as-api, layering, separation-of-concerns]
  links:
    - target: ./micro-product-methodology.md
      rel: REQUIRES
    - target: ../reference/feature-directory-structure.md
      rel: EXPLAINS
    - target: ../reference/collection-service-interface.md
      rel: EXPLAINS
---

# Why UI-as-API Layering

Inside a feature directory, strnger-app splits responsibilities into six
sharply defined layers: schemas, mappers, services, hooks, components, and
containers. This page explains why the split exists, what each layer buys
you, and what kinds of bugs the separation is designed to prevent.

## The Problem The Layering Solves

Before this pattern was adopted, components in the codebase did several
things at once: they fetched data, transformed API payloads, held local
state, described their own styles, and rendered. Each of those
responsibilities aged on a different schedule. The UI changed when designers
redesigned; the transformation logic changed when backend schemas drifted;
the data fetching changed when endpoints moved; the state logic changed when
product added features. When all five lived in one component, *every* change
risked breaking the others, and tests had to spin up a real network to
exercise a render.

The UI-as-API pattern treats that problem as a separation-of-concerns
problem, not a code-quality problem. If each lifecycle lives behind its own
interface, the interfaces absorb the change.

## The Layers, And What Each Layer Promises

The layers are ordered from pure data shape at the bottom to orchestration
at the top. Each layer promises exactly one thing and refuses to do the
things below it.

**Schemas** (`schemas/`) promise a UI-facing data shape. They are TypeScript
interfaces, nothing more. They do not know the API exists. A component can
read a schema and know what props it receives without reading any other
file.

**Mappers** (`mappers/`) promise that an API-shaped object becomes a
schema-shaped object. They are pure, synchronous functions. They do not
fetch, do not cache, do not render. When the API changes a field name, a
mapper is the only file that has to change.

**Services** (`services/`) promise that the feature's data can be read and
written through a single object. They own caching, optimistic updates, and
error translation. They are where `graphql-request` is called; nothing else
in the feature imports the GraphQL client directly.

**Hooks** (`hooks/`) promise an action — a function the UI can call — along
with the state the UI needs to render while the action runs. They wrap the
service and the mapper into `useThingActions` / `useThingState` pairs. They
do not render.

**Components** (`components/`) promise a visual. They render props and emit
callbacks. They are pure in the React sense: same props, same output. They
do not hold business state, do not call hooks that fetch, do not know about
the API.

**Containers** (`containers/`) promise orchestration. They wire a hook's
output into a component's input. They are the only files allowed to bridge
the data side to the UI side, and they should be thin enough that the
bridge is obvious at a glance.

## What This Buys

The layering buys three concrete things.

It buys *testability*: you can test a mapper with zero infrastructure, a
service with a fake network, a hook with a mocked service, and a component
with synthetic fixtures. No test needs all the layers.

It buys *substitutability*: when the backend migrates to a new schema, only
the mapper changes. When the design system changes, only the components
change. When caching strategy changes, only the service changes.

It buys *reviewability*: the diff for a feature change is localised to the
layer the change is about. Reviewers can ignore layers that were not
touched.

## What It Costs

The layering costs *files*. A feature that could be one 300-line file
becomes six small files. For a throwaway prototype this is overhead; for
code that is going to live a year and be maintained by a rotating cast,
the overhead is the point.

The layering also costs *rigidity at boundaries*. A component that wants to
"just quickly" fetch some data is not allowed to; it must ask a container
or a hook to pass the data in. That rigidity is deliberate — every violation
is a short-term convenience that will cost more to unwind later than to
enforce now.

## Related Ideas

The layering presumes the feature-as-micro-product posture described in
[Why Micro-Product Methodology](./micro-product-methodology.md). Without
that posture the file count overhead has no corresponding ownership
payoff. The canonical directory structure is in
[Feature Directory Structure](../reference/feature-directory-structure.md);
the service-layer contract is in
[Collection / Service Interface Reference](../reference/collection-service-interface.md).
