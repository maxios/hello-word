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
        <View className="absolute inset-x-0 bottom-0 rounded-b-xl bg-black/50 p-3">
          <Text className="text-sm text-white">{item.caption}</Text>
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
      className="bg-surface-6 flex-1 rounded-xl p-4"
      style={{ width, minHeight: height }}
    >
      {item.image && (
        <Image
          source={item.image}
          style={{ width: '100%', height: height * 0.5 }}
          resizeMode="cover"
          className="mb-3 rounded-lg"
        />
      )}
      <Text className="mb-2 text-lg font-bold text-high-emphasis">{item.title}</Text>
      {item.description && (
        <Text className="mb-3 text-sm text-medium-emphasis">{item.description}</Text>
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
      className="bg-surface-6 flex-1 rounded-xl p-6"
      style={{ width, minHeight: height }}
    >
      {item.rating && (
        <View className="mb-3 flex-row">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className="mr-1 size-5"
              color={i < item.rating! ? '#FFD700' : '#666'}
            />
          ))}
        </View>
      )}
      
      <Text className="mb-4 flex-1 text-base italic text-high-emphasis">
        "{item.quote}"
      </Text>
      
      <View className="mt-auto flex-row items-center">
        {item.avatar && (
          <Image
            source={item.avatar}
            className="mr-3 size-12 rounded-full"
            resizeMode="cover"
          />
        )}
        <View>
          <Text className="font-bold text-high-emphasis">{item.author}</Text>
          {item.role && (
            <Text className="text-sm text-medium-emphasis">
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
      className="bg-surface-6 flex-1 overflow-hidden rounded-xl"
      style={{ width, minHeight: height }}
    >
      <View className="relative">
        <Image
          source={item.image}
          style={{ width: '100%', height: height * 0.6 }}
          resizeMode="cover"
        />
        {item.badge && (
          <View className="absolute left-2 top-2 rounded bg-brand-mid px-2 py-1">
            <Text className="text-xs font-bold text-white">{item.badge}</Text>
          </View>
        )}
        {item.discount && (
          <View className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1">
            <Text className="text-xs font-bold text-white">-{item.discount}%</Text>
          </View>
        )}
      </View>
      
      <View className="p-4">
        <Text className="mb-1 text-lg font-bold text-high-emphasis">{item.name}</Text>
        {item.description && (
          <Text className="mb-3 text-sm text-medium-emphasis" numberOfLines={2}>
            {item.description}
          </Text>
        )}
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline">
            <Text className="text-xl font-bold text-high-emphasis">
              {item.currency || '$'}{discountedPrice.toFixed(2)}
            </Text>
            {item.discount && (
              <Text className="ml-2 text-sm text-medium-emphasis line-through">
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