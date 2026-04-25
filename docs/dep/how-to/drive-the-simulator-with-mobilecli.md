---
type: how-to
audience: [new-dev, ui-dev]
owner: khaled.mailhub@gmail.com
created: 2026-04-24
last_verified: 2026-04-24
confidence: high
depends_on: [package.json, app.json]
tags: [simulator, ios, android, automation, mobilecli, screenshot]
links:
  - target: ../explanation/entry-ui-component-developer.md
    rel: USES
---

# Drive the simulator / emulator with mobilecli

[mobilecli](https://github.com/mobile-next/mobilecli) is a cross-platform CLI
for iOS simulators, Android emulators, and real devices. Flota ships
`bunx`-based shortcuts in [package.json](../../../package.json) so you don't
need it globally installed.

Use this when you want to:

- List devices from a script.
- Boot / shutdown a simulator without opening Xcode.
- Take a screenshot to attach to a PR description or to share with Claude.
- Tap, type, or press a hardware button programmatically (UI smoke scripts).

## Prerequisites

- **iOS:** Xcode installed (for `xcrun simctl` + WebDriverAgent).
- **Android:** Android SDK with `adb` on `$PATH`.
- **Dev build:** Flota uses a development build (not Expo Go). You need a
  local build installed before `mobile:launch` can open the app — see
  [run-a-local-ios-dev-build.md](./run-a-local-ios-dev-build.md).

## 1. List connected devices

```bash
npm run mobile:devices
```

Returns JSON. Empty `devices` array means nothing is booted — boot a sim
with `xcrun simctl boot <UDID>` or `emulator -avd <name>` first.

## 2. Boot / shutdown by device id

```bash
npm run mobile:boot -- <device-id>
npm run mobile:shutdown -- <device-id>
```

Pass the UDID from `mobile:devices` (or `xcrun simctl list devices`).

## 3. Install the mobilecli agent (iOS, first run only)

Screenshots on iOS go through a WebDriverAgent that mobilecli installs
on demand:

```bash
bunx mobilecli@latest agent install --device <device-id>
```

The first screenshot after a cold boot takes ~5 s while WDA starts.

## 4. Launch Flota

```bash
npm run mobile:launch -- <device-id>
```

Equivalent to `bunx mobilecli@latest apps launch com.flota.app --device <id>`.
Change the bundle ID if you rebranded `com.flota.app`.

## 5. Take a screenshot

```bash
npm run mobile:screenshot -- <device-id>
```

Writes `.screenshots/shot.png` at the repo root. `.screenshots/` is
gitignored — use it as a scratch directory.

To keep multiple shots:

```bash
bunx mobilecli@latest screenshot --device <id> --output .screenshots/catalog.png
```

## 6. Tap / type / press buttons

```bash
npm run mobile:tap   -- <device-id> 195,680
npm run mobile:text  -- <device-id> "hello from mobilecli"
npm run mobile:home  -- <device-id>
```

Coordinates are in device points (origin top-left). Use the Simulator
coordinate display or a single screenshot to find targets.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `devices: []` when a sim window is open | Boot via `xcrun simctl boot <UDID>` or `npm run mobile:boot -- <UDID>` |
| `failed to start agent: timed out waiting for WebDriverAgent to be ready` | First-run latency; retry after ~10 s, or run `bunx mobilecli@latest agent install --device <id>` once manually |
| `CommandError: No development build (com.flota.app) for this project is installed` | Run `bun run ios` or `npx expo run:ios --device <id>` to install the dev build first |
| Screenshots are black | The Simulator window is occluded or minimised; bring it to the foreground |

## See also

- [mobilecli README](https://github.com/mobile-next/mobilecli) — canonical flags and platform notes.
- [DR-005 · Defer the GraphQL subscription demo](../decision-records/dr-005-subscription-deferral.md) — for a similar "defer when infra-heavy" pattern.
