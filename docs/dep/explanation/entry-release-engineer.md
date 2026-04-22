---
dep:
  type: explanation
  audience: [release-eng]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [.docspec, CLAUDE.md, eas.json, app.json, package.json]
  tags: [entry-point, eas, release, ota, staging, production]
  links:
    - target: ../index.md
      rel: REQUIRES
    - target: ../how-to/ship-a-staging-ota-update.md
      rel: NEXT
    - target: ../how-to/cut-a-production-native-build.md
      rel: NEXT
    - target: ../reference/eas-profiles.md
      rel: NEXT
    - target: ../decision-records/dr-002-eas-profile-channel-split.md
      rel: EXPLAINS
---

# Entry Point — Release Engineer

You are about to cut a build or ship an OTA update, and you need to pick the
right EAS profile and update channel without inventing the answer. This page
explains the release surface of strnger-app — the profile/channel matrix,
what each combination means, and where the guardrails live — so that the
decision becomes mechanical rather than inferential.

## What You're Releasing

strnger-app is an Expo application built on Expo 53 / React Native 0.79,
distributed through **EAS Build** (native binaries) and **EAS Update** (OTA
JavaScript bundles). Native changes — new modules, permission strings,
config plugins — require an EAS Build and, for production, a store
submission. JavaScript-only changes can be delivered over-the-air through
EAS Update on the matching channel.

This split is what you are really managing: every release is either a native
build (slow, user-visible update on the store, version-bumped) or an OTA
update (fast, seamless on next app open, constrained to the runtime version
already installed). Choosing the wrong one either ships too slowly or breaks
users whose runtime cannot accept the update.

## The Profile / Channel Matrix

The authoritative script list lives in
[package.json](../../../package.json) under `scripts`, and the profile
definitions live in [eas.json](../../../eas.json). At a high level:

- **Development (simulator/device):** `eas:simulator:build`,
  `eas:emulator:build`, `eas:device:build`, `eas:device:android:build`.
  These are for local work, not releases — they include dev tooling and
  should never be submitted to a store.
- **Staging:** `eas:build-android:staging`, `eas:submit:android:staging`,
  `eas:submit:ios:staging`, and `eas:update:staging` (OTA). Staging is where
  pre-release validation happens; the `update-staging` alias exists for
  convenience.
- **Production:** `eas:submit:all:production`,
  `eas:submit:ios:production`, `eas:submit:android:production`,
  `eas:build-android:production`, `eas:build-android:production:apk`, and
  `eas:update:production` (OTA). The `:all:production` and
  `:auto-submit`-suffixed variants both build and submit in one step, which
  is powerful and therefore worth pausing over before running.

The rule of thumb: a JavaScript-only fix on a shipped runtime uses
`eas update --channel <env> --auto`. A native change, new asset, or new
native config requires a fresh EAS Build and, for production, a store
submission.

## What You Should Read, In Order

1. [Ship A Staging OTA Update](../how-to/ship-a-staging-ota-update.md) —
   the safe-path procedure for JS-only updates against the `stage`
   channel.
2. [Cut A Production Native Build And Submit To Stores](../how-to/cut-a-production-native-build.md) —
   the procedure for a fresh production binary on iOS and Android.
3. [EAS Profiles Reference](../reference/eas-profiles.md) — every
   profile defined in `eas.json` with its channel, distribution target,
   and script alias.
4. [DR-002 — Current EAS Profile And Channel Split](../decision-records/dr-002-eas-profile-channel-split.md) —
   the rationale for the current environment layout.

## What Success Looks Like

A successful release has the right profile selected for the release type
(native vs OTA), the right channel selected for the target environment
(staging vs production), the store listing updated where applicable, and a
record in the release log of which commit and EAS build ID went out. A
release that shipped to production when it was meant for staging — or that
shipped a native change as an OTA — is a process failure, not just a
release failure, and should trigger a post-mortem.

## Where To Go Next

If you are also adding a new native module or config plugin in this release,
read the [new feature developer entry point](entry-new-feature-developer.md)
to understand the code you are shipping. If the release is a UI-only
redesign, the [UI / component developer entry point](entry-ui-component-developer.md)
explains what was likely changed under the hood.
