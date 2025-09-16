/**
 * Tests for useSearchBar hook
 */

import {renderHook, act} from '@testing-library/react';
import {useSearchBar} from '../hooks/useSearchBar';

// Mock React Native modules
jest.mock('react-native', () => ({
  Keyboard: {
    dismiss: jest.fn(),
  },
}));

describe('useSearchBar', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default values', () => {
    const {result} = renderHook(() =>
      useSearchBar({
        onSubmit: mockOnSubmit,
      }),
    );

    expect(result.current.searchValue).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('initializes with provided default value', () => {
    const {result} = renderHook(() =>
      useSearchBar({
        defaultValue: 'initial search',
        onSubmit: mockOnSubmit,
      }),
    );

    expect(result.current.searchValue).toBe('initial search');
  });

  it('updates search value', () => {
    const {result} = renderHook(() =>
      useSearchBar({
        onSubmit: mockOnSubmit,
      }),
    );

    act(() => {
      result.current.setSearchValue('new search');
    });

    expect(result.current.searchValue).toBe('new search');
  });

  it('handles submit', () => {
    const {result} = renderHook(() =>
      useSearchBar({
        onSubmit: mockOnSubmit,
      }),
    );

    act(() => {
      result.current.setSearchValue('test query');
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({search: 'test query'});
  });

  it('resets value after submit when resetOnSubmit is true', () => {
    const {result} = renderHook(() =>
      useSearchBar({
        resetOnSubmit: true,
        onSubmit: mockOnSubmit,
      }),
    );

    act(() => {
      result.current.setSearchValue('test query');
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.searchValue).toBe('');
  });

  it('handles clear', () => {
    const {result} = renderHook(() =>
      useSearchBar({
        onSubmit: mockOnSubmit,
      }),
    );

    act(() => {
      result.current.setSearchValue('test query');
    });

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.searchValue).toBe('');
    expect(mockOnSubmit).toHaveBeenCalledWith({search: ''});
  });

  it('sets isSearching during submit', async () => {
    const {result} = renderHook(() =>
      useSearchBar({
        onSubmit: mockOnSubmit,
      }),
    );

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.isSearching).toBe(true);

    // Wait for the timeout to complete
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 350);
      });
    });

    expect(result.current.isSearching).toBe(false);
  });
});
