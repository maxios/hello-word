---
dep:
  type: reference
  audience: [release-eng]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: high
  depends_on: [eas.json, app.json, package.json]
  tags: [eas, build, profile, channel, release]
  links:
    - target: ../how-to/ship-a-staging-ota-update.md
      rel: USES
    - target: ../how-to/cut-a-production-native-build.md
      rel: USES
    - target: ../decision-records/dr-002-eas-profile-channel-split.md
      rel: EXPLAINS
---

# EAS Profiles Reference

This reference enumerates every build and submit profile declared in
[eas.json](../../../eas.json). The `npm run` script aliases are listed where
defined in [package.json](../../../package.json).

## Build Profiles

### `development-device`

| Field | Value |
|-------|-------|
| Purpose | Local dev build for a physical device |
| Channel | `development` |
| Distribution | `internal` |
| Dev client | `true` |
| iOS image | `macos-sequoia-15.3-xcode-16.2` |
| iOS resource class | `m-medium` |
| Env | `CHANNEL=development`, `BUNDLE_ID=com.strong.andsxy` |
| Script alias | `eas:device:build`, `eas:device:android:build` |

### `development-simulator`

| Field | Value |
|-------|-------|
| Purpose | Local dev build for iOS simulator / Android emulator |
| Channel | `development` |
| Distribution | `internal` |
| Dev client | `true` |
| iOS | `simulator: true`, image `latest` |
| Android | image `auto`, resource class `large`, buildType `apk` |
| Script alias | `eas:simulator:build`, `eas:emulator:build`, `eas:simulator:run`, `eas:emulator:run` |

### `preview`

| Field | Value |
|-------|-------|
| Purpose | Pre-release preview build |
| Auto-increment | `true` |
| iOS distribution | `store` |
| iOS resource class | `m-medium` |
| Android buildType | `apk` |
| Script alias | — |

### `staging`

| Field | Value |
|-------|-------|
| Purpose | Staging release (store-path on iOS, APK on Android) |
| Channel | `stage` |
| Auto-increment | `true` |
| iOS distribution | `store` |
| iOS resource class | `large` |
| Android image | `auto`, buildType `apk` |
| Env | `CHANNEL=stage` |
| Script alias | `eas:build-android:staging`, `eas:submit:android:staging`, `eas:submit:ios:staging` |

### `staging-apk`

| Field | Value |
|-------|-------|
| Extends | `staging` |
| Purpose | APK variant of staging for sideload distribution |
| Android buildType | `apk` (override) |
| Script alias | `eas:build-android:staging:apk` |

### `production`

| Field | Value |
|-------|-------|
| Purpose | Production release (store submission) |
| Channel | `production` |
| Auto-increment | `true` |
| iOS image | `macos-sequoia-15.3-xcode-16.2`, resource class `large` |
| Android image | `auto`, resource class `large`, buildType `app-bundle` |
| Env | `CHANNEL=production`, `BUNDLE_ID=com.strong.andsxy` |
| Script alias | `eas:submit:all:production`, `eas:submit:ios:production`, `eas:submit:android:production`, `eas:build-android:production` |

### `production-apk`

| Field | Value |
|-------|-------|
| Extends | `production` |
| Purpose | APK variant of production for sideload distribution |
| Android resource class | `large` |
| Android buildType | `apk` (override) |
| Script alias | `eas:build-android:production:apk`, `eas:submit:android:production-apk` |

## Submit Profiles

### `staging` (submit)

| Platform | Field | Value |
|----------|-------|-------|
| iOS | bundleIdentifier | `com.strong.andsxy` |
| iOS | ascAppId | `1492688256` |
| iOS | appleTeamId | `FYSL5V9UHX` |
| iOS | appName | `STRNG` |
| Android | — | Not configured (staging iOS-only submit) |

### `production` (submit)

| Platform | Field | Value |
|----------|-------|-------|
| iOS | bundleIdentifier | `com.strong.andsxy` |
| iOS | ascAppId | `1492688256` |
| iOS | appleTeamId | `FYSL5V9UHX` |
| Android | applicationId | `com.strong.andsxy` |
| Android | track | `internal` |

## EAS Update Channels

| Channel | Used By Profile(s) | Script |
|---------|-------------------|--------|
| `development` | `development-device`, `development-simulator` | — |
| `stage` | `staging`, `staging-apk` | `update-staging`, `eas:update:staging` |
| `production` | `production`, `production-apk` | `eas:update:production` |

## Decision Matrix

| Scenario | Native Change? | Target Env | Run |
|----------|---------------|-----------|-----|
| JS-only fix, staging | No | stage | `npm run update-staging` |
| JS-only fix, prod | No | production | `npm run eas:update:production` |
| Native change, staging iOS | Yes | stage | `npm run eas:submit:ios:staging` |
| Native change, staging Android | Yes | stage | `npm run eas:submit:android:staging` |
| Native change, prod both | Yes | production | `npm run eas:submit:all:production` |

## Cross-References

Staging OTA procedure: [Ship a Staging OTA Update](../how-to/ship-a-staging-ota-update.md).
Production native procedure: [Cut a Production Native Build](../how-to/cut-a-production-native-build.md).
Rationale for this profile split: [DR-002](../decision-records/dr-002-eas-profile-channel-split.md).
