export { Carousel } from './Carousel';
export { CarouselContainer } from './components/CarouselContainer';
export { ImageCarousel } from './variants/ImageCarousel';
export { CardCarousel } from './variants/CardCarousel';
export { TestimonialCarousel } from './variants/TestimonialCarousel';
export { ProductCarousel } from './variants/ProductCarousel';

export { useCarouselActions } from './hooks/useCarouselActions';
export { useCarouselGestures } from './hooks/useCarouselGestures';
export { useCarouselData, clearCarouselCache } from './hooks/useCarouselData';

export type {
  CarouselSchema,
  CarouselItem,
  CarouselConfig,
  CarouselState,
  CarouselActions,
  ImageCarouselItem,
  CardCarouselItem,
  TestimonialCarouselItem,
  ProductCarouselItem,
} from './schemas/carousel.types';