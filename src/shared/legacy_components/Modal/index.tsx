import RnmModal from 'react-native-modal'; // TODO: remove this as a dependency when migrated
import {YStack, XStack} from 'tamagui';
import {APP_PADDING} from '../../consts/consts';
import {XIcon} from '../icons';
import {IconButton} from '../IconButton';
import {Button} from '../Button';
import {Text} from '../Text';
import {ButtonProps} from '../Button/types';

interface ModalProps {
  isVisible: boolean;
  closeModal: () => void;
  onModalHide?: () => void;
  header: string;
  style?: any;
  subheader: string;
  buttons: ButtonProps[];
  buttonFlexDirection?: 'row' | 'column';
  children?: React.ReactNode;
  hasCloseButton?: boolean;
}

export const Modal = ({
  isVisible,
  closeModal,
  onModalHide,
  header,
  subheader,
  buttons,
  children,
  style,
  buttonFlexDirection = 'row',
  hasCloseButton,
}: ModalProps) => {
  const isRow = buttonFlexDirection === 'row';
  const ButtonStack = isRow ? XStack : YStack;
  const ButtonWrapper = isRow ? YStack : XStack;

  return (
    <RnmModal
      isVisible={isVisible}
      onBackdropPress={hasCloseButton === false ? undefined : closeModal}
      style={{
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: APP_PADDING / 2,
        ...style,
      }}
      avoidKeyboard
      onModalHide={onModalHide}
    >
      <YStack
        bc="$surface8"
        p={APP_PADDING}
        pb={24}
        width="100%"
        borderRadius={16}
      >
        {hasCloseButton !== false && (
          <XStack jc="flex-end" mr={-8} mt={-8}>
            <IconButton onPress={closeModal}>
              <XIcon />
            </IconButton>
          </XStack>
        )}
        <YStack gap={32}>
          <YStack gap={16}>
            <Text variant="h5">{header}</Text>
            <Text variant="bodyS">{subheader}</Text>
            {children}
          </YStack>
          <ButtonStack gap={8}>
            {buttons.map((button) =>
              isRow ? (
                <ButtonWrapper key={button.label as string} flex={1}>
                  <Button {...button} fullWidth />
                </ButtonWrapper>
              ) : (
                <Button key={button.label as string} {...button} fullWidth />
              ),
            )}
          </ButtonStack>
        </YStack>
      </YStack>
    </RnmModal>
  );
};
