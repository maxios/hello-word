# Authentication Feature - UI-as-API Architecture

## Overview

This authentication feature demonstrates the **UI-as-API architecture pattern** where UI components are pure presentation layers that declare their data requirements through TypeScript interfaces, while all business logic, data fetching, and state management is handled by separate layers.

## Architecture Layers

### 1. **UI Schemas** (`schemas/`)
TypeScript interfaces that define the exact data contracts UI components expect.

- `auth.types.ts` - All authentication-related type definitions
  - `LoginFormData` - Login form input structure
  - `UserSession` - User session data structure
  - `AuthError` - Standardized error structure
  - `ValidationRules` - Form validation rules

### 2. **Services** (`services/`)
External API communication and token management.

- `authService.ts` - Authentication service singleton
  - Login/signup API calls
  - Token storage with AsyncStorage
  - Session management

### 3. **Mappers** (`mappers/`)
Data transformation layer between API and UI schemas.

- `authMapper.ts` - Transforms API responses to UI-friendly schemas
  - `mapUserSession()` - API user data to UserSession
  - `mapError()` - API errors to AuthError
  - `mapLoginRequest()` - Form data to API format

### 4. **Action Hooks** (`hooks/`)
Business logic encapsulation in reusable hooks.

- `useLoginActions.ts` - Login form submission and validation
- `useAuthState.ts` - Global authentication state management
- `usePasswordResetActions.ts` - Password reset flow

### 5. **Pure UI Components** (`components/`)
Presentation-only components with zero business logic.

- `LoginForm.tsx` - Pure login form component
  - Only renders props
  - Calls callbacks for actions
  - No direct API calls or state management

### 6. **Container Components** (`containers/`)
Thin orchestration layer connecting data and actions to UI.

- `LoginContainer.tsx` - Connects login actions to LoginForm

## Usage Example

```tsx
// In your route file (e.g., pages/auth/login.tsx)
import { LoginContainer } from '@/src/features/auth';

export default function LoginPage() {
  return <LoginContainer />;
}
```

## Data Flow

```
User Input → Pure UI Component → Container → Action Hook → Service → API
                ↑                    ↑            ↓
                └────────────────────┴─ Mapper ←─┘
```

1. User interacts with **Pure UI Component**
2. Component calls callback passed from **Container**
3. Container uses **Action Hook** to handle business logic
4. Action Hook calls **Service** for API communication
5. Service response is transformed by **Mapper**
6. Mapped data flows back through hooks to UI

## Key Benefits

### Separation of Concerns
- UI developers focus on presentation
- Backend developers focus on data and logic
- Clear boundaries between layers

### Testability
- Pure UI components are easy to test with mocked props
- Business logic can be tested independently in hooks
- Mappers can be tested with sample data

### Reusability
- Components work with any data source
- Hooks can be shared across different UIs
- Mappers are reusable for similar API responses

### Maintainability
- Changes in one layer don't cascade
- API changes only affect mappers
- UI changes don't touch business logic

## Testing Strategy

### Pure UI Components
```tsx
// Test only rendering and callbacks
const { getByText } = render(
  <LoginForm
    onSubmit={mockSubmit}
    isLoading={false}
    error={null}
  />
);
fireEvent.press(getByText('Log in'));
expect(mockSubmit).toHaveBeenCalled();
```

### Action Hooks
```tsx
// Test business logic independently
const { result } = renderHook(() => useLoginActions());
await act(async () => {
  await result.current.login(mockCredentials);
});
expect(authService.login).toHaveBeenCalled();
```

### Mappers
```tsx
// Test data transformation
const mapped = AuthMapper.mapUserSession(apiResponse);
expect(mapped.displayName).toBe('John Doe');
```

## Adding New Features

To add a new authentication feature (e.g., signup):

1. **Define Schema** - Add types to `auth.types.ts`
2. **Create Service Method** - Add to `authService.ts`
3. **Add Mapper** - Extend `authMapper.ts`
4. **Create Action Hook** - New file in `hooks/`
5. **Build Pure UI** - New component in `components/`
6. **Create Container** - New file in `containers/`
7. **Use in Route** - Import container in page file

## File Organization

```
src/features/auth/
├── components/           # Pure UI components
│   ├── LoginForm.tsx
│   └── LoginForm.test.tsx
├── containers/          # Orchestration layer
│   └── LoginContainer.tsx
├── hooks/              # Business logic
│   ├── useLoginActions.ts
│   ├── useAuthState.ts
│   └── usePasswordResetActions.ts
├── mappers/            # Data transformation
│   └── authMapper.ts
├── schemas/            # Type definitions
│   └── auth.types.ts
├── services/           # API communication
│   └── authService.ts
├── index.ts            # Public exports
└── README.md           # This file
```

## Best Practices

1. **Keep Components Pure** - No business logic in UI components
2. **Type Everything** - Use TypeScript interfaces for all data
3. **Single Responsibility** - Each layer has one clear purpose
4. **Test Each Layer** - Unit tests for each architectural layer
5. **Document Schemas** - Clear documentation of data contracts