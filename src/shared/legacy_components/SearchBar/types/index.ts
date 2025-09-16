/**
 * Type definitions for SearchBar micro-product
 */

export interface SearchBarFormValues {
  search: string;
}

export interface SearchBarProps {
  onSubmit: (values: SearchBarFormValues) => void;
  placeholder?: string;
  resetOnSubmit?: boolean;
  transparentBackground?: boolean;
  defaultValue?: string;
  filters?: SearchBarFilters;
}

export interface SearchBarFilters {
  numSelected: number;
  handlePress: () => void;
}

export interface SearchBarInputProps {
  onSubmit: (values: SearchBarFormValues) => void;
  placeholder?: string;
  resetOnSubmit?: boolean;
  transparentBackground?: boolean;
}

export interface FilterButtonProps {
  numSelected: number;
  onPress: () => void;
}

export interface UseSearchBarOptions {
  defaultValue?: string;
  resetOnSubmit?: boolean;
  onSubmit: (values: SearchBarFormValues) => void;
}

export interface UseSearchBarReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  isSearching: boolean;
}
