import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { CarouselContainer } from '../components/CarouselContainer';
import { ImageCarouselItem, CarouselConfig } from '../schemas/carousel.types';

interface ImageCarouselProps {
  images: (ImageSourcePropType | { source: ImageSourcePropType; caption?: string; alt?: string })[];
  config?: CarouselConfig;
  onImagePress?: (index: number) => void;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  config = {},
  onImagePress,
  className,
  width,
  height = 300,
}) => {
  const items: ImageCarouselItem[] = images.map((imageItem, index) => {
    // Check if it's an object with source property (extended format)
    if (typeof imageItem === 'object' && imageItem !== null && 'source' in imageItem) {
      return {
        id: `image-${index}`,
        type: 'image',
        source: imageItem.source,
        caption: imageItem.caption,
        alt: imageItem.alt,
      };
    }
    // Otherwise it's a direct ImageSourcePropType
    return {
      id: `image-${index}`,
      type: 'image',
      source: imageItem as ImageSourcePropType,
    };
  });

  return (
    <CarouselContainer
      items={items}
      config={{
        ...config,
        showIndicators: config.showIndicators !== false,
        showControls: config.showControls !== false,
        enableGestures: config.enableGestures !== false,
      }}
      onSlidePress={(item, index) => onImagePress?.(index)}
      className={className}
      width={width}
      height={height}
      testID="image-carousel"
    />
  );
};