import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {memo, useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {View, YStack} from 'tamagui';
import {Text} from './Text';
import {DEVICE_WIDTH} from '../consts/consts';

dayjs.extend(utc);

interface CalendarPickerDayItemProps {
  date: dayjs.Dayjs;
  onDateChange: (date: Date) => void;
  selectedDate: Date;
}

const CalendarPickerDayItem = memo(
  ({date, selectedDate, onDateChange}: CalendarPickerDayItemProps) => {
    const isSelected = useMemo(
      () => date.utc().isSame(selectedDate, 'day'),
      [date, selectedDate],
    );
    const TodayDate = useMemo(() => date.utc().toDate(), [date]);
    return (
      <TouchableOpacity onPress={() => onDateChange(TodayDate)}>
        <YStack width={DEVICE_WIDTH / 7} gap={4} alignItems="center">
          <Text color="textMediumEmphasis" variant="uiS">
            {date.format('dd')}
          </Text>
          <View
            h={29}
            w={29}
            // Color hardcoded, $textMediumEmphasis is not working
            backgroundColor={isSelected ? '#fff' : '$transparent'}
            borderRadius={15}
            justifyContent="center"
            alignItems="center"
          >
            <Text
              color={isSelected ? 'surface0' : 'textHighEmphasis'}
              variant="bodySEmphasis"
            >
              {date.format('D')}
            </Text>
          </View>
        </YStack>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are the same (prevent re-render)
    // Return false if props are different (allow re-render)
    return (
      prevProps.date.utc().isSame(nextProps.date.utc(), 'day') &&
      prevProps.selectedDate.getTime() === nextProps.selectedDate.getTime()
    );
  },
);

interface CalendarPickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const CalendarPicker = (props: CalendarPickerProps) => {
  const [date, setDate] = useState(props.date);
  const onDateChangeRef = useRef(props.onDateChange);

  // Update ref when props.onDateChange changes
  useEffect(() => {
    onDateChangeRef.current = props.onDateChange;
  }, [props.onDateChange]);

  const initialDateRange = useMemo(() => {
    // We add one day, so that start of the week is Monday
    const startOfWeek = dayjs().utc().startOf('isoWeek');
    return new Array(21).fill(0).map((_, i) => startOfWeek.add(i, 'day'));
  }, []);

  const [dateRange, setDateRange] = useState(initialDateRange);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / DEVICE_WIDTH);
      const totalPages = dateRange.length / 7;
      const lastDate = dateRange[dateRange.length - 1];
      if (index >= totalPages - 2) {
        setDateRange([
          ...dateRange,
          ...Array(7)
            .fill(0)
            .map((_, i) => lastDate.add(i + 1, 'day')),
        ]);
      }
    },
    [dateRange],
  );

  const handleDateChange = useCallback((date: Date) => {
    setDate(date);
    onDateChangeRef.current(date);
  }, []);

  const renderItem: ListRenderItem<dayjs.Dayjs> = useCallback(
    ({item}) => {
      return (
        <CalendarPickerDayItem
          date={item}
          onDateChange={handleDateChange}
          selectedDate={date}
        />
      );
    },
    [date, handleDateChange],
  );

  useEffect(() => {
    // Only update if the dates are actually different to prevent infinite loops
    if (props.date.getTime() !== date.getTime()) {
      setDate(props.date);
    }
  }, [props.date, date]);

  return (
    <View py={12}>
      <FlatList
        data={dateRange}
        style={{
          width: '100%',
        }}
        horizontal
        windowSize={14}
        initialNumToRender={14}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={renderItem}
        keyExtractor={(item) => item?.toDate()?.toString()}
      />
    </View>
  );
};

export {CalendarPicker};
