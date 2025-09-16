/**
 * FilterButton - Standalone filter button component
 */

import React from 'react';
import {Button} from '../../Button';
import {FilterIcon} from '../../icons/FilterIcon';
import type {FilterButtonProps} from '../types';
import {formatFilterCount} from '../utils/searchUtils';

export const FilterButton: React.FC<FilterButtonProps> = ({
  numSelected,
  onPress,
}) => {
  const label = formatFilterCount(numSelected);

  return (
    <Button
      variant="subtle"
      onPress={onPress}
      size="input_small"
      px={16}
      leftIcon={<FilterIcon />}
      label={label}
    />
  );
};
