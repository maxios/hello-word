/**
 * Custom hook for managing SearchBar state and logic
 */

import {useState, useCallback, useRef} from 'react';
import {Keyboard} from 'react-native';
import type {UseSearchBarOptions, UseSearchBarReturn} from '../types';

export const useSearchBar = (
  options: UseSearchBarOptions,
): UseSearchBarReturn => {
  const {defaultValue = '', resetOnSubmit = false, onSubmit} = options;

  const [searchValue, setSearchValue] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);

    // Simulate async search with proper cleanup
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, 300);

    onSubmit({search: searchValue});

    if (resetOnSubmit) {
      setSearchValue('');
    }
  }, [searchValue, onSubmit, resetOnSubmit]);

  const handleClear = useCallback(() => {
    Keyboard.dismiss();
    setSearchValue('');
    onSubmit({search: ''});
  }, [onSubmit]);

  return {
    searchValue,
    setSearchValue,
    handleSubmit,
    handleClear,
    isSearching,
  };
};
