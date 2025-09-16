import {useMemo} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {View} from 'tamagui';

/**
 * Constants
 */
const DEFAULT_NUM_COLUMNS = 2;
const DEFAULT_GAP = 12;
const DEFAULT_CONTAINER_STYLE = {
  paddingHorizontal: 16,
  gap: DEFAULT_GAP,
};

// Renders a grid in a flat list with 2 columns and relevant gaps/paddings
function FlatListGrid<T>(props: FlatListProps<T>) {
  // Styles
  const contentContainerStyle = useMemo(
    () => [DEFAULT_CONTAINER_STYLE, props.contentContainerStyle],
    [props.contentContainerStyle],
  );

  const columnWrapperStyle = useMemo(
    () =>
      props.numColumns === 1
        ? undefined
        : [{gap: DEFAULT_GAP}, props.columnWrapperStyle],
    [props.columnWrapperStyle, props.numColumns],
  );

  /**
   * Data formatting
   *
   * Purpose: This ensures that the grid layout remains visually balanced. If the number of items is not evenly divisible by the number of columns,
   * adding a null item allows the last row to have the same number of items as the other rows, preventing layout issues.
   *
   * Note: This is a workaround to a bug in react-native's FlatList implementation.
   */
  const data = useMemo(() => {
    if (Array.isArray(props.data) && props.data.length % DEFAULT_NUM_COLUMNS) {
      return [...props.data, null];
    }
    return props.data;
  }, [props.data]);

  // Render
  return (
    <FlatList<T>
      {...props}
      numColumns={props.numColumns || DEFAULT_NUM_COLUMNS}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={columnWrapperStyle}
      data={data}
      renderItem={(info) => {
        // Render a placeholder for nullified items
        // This is used to ensure the grid layout remains visually balanced
        // @see {data} above for more details
        if (info.item === null) {
          return <View w="50%" />;
        }
        return props.renderItem?.(info) ?? null;
      }}
    />
  );
}

export {FlatListGrid};
