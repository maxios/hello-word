import { ImageSourcePropType } from 'react-native';
import { ReactNode } from 'react';

export interface CarouselItemBase {
  id: string;
  key?: string;
}

export interface ImageCarouselItem extends CarouselItemBase {
  type: 'image';
  source: ImageSourcePropType;
  alt?: string;
  caption?: string;
}

export interface CardCarouselItem extends CarouselItemBase {
  type: 'card';
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  actions?: ReactNode;
  metadata?: Record<string, any>;
}

export interface TestimonialCarouselItem extends CarouselItemBase {
  type: 'testimonial';
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: ImageSourcePropType;
  rating?: number;
}

export interface ProductCarouselItem extends CarouselItemBase {
  type: 'product';
  name: string;
  price: number;
  currency?: string;
  image: ImageSourcePropType;
  description?: string;
  badge?: string;
  discount?: number;
  onAddToCart?: () => void;
}

export type CarouselItem = 
  | ImageCarouselItem 
  | CardCarouselItem 
  | TestimonialCarouselItem 
  | ProductCarouselItem;

export interface CarouselConfig {
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  enableGestures?: boolean;
  enableKeyboard?: boolean;
  transitionDuration?: number;
  itemsPerView?: number;
  spacing?: number;
  centerMode?: boolean;
  fadeEdges?: boolean;
}

export interface CarouselState {
  currentIndex: number;
  isAutoPlaying: boolean;
  isPaused: boolean;
  isTransitioning: boolean;
}

export interface CarouselActions {
  next: () => void;
  previous: () => void;
  goToSlide: (index: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export interface CarouselSchema {
  items: CarouselItem[];
  config?: CarouselConfig;
  className?: string;
  testID?: string;
  onSlideChange?: (index: number) => void;
  onSlidePress?: (item: CarouselItem, index: number) => void;
  renderItem?: (item: CarouselItem, index: number) => ReactNode;
}

export interface CarouselIndicatorsProps {
  total: number;
  currentIndex: number;
  onDotPress?: (index: number) => void;
  className?: string;
}

export interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
}

export interface CarouselGestureEvent {
  translationX: number;
  velocityX: number;
  state: 'began' | 'active' | 'end' | 'cancelled';
}

export interface CarouselAccessibilityProps {
  label?: string;
  hint?: string;
  currentSlideLabel?: string;
  totalSlidesLabel?: string;
}