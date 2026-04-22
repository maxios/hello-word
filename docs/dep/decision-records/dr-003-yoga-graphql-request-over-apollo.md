---
dep:
  type: decision-record
  audience: [integrator, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [lib/graphql.ts, codegen.ts, package.json]
  tags: [decision, graphql, client, apollo, urql, yoga]
  links:
    - target: ../reference/collection-service-interface.md
      rel: DECIDES
    - target: ../explanation/ui-as-api-layering.md
      rel: EXPLAINS
---

# DR-003: Use Yoga GraphQL Via `graphql-request` (Not Apollo or urql)

## Status

Accepted.

## Context

The project's backend exposes a Yoga GraphQL endpoint at
`https://strng-payloadcms.vercel.app/api/graphql`. The client-side question
was which GraphQL client to adopt. The candidates were Apollo Client, urql,
and `graphql-request`. The choice is not primarily about query syntax
(codegen handles that for all three) but about *where state lives*.

Apollo and urql both centre on a normalised client-side cache as the source
of truth. Components read from the cache; mutations update the cache; a
large portion of the developer experience is cache-policy tuning. In the
strnger-app architecture, however, state lives in feature-local services
(see [Why UI-as-API Layering](../explanation/ui-as-api-layering.md)).
Paying for a normalised cache — in bundle size, API surface, and mental
model — duplicates infrastructure the architecture already provides.

## Decision

Use `graphql-request` as the client. Wrap it in
[lib/graphql.ts](../../../lib/graphql.ts) and export `request` /
`graphqlClient` as the single entry point for network calls. Generate
types and React Query hooks via `@graphql-codegen/cli` with the
`typescript-react-query` plugin, configured with `fetcher: graphql-request`
(see [codegen.ts](../../../codegen.ts)).

Services in each feature MUST import from `lib/graphql.ts`. No other module
is permitted to construct a GraphQL client.

## Alternatives Considered

**Apollo Client.** Rejected because the normalised cache is unused
infrastructure in this architecture; services own caching per-feature.
Apollo's `useQuery`/`useMutation` bring a reactive cache layer that would
race with the service layer for the role of state owner.

**urql.** Rejected for the same reason as Apollo, with the additional
consideration that urql's document cache requires exchange configuration
that adds surface area without benefit here.

**Raw `fetch`.** Rejected because the codegen workflow (typed operations,
React Query hooks) assumes a pluggable fetcher, and `graphql-request`
supplies one with zero extra code. The marginal cost over raw `fetch` is
negligible.

## Consequences

The bundle stays small and the mental model stays flat: one client, one
entry point, one caching strategy per feature. React Query is used for
the hook-level fetching ergonomics (keys, retries, stale times) but
carries no shared normalised cache state.

Features that genuinely need cross-feature cache sharing (rare) must
build it explicitly rather than rely on client-level magic. This is a
deliberate ergonomic cost traded for architectural clarity.

## Review Trigger

Re-open this decision if any of the following occur: the project acquires
multiple features that share a large normalised entity set (e.g.,
graph-heavy social features); the service-per-feature cache strategy
proves to cause visible data drift between features; the maintenance cost
of the `graphql-request` + codegen + react-query stack exceeds what Apollo
or urql would cost.
