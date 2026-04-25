# Flota

An opinionated Expo + Yoga GraphQL starter that doubles as a **living reference** for the stack.

Every tab, component, and doc exists to answer one question: *how do I use `<stack piece>` in this project?*

## Stack

- **Expo 53** + **React Native 0.79** — cross-platform runtime
- **Expo Router** — file-based routing with nested layouts, dynamic routes, modals, protected routes
- **NativeWind 4** + **Tailwind** — utility-first styling with design tokens and dark mode
- **Yoga GraphQL** + **graphql-request** + **GraphQL Code Generator** — type-safe API layer
- **@tanstack/react-query** — server-state with optimistic updates
- **react-hook-form** + **valibot** — form state + schema validation
- **React Cosmos** — component playground
- **DEP** (Documentation Engineering Process) — `.docspec`-driven docs under `docs/dep/`

## Architecture

Flota follows a **UI-as-API micro-product** pattern (full write-up in [CLAUDE.md](CLAUDE.md) and [docs/dep/explanation/ui-as-api-layering.md](docs/dep/explanation/ui-as-api-layering.md)). Each feature ships six layers: schemas → mapper → collection → action hook → pure UI → container.

The `catalog` tab (`app/(tabs)/catalog/`) is the canonical end-to-end example.

## Quick start

```bash
npm install
cp .env.example .env   # optional — defaults to public Countries GraphQL API
npm run start
```

Then press `i`, `a`, or `w` to open iOS, Android, or web.

## Tabs at a glance

| Tab | Demonstrates |
| --- | --- |
| `home` | Entry point, design-token usage, links to every other demo, modal and protected-route launchers |
| `catalog` | GraphQL query + dynamic route `[id]` + full 6-layer UI-as-API feature |
| `compose` | Every field component composed into one form + GraphQL mutation with optimistic update |
| `settings` | Dark-mode toggle, typography scale, color-token gallery |
| `playground` | React Cosmos component catalog |

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run start` | Expo dev server |
| `npm run dev` | Dev server with custom dev client |
| `npm run ios` / `npm run android` / `npm run web` | Platform shortcuts |
| `npm run cosmos` | React Cosmos component playground |
| `npm run codegen` | Generate TypeScript types from the GraphQL schema |
| `npm run codegen:watch` | Watch-mode codegen |
| `npm run lint` | ESLint |

## Before shipping your own app

1. Replace placeholder IDs across [app.json](app.json), [eas.json](eas.json), [GoogleService-Info.plist](GoogleService-Info.plist), [google-services.json](google-services.json). See [docs/dep/how-to/replace-placeholder-identifiers.md](docs/dep/how-to/replace-placeholder-identifiers.md).
2. Point `EXPO_PUBLIC_GRAPHQL_URL` at your own Yoga GraphQL server in `.env`.
3. Run `eas init` to generate a real `projectId` and `updates.url`.
4. Drop in a real icon, splash screen, and favicon under [src/shared/assets/](src/shared/assets/).

## Docs

- [CLAUDE.md](CLAUDE.md) — architecture overview for AI assistants and humans
- [docs/dep/index.md](docs/dep/index.md) — DEP documentation entry point
- [.docspec](.docspec) — documentation source of truth

## License

MIT.
