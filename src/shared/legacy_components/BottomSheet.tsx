import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import Modal from 'react-native-modal';

export type BottomSheetProps = {
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  visible?: boolean;
};

type Props = {
  children: React.ReactNode;
} & BottomSheetProps;

export function BottomSheet({
  children,
  visible = false,
  onBackButtonPress = () => null,
  onBackdropPress = () => null,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      style={{justifyContent: 'flex-end', margin: 0}}
    >
      <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </Modal>
  );
}
