import {useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePhotos = () => {
  const STORAGE_KEY = '@MyApp:photoLibraryAccess';
  const requestPermission = async () => {
    const storedPermission = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedPermission === 'granted') {
      // User has already granted permission
      return;
    }
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        'Photo Library Access',
        'Strng would like to access your photos to take pictures and share them with in your network.',
        [
          {
            text: 'Ok',
            onPress: async () => {
              // Save the user's decision to grant permission
              await AsyncStorage.setItem(STORAGE_KEY, 'granted');
            },
          },
          {text: "Don't Allow"},
        ],
      );
    }
  };

  const selectImage = async (options: any) => {
    const mergedOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      ...options,
    };

    return ImagePicker.launchImageLibraryAsync(mergedOptions);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {selectImage};
};

export default usePhotos;
