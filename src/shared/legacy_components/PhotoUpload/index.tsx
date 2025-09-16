import {Image, Pressable} from 'react-native';
import {YStack, XStack, View} from 'tamagui';
import {Controller, useFormContext} from 'react-hook-form';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {formatErrorMessage} from '../../lib/error';
import {Text} from '../Text';
import {CameraIcon, GalleryIcon} from '../icons';
import useCamera from './useCameraHook';
import usePhotos from './usePhotosHook';
import {useToastManager} from '../Toast';

export const PhotoUpload: React.FC<{name: string}> = ({name}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const error = errors[name]?.message;
  const {showActionSheetWithOptions} = useActionSheet();
  const camera = useCamera();
  const photos = usePhotos();
  const {showToast} = useToastManager();
  return (
    <YStack gap={8} pb={16}>
      <Text variant="uiS" color="textHighEmphasis">
        Add photo
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{required: 'Please choose a photo'}}
        render={({field: {onChange, value}}) => {
          const takePhoto = async () => {
            const result = await camera.takePhoto({
              allowsEditing: true,
              quality: 0.5,
            });
            if (result.canceled) return;
            onChange(result.assets[0]);
          };

          const chooseFromLibrary = async () => {
            try {
              const result = await photos.selectImage({
                quality: 0.5,
              });
              if (result.canceled) return;
              onChange(result.assets[0]);
            } catch (e) {
              showToast({
                message: formatErrorMessage(e),
                type: 'error',
                hasSettingsIcon: true,
              });
            }
          };

          const onPressAddPhoto = () => {
            showActionSheetWithOptions(
              {
                options: [
                  'Take photo...',
                  'Choose from library...',
                  'Clear',
                  'Cancel',
                ],
                cancelButtonIndex: 3,
                disabledButtonIndices: !value ? [2] : [],
                title: 'Add photo',
              },
              (selectedIndex: number | undefined) => {
                switch (selectedIndex) {
                  case 0:
                    return takePhoto();
                  case 1:
                    return chooseFromLibrary();
                  case 2:
                    return onChange('');
                  default:
                    // eslint-disable-next-line consistent-return, no-useless-return
                    return;
                }
              },
            );
          };
          return (
            <Pressable onPress={onPressAddPhoto}>
              <XStack
                br={4}
                bw={1}
                boc="$surface48"
                bc="$surface8"
                ai="center"
                jc="center"
                h={154}
              >
                {value ? (
                  <View p={8} flex={1}>
                    <Image
                      source={{uri: value?.uri}}
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ) : (
                  <>
                    <YStack gap={8} alignItems="center" py={54} width="49%">
                      <CameraIcon />
                      <Text variant="uiS" color="textHighEmphasis">
                        Camera
                      </Text>
                    </YStack>
                    <XStack
                      borderColor="$brandMid"
                      borderWidth={1}
                      height={42}
                    />
                    <YStack gap={8} alignItems="center" py={54} width="49%">
                      <GalleryIcon />
                      <Text variant="uiS" color="textHighEmphasis">
                        Gallery
                      </Text>
                    </YStack>
                  </>
                )}
              </XStack>
            </Pressable>
          );
        }}
      />
      {!!error && (
        <Text variant="uiS" color="error">
          {error}
        </Text>
      )}
    </YStack>
  );
};
