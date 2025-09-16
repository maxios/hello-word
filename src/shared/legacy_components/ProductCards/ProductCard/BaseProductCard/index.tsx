import React from 'react';
import {GridCard} from './GridCard';
import {SingleCard} from './SingleCard';
import {MultiCard} from './MultiCard';

export interface BaseProductCardProps {
  isGridCard?: boolean;
  isSingleCard?: boolean;
  imageUrl: string | number;
  isComplete?: boolean;
  blurHash?: string;
  topRight?: React.ReactNode;
  aboveName: React.ReactNode;
  name: string;
  belowName?: React.ReactNode;
  onPress?: () => void;
  href?: string | {pathname: string; params: Record<string, any>};
  isVideoClass?: boolean;
  isTrailWorkout?: boolean;
  isGuideCard?: boolean;
}

export const BaseProductCard = ({
  isGridCard,
  isSingleCard,
  ...rest
}: BaseProductCardProps) => {
  switch (true) {
    case isGridCard:
      return <GridCard {...rest} />;
    case isSingleCard:
      return <SingleCard {...rest} />;
    default:
      return <MultiCard {...rest} />;
  }
};
