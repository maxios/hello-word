---
type: decision-record
audience: [new-dev, integrator]
owner: khaled.mailhub@gmail.com
created: 2026-04-22
last_verified: 2026-04-22
confidence: high
depends_on: []
tags: [graphql, backend, onboarding]
links:
  - docs/dep/how-to/add-a-graphql-operation-and-regenerate-types.md
  - docs/dep/decision-records/dr-003-yoga-graphql-request-over-apollo.md
---

# DR-004 · Countries GraphQL API as the default backend

## Context

Flota ships as a generic starter with no owned backend. The `catalog` tab
needs a real, always-on GraphQL endpoint so `npm run start` boots into
a working demo without any configuration. The previous project pointed
at a private `strng-payloadcms` endpoint, which is not appropriate for a
public template.

## Decision

Default `EXPO_PUBLIC_GRAPHQL_URL` to `https://countries.trevorblades.com/graphql`
(the Countries GraphQL API). It is:

- Public and unauthenticated — no tokens or CORS setup required.
- Rock-stable (public since 2018).
- Schema-rich enough to demonstrate list + detail + nested fields + enums.
- Read-only — mutations are handled by the in-process mock in
  `src/features/compose/services/composeMock.ts`.

The endpoint is configurable via `.env`. Pointing it at a private backend
swaps the backend for the whole app transparently.

## Consequences

- First-run works with zero configuration.
- The `catalog` tab showcases real network behaviour (latency, errors, caching).
- Mutations + subscriptions can't be demonstrated against the default endpoint;
  see DR-005 for how mutations are mocked locally.
- Users must replace both the default and the codegen schema URL when pointing
  at a real backend; both are driven by `EXPO_PUBLIC_GRAPHQL_URL` so one
  variable covers both.

## Alternatives considered

- **SpaceX GraphQL API**: similar shape, but the upstream maintainer has
  announced intermittent outages.
- **Local Yoga server via `+api.ts` route**: Expo Router API routes only run
  in web/dev-server contexts; they don't exist on native builds without extra
  hosting.
- **Require the user to bring their own endpoint**: fails the "boots out of
  the box" goal.
