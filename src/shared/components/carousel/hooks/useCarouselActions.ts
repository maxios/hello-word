import { useState, useCallback, useRef, useEffect } from 'react';
import { CarouselActions, CarouselState, CarouselConfig } from '../schemas/carousel.types';

export const useCarouselActions = (
  totalItems: number,
  config: CarouselConfig = {},
  onSlideChange?: (index: number) => void
): CarouselState & CarouselActions => {
  const {
    loop = false,
    autoplay = false,
    autoplayInterval = 3000,
    itemsPerView = 1,
  } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay || isPaused || !isAutoPlaying) return;
    
    clearAutoplayTimer();
    
    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex > maxIndex) {
          return loop ? 0 : maxIndex;
        }
        
        return nextIndex;
      });
    }, autoplayInterval);
  }, [autoplay, autoplayInterval, isPaused, isAutoPlaying, loop, maxIndex, clearAutoplayTimer]);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index > maxIndex) return;
    if (index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    onSlideChange?.(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
    
    if (isAutoPlaying) {
      startAutoplay();
    }
  }, [currentIndex, maxIndex, onSlideChange, isAutoPlaying, startAutoplay]);

  const next = useCallback(() => {
    const nextIndex = currentIndex + 1;
    
    if (nextIndex > maxIndex) {
      if (loop) {
        goToSlide(0);
      }
    } else {
      goToSlide(nextIndex);
    }
  }, [currentIndex, maxIndex, loop, goToSlide]);

  const previous = useCallback(() => {
    const prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      if (loop) {
        goToSlide(maxIndex);
      }
    } else {
      goToSlide(prevIndex);
    }
  }, [currentIndex, maxIndex, loop, goToSlide]);

  const play = useCallback(() => {
    if (!autoplay) return;
    setIsAutoPlaying(true);
    setIsPaused(false);
  }, [autoplay]);

  const pause = useCallback(() => {
    setIsPaused(true);
    clearAutoplayTimer();
  }, [clearAutoplayTimer]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsAutoPlaying(autoplay);
    setIsPaused(false);
    setIsTransitioning(false);
    onSlideChange?.(0);
  }, [autoplay, onSlideChange]);

  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      startAutoplay();
    } else {
      clearAutoplayTimer();
    }
    
    return () => clearAutoplayTimer();
  }, [isAutoPlaying, isPaused, startAutoplay, clearAutoplayTimer]);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  return {
    currentIndex,
    isAutoPlaying,
    isPaused,
    isTransitioning,
    next,
    previous,
    goToSlide,
    play,
    pause,
    reset,
  };
};