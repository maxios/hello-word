/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
import React, {useMemo, useCallback} from 'react';
import dayjs from 'dayjs';
import {ProductCardsScroll} from '../ProductCards/ProductCardsScroll';
import {GuideWorkoutProductCard} from '../ProductCards/ProductCard/GuideWorkoutProductCard';
import {PlanWorkoutProductCard} from '../ProductCards/ProductCard/PlanWorkoutProductCard';
import {
  useScheduleQuery,
  useUserQuery,
  VideoClassProductCardFragment,
  WorkoutProductCardFragment,
} from '../../graphql/generated-queries';
import {RestDayToday} from '../RestDayToday';
import {VideoProductCard} from '../ProductCards/ProductCard/VideoProductCard';

interface YourWorkoutsScrollProps {
  selectedDate: Date;
}

const ProductCardComponent = React.memo(
  ({product, isSingleCard}: {product: any; isSingleCard: boolean}) => {
    const schedule = useMemo(
      () => ({
        id: product.id,
        fromDate: product.scheduledDate,
      }),
      [product.id, product.scheduledDate],
    );

    if (product.__typename === 'VideoSeriesSchedule' && product.isActive) {
      return (
        <VideoProductCard
          schedule={schedule}
          isComplete={!!product.isComplete}
          product={product.videoClass as VideoClassProductCardFragment}
          isSingleCard={isSingleCard}
          isSeries
        />
      );
    }

    if (product.__typename === 'GuideSchedule' && product.isActive) {
      return (
        <GuideWorkoutProductCard
          schedule={schedule}
          product={product.workout as WorkoutProductCardFragment}
          isSingleCard={isSingleCard}
          isComplete={!!product.isComplete}
          workoutType={product.workout.workoutType || undefined}
          isHomePage
        />
      );
    }

    if (product.__typename === 'PlanSchedule') {
      return (
        <PlanWorkoutProductCard
          schedule={schedule}
          product={product.workout as WorkoutProductCardFragment}
          isComplete={!!product.isComplete}
          isSingleCard={isSingleCard}
          planId={product.planId}
        />
      );
    }

    return null;
  },
);

ProductCardComponent.displayName = 'ProductCardComponent';

export const YourWorkoutsScroll: React.FC<YourWorkoutsScrollProps> = React.memo(
  ({selectedDate}: YourWorkoutsScrollProps) => {
    const userQuery = useUserQuery({fetchPolicy: 'cache-first'});
    const userId = userQuery?.data?.user?.id;

    const {data, loading} = useScheduleQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        startDate: dayjs(selectedDate).utc().format('YYYY-MM-DD'),
        endDate: dayjs(selectedDate).utc().format('YYYY-MM-DD'),
      },
      skip: !userId,
    });

    const filteredSchedule = useMemo(() => {
      if (!data?.schedule) return [];
      return data.schedule.filter(
        (schedule) =>
          dayjs(schedule.scheduledDate).utc().format('YYYY-MM-DD') ===
          dayjs(selectedDate).utc().format('YYYY-MM-DD'),
      );
    }, [data?.schedule, selectedDate]);

    const isSingleCard = useMemo(
      () => filteredSchedule?.length === 1,
      [filteredSchedule?.length],
    );

    const keyExtractor = useCallback((item: any) => item.id, []);

    return (
      <ProductCardsScroll
        title="Your Workouts"
        subtext="Here's what you have scheduled for today."
        products={filteredSchedule ?? []}
        keyExtractor={keyExtractor}
        ProductCardComponent={({product}) => (
          <ProductCardComponent product={product} isSingleCard={isSingleCard} />
        )}
        emptyState={<RestDayToday />}
        isLoading={loading && !data?.schedule}
      />
    );
  },
);

YourWorkoutsScroll.displayName = 'YourWorkoutsScroll';
