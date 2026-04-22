---
dep:
  type: how-to
  audience: [release-eng]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [eas.json, package.json]
  tags: [eas, ota, staging, release, how-to]
  links:
    - target: ../reference/eas-profiles.md
      rel: REQUIRES
    - target: ./cut-a-production-native-build.md
      rel: NEXT
---

# How To — Ship A Staging OTA Update

**Goal:** publish a JavaScript-only update to the `stage` EAS Update
channel so staging installs pick it up on next app open.

**Prerequisites:** the change is JavaScript-only (no new native modules,
permissions, icons, or config plugins); you are authenticated to EAS
(`eas whoami`); you are on the commit you intend to ship.

## Steps

1. Confirm the change is JS-only. Any of these indicate a native change
   and require a fresh build instead:

   - New or updated dependency that ships native code.
   - Changes to `app.json`, `app.config.*`, or an Expo config plugin.
   - New static asset referenced by native config.
   - New permission string (iOS Info.plist / Android manifest).

2. Run the staging update command:

   ```bash
   npm run update-staging
   ```

   This is an alias for `eas update --channel staging`. For the explicit,
   non-aliased form:

   ```bash
   npm run eas:update:staging
   ```

   EAS prompts for a message; describe the user-visible change, not the
   file-level diff.

3. Wait for the update to publish. EAS prints the update group ID and the
   runtime versions it applies to. Copy the group ID into the release log.

4. Verify on a staging install:

   - Force-quit the app on a device that has a staging build installed.
   - Reopen. The update should apply within one cold start.
   - Inspect the feature you changed and confirm behaviour.

## Verification

- `eas update` exits with status 0 and prints an update group ID.
- The group ID's runtime version matches the runtime version of the
  currently-deployed staging binaries (otherwise staging users will not
  receive the update until a matching binary ships).
- The staging device picks up the change on cold start.

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Update publishes but device never receives it | Runtime version mismatch | Build a new staging binary (native build) on the same runtime |
| EAS rejects publish | Not authenticated | `eas login` |
| Update rolls back users | A native dependency was inadvertently changed | Revert; cut a native build instead of an OTA |

## Next

If the change is in fact native, follow
[Cut A Production Native Build & Submit To Stores](./cut-a-production-native-build.md)
(or the staging equivalent).
