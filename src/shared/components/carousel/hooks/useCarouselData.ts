import { useState, useEffect, useCallback, useRef } from 'react';
import { CarouselItem } from '../schemas/carousel.types';

interface UseCarouselDataProps {
  items?: CarouselItem[];
  fetchData?: () => Promise<CarouselItem[]>;
  cacheKey?: string;
  enableCache?: boolean;
}

interface CarouselDataState {
  items: CarouselItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const carouselCache = new Map<string, CarouselItem[]>();

export const useCarouselData = ({
  items: staticItems,
  fetchData,
  cacheKey,
  enableCache = true,
}: UseCarouselDataProps): CarouselDataState => {
  const [items, setItems] = useState<CarouselItem[]>(staticItems || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchDataRef = useRef(fetchData);
  fetchDataRef.current = fetchData;

  const loadData = useCallback(async () => {
    const fetcher = fetchDataRef.current;
    if (!fetcher) return;

    if (enableCache && cacheKey && carouselCache.has(cacheKey)) {
      setItems(carouselCache.get(cacheKey)!);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetcher();
      setItems(data);

      if (enableCache && cacheKey) {
        carouselCache.set(cacheKey, data);
      }
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching carousel data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enableCache, cacheKey]);

  const refetch = useCallback(async () => {
    if (cacheKey) {
      carouselCache.delete(cacheKey);
    }
    await loadData();
  }, [cacheKey, loadData]);

  useEffect(() => {
    if (staticItems) {
      setItems(staticItems);
    } else {
      loadData();
    }
  }, [staticItems, loadData]);

  return {
    items,
    isLoading,
    error,
    refetch,
  };
};

export const clearCarouselCache = (cacheKey?: string) => {
  if (cacheKey) {
    carouselCache.delete(cacheKey);
  } else {
    carouselCache.clear();
  }
};