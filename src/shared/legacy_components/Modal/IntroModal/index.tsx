import {IconButton} from '@/components/IconButton';
import {XIcon} from '@/components/icons';
import {TextContent} from '@/components/TextContent';
import {useGetTextContentQuery} from '@/graphql/generated-queries';
import {Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {XStack, YStack} from 'tamagui';

export const IntroModal = ({
  isVisible,
  closeModal,
}: {
  isVisible: boolean;
  closeModal: () => void;
}) => {
  const {loading} = useGetTextContentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      uid: 'intro',
    },
  });
  return (
    <Modal
      isVisible={isVisible && !loading}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        margin: 0,
        width: '100%',
      }}
    >
      <YStack
        bc="$background"
        p={8}
        height="55%"
        width="100%"
        justifyContent="center"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
      >
        {/* Close modal */}
        <Pressable onPress={closeModal}>
          <XStack als="flex-end" mt={20} marginEnd={-8}>
            <IconButton onPress={closeModal}>
              <XIcon />
            </IconButton>
          </XStack>
        </Pressable>

        <TextContent uid="intro" containerStyle={{}} />
      </YStack>
    </Modal>
  );
};
