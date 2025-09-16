import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {
  Pressable,
  ImageProps,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {XStack} from 'tamagui';
import RNVideo, {VideoRef} from 'react-native-video';
import {Video as ExpVideo, ResizeMode} from 'expo-av';
import {PlayIcon} from './icons';
import {PlayIconProps} from './icons/PlayIcon';
import {BlurUpImage} from './BlurUpImage';
import {formatErrorMessage} from '../lib/error';
import {useToastManager} from './Toast';

export interface VideoPlayerHandle {
  play: () => void;
}

interface VideoPlayerProps {
  thumbnailUrl: ImageProps['source'] | string | undefined;
  videoUrl: string;
  playIconSize?: PlayIconProps['size'];
  blurHash?: string;
  isMuted: boolean;
}

export const VideoPlayer = forwardRef(
  (
    {thumbnailUrl, videoUrl, playIconSize, blurHash, isMuted}: VideoPlayerProps,
    ref,
  ) => {
    const [isOpened, setIsOpened] = React.useState(false);
    const expoVideoRef = useRef<ExpVideo>(null);
    const {showToast} = useToastManager();
    const videoRef = useRef<VideoRef>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const handlePlay = async () => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);

      if (Platform.OS === 'ios') {
        videoRef?.current?.presentFullscreenPlayer();
      } else {
        expoVideoRef?.current
          ?.presentFullscreenPlayer()
          .then(() => {
            return expoVideoRef?.current?.playAsync();
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.warn(e);
            showToast({
              message: 'Video failed to load.',
              type: 'error',
              hasSettingsIcon: true,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };

    useImperativeHandle(ref, () => {
      return {
        play: handlePlay,
      };
    });

    return (
      <XStack width="100%" height="100%" position="relative">
        <BlurUpImage
          source={thumbnailUrl}
          placeholder={blurHash}
          style={{width: '100%', height: '100%'}}
        />
        <Pressable
          hitSlop={20}
          onPress={handlePlay}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <XStack
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <PlayIcon size={playIconSize} />
            )}
          </XStack>
        </Pressable>
        {Platform.OS === 'android' ? (
          <ExpVideo
            ref={expoVideoRef}
            source={{uri: videoUrl}}
            style={styles.video}
            useNativeControls
            isMuted={isMuted || false}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        ) : (
          <RNVideo
            ref={videoRef}
            source={{uri: videoUrl}}
            style={styles.video}
            resizeMode="contain"
            playInBackground={false}
            playWhenInactive={false}
            repeat
            muted={isMuted}
            fullscreen
            onFullscreenPlayerDidDismiss={() => {
              setIsLoading(false);
              setIsOpened(false);
            }}
            onFullscreenPlayerWillPresent={() => {
              setIsLoading(false);
              setIsOpened(true);
            }}
            onError={(error) => {
              showToast({
                message: formatErrorMessage(error),
                type: 'error',
                hasSettingsIcon: true,
              });
            }}
            paused={!isOpened}
            ignoreSilentSwitch={isMuted ? 'obey' : 'ignore'}
          />
        )}
      </XStack>
    );
  },
);

const styles = StyleSheet.create({
  video: {
    height: 0,
    width: 0,
  },
});
