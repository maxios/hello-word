import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { 
  CarouselItem,
  ImageCarouselItem,
  CardCarouselItem,
  TestimonialCarouselItem,
  ProductCarouselItem 
} from '../schemas/carousel.types';
import { Button } from '@/components/Button/Button';
import { StarIcon } from '@/components/icons';

interface CarouselItemRendererProps {
  item: CarouselItem;
  index: number;
  width: number;
  height: number;
  onPress?: () => void;
}

export const CarouselItemRenderer: React.FC<CarouselItemRendererProps> = ({
  item,
  width,
  height,
  onPress,
}) => {
  switch (item.type) {
    case 'image':
      return <ImageItem item={item} width={width} height={height} onPress={onPress} />;
    case 'card':
      return <CardItem item={item} width={width} height={height} onPress={onPress} />;
    case 'testimonial':
      return <TestimonialItem item={item} width={width} height={height} onPress={onPress} />;
    case 'product':
      return <ProductItem item={item} width={width} height={height} onPress={onPress} />;
    default:
      return null;
  }
};

const ImageItem: React.FC<{
  item: ImageCarouselItem;
  width: number;
  height: number;
  onPress?: () => void;
}> = ({ item, width, height, onPress }) => {
  return (
    <Pressable onPress={onPress} className="flex-1">
      <Image
        source={item.source}
        style={{ width, height }}
        resizeMode="cover"
        className="rounded-xl"
        accessibilityLabel={item.alt}
      />
      {item.caption && (
        <View className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 rounded-b-xl">
          <Text className="text-white text-sm">{item.caption}</Text>
        </View>
      )}
    </Pressable>
  );
};

const CardItem: React.FC<{
  item: CardCarouselItem;
  width: number;
  height: number;
  onPress?: () => void;
}> = ({ item, width, height, onPress }) => {
  return (
    <Pressable 
      onPress={onPress}
      className="flex-1 bg-surface-6 rounded-xl p-4"
      style={{ width, minHeight: height }}
    >
      {item.image && (
        <Image
          source={item.image}
          style={{ width: '100%', height: height * 0.5 }}
          resizeMode="cover"
          className="rounded-lg mb-3"
        />
      )}
      <Text className="text-high-emphasis text-lg font-bold mb-2">{item.title}</Text>
      {item.description && (
        <Text className="text-medium-emphasis text-sm mb-3">{item.description}</Text>
      )}
      {item.actions && (
        <View className="mt-auto">{item.actions}</View>
      )}
    </Pressable>
  );
};

const TestimonialItem: React.FC<{
  item: TestimonialCarouselItem;
  width: number;
  height: number;
  onPress?: () => void;
}> = ({ item, width, height, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 bg-surface-6 rounded-xl p-6"
      style={{ width, minHeight: height }}
    >
      {item.rating && (
        <View className="flex-row mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className="w-5 h-5 mr-1"
              color={i < item.rating! ? '#FFD700' : '#666'}
            />
          ))}
        </View>
      )}
      
      <Text className="text-high-emphasis text-base italic mb-4 flex-1">
        "{item.quote}"
      </Text>
      
      <View className="flex-row items-center mt-auto">
        {item.avatar && (
          <Image
            source={item.avatar}
            className="w-12 h-12 rounded-full mr-3"
            resizeMode="cover"
          />
        )}
        <View>
          <Text className="text-high-emphasis font-bold">{item.author}</Text>
          {item.role && (
            <Text className="text-medium-emphasis text-sm">
              {item.role}
              {item.company && ` at ${item.company}`}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const ProductItem: React.FC<{
  item: ProductCarouselItem;
  width: number;
  height: number;
  onPress?: () => void;
}> = ({ item, width, height, onPress }) => {
  const discountedPrice = item.discount 
    ? item.price * (1 - item.discount / 100) 
    : item.price;

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 bg-surface-6 rounded-xl overflow-hidden"
      style={{ width, minHeight: height }}
    >
      <View className="relative">
        <Image
          source={item.image}
          style={{ width: '100%', height: height * 0.6 }}
          resizeMode="cover"
        />
        {item.badge && (
          <View className="absolute top-2 left-2 bg-brand-mid px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">{item.badge}</Text>
          </View>
        )}
        {item.discount && (
          <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">-{item.discount}%</Text>
          </View>
        )}
      </View>
      
      <View className="p-4">
        <Text className="text-high-emphasis font-bold text-lg mb-1">{item.name}</Text>
        {item.description && (
          <Text className="text-medium-emphasis text-sm mb-3" numberOfLines={2}>
            {item.description}
          </Text>
        )}
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline">
            <Text className="text-high-emphasis font-bold text-xl">
              {item.currency || '$'}{discountedPrice.toFixed(2)}
            </Text>
            {item.discount && (
              <Text className="text-medium-emphasis text-sm line-through ml-2">
                {item.currency || '$'}{item.price.toFixed(2)}
              </Text>
            )}
          </View>
          
          {item.onAddToCart && (
            <Button
              variant="primary"
              size="small"
              label="Add"
              onPress={item.onAddToCart}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};