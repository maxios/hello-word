import {Circle, XStack} from 'tamagui';
import {perks} from './perks';

export const CarouselPagination = ({index}: {index: number}) => (
  <XStack gap={8}>
    {perks.map((_, i) => (
      <Circle
        key={i as number}
        bg={index === i ? '$textMediumEmphasis' : '$surface20'}
        size={8}
      />
    ))}
  </XStack>
);
