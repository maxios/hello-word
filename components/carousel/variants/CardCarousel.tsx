import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { CarouselContainer } from '../components/CarouselContainer';
import { CardCarouselItem, CarouselConfig } from '../schemas/carousel.types';

interface CardData {
  id?: string;
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  actions?: React.ReactNode;
  metadata?: Record<string, any>;
}

interface CardCarouselProps {
  cards: CardData[];
  config?: CarouselConfig;
  onCardPress?: (card: CardData, index: number) => void;
  className?: string;
  width?: number;
  height?: number;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  config = {},
  onCardPress,
  className,
  width,
  height = 400,
}) => {
  const items: CardCarouselItem[] = cards.map((card, index) => ({
    id: card.id || `card-${index}`,
    type: 'card',
    title: card.title,
    description: card.description,
    image: card.image,
    actions: card.actions,
    metadata: card.metadata,
  }));

  return (
    <CarouselContainer
      items={items}
      config={{
        ...config,
        spacing: config.spacing || 16,
        itemsPerView: config.itemsPerView || 1,
      }}
      onSlidePress={(item, index) => onCardPress?.(cards[index], index)}
      className={className}
      width={width}
      height={height}
      testID="card-carousel"
    />
  );
};