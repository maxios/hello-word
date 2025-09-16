import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ImageBackground,
  Animated,
  Platform,
} from 'react-native';
import {XStack} from 'tamagui';
import {useModal} from '@/context/AwardModalContext';
import {captureRef} from 'react-native-view-shot'; // Import captureRef
import * as Sharing from 'expo-sharing'; // Import Sharing
import {Button} from '../Button';
import AchievementsBackground from '../../assets/images/AchievementsBackground.png';
import {IconButton} from '../IconButton';
import {XIcon} from '../icons';

const AwardModal: React.FC = () => {
  const {modalVisible, selectedItem, hideModal, closeModal} = useModal();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const flipAnim = useRef(new Animated.Value(0)).current; // Initial value for flip: 0
  const viewRef = useRef(null); // Add this line to define viewRef

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      flipAnim.setValue(0);
    }
  }, [modalVisible, fadeAnim, flipAnim]);

  const handleShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });
      await Sharing.shareAsync(`file://${uri}`, {});
    } catch (e) {
      closeModal();
    }
    closeModal();
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={hideModal}
    >
      <View style={styles.background}>
        <XStack
          alignSelf="flex-end"
          position="absolute"
          top={Platform.OS === 'ios' ? 50 : 20}
          zIndex={1}
        >
          <IconButton onPress={closeModal}>
            <XIcon />
          </IconButton>
        </XStack>
        <View style={styles.modalOverlay}>
          <ImageBackground
            source={AchievementsBackground}
            style={styles.background}
            ref={viewRef}
          >
            <View style={styles.modalContainer}>
              <View style={styles.capturedView}>
                <View style={styles.imageContainer}>
                  <Animated.Image
                    source={{uri: selectedItem?.image.url}}
                    style={[
                      styles.badgeImage,
                      {opacity: fadeAnim, transform: [{scale: flipAnim}]},
                    ]}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {selectedItem?.achievementName}
                  </Text>
                  <Text style={styles.description}>
                    {selectedItem?.achievementDescriptions}
                  </Text>
                  <Text style={styles.date}>{selectedItem?.createdAt}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.buttonContainer}>
            <Button
              variant="secondary"
              label="VIEW YOUR ACHIEVEMENTS"
              onPress={hideModal}
              size="md"
            />
            <Button
              variant="secondary"
              label="SHARE"
              size="md"
              onPress={handleShare}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capturedView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'transparent',
  },
  background: {
    backgroundColor: '#1c1c1c',
    flex: 1,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: Platform.OS === 'ios' ? 50 : 20,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  badgeImage: {
    width: 400,
    height: 400,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    width: 400,
    flexWrap: 'wrap',
  },
  date: {
    fontSize: 14,
    color: '#888888',
    marginVertical: 5,
  },
});

export default AwardModal;
