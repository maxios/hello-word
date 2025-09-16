import {StyleSheet} from 'react-native';
import RNVideo from 'react-native-video';
import {forwardRef, useCallback} from 'react';
// eslint-disable-next-line import/no-unresolved
import {DEVICE_WIDTH} from '@/consts/consts';

const styles = StyleSheet.create({
  video: {
    width: DEVICE_WIDTH,
    height: '100%',
  },
});

interface VideoProps {
  videoUrl: string;
  isMuted?: boolean;
  onBuffer?: (e: {isBuffering?: boolean}) => void;
  onLoad?: () => void;
  onError?: (error: any) => void;
  onReadyForDisplay?: () => void;
}
/**
 * Video component that can be used to render a video player for android & ios
 * @param videoUrl - The url of the video to be played
 * @param isMuted - Whether the video should be muted
 * @param ref - The ref of the video player
 */
export const Video = forwardRef(
  (
    {
      videoUrl,
      isMuted,
      onBuffer,
      onLoad,
      onError,
      onReadyForDisplay,
    }: VideoProps,
    ref: any,
  ) => {
    /**
     * Handle buffer events for both platforms
     */
    const handleBuffer = useCallback(
      (bufferData: {isBuffering?: boolean}) => {
        if (onBuffer) onBuffer(bufferData);
      },
      [onBuffer],
    );

    /**
     * Handle load completion for both platforms
     */
    const handleLoad = useCallback(() => {
      if (onLoad) onLoad();
      if (onReadyForDisplay) onReadyForDisplay();
    }, [onLoad, onReadyForDisplay]);

    /**
     * Handle errors for both platforms
     */
    const handleError = useCallback(
      (error: any) => {
        if (onError) onError(error);
      },
      [onError],
    );

    return (
      <RNVideo
        ref={ref}
        source={{uri: videoUrl}}
        style={styles.video}
        resizeMode="contain"
        playInBackground={false}
        playWhenInactive={false}
        repeat
        onLoad={handleLoad}
        onBuffer={handleBuffer}
        onError={handleError}
        muted={isMuted}
        fullscreen
        ignoreSilentSwitch={isMuted ? 'obey' : 'ignore'}
        // Buffer configuration for better performance
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        onReadyForDisplay={() => {
          if (onReadyForDisplay) onReadyForDisplay();
        }}
      />
    );
  },
);
