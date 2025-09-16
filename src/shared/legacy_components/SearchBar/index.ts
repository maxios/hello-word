/**
 * SearchBar Micro-Product
 * 
 * Public exports for the SearchBar micro-product.
 * This is the main entry point for consumers of this component.
 */

// Main component exports
export { SearchBar } from './components/SearchBar';
export { SearchBarInput } from './components/SearchBarInput';
export { FilterButton } from './components/FilterButton';

// Hook exports
export { useSearchBar } from './hooks/useSearchBar';

// Type exports
export type {
  SearchBarProps,
  SearchBarFormValues,
  SearchBarFilters,
  SearchBarInputProps,
  FilterButtonProps,
  UseSearchBarOptions,
  UseSearchBarReturn,
} from './types';

// Utility exports
export {
  debounce,
  sanitizeSearchInput,
  highlightSearchTerm,
  isValidSearchQuery,
  formatFilterCount,
} from './utils/searchUtils';