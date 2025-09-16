# SearchBar Micro-Product

## Overview

The SearchBar is a reusable, self-contained micro-product that provides search functionality with optional filtering capabilities. It follows the micro-product architecture pattern, demonstrating complete vertical integration from UI to business logic.

## Features

- 🔍 Real-time search input with form handling
- 🎯 Optional filter button with count display
- ⌨️ Keyboard management and submit handling
- 🔄 Configurable reset behavior on submit
- 🎨 Customizable placeholder and styling
- ♻️ Reusable hooks for search logic
- 🧪 Comprehensive test coverage

## Architecture

This micro-product demonstrates all layers of the architecture:

### Component Layer
- **SearchBar**: Main container component with form management
- **SearchBarInput**: Core input component with clear functionality
- **FilterButton**: Standalone filter button component

### State Management
- Form state managed via `react-hook-form`
- Custom `useSearchBar` hook for reusable search logic
- Local state for search value and loading states

### Business Logic
- Search input sanitization
- Debouncing support for real-time search
- Filter count formatting
- Keyboard dismissal on submit

### Type Safety
- Full TypeScript coverage with dedicated types module
- Strict typing for all props and return values
- Type-safe form handling

## Usage

### Basic Search

```tsx
import { SearchBar } from '@/components/SearchBar';

function MyComponent() {
  const handleSearch = (values: { search: string }) => {
    console.log('Searching for:', values.search);
  };

  return <SearchBar onSubmit={handleSearch} />;
}
```

### With Filters

```tsx
import { SearchBar } from '@/components/SearchBar';

function MyComponent() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <SearchBar
      onSubmit={handleSearch}
      placeholder="Search workouts..."
      filters={{
        numSelected: selectedFilters.length,
        onPress: () => setShowFilters(true),
      }}
    />
  );
}
```

### Using the Custom Hook

```tsx
import { useSearchBar } from '@/components/SearchBar/hooks/useSearchBar';

function CustomSearchComponent() {
  const {
    searchValue,
    setSearchValue,
    handleSubmit,
    handleClear,
    isSearching,
  } = useSearchBar({
    onSubmit: (values) => console.log('Search:', values),
    resetOnSubmit: true,
  });

  return (
    <CustomInput
      value={searchValue}
      onChange={setSearchValue}
      onSubmit={handleSubmit}
      onClear={handleClear}
      loading={isSearching}
    />
  );
}
```

## API Reference

### SearchBar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(values: SearchBarFormValues) => void` | Required | Callback when search is submitted |
| `placeholder` | `string` | `"Search"` | Input placeholder text |
| `resetOnSubmit` | `boolean` | `false` | Clear input after submit |
| `transparentBackground` | `boolean` | `false` | Remove input background |
| `defaultValue` | `string` | `""` | Initial search value |
| `filters` | `{ numSelected: number; onPress: () => void }` | `undefined` | Filter button config |

### useSearchBar Hook

```typescript
interface UseSearchBarOptions {
  defaultValue?: string;
  resetOnSubmit?: boolean;
  onSubmit: (values: SearchBarFormValues) => void;
}

interface UseSearchBarReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  isSearching: boolean;
}
```

## File Structure

```
components/SearchBar/
├── components/
│   ├── SearchBar.tsx           # Main container
│   ├── SearchBarInput.tsx      # Input component
│   └── FilterButton.tsx        # Filter button
├── hooks/
│   └── useSearchBar.ts         # Search logic hook
├── types/
│   └── index.ts                # TypeScript definitions
├── utils/
│   └── searchUtils.ts          # Helper functions
├── __tests__/
│   ├── SearchBar.test.tsx      # Component tests
│   └── useSearchBar.test.ts    # Hook tests
├── README.md                   # This file
└── index.ts                    # Public exports
```

## Testing

Run tests with:

```bash
npm test components/SearchBar
```

Test coverage includes:
- Component rendering and interactions
- Hook state management
- Utility function behavior
- Form submission handling
- Filter button interactions

## Migration Guide

To migrate from the old SearchBar to this micro-product version:

1. **Update imports**:
```tsx
// Old
import { SearchBar } from '@/components/SearchBar';

// New (during transition, both work)
import { SearchBar } from '@/components/SearchBar/components/SearchBar';
```

2. **Props remain the same** - No breaking changes

3. **Access new utilities**:
```tsx
import { useSearchBar } from '@/components/SearchBar/hooks/useSearchBar';
import { sanitizeSearchInput } from '@/components/SearchBar/utils/searchUtils';
```

## Performance Considerations

- Search input is debounced by default (300ms)
- Form state is optimized with react-hook-form
- Clear button only renders when search value exists
- Filter button is lazy-loaded when needed

## Accessibility

- Proper keyboard navigation support
- ARIA labels for screen readers
- Focus management on submit/clear
- Keyboard dismiss on mobile platforms

## Future Enhancements

- [ ] Add search history/suggestions
- [ ] Implement voice search
- [ ] Add advanced search syntax support
- [ ] Create search results highlighting component
- [ ] Add analytics tracking for search queries

## Contributing

When modifying this micro-product:

1. Maintain the file structure
2. Update tests for new functionality
3. Update this README
4. Follow TypeScript strict mode
5. Ensure all exports go through index.ts

## Pattern Replication

This micro-product serves as a template for creating other form-based components. Key patterns to replicate:

1. **Separation of concerns** - UI, logic, and types in separate modules
2. **Custom hooks** - Extract reusable logic
3. **Utility functions** - Common helpers in utils
4. **Comprehensive types** - Full TypeScript coverage
5. **Test coverage** - Unit and integration tests
6. **Documentation** - README with examples