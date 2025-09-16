import {Modal, SafeAreaView} from 'react-native';
import {ScrollView, View, XStack, YStack} from 'tamagui';
import {Button} from './Button';
import tokens from '../theme/tokens';

interface FilterSheetModalHeaderProps {
  onClear: () => void;
  onApply: () => void;
}

const FilterSheetModalFooter: React.FC<FilterSheetModalHeaderProps> = (
  props,
) => {
  return (
    <View bc="$surface8" py={16} px={16}>
      <YStack space={16}>
        <Button
          label="Clear filters"
          variant="secondary"
          onPress={props.onClear}
        />

        <Button label="Apply filters" onPress={props.onApply} />
      </YStack>
    </View>
  );
};

interface FilterSheetModalProps extends FilterSheetModalHeaderProps {
  children: React.ReactNode;
  isVisible: boolean;
  onRequestClose: () => void;
}

const FilterSheetModal: React.FC<FilterSheetModalProps> = (props) => {
  return (
    <Modal
      visible={props.isVisible}
      onRequestClose={props.onRequestClose}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <SafeAreaView
        style={{flex: 1, backgroundColor: tokens.color.surface8.val}}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          flex={1}
          contentInsetAdjustmentBehavior="automatic"
        >
          <XStack jc="flex-end" mr={-8} py={8}>
            <Button
              onPress={props.onRequestClose}
              variant="text"
              label="Cancel"
              color="textMediumEmphasis"
            />
          </XStack>
          <View px={16}>{props.children}</View>
        </ScrollView>
        <FilterSheetModalFooter
          onApply={props.onApply}
          onClear={props.onClear}
        />
      </SafeAreaView>
    </Modal>
  );
};

export {FilterSheetModal};
