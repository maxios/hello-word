---
type: decision-record
audience: [new-dev, integrator]
owner: khaled.mailhub@gmail.com
created: 2026-04-22
last_verified: 2026-04-22
confidence: medium
depends_on:
  - docs/dep/decision-records/dr-004-countries-api-as-default-backend.md
tags: [graphql, subscriptions, websocket, deferred]
links:
  - docs/dep/how-to/add-a-graphql-operation-and-regenerate-types.md
---

# DR-005 · Defer the GraphQL subscription demo

## Context

Flota aims to demonstrate every piece of the stack. GraphQL subscriptions
are a legitimate piece — but shipping a working subscription demo requires:

- A WebSocket-capable backend (the default Countries API has none).
- A second client library (`graphql-ws` or `@urql/core`-style) on top of
  `graphql-request`, which itself does not support subscriptions.
- Dev-only infrastructure (hosted mock server, docker-compose) so the demo
  works on first boot without configuration.

## Decision

Ship flota without a runtime subscription demo. Document the subscription
pattern in a how-to (see `docs/dep/how-to/add-a-graphql-subscription.md`
when it lands) and leave a clearly-marked TODO slot in the `home` tab that
points new developers at the docs.

## Consequences

- First-run bundle stays lean (no `graphql-ws` dependency).
- Integrators who need subscriptions must opt in: install `graphql-ws`,
  point it at their own server, and compose a hook following the UI-as-API
  pattern.
- The subscription story becomes a *how-to* rather than a *working example*,
  which is honest about the tradeoff: infra-heavy demos rot faster than code
  patterns.

## Revisit when

- A stable, free, public GraphQL-WS endpoint appears (similar to Countries
  for queries).
- Flota adds a bundled Yoga mock server for mutations, at which point that
  same server can host subscriptions for free.
