---
dep:
  type: explanation
  audience: [new-dev, ui-dev, integrator, release-eng]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [CLAUDE.md]
  tags: [methodology, architecture, micro-product, vertical-slice]
  links:
    - target: ./ui-as-api-layering.md
      rel: NEXT
    - target: ../reference/feature-directory-structure.md
      rel: EXPLAINS
---

# Why Micro-Product Methodology

Flota organises its feature work around a single idea: a feature is a
*micro-product*, not a pull request. This page explains what that distinction
means, why the project adopted it, and what it trades away.

## The Distinction

A *pull request* is an increment of change against an existing system — it
can be small or large, isolated or sprawling, and its boundaries are defined
by diffs. A *micro-product* is the opposite: its boundaries are defined by
the thing it delivers. A micro-product contains every layer the delivered
thing needs to function — UI components, containers, business logic hooks,
mappers, services, schemas, playground fixtures, tests, and documentation —
and those artifacts are co-located under a single feature directory. The
unit of review is not "what changed" but "what is now deliverable."

## Why The Project Adopted It

Early in the codebase's life the team built features by scattering pieces
across shared folders: a component here, a query there, a state slice
elsewhere. The cost of that layout was not in writing code; it was in
*changing* it. Every modification required a small archaeological dig to
find all the pieces, and the pieces rarely had a single owner. Ownership
diffused, and so did quality.

Micro-products invert that. Because every layer of a feature lives in
`src/features/<name>/`, a change to the feature is a change to one
directory, reviewed by one owner, tested through one set of fixtures, and
described in one README. The directory is the unit of ownership, the unit
of review, and the unit of deletion — features can be removed cleanly because
nothing of theirs leaks outside.

A secondary motivation is replicability. Because each feature is complete,
it can be pointed at as a template for the next one. The onboarding cost of
a new contributor becomes "read one feature end to end" rather than "read
the codebase." Pattern transfer becomes cheap.

## What This Methodology Does Not Promise

Micro-products do not eliminate shared code. A feature that needs a button
still uses the shared component library; a feature that needs a GraphQL
client still uses `lib/graphql.ts`. The line is drawn at *ownership* and
*cohesion*, not at duplication. If two features need the same helper, the
helper belongs in `src/shared/`, not duplicated across features. If two
features need *similar but not identical* helpers, the helpers stay local
until the similarity is proven stable — premature extraction is the same
failure mode as premature abstraction.

Micro-products also do not promise fast iteration on a *cross-feature*
change. If an architectural concern touches every feature, it must be
rolled through every feature. This is the cost paid for the ownership
benefits; it is accepted deliberately.

## Related Ideas

The micro-product methodology is one of two ideas that shape feature code.
The other is UI-as-API layering, which describes how responsibilities are
split *within* a feature's directory so that each layer can be tested,
reused, and replaced independently. Read those together:
[Why UI-as-API Layering](./ui-as-api-layering.md).

The canonical layout for a feature directory is defined in
[Feature Directory Structure](../reference/feature-directory-structure.md).
