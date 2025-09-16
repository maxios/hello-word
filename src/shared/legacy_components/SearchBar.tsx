import {useFormContext} from 'react-hook-form';
import {Keyboard, Pressable} from 'react-native';
import {View, XStack} from 'tamagui';
import {Input} from './fields/Input';
import {XIcon} from './icons/XIcon';
import {MagnifyingGlassIcon} from './icons/MagnifyingGlassIcon';
import {Form} from './form/Form';
import {FilterIcon} from './icons/FilterIcon';
import {Button} from './Button';

export interface SearchBarFormValues {
  search: string;
}

export const SearchBarComponent: React.FC<{
  onSubmit: (v: SearchBarFormValues) => void;
  placeholder?: string;
  resetOnSubmit?: boolean;
  transparentBackground?: boolean;
}> = (props) => {
  const form = useFormContext<SearchBarFormValues>();
  const handleSubmit = form.handleSubmit((args) => {
    if (props.resetOnSubmit) form.reset();
    props.onSubmit(args);
  });

  return (
    <Input
      iconRight={
        form.watch('search') ? (
          <Pressable
            hitSlop={15}
            onPress={() => {
              Keyboard.dismiss();
              form.setValue('search', '');
              handleSubmit();
            }}
          >
            <XIcon />
          </Pressable>
        ) : (
          <MagnifyingGlassIcon />
        )
      }
      size="sm"
      name="search"
      blurOnSubmit
      placeholder={props.placeholder || 'Search'}
      returnKeyType="search"
      returnKeyLabel="Search"
      onSubmitEditing={handleSubmit}
      noBackground={props.transparentBackground}
    />
  );
};

interface Props extends React.ComponentProps<typeof SearchBarComponent> {
  // If present, will show a filter button
  filters?: {
    numSelected: number;
    onPress: () => void;
  };
  defaultValue?: string;
}

export const SearchBar: React.FC<Props> = ({
  filters,
  defaultValue,
  ...inputProps
}) => {
  return (
    <Form defaultValues={{search: defaultValue || ''} as SearchBarFormValues}>
      <XStack w="100%" gap={4}>
        <View flex={1}>
          <SearchBarComponent {...inputProps} />
        </View>

        {filters ? (
          <Button
            variant="subtle"
            // eslint-disable-next-line react/jsx-handler-names
            onPress={filters.onPress}
            size="input_small"
            px={16}
            leftIcon={<FilterIcon />}
            label={filters.numSelected ? `(${filters.numSelected})` : 'Filter'}
          />
        ) : null}
      </XStack>
    </Form>
  );
};
