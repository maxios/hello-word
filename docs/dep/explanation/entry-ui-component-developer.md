---
dep:
  type: explanation
  audience: [ui-dev]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [.docspec, CLAUDE.md, tailwind.config.ts, cosmos.config.json]
  tags: [entry-point, components, playground, design-tokens, nativewind]
  links:
    - target: ../index.md
      rel: REQUIRES
    - target: ../how-to/add-a-new-ui-component.md
      rel: NEXT
    - target: ../how-to/write-a-cosmos-playground-fixture.md
      rel: NEXT
    - target: ../reference/design-tokens.md
      rel: NEXT
    - target: ../decision-records/dr-001-tamagui-to-nativewind.md
      rel: EXPLAINS
---

# Entry Point — UI / Component Developer

Your goal is to add or change a component, get its visuals right across
variants, and make sure it is discoverable from the playground. This page
explains the three systems that collectively govern how UI is built here so
that you can make informed calls on where something belongs.

## The Three Systems You Work Inside

**NativeWind and the design-token layer.** All component styling is done
through NativeWind (Tailwind for React Native). Raw colour values,
font families, and spacing scales are not hard-coded in components; they are
declared as design tokens in [tailwind.config.ts](../../../tailwind.config.ts)
and related constants files, consumed through Tailwind utilities. Typography is split between Poppins (headings) and Open
Sans (body) and is loaded in [app/_layout.tsx](../../../app/_layout.tsx).
The reason tokens exist — rather than per-component style files — is that
dark mode, accessibility contrast, and theme evolution need to change in one
place.

**The React Cosmos playground.** Every non-trivial component is expected to
ship with a companion `.playground.tsx` file that exposes its variants for
interactive review. The playground is not a test harness; it is a showroom
that doubles as documentation for designers and reviewers. You can reach it
at runtime via the floating eye button in the bottom-right of the app, or
start it directly with `npm run cosmos`. A component without a playground is
treated the same as a component without tests: incomplete.

**The UI-as-API contract.** UI components in this codebase are *pure*. They
render props and raise callbacks; they do not fetch data, hold business
state, or know about GraphQL. If you find yourself reaching for a query hook
from inside a component, you have crossed a layer boundary — the logic
belongs in an action hook, and the component should accept its result as a
prop. This boundary is what lets the playground render every component with
synthetic fixtures, without any running backend.

## What You Should Read, In Order

1. [Add A New UI Component](../how-to/add-a-new-ui-component.md) — the
   how-to for building a component that adheres to the playground and
   design-token conventions.
2. [Design Tokens Reference](../reference/design-tokens.md) — the
   available colours, typography scales, spacing, and the NativeWind
   utilities that map to them.
3. [Write A Cosmos Playground Fixture](../how-to/write-a-cosmos-playground-fixture.md) —
   the how-to for writing an effective `.playground.tsx` fixture that
   covers every visual variant.
4. [DR-001 — Migrate Styling From Tamagui To NativeWind](../decision-records/dr-001-tamagui-to-nativewind.md) —
   the decision record explaining why the project adopted NativeWind.

Migration context during the transition is captured in
[docs/tamagui-to-nativewind.md](../../tamagui-to-nativewind.md),
[docs/playground-setup.md](../../playground-setup.md), and
[docs/tailwind-theme-usage.md](../../tailwind-theme-usage.md); these
files will be superseded once the migration completes.

## What Success Looks Like

A component is "done" when it renders correctly in every declared variant
inside Cosmos, pulls all visual values from design tokens rather than
literals, contains no data-fetching or business logic, and is reachable from
the playground index. If any of these fail, the PR is not ready.

## Where To Go Next

If your component needs live data, hand the work off at the layer boundary:
see the
[API / data integrator entry point](entry-api-integrator.md). If your
component is the UI layer of a wholly new feature, first read the
[new feature developer entry point](entry-new-feature-developer.md) so you
understand the surrounding layers you'll be producing alongside the UI.
