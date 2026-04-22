---
dep:
  type: how-to
  audience: [release-eng]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [eas.json, app.json, package.json]
  tags: [eas, production, native, build, submit, how-to]
  links:
    - target: ../reference/eas-profiles.md
      rel: REQUIRES
    - target: ./ship-a-staging-ota-update.md
      rel: USES
---

# How To — Cut A Production Native Build And Submit To Stores

**Goal:** build a new production binary for iOS and Android via EAS and
submit it to the App Store and Play Store.

**Prerequisites:** you are authenticated (`eas whoami`); the change has
been validated on staging; release notes are drafted; you are on the
commit you intend to ship.

## Steps

1. Verify the release plan. A production build is required (not an OTA)
   when any of the following is true:

   - A new native dependency or Expo config plugin shipped.
   - `app.json` / `app.config.*` was changed.
   - New permissions, icons, or splash assets shipped.
   - The runtime version must be bumped.

   If none of these apply, use
   [Ship A Staging OTA Update](./ship-a-staging-ota-update.md) against
   the production channel instead.

2. Cut the build. For both platforms in one step:

   ```bash
   npm run eas:submit:all:production
   ```

   For a single platform:

   ```bash
   npm run eas:submit:ios:production
   npm run eas:submit:android:production
   ```

   These commands build AND submit. If you want to build without
   submitting (to inspect the artefact first), use:

   ```bash
   npm run eas:build-android:production
   ```

3. Monitor the build in the EAS dashboard until it reaches `finished`.
   Capture the build ID for the release log.

4. For iOS, approve the build in App Store Connect and proceed to
   TestFlight and/or release review. For Android, the submit targets the
   Play Store `internal` track; promote to production in the Play Console
   when ready. (This split is intentional — see
   [DR-002](../decision-records/dr-002-eas-profile-channel-split.md).)

5. Install the production binary on a device and smoke-test the feature
   set before promoting to wider release.

## Verification

- EAS build status is `finished` for both platforms.
- Submit steps complete without errors. For iOS, the build is visible in
  TestFlight. For Android, the build is visible on the `internal` track.
- Release log records the commit SHA, build ID per platform, and
  release-note summary.
- The installed production binary renders the change correctly under
  `CHANNEL=production`.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| iOS build fails code signing | Certificate or profile expired | Regenerate via `eas credentials`; re-run build |
| Android submit fails "track not found" | Wrong track configured | Confirm submit config in `eas.json` targets `internal` |
| Play Console rejects | Metadata gap | Update listing in Play Console; resubmit |
| EAS auto-increment diverges between platforms | Build run per platform without sync | Use `eas:submit:all:production` so both increment in one operation |
