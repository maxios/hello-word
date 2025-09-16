import {useEffect} from 'react';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {formatErrorMessage} from '../../lib/error';
import {useToastManager} from '../Toast';

const useCamera = () => {
  const STORAGE_KEY = '@MyApp:cameraAccess';
  const {showToast} = useToastManager();
  const requestPermission = async () => {
    try {
      const storedPermission = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPermission === 'grantedCam') {
        return;
      }
      const {granted} = await Camera.requestCameraPermissionsAsync();

      if (!granted) {
        Alert.alert(
          'Camera Access',
          'Strng would like to access your camera to take pictures and share them with in your network.',
          [
            {
              text: 'Ok',
              onPress: async () => {
                await AsyncStorage.setItem(STORAGE_KEY, 'grantedCam');
              },
            },
            {text: "Don't Allow"},
          ],
        );
      }
    } catch (e) {
      showToast({
        message: formatErrorMessage(e),
        type: 'error',
        hasSettingsIcon: true,
      });
    }
  };

  const takePhoto = async (options: any) => {
    const mergedOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      ...options,
    };

    return ImagePicker.launchCameraAsync(mergedOptions);
  };

  useEffect(() => {
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {takePhoto};
};

export default useCamera;
