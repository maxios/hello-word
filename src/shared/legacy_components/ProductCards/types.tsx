import {JSXElementConstructor, ReactElement} from 'react';
import {
  WorkoutProductCardFragment,
  VideoClassProductCardFragment,
  VideoSeriesProductCardFragment,
  GuideProductCardFragment,
  MealProductCardFragment,
  ProgressEntryProductCardFragment,
} from '../../graphql/generated-queries';
import {ButtonProps} from '../Button/types';

export type WorkoutVariant =
  | 'guide-workout'
  | 'plan-workout'
  | 'featured-workout';

export interface ProductCardsGridProps {
  products: Product[];
  variant?: WorkoutVariant;
  isFavouritesSection?: boolean;
  ListHeaderComponent?: ReactElement;
}

export interface WorkoutProductCardProps extends WorkoutProductCardFragment {
  isPlan?: boolean;
  isGuide?: boolean;
}

export type Product =
  | WorkoutProductCardProps
  | VideoClassProductCardFragment
  | VideoSeriesProductCardFragment
  | GuideProductCardFragment
  | MealProductCardFragment
  | ProgressEntryProductCardFragment;

export interface ProductCardsScrollProps<P> {
  title?: string;
  subtext?: string;
  products: P[];
  keyExtractor?: (item: P) => string;
  ProductCardComponent: JSXElementConstructor<{
    product: P;
    isSingleCard?: boolean;
  }>;
  viewAllHref?: ButtonProps['href'];
  emptyState?: ReactElement;
  isLoading?: boolean;
  hasError?: boolean;
  isTrailWorkout?: boolean;
}
