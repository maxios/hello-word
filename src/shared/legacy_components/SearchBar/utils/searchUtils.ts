/**
 * Utility functions for SearchBar micro-product
 */

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Sanitize search input to prevent injection attacks
 */
export const sanitizeSearchInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 100); // Limit length
};

/**
 * Highlight search terms in text
 */
export const highlightSearchTerm = (
  text: string,
  searchTerm: string,
): {text: string; isHighlighted: boolean}[] => {
  if (!searchTerm) {
    return [{text, isHighlighted: false}];
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part) => ({
    text: part,
    isHighlighted: regex.test(part),
  }));
};

/**
 * Check if search query is valid
 */
export const isValidSearchQuery = (query: string): boolean => {
  const trimmed = query.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

/**
 * Format filter count for display
 */
export const formatFilterCount = (count: number): string => {
  if (count === 0) return 'Filter';
  if (count > 99) return '(99+)';
  return `(${count})`;
};
