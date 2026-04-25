---
type: how-to
audience: [release-eng, new-dev]
owner: khaled.mailhub@gmail.com
created: 2026-04-22
last_verified: 2026-04-22
confidence: high
depends_on: []
tags: [expo, eas, release, setup, identifiers]
links:
  - docs/dep/reference/eas-profiles.md
---

# Replace the placeholder identifiers before shipping

Flota ships with placeholder IDs so the project compiles without leaking
anyone else's credentials. Before your first real build, replace them.

## 1. App identity (`app.json`)

- `owner`: set to your Expo account/organisation username.
- `extra.eas.projectId`: run `eas init` from the repo root; it fills this in.
- `updates.url`: set automatically by `eas init` after `eas update:configure`.
- `ios.bundleIdentifier` and `android.package`: change from `com.flota.app` to
  your real reverse-DNS identifier.
- `extra.eas.build.experimental.ios.appExtensions[].bundleIdentifier`: match
  the new identifier (e.g. `com.<you>.<app>.richpush`).

## 2. Build config (`eas.json`)

Replace every `com.flota.app` with your new bundle ID. Fill in:

- `submit.staging.ios.ascAppId`: the App Store Connect app ID.
- `submit.production.ios.ascAppId`: same.
- `submit.*.ios.appleTeamId`: your Apple developer team ID.
- `submit.staging.ios.appName`: your app's display name.

## 3. Firebase / Google services

Replace the two placeholder files with the versions Google Cloud generates
for your project:

- [GoogleService-Info.plist](../../../GoogleService-Info.plist) (iOS)
- [google-services.json](../../../google-services.json) (Android)

Make sure the `BUNDLE_ID` / `package_name` inside those files matches the IDs
you set in `app.json`.

## 4. GraphQL endpoint (`.env`)

```bash
cp .env.example .env
# Edit .env:
# EXPO_PUBLIC_GRAPHQL_URL=https://your-yoga-server.example.com/api/graphql
```

If you also want codegen to introspect your schema, set the same variable in
your shell before running `npm run codegen` — it is read by [codegen.ts](../../../codegen.ts).

## 5. Sanity checklist

Run these commands — all should succeed before you kick off a build:

```bash
npm run lint
npx tsc --noEmit
npm run codegen
```

Then a sanity build:

```bash
eas build --profile development-simulator --platform ios
```

If the build fails with a bundle ID mismatch, it is almost always step 1
or step 3 above: search the repo for `com.flota.app` or `flota-placeholder`
and replace any remaining instances.
