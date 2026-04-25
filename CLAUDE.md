# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**About this repo:** Flota is a generic Expo + Yoga GraphQL starter that doubles as a **living reference** for the stack. Every tab, component, and doc exists to demonstrate how to use one piece of the stack (Expo Router, NativeWind, GraphQL + codegen, React Cosmos, UI-as-API, DEP). When adding code, ask: "does this make the stack easier to learn, or is it specific to one app?" — if the latter, it probably doesn't belong.

## Documentation: DEP with `.docspec` as Source of Truth

This project uses **DEP (Documentation Engineering Process)** for all project documentation. The `.docspec` file at the repository root is the **single source of truth** for documentation structure, audiences, governance, and generation rules.

**Core rules**:

- **`.docspec` is authoritative.** Audiences, directory layout, review cadence, and ownership are defined there — do not invent parallel structures elsewhere.
- **Generated docs live under `docs/dep/`** in the Diátaxis-style folders declared by `.docspec` (`tutorials/`, `how-to/`, `reference/`, `explanation/`, `decision-records/`).
- **Every doc has DEP frontmatter** (`type`, `audience`, `owner`, `created`, `last_verified`, `confidence`, `depends_on`, `tags`, `links`). Types must stay pure — no how-to steps in explanation docs, no rationale in reference docs.
- **When code changes invalidate a doc**, update the doc (and its `last_verified`) in the same change, or run the DEP sync skill.
- **Entry points per audience** are declared in `.docspec` under `audiences[].entry_point`; the docs index at [docs/dep/index.md](docs/dep/index.md) mirrors them.

**DEP skills to use**:

- `dep:dep-generate` — scaffold or generate docs against `.docspec`.
- `dep:dep-sync` — reconcile doc freshness with recent code changes.
- `dep:dep-validate` — check frontmatter, type purity, graph integrity, and lifecycle freshness.
- `dep:dep-audit` — retrofit DEP compliance onto existing unstructured docs.

When asked to write, update, or reorganize docs in this repo: read `.docspec` first, then run the appropriate DEP skill rather than editing freeform.

## Commands

### Development

- `npm run start` - Start the Expo development server
- `npm run dev` - Start with dev client (preferred for development with custom native code)
- `npm run android` - Start and open on Android emulator
- `npm run ios` - Start and open on iOS simulator
- `npm run web` - Start and open in web browser
- `npm run cosmos` - Launch React Cosmos for component development/testing
- `npm run lint` - Run ESLint for code linting

### GraphQL Code Generation

- `npm run codegen` - Generate TypeScript types from GraphQL schema
- `npm run codegen:watch` - Watch mode for continuous GraphQL code generation
- `npm run codegen:introspection` - Generate schema introspection file

### Building & Deployment

- `eas build --profile production --platform all --auto-submit` - Build and submit to both stores
- `eas build --profile staging --platform android` - Build staging APK for Android
- `eas build --profile production --platform ios --auto-submit` - Build and submit iOS to App Store
- `eas update --channel staging --auto` - Deploy OTA update to staging
- `eas update --channel production --auto` - Deploy OTA update to production

## Architecture

### Tech Stack

- **Framework**: Expo 53 with React Native 0.79
- **Navigation**: Expo Router with file-based routing
- **Styling**: NativeWind (Tailwind CSS for React Native) + custom design tokens
- **GraphQL**: Yoga GraphQL with graphql-request client
- **Package Manager**: npm (with Bun lock file for faster installs)
- **Code Generation**: GraphQL Code Generator for TypeScript types
- **UI Library**: Custom component system with playground/showcase
- **Development Tools**: React Cosmos for component development

### Project Structure

- `app/` - File-based routing with Expo Router
  - `(tabs)/` - Tab-based navigation: `home`, `catalog` (6-layer query demo), `compose` (form + mutation demo), `settings` (theme demo), `playground` (React Cosmos)
  - `(auth-gated)/` - Protected-route demo group
  - `auth/` - Authentication flows (login, signup, password reset)
  - `api/graphql+api.ts` - Local Yoga mock for mutation/auth demos
  - `modal.tsx` - Modal-route demo
  - `_layout.tsx` - Root layout with splash screen, font loading
- `components/` - Reusable UI components
  - `playground/` - Component showcase system for development
  - `fields/` - Form field components with playground demos
  - `Button/` - Button system with extensive variants and playground demos
  - `icons/` - Custom SVG icon components
  - `ui/` - Platform-specific UI components
- `lib/` - Core utilities (GraphQL client, error handling, logging)
- `constants/` - Design tokens, colors, and configuration
- `const/` - Additional constants and font configurations

### Design System

- Custom Tailwind configuration with design tokens in `tailwind.config.ts`
- Typography system with Poppins (headings) and Open Sans (body text)
- Component playground system using React Cosmos for component development and showcasing
- Color system defined in `constants/Colors`
- Font loading handled in `app/_layout.tsx` with custom font families

### Key Features

- Authenticated user flows with Yoga GraphQL integration
- Component playground accessible via floating eye button in bottom-right corner
- Animated splash screen with asset preloading
- File-based routing with protected routes structure
- Custom toast system and gesture handling setup

### GraphQL Integration

- **Client**: Uses `graphql-request` for lightweight GraphQL operations
- **Endpoint**: Driven by `EXPO_PUBLIC_GRAPHQL_URL`. Default: `https://countries.trevorblades.com/graphql` (public demo, queries only). Mutations in `compose` go to the local Yoga mock at `app/api/graphql+api.ts`.
- **Code Generation**: Automatic TypeScript type generation from GraphQL schema
- **Usage**: Import `request` from `lib/graphql.ts` to make GraphQL queries
- **Schema**: GraphQL schema and introspection files generated in `src/gql/`

Example GraphQL usage:
```typescript
import { request } from '@/lib/graphql';
import { gql } from 'graphql-request';

const query = gql`
  query GetData {
    // your query fields
  }
`;

const data = await request(query, variables);
```

### Development Workflow

- Use React Cosmos (`npm run cosmos`) for component development and testing
- Component playground system allows viewing all component variations with code examples
- Playground files use `.playground.tsx` extension and export component showcases
- All components should follow the established playground pattern for documentation

## Development Methodologies

### Micro-Product Development Strategy

This project follows a micro-product methodology for feature development:

**Definition**: Each feature is built as a complete, self-contained "micro-product" that includes all necessary layers - UI/UX, business logic, data management, testing, documentation, and integration patterns.

**Implementation Pattern**:

1. **Feature Selection**: Choose bounded, representative features with moderate complexity
2. **Complete Implementation**: Build full vertical slice including all architectural layers
3. **Pattern Documentation**: Document architectural decisions and reusable patterns
4. **Replication**: Use established patterns as templates for new features

**Quality Standards**:

- All features must include comprehensive testing (unit, integration, e2e)
- Complete documentation with usage examples and architecture decisions
- Consistent file organization and naming conventions
- Integration with existing design system and component patterns

### UI-as-API Architecture

The codebase implements a UI-as-API pattern with clear separation of concerns:

**Architecture Layers**:

1. **UI Schemas** - TypeScript interfaces defining component data contracts
2. **Mapping Engine** - Declarative JSON configurations for API-to-UI data transformation
3. **Collections** - Data storage with caching, normalization, and optimistic updates
4. **Action Hooks** - Encapsulated business logic returning ready-to-use functions
5. **Pure UI Components** - Presentation-only components that render props and call callbacks
6. **Container Components** - Thin orchestration layer connecting data and actions to UI

**Key Principles**:

- UI components are pure functions that only render props and call callbacks
- All business logic lives in action hooks, not components
- Data transformation happens through declarative mappers
- Each layer has well-defined responsibilities and boundaries
- Components declare their data requirements through TypeScript schemas

**File Organization for Features**:

```
feature-name/
├── components/
│   ├── FeatureName.tsx (pure UI)
│   ├── FeatureName.stories.tsx
│   └── subcomponents/
├── hooks/
│   ├── useFeatureActions.ts (business logic)
│   ├── useFeatureData.ts (data queries)
├── schemas/
│   └── featureName.types.ts (UI contracts)
├── mappers/
│   └── featureNameMapper.ts (data transformation)
├── collections/
│   └── featureNameCollection.ts (data storage)
└── containers/
    └── FeatureNameContainer.tsx (orchestration)
```

**Overall File Organization**:

```
src/
├── shared/
│   ├── services/
│   │   ├── api/
│   │   │   ├── httpClient.ts
│   │   │   ├── authService.ts
│   │   │   └── baseService.ts
│   │   ├── storage/
│   │   └── validation/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
├── features/
│   ├── feature-a/
│   ├── feature-b/
│   └── feature-c/
└── app/
    ├── store/
    ├── providers/
    └── config/
```
