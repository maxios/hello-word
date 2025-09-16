import {Text} from '../Text';

const SearchCount: React.FC<{
  totalResults: number;
  searchTerm: string;
  searchItem: string;
}> = (props) => {
  const numResults = props.totalResults || 0;
  const resultsLabel =
    numResults === 1 ? props.searchItem : `${props.searchItem}s`;
  const searchTermLabel = props.searchTerm ? ` for "${props.searchTerm}"` : '';

  return (
    <Text variant="uiM" color="textMediumEmphasis">
      {`${numResults} ${resultsLabel}${searchTermLabel}`}
    </Text>
  );
};

export {SearchCount};
