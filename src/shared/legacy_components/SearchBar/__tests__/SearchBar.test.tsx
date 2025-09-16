/**
 * Tests for SearchBar component
 */

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {SearchBar} from '../components/SearchBar';

describe('SearchBar', () => {
  const mockOnSubmit = jest.fn();
  const mockOnFilterPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    const {getByPlaceholderText} = render(
      <SearchBar onSubmit={mockOnSubmit} />,
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const {getByPlaceholderText} = render(
      <SearchBar onSubmit={mockOnSubmit} placeholder="Search workouts..." />,
    );

    expect(getByPlaceholderText('Search workouts...')).toBeTruthy();
  });

  it('renders with filter button when filters prop is provided', () => {
    const {getByText} = render(
      <SearchBar
        onSubmit={mockOnSubmit}
        filters={{
          numSelected: 3,
          onPress: mockOnFilterPress,
        }}
      />,
    );

    expect(getByText('(3)')).toBeTruthy();
  });

  it('calls onSubmit when search is submitted', async () => {
    const {getByPlaceholderText} = render(
      <SearchBar onSubmit={mockOnSubmit} />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'test query');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({search: 'test query'});
    });
  });

  it('resets input when resetOnSubmit is true', async () => {
    const {getByPlaceholderText} = render(
      <SearchBar onSubmit={mockOnSubmit} resetOnSubmit />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'test query');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(input.props.value).toBe('');
    });
  });

  it('renders with default value', () => {
    const {getByDisplayValue} = render(
      <SearchBar onSubmit={mockOnSubmit} defaultValue="initial search" />,
    );

    expect(getByDisplayValue('initial search')).toBeTruthy();
  });
});
