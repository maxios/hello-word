---
dep:
  type: decision-record
  audience: [release-eng]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [eas.json]
  tags: [decision, eas, release, channel, profile]
  links:
    - target: ../reference/eas-profiles.md
      rel: DECIDES
---

# DR-002: Current EAS Profile And Channel Split

## Status

Accepted.

## Context

The project ships to two user-facing environments — staging and production
— and also needs local development builds for simulator, emulator, and
physical devices. Each of those targets requires a different combination
of channel (for EAS Update), distribution method (internal vs store), and
Android packaging (APK vs app-bundle). A simpler two-environment model —
"dev" and "prod" — was considered, but it either forced staging builds to
masquerade as production (polluting the production update channel) or
required manual per-release configuration.

## Decision

Maintain four logical environments, mapped to EAS profiles and update
channels as follows:

1. **development** — `development-device`, `development-simulator`;
   channel `development`; internal distribution; dev client enabled.
2. **preview** — `preview`; no channel; used for ad-hoc pre-release
   builds with auto-increment.
3. **stage** — `staging`, `staging-apk`; channel `stage`; iOS store
   distribution; Android APK for sideload-friendly QA.
4. **production** — `production`, `production-apk`; channel `production`;
   iOS store distribution; Android app-bundle for Play Store, plus
   APK variant for sideload scenarios.

The channel names (`development`, `stage`, `production`) are deliberately
distinct so that EAS Update can never deliver a staging bundle to a
production runtime or vice versa.

## Alternatives Considered

**Two environments (`dev` and `prod`) sharing channels.** Rejected
because staging releases would bleed into the production update channel,
which can cause users on production binaries to pick up unverified OTA
updates.

**One profile per target (device × simulator × OS × env).** Rejected
because the matrix explodes into dozens of profiles and the differences
between them are noise (resource class, image version) not policy.

**Omit APK variants; use app-bundle everywhere on Android.** Rejected
because QA sideloads APKs for pre-release testing and stakeholders
installing staging on-device need a signed APK they can install without
the Play Store path.

## Consequences

Release engineers pick a profile by asking two questions: *is this a
native change or an OTA?* and *what environment is this going to?* The
answer maps to exactly one profile. The submit profiles mirror the build
profiles one-to-one; there is no cross-over between staging builds
submitted to production tracks or vice versa.

The `production` submit Android track is `internal` rather than
`production` — this is deliberate, so that a successful EAS submit does
not immediately roll out to real users; promotion to production track
happens manually in the Play Console. Changing this would make the
production submit a live release, which is explicitly NOT the current
policy.

## Review Trigger

Re-open this decision if any of the following occur: the project adds a
third user-facing environment (e.g., canary); the Android release policy
changes to auto-promote to the production track; EAS collapses
profile/channel into a single concept.
