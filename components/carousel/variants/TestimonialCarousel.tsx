import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { CarouselContainer } from '../components/CarouselContainer';
import { TestimonialCarouselItem, CarouselConfig } from '../schemas/carousel.types';

interface TestimonialData {
  id?: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: ImageSourcePropType;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  config?: CarouselConfig;
  onTestimonialPress?: (testimonial: TestimonialData, index: number) => void;
  className?: string;
  width?: number;
  height?: number;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  config = {},
  onTestimonialPress,
  className,
  width,
  height = 350,
}) => {
  const items: TestimonialCarouselItem[] = testimonials.map((testimonial, index) => ({
    id: testimonial.id || `testimonial-${index}`,
    type: 'testimonial',
    quote: testimonial.quote,
    author: testimonial.author,
    role: testimonial.role,
    company: testimonial.company,
    avatar: testimonial.avatar,
    rating: testimonial.rating,
  }));

  return (
    <CarouselContainer
      items={items}
      config={{
        ...config,
        autoplay: config.autoplay !== false,
        autoplayInterval: config.autoplayInterval || 5000,
      }}
      onSlidePress={(item, index) => onTestimonialPress?.(testimonials[index], index)}
      className={className}
      width={width}
      height={height}
      testID="testimonial-carousel"
    />
  );
};