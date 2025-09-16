/**
 * SearchBar - Main container component
 * This is the refactored version that uses the micro-product architecture
 */

import React from 'react';
import {View, XStack} from 'tamagui';
import {Form} from '../../form/Form';
import {SearchBarInput} from './SearchBarInput';
import {FilterButton} from './FilterButton';
import type {SearchBarProps, SearchBarFormValues} from '../types';

export const SearchBar: React.FC<SearchBarProps> = ({
  onSubmit,
  placeholder,
  resetOnSubmit,
  transparentBackground,
  defaultValue,
  filters,
}) => {
  const initialValues: SearchBarFormValues = {
    search: defaultValue || '',
  };

  return (
    <Form defaultValues={initialValues}>
      <XStack w="100%" gap={4}>
        <View flex={1}>
          <SearchBarInput
            onSubmit={onSubmit}
            placeholder={placeholder}
            resetOnSubmit={resetOnSubmit}
            transparentBackground={transparentBackground}
          />
        </View>

        {filters && (
          <FilterButton
            numSelected={filters.numSelected}
            onPress={filters.handlePress}
          />
        )}
      </XStack>
    </Form>
  );
};
