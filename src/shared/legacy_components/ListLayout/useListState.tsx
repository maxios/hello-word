// Generic query result interface for list state management
interface QueryResult<TData = any> {
  data?: TData;
  loading: boolean;
  error?: any;
  networkStatus?: number;
}

/**
 * A custom hook that handles common list/pagination state management.
 *
 * This hook takes an Apollo query result and extracts useful state information for lists:
 *
 * - Whether there's an error
 * - Whether it's loading initially
 * - Whether the list is empty
 * - Whether more items can be loaded
 * - Whether it's currently loading more items
 * - Overall loading state
 *
 * It's used for handling paginated lists where you need to:
 * 1. Show loading states appropriately
 * 2. Handle empty states
 * 3. Support "load more" functionality
 * 4. Handle nested data structures
 *
 * Expected query result shape:
 * ```ts
 * {
 *   data: {
 *     items: Array<T>; // The list of items
 *     meta: {
 *       count: number; // Total count for pagination
 *     }
 *   };
 *   // Or for nested data:
 *   data: {
 *     someKey: {
 *       items: Array<T>;
 *       meta: {
 *         count: number;
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * Example usage:
 * ```ts
 * const query = useMyListQuery();
 * const listState = useListState({
 *   query,
 *   listKey: 'items', // or 'data.items' for nested data
 *   metaKey: 'meta' // or 'data.meta' for nested metadata
 * });
 *
 * if (listState.isInitialLoading) return <LoadingState/>;
 * if (listState.hasError) return <ErrorState/>;
 * if (listState.isEmpty) return <EmptyState/>;
 *
 * return (
 *   <List
 *     data={query.data.items}
 *     onEndReached={() => {
 *       if (listState.canLoadMore) {
 *         loadMore();
 *       }
 *     }}
 *     ListFooterComponent={listState.isLoadingMore ? <LoadingMore/> : null}
 *   />
 * );
 * ```
 */

export const useListState = <Q extends QueryResult<any>>({
  query,
  listKey,
  metaKey,
}: {
  query: Q;
  listKey: string;
  metaKey?: string;
}) => {
  let dataLength = [];
  if (listKey.includes('.')) {
    const [firstKey, secondKey] = listKey.split('.');
    dataLength = query.data?.[firstKey]?.[secondKey].length;
  } else dataLength = query.data?.[listKey].length;

  let count = null;
  if (metaKey) {
    if (metaKey.includes('.')) {
      const [firstKey, secondKey] = metaKey.split('.');
      count = query.data?.[firstKey]?.[secondKey].count;
    } else count = query.data?.[metaKey]?.count;
  }

  const hasError = !dataLength && query.error;
  const isInitialLoading = !dataLength && query.loading && !hasError;
  const isEmpty = !dataLength && !isInitialLoading;
  // For non-Apollo clients, you may need to implement your own loading more detection
  const isLoadingMore = query.networkStatus === 3; // 3 typically represents "fetchMore" in Apollo

  const canLoadMore =
    // Only load more if we have metaKey
    !!metaKey &&
    // Only load more if we have data
    dataLength &&
    // and not loading
    !query.loading &&
    // and not already loading more
    !isLoadingMore &&
    // and we have more data to load
    dataLength < count;

  return {
    hasError,
    isInitialLoading,
    isEmpty,
    canLoadMore,
    isLoadingMore,
    isLoading: query.loading,
  };
};
