import {Circle, View, XStack, YStack} from 'tamagui';
import {FlatList} from 'react-native';
import {useState} from 'react';
import {Button} from '../../Button/Button';
import {APP_PADDING, DEVICE_WIDTH} from '../../../consts/consts';
import {ButtonProps} from '../../Button/types';
import {CarouselItem, CarouselItemData} from './CarouselItem';

const ItemSeparatorComponent = () => <View width={8} />;

export const CarouselSection = ({
  header,
  button,
  items,
  imageHeight,
}: {
  header?: React.ReactNode;
  button?: ButtonProps;
  items: CarouselItemData[];
  imageHeight?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <YStack gap={24}>
      <YStack px={APP_PADDING}>{header}</YStack>
      <FlatList
        data={items}
        renderItem={({item, index: itemIndex}) => (
          <CarouselItem
            item={item}
            isFirst={itemIndex === 0}
            isLast={itemIndex === items.length - 1}
            imageHeight={imageHeight}
          />
        )}
        horizontal
        style={{width: DEVICE_WIDTH, minHeight: 516}}
        decelerationRate="fast"
        snapToOffsets={items.map((_, i) => DEVICE_WIDTH * i - 40 * i)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / DEVICE_WIDTH,
          );
          setCurrentIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
      />
      <XStack gap={8} px={APP_PADDING}>
        {items.map((_, i) => (
          <Circle
            key={i as number}
            bg={currentIndex === i ? '$brandMid' : '$surface48'}
            size={8}
          />
        ))}
      </XStack>
      {!!button && (
        <YStack px={APP_PADDING} pt={24}>
          <Button {...button} />
        </YStack>
      )}
    </YStack>
  );
};
