import React from 'react';
import { render, fireEvent, waitFor, renderHook, act } from '@testing-library/react-native';
import { Carousel } from './Carousel';
import { ImageCarousel } from './variants/ImageCarousel';
import { CardCarousel } from './variants/CardCarousel';
import { useCarouselActions } from './hooks/useCarouselActions';

const mockItems = [
  { id: '1', type: 'image' as const, source: { uri: 'image1.jpg' } },
  { id: '2', type: 'image' as const, source: { uri: 'image2.jpg' } },
  { id: '3', type: 'image' as const, source: { uri: 'image3.jpg' } },
];

describe('Carousel Component', () => {
  it('renders correctly with items', () => {
    const { getByTestId } = render(
      <Carousel
        items={mockItems}
        currentIndex={0}
        onNext={jest.fn()}
        onPrevious={jest.fn()}
        onGoToSlide={jest.fn()}
      />
    );
    
    expect(getByTestId('carousel')).toBeTruthy();
  });

  it('displays correct accessibility labels', () => {
    const { getByLabelText } = render(
      <Carousel
        items={mockItems}
        currentIndex={1}
        onNext={jest.fn()}
        onPrevious={jest.fn()}
        onGoToSlide={jest.fn()}
      />
    );
    
    expect(getByLabelText('Carousel with 3 items')).toBeTruthy();
  });

  it('calls navigation callbacks correctly', () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    
    const { getByLabelText } = render(
      <Carousel
        items={mockItems}
        currentIndex={1}
        onNext={onNext}
        onPrevious={onPrevious}
        onGoToSlide={jest.fn()}
      />
    );
    
    fireEvent.press(getByLabelText('Next slide'));
    expect(onNext).toHaveBeenCalled();
    
    fireEvent.press(getByLabelText('Previous slide'));
    expect(onPrevious).toHaveBeenCalled();
  });
});

describe('useCarouselActions Hook', () => {
  it('initializes with correct default state', () => {
    const { result } = renderHook(() => 
      useCarouselActions(3, {})
    );
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isAutoPlaying).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  it('navigates to next slide correctly', () => {
    const { result } = renderHook(() => 
      useCarouselActions(3, {})
    );
    
    act(() => {
      result.current.next();
    });
    
    expect(result.current.currentIndex).toBe(1);
  });

  it('navigates to previous slide correctly', () => {
    const { result } = renderHook(() => 
      useCarouselActions(3, {})
    );
    
    act(() => {
      result.current.goToSlide(2);
    });
    
    expect(result.current.currentIndex).toBe(2);
    
    act(() => {
      result.current.previous();
    });
    
    expect(result.current.currentIndex).toBe(1);
  });

  it('handles loop configuration correctly', () => {
    const { result } = renderHook(() => 
      useCarouselActions(3, { loop: true })
    );
    
    act(() => {
      result.current.goToSlide(2);
    });
    
    act(() => {
      result.current.next();
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  it('handles autoplay correctly', async () => {
    jest.useFakeTimers();
    
    const { result } = renderHook(() => 
      useCarouselActions(3, { 
        autoplay: true, 
        autoplayInterval: 1000 
      })
    );
    
    expect(result.current.isAutoPlaying).toBe(true);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(result.current.currentIndex).toBe(1);
    });
    
    jest.useRealTimers();
  });
});

describe('ImageCarousel Variant', () => {
  const mockImages = [
    { source: { uri: 'image1.jpg' }, caption: 'Caption 1' },
    { source: { uri: 'image2.jpg' }, caption: 'Caption 2' },
  ];

  it('renders image carousel correctly', () => {
    const { getByTestId } = render(
      <ImageCarousel images={mockImages} />
    );
    
    expect(getByTestId('image-carousel')).toBeTruthy();
  });

  it('handles image press events', () => {
    const onImagePress = jest.fn();
    
    const { getByTestId } = render(
      <ImageCarousel 
        images={mockImages}
        onImagePress={onImagePress}
      />
    );
    
    const carousel = getByTestId('image-carousel');
    fireEvent.press(carousel);
  });
});

describe('CardCarousel Variant', () => {
  const mockCards = [
    { title: 'Card 1', description: 'Description 1' },
    { title: 'Card 2', description: 'Description 2' },
  ];

  it('renders card carousel correctly', () => {
    const { getByTestId, getByText } = render(
      <CardCarousel cards={mockCards} />
    );
    
    expect(getByTestId('card-carousel')).toBeTruthy();
    expect(getByText('Card 1')).toBeTruthy();
  });

  it('handles card press events', () => {
    const onCardPress = jest.fn();
    
    const { getByText } = render(
      <CardCarousel 
        cards={mockCards}
        onCardPress={onCardPress}
      />
    );
    
    fireEvent.press(getByText('Card 1'));
  });
});