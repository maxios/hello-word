# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run start` - Start the Expo development server
- `npm run dev` - Start with dev client (preferred for development with custom native code)
- `npm run android` - Start and open on Android emulator
- `npm run ios` - Start and open on iOS simulator
- `npm run web` - Start and open in web browser
- `npm run cosmos` - Launch React Cosmos for component development/testing
- `npm run lint` - Run ESLint for code linting

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
- **State Management**: Apollo Client with GraphQL
- **UI Library**: Custom component system with playground/showcase
- **Development Tools**: React Cosmos for component development

### Project Structure

- `app/` - File-based routing with Expo Router
  - `(tabs)/` - Tab-based navigation with bottom tabs (home, meals, challenges, move, playground)
  - `auth/` - Authentication flows (login, signup, password reset)
  - `_layout.tsx` - Root layout with splash screen, font loading, Apollo hydration
- `components/` - Reusable UI components
  - `playground/` - Component showcase system for development
  - `fields/` - Form field components with playground demos
  - `Button/` - Button system with extensive variants and playground demos
  - `icons/` - Custom SVG icon components
  - `ui/` - Platform-specific UI components
- `lib/` - Core utilities (Apollo client, error handling, logging)
- `constants/` - Design tokens, colors, and configuration
- `const/` - Additional constants and font configurations

### Design System

- Custom Tailwind configuration with design tokens in `tailwind.config.ts`
- Typography system with Poppins (headings) and Open Sans (body text)
- Component playground system using React Cosmos for component development and showcasing
- Color system defined in `constants/Colors`
- Font loading handled in `app/_layout.tsx` with custom font families

### Key Features

- Authenticated user flows with Apollo GraphQL integration
- Component playground accessible via floating eye button in bottom-right corner
- Animated splash screen with asset preloading
- File-based routing with protected routes structure
- Custom toast system and gesture handling setup

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
│   ├── FeatureName.test.tsx
│   ├── FeatureName.stories.tsx
│   └── subcomponents/
├── hooks/
│   ├── useFeatureActions.ts (business logic)
│   ├── useFeatureData.ts (data queries)
│   └── *.test.ts
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

**Testing Strategy**:

- Test UI components with mocked props to verify rendering
- Test business logic in action hooks independently
- Test data transformations with mapper functions
- Integration tests for complete feature workflows
