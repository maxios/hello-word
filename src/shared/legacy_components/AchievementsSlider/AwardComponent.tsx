import React, {useEffect} from 'react';
import {
  useAllAchievementsQuery,
  useGetAchievementsQuery,
  useUserQuery,
} from '@/graphql/generated-queries';
import {
  View,
  Text as RNText,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';

import {XStack, YStack} from 'tamagui';
import logEvent from '@/lib/logEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useModal} from '../../context/AwardModalContext'; // Import useModal
import {Text} from '../Text';

const AwardComponent: React.FC<{selectedDate: Date; scheduleData: any}> = ({
  selectedDate,
  scheduleData,
}) => {
  const {showModal} = useModal(); // Use context
  const userQuery = useUserQuery({fetchPolicy: 'cache-and-network'});
  const {data: UserAchievements} = useGetAchievementsQuery({
    variables: {
      userId: userQuery?.data?.user?.id || '',
    },
    fetchPolicy: 'cache-and-network',
    skip: !userQuery?.data?.user?.id,
  });
  const {data} = useAllAchievementsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      // id: ['5-WC', '1-WC', '50-WC', 'lisa2'],
      id:
        UserAchievements?.getAchievements?.achievements?.map(
          (achievement: {achievementCode: any}) =>
            achievement?.achievementCode || '',
        ) || [],
    },
    skip: !userQuery?.data?.user?.id,
  });

  const renderItem = ({item}: {item: any}) => {
    const userAchievement =
      UserAchievements?.getAchievements?.achievements?.find(
        (achievement: {achievementCode: any}) =>
          achievement.achievementCode === item.achievementCode,
      );
    const createdAtTimestamp =
      userAchievement?.createdAt || new Date().getTime();
    const createdAtDate = new Date(createdAtTimestamp).toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    );
    const itemWithCreatedAt = {...item, createdAt: createdAtDate};
    return (
      <Pressable
        onPress={() => {
          showModal(itemWithCreatedAt); // Use showModal from context
        }}
        style={styles.badge}
      >
        <XStack flex={1}>
          <YStack>
            <Image source={{uri: item?.image?.url}} style={styles.icon} />
            <XStack height="35%">
              <RNText numberOfLines={2} style={styles.badgeTitle}>
                {item.achievementName}
              </RNText>
            </XStack>
          </YStack>
        </XStack>
      </Pressable>
    );
  };
  // Ensure selectedDate is a valid Date object
  const validSelectedDate = selectedDate || new Date();

  // Define days of the week with unique keys
  const daysOfWeek = [
    {key: 'M', label: 'M'},
    {key: 'T1', label: 'T'},
    {key: 'W', label: 'W'},
    {key: 'T2', label: 'T'},
    {key: 'F', label: 'F'},
    {key: 'S1', label: 'S'},
    {key: 'S2', label: 'S'},
  ];

  const isWorkoutCompleteForDay = (dayIndex: number) => {
    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(validSelectedDate);
    const dayOffset = (startOfWeek.getDay() + 6) % 7; // Adjust for Monday as the start of the week
    startOfWeek.setDate(validSelectedDate.getDate() - dayOffset);

    // Calculate the date for the current day in the week
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayIndex);

    // Check if the workout is complete for the current day
    const isTodayComplete = scheduleData?.schedule?.some(
      (schedule: {scheduledDate: any; isComplete: any}) => {
        const scheduledDate = new Date(Number(schedule.scheduledDate));
        return (
          scheduledDate.toDateString() === date.toDateString() &&
          schedule.isComplete
        );
      },
    );

    // Check if all previous days are complete
    const arePreviousDaysComplete =
      dayIndex === 0 ||
      [...Array(dayIndex).keys()].every((prevIndex) => {
        const prevDate = new Date(startOfWeek);
        prevDate.setDate(startOfWeek.getDate() + prevIndex);
        return scheduleData?.schedule?.some(
          (schedule: {scheduledDate: any; isComplete: any}) => {
            const scheduledDate = new Date(Number(schedule.scheduledDate));

            return scheduledDate === prevDate && schedule.isComplete;
          },
        );
      });

    // Ensure that only the current day is checked for completion
    return isTodayComplete || (dayIndex > 0 && arePreviousDaysComplete);
  };
  const getStartOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const dayOffset = (startOfWeek.getDay() + 6) % 7; // Adjust for Monday as the start of the week
    startOfWeek.setDate(startOfWeek.getDate() - dayOffset);
    startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight
    return startOfWeek;
  };
  const checkForSixDayStreakAndCreateEvent = async (scheduleData: any) => {
    // Calculate the start of the current week (Monday)
    const startOfWeek = new Date(selectedDate);
    const dayOffset = (startOfWeek.getDay() + 6) % 7; // Adjust for Monday as the start of the week
    startOfWeek.setDate(selectedDate.getDate() - dayOffset);

    const startOfWeekOnce = getStartOfWeek(selectedDate);
    const weekIdentifier = startOfWeekOnce.toISOString();
    // Count completed days in the current week
    let completedDaysCount = 0;
     
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);

      const isComplete = scheduleData?.schedule?.some(
        (schedule: {scheduledDate: any; isComplete: boolean}) => {
          const scheduledDate = new Date(Number(schedule.scheduledDate));
          return (
            scheduledDate.toDateString() === currentDate.toDateString() &&
            schedule.isComplete
          );
        },
      );
      if (isComplete) {
        completedDaysCount += 1;
      }
    }
    // Check if there are 6 completed days in the current week
    const loggedWeek = await AsyncStorage.getItem('loggedWeek');
    if (completedDaysCount >= 6 && loggedWeek !== weekIdentifier) {
      createEventInCusIO();
      await AsyncStorage.setItem('loggedWeek', weekIdentifier);
    }
  };
  const createEventInCusIO = () => {
    // Logic to create an event in cus.io
    logEvent('Streak', {
      streak_name: 'Completed 6 days in a week',
    });
  };

  useEffect(() => {
    checkForSixDayStreakAndCreateEvent(scheduleData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleData]);

  // Extract the progress for WWSC
  const wwsProgress =
    UserAchievements?.getAchievements?.achievementsProgress?.find(
      (achievement: {achievementIdentifier: string}) =>
        achievement.achievementIdentifier === 'WWSC',
    )?.progress || 0;

  return (
    <YStack flex={1}>
      {wwsProgress !== null && wwsProgress > 0 && (
        <XStack marginVertical={16}>
          <RNText style={styles.keepGoing}>
            You&apos;ve completed your {wwsProgress} Week Workout Streak.
          </RNText>
        </XStack>
      )}
      <XStack flex={1} fd="row" ai="center" margin={6}>
        {daysOfWeek.map((day, index) => {
          const isComplete = isWorkoutCompleteForDay(index);
          return (
            <View
              key={day.key}
              style={[
                styles.SelectedDay,
                {backgroundColor: isComplete ? '#33C4EB' : 'white'},
              ]}
            >
              <RNText style={isComplete ? styles.days : styles.daysInactive}>
                {day.label}
              </RNText>
            </View>
          );
        })}
        <RNText style={styles.keepGoing}>Keep it going!</RNText>
      </XStack>

      {data?.allAchievements && data?.allAchievements.length > 0 ? (
        <FlatList
          data={data?.allAchievements}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
          style={{flexGrow: 1}}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text variant="bodySEmphasis">
            Complete a workout to earn your first achievement.
          </Text>
        </View>
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  SelectedDay: {
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  days: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  daysInactive: {
    color: '#000000', // Dark color for inactive days
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keepGoing: {
    color: '#FFFFFF',
    marginLeft: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  badge: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    marginRight: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(76, 76, 76, 0.4)',
    flex: 1,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  smallIcon: {
    width: 35,
    height: 35,
    marginBottom: 8,
  },
  smallIconContainer: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 80,
  },
  badgeTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
    width: 100,
  },
  badgeText: {
    color: '#A9A9A9',
    fontSize: 12,
    textAlign: 'center',
    width: 100,
  },
  flatListContent: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AwardComponent;
