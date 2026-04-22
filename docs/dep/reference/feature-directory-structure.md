---
dep:
  type: reference
  audience: [new-dev, ui-dev, integrator]
  owner: khaled.mailhub@gmail.com
  created: 2026-04-22
  last_verified: 2026-04-22
  confidence: medium
  depends_on: [.docspec, CLAUDE.md, src/features/auth]
  tags: [feature, layout, directory, conventions, ui-as-api]
  links:
    - target: ../explanation/ui-as-api-layering.md
      rel: EXPLAINS
    - target: ../explanation/micro-product-methodology.md
      rel: EXPLAINS
    - target: ../tutorials/scaffold-your-first-feature.md
      rel: TEACHES
---

# Feature Directory Structure

Every feature in `src/features/<feature-name>/` MUST follow the layout below.
This reference is the authoritative listing; if a feature deviates, the
deviation is a bug, not a convention.

## Canonical Layout

```
src/features/<feature-name>/
├── README.md
├── index.ts
├── components/
├── containers/
├── hooks/
├── mappers/
├── schemas/
└── services/
```

## Directory Entries

| Directory | Contents | Allowed File Types | Forbidden |
|-----------|----------|--------------------|-----------|
| `components/` | Pure UI components that render props and call callbacks | `*.tsx`, `*.playground.tsx`, `*.test.tsx` | Data fetching, hook calls into GraphQL, business logic |
| `containers/` | Orchestration components that wire action hooks to UI components | `*.tsx` | Style overrides, UI structure (delegate to `components/`) |
| `hooks/` | Action hooks encapsulating business logic | `use*.ts` | JSX, styling |
| `mappers/` | Declarative API-to-UI-schema transformers | `*Mapper.ts` | Network calls, stateful logic |
| `schemas/` | TypeScript interfaces defining UI data contracts | `*.types.ts` | Implementation code |
| `services/` | Feature-local data access (and cache/optimistic-update logic) | `*Service.ts` | UI rendering |

## File Entries

| File | Purpose | Required |
|------|---------|----------|
| `index.ts` | Feature barrel — re-exports every public component, container, hook, service, mapper, and type | Yes |
| `README.md` | Short description of the feature, its audiences, and any non-obvious constraints | Yes |

## `index.ts` Contents

The `index.ts` MUST re-export, in this order:

1. Components (pure UI)
2. Containers
3. Hooks
4. Services
5. Mappers
6. Types (via `export *` from `./schemas/<feature>.types`)

Reference implementation: `src/features/auth/index.ts`.

## Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Feature directory | kebab-case | `src/features/meal-plan/` |
| UI component file | PascalCase, matches exported component | `LoginForm.tsx` |
| Container file | PascalCase, suffix `Container` | `LoginContainer.tsx` |
| Action hook file | camelCase, prefix `use`, suffix `Actions`/`State` | `useLoginActions.ts` |
| Mapper file | camelCase, suffix `Mapper` | `authMapper.ts` |
| Schema file | camelCase, suffix `.types` | `auth.types.ts` |
| Service file | camelCase, suffix `Service` | `authService.ts` |
| Playground file | matches component, suffix `.playground` | `LoginForm.playground.tsx` |

## Layer Boundary Constraints

| Layer | May Import From | May NOT Import From |
|-------|----------------|---------------------|
| `schemas/` | Nothing feature-local | Any other layer |
| `mappers/` | `schemas/`, GraphQL codegen types | `components/`, `containers/`, `hooks/` |
| `services/` | `schemas/`, `mappers/`, `lib/graphql.ts` | `components/`, `containers/` |
| `hooks/` | `schemas/`, `services/`, `mappers/` | `components/`, `containers/` |
| `components/` | `schemas/` (types only), other `components/` | `hooks/`, `services/`, `mappers/`, `lib/graphql.ts` |
| `containers/` | `components/`, `hooks/`, `schemas/` | `lib/graphql.ts` directly |

## Cross-References

Scaffolding walkthrough: [Scaffold Your First Feature](../tutorials/scaffold-your-first-feature.md).
Layering rationale: [Why UI-as-API Layering](../explanation/ui-as-api-layering.md).
Vertical-slice rationale: [Why Micro-Product Methodology](../explanation/micro-product-methodology.md).
