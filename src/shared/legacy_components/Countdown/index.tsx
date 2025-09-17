// TODO: try to make the sound not dipping the background music. Uncomment relevant logic and fix it
import {useCallback, useEffect, useRef, useState} from 'react';
import {Text} from '@/components/Text';
import {useCountdown} from '@/lib/hooks/useCountdown';
import alarm from '@/assets/sounds/alarm.mp3';
import {useAudio} from '@/lib/hooks/useAudio';
import ExerciseSet from '@/realm/objects/exercise-set';
import {useRealm} from '@realm/react';
import {XStack} from 'tamagui';
import useNotifications from '@/lib/hooks/useNotifications';
import {IconButton} from '../IconButton';
import {ClockIcon} from '../icons';

interface Props {
  set: ExerciseSet;
  delay?: number;
  tickTime?: number;
  onFinish?: () => void;
  onReset: () => void;
  isInView?: boolean;
}

/**
 * A countdown component that displays the remaining time in format "mins:secs"
 */
export const CountdownSet = ({
  set,
  delay = 0,
  tickTime = 1000,
  onFinish,
  isInView,
  onReset = () => {},
}: Props) => {
  // Service
  const realm = useRealm();
  const [initialTime] = useState(set.secondsLeft || set.reps || 0);
  const {seconds, formattedTime, resume, pause, reset} = useCountdown({
    initialTime,
    delay,
    tickTime,
    onTick: (seconds: number) => {
      realm.write(() => {
         
        set.secondsLeft = seconds;
      });
    },
  });
  const {sendImmediateNotification} = useNotifications();
  const {muteTimer} = useAudio(alarm);

  const handleReset = useCallback(() => {
    reset(set.reps || 0);
    onReset();
  }, [onReset, reset, set.reps]);

  /**
   * Stop timer when not in view
   */
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (isInView) {
      timeoutRef.current = setTimeout(() => {
        resume();
      }, delay);
    } else {
      pause();
      clearTimeout(timeoutRef.current);
    }
  }, [delay, isInView, pause, resume]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerAlarm = useCallback(async () => {
    sendImmediateNotification('The exercise timer ended', '', {});
  }, [sendImmediateNotification]);
  /**
   * Play sound when timer is about to finish
   * and callback when timer finishes
   */
  useEffect(() => {
    try {
      // Play sound when timer is about to finish
      if (seconds === 1 && !muteTimer) {
        triggerAlarm();
      }

      // Callback when timer finishes
      if (seconds < 1) {
        onFinish?.();
      }
    } catch (e) {
       
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // Render
  return (
    <XStack justifyContent="space-between" alignItems="center" w="100%">
      <CountdownUI seconds={seconds} formattedTime={formattedTime} />

      {/* reset button */}
      <IconButton bc="$brandMid" onPress={handleReset} size={59}>
        <ClockIcon />
      </IconButton>
    </XStack>
  );
};

export const CountdownUI = ({
  seconds,
  formattedTime,
}: {
  seconds: number;
  formattedTime: string;
}) => {
  return (
    <Text variant="h1" color={seconds <= 3 ? 'brandMid' : 'textHighEmphasis'}>
      {formattedTime}
    </Text>
  );
};
