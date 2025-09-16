/**
 * SearchBarInput - Core input component for SearchBar
 */

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Keyboard, Pressable } from 'react-native';
import { Input } from '../../fields/Input';
import { XIcon } from '../../icons/XIcon';
import { MagnifyingGlassIcon } from '../../icons/MagnifyingGlassIcon';
import type { SearchBarInputProps, SearchBarFormValues } from '../types';

export const SearchBarInput: React.FC<SearchBarInputProps> = ({
  onSubmit,
  placeholder = 'Search',
  resetOnSubmit = false,
  transparentBackground = false,
}) => {
  const form = useFormContext<SearchBarFormValues>();
  
  const handleSubmit = form.handleSubmit((values) => {
    if (resetOnSubmit) {
      form.reset();
    }
    onSubmit(values);
  });

  const handleClear = () => {
    Keyboard.dismiss();
    form.setValue('search', '');
    handleSubmit();
  };

  const searchValue = form.watch('search');

  return (
    <Input
      iconRight={
        searchValue ? (
          <Pressable hitSlop={15} onPress={handleClear}>
            <XIcon />
          </Pressable>
        ) : (
          <MagnifyingGlassIcon />
        )
      }
      size="sm"
      name="search"
      blurOnSubmit
      placeholder={placeholder}
      returnKeyType="search"
      returnKeyLabel="Search"
      onSubmitEditing={handleSubmit}
      noBackground={transparentBackground}
    />
  );
};