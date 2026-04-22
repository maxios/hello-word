---
dep:
  type: decision-record
  audience: [ui-dev, new-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [tailwind.config.ts, docs/tamagui-to-nativewind.md]
  tags: [decision, nativewind, tamagui, styling, migration]
  links:
    - target: ../reference/design-tokens.md
      rel: DECIDES
---

# DR-001: Migrate Styling From Tamagui To NativeWind

## Status

Accepted.

## Context

The project originally used Tamagui for its component styling and
theme-token system. Tamagui delivered a typed, compile-time-optimised
styling pipeline with strong primitive components, but it also came with
constraints that began to accumulate: a custom Babel plugin and compiler
step tightly coupled to the build, a theming API that diverged from what
the broader React Native ecosystem converged on, and a growing gap between
the tokens our designers reasoned about in Figma (Tailwind-shaped) and the
tokens our code expressed (Tamagui-shaped).

Concurrently, NativeWind matured to a point where Tailwind utility classes
render natively on iOS, Android, and web through the Expo toolchain, with
no custom build step beyond the Babel preset. The Tailwind utility
vocabulary matched our designers' vocabulary, and the ecosystem of
Tailwind-aware tools (linters, prettier plugin, cursor-style docs) became
available to us.

## Decision

Replace Tamagui with NativeWind as the project's styling system. Tokens
move from Tamagui theme objects into
[tailwind.config.ts](../../../tailwind.config.ts) and
[src/shared/constants/Colors.ts](../../../src/shared/constants/Colors.ts).
Components consume tokens exclusively through NativeWind utilities; no
component holds raw pixel or hex values.

## Alternatives Considered

**Keep Tamagui and extend it.** Rejected because the designer/developer
vocabulary mismatch was not something Tamagui could close without
pretending to be Tailwind, and the custom build coupling kept surfacing
during Expo SDK upgrades.

**Use plain `StyleSheet` with a tokens module.** Rejected because it
preserves the Tamagui problem (bespoke vocabulary) without the Tamagui
benefit (compile-time optimisation), and it loses the utility-density
that Tailwind buys.

**Use a CSS-in-JS library (e.g. Linaria, Stitches-RN).** Rejected because
none of the options had first-class Expo + React Native support at the
time of decision, and the cost of second-class tooling exceeded the
styling benefits.

## Consequences

Every existing component must migrate off Tamagui primitives. The
intermediate state is documented in the migration notes at
[docs/tamagui-to-nativewind.md](../../tamagui-to-nativewind.md); during
that window the codebase runs both styling systems concurrently, which is
accepted technical debt until the migration is complete.

Designers' Figma tokens and developers' Tailwind tokens now share a
vocabulary, so design review can happen in class names. The playground
(React Cosmos) renders both token systems during the transition.

All new components MUST be built on NativeWind. Components still on
Tamagui MUST be migrated, not extended.

## Review Trigger

Re-open this decision if any of the following occur: NativeWind drops
first-class Expo support; a competing styling primitive reaches
Tailwind-token parity with superior native performance; the project shifts
away from Expo as its build system.
