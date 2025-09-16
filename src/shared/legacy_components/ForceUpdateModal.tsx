import React from 'react';
import {
  Linking,
  Platform,
  TouchableOpacity,
  Text as RNText,
  Image,
} from 'react-native';
import {YStack, XStack} from 'tamagui';
import {Modal} from './Modal';
import {Text} from './Text';

// import {UpdateIcon} from './icons';
import strngLogo from '../assets/images/intro/strng_logo.png';

interface ForceUpdateModalProps {
  isVisible: boolean;
}

export const ForceUpdateModal: React.FC<ForceUpdateModalProps> = ({
  isVisible,
}) => {
  const handleUpdate = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/app/strng/id1492688256');
    } else {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.strong.andsxy',
      );
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      closeModal={() => {}}
      hasCloseButton={false}
      header=""
      subheader=""
      buttons={[]}
      style={{
        padding: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 16,
        borderRadius: 24,
        backgroundColor: '#181A20',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <YStack gap={36} alignItems="center" py={32} px={16} width="100%">
        <YStack gap={16} alignItems="center" width="100%">
          <Text variant="h5" textAlign="center">
            🚀 UPDATE AVAILABLE!
          </Text>
          <Text variant="bodyS" textAlign="center">
            We&apos;ve got something special for you! A new version of STRNG is
            ready with exciting improvements.
          </Text>
        </YStack>
        {/* Logo Container */}
        <YStack
          width={110}
          height={110}
          borderRadius={55}
          backgroundColor="$brandMid10"
          alignItems="center"
          justifyContent="center"
          borderWidth={2}
          borderColor="$brandMid20"
          shadowColor="$brandMid"
          shadowOffset={{width: 0, height: 6}}
          shadowOpacity={0.4}
          shadowRadius={12}
          elevation={10}
          style={{marginBottom: 0}}
        >
          <Image
            source={strngLogo}
            style={{width: 70, height: 70, resizeMode: 'contain'}}
          />
        </YStack>

        {/* Main Content */}
        <YStack gap={18} alignItems="center" width="100%" alignSelf="center">
          <Text variant="h4" textAlign="center">
            Time to Update! 🚀
          </Text>

          <Text variant="bodyL" textAlign="center" color="textHighEmphasis">
            We&apos;ve made some amazing improvements to make your STRNG
            experience even better!
          </Text>
        </YStack>

        {/* Important Notice */}
        <YStack
          backgroundColor="$brandMid10"
          borderRadius={18}
          padding={20}
          width="100%"
          borderWidth={1}
          borderColor="$brandMid20"
          alignItems="center"
          justifyContent="center"
          style={{marginTop: 8, marginBottom: 8}}
        >
          <XStack gap={0} alignItems="center" justifyContent="center">
            <RNText style={{fontSize: 22, textAlign: 'center'}}>⚡</RNText>
            <RNText
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#1EC6FF',
                fontWeight: 'bold',
              }}
            >
              This update is required to continue using STRNG
            </RNText>
          </XStack>
        </YStack>

        {/* Update Button */}
        <YStack width="100%" alignItems="center">
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              backgroundColor: '#1EC6FF',
              borderRadius: 32,
              paddingVertical: 18,
              width: '100%',
              shadowColor: '#1EC6FF',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.85}
          >
            <Text variant="h5" color="brandDarkest" textAlign="center">
              ✨ UPDATE NOW
            </Text>
          </TouchableOpacity>
        </YStack>
      </YStack>
    </Modal>
  );
};
