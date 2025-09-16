import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { CarouselContainer } from '../components/CarouselContainer';
import { ProductCarouselItem, CarouselConfig } from '../schemas/carousel.types';

interface ProductData {
  id?: string;
  name: string;
  price: number;
  currency?: string;
  image: ImageSourcePropType;
  description?: string;
  badge?: string;
  discount?: number;
  onAddToCart?: () => void;
}

interface ProductCarouselProps {
  products: ProductData[];
  config?: CarouselConfig;
  onProductPress?: (product: ProductData, index: number) => void;
  className?: string;
  width?: number;
  height?: number;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  config = {},
  onProductPress,
  className,
  width,
  height = 420,
}) => {
  const items: ProductCarouselItem[] = products.map((product, index) => ({
    id: product.id || `product-${index}`,
    type: 'product',
    name: product.name,
    price: product.price,
    currency: product.currency,
    image: product.image,
    description: product.description,
    badge: product.badge,
    discount: product.discount,
    onAddToCart: product.onAddToCart,
  }));

  return (
    <CarouselContainer
      items={items}
      config={{
        ...config,
        spacing: config.spacing || 16,
        itemsPerView: config.itemsPerView || 1.2,
        centerMode: config.centerMode !== false,
      }}
      onSlidePress={(item, index) => onProductPress?.(products[index], index)}
      className={className}
      width={width}
      height={height}
      testID="product-carousel"
    />
  );
};