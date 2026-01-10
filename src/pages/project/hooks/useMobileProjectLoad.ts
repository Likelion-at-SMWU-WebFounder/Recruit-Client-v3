import { useState, useEffect, useCallback } from 'react';

interface UseMobileProjectLoadOptions {
  totalItems: number;
  initialLoadCount: number;
  loadCount: number;
  isMobile: boolean;
  filter?: string;
  scrollThreshold?: number;
}

interface UseMobileProjectLoadReturn {
  visibleCount: number;
  isLoading: boolean;
  loadMore: () => void;
}

const DEFAULT_SCROLL_THRESHOLD = 200;

const useMobileProjectLoad = ({
  totalItems,
  initialLoadCount,
  loadCount,
  isMobile,
  filter,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: UseMobileProjectLoadOptions): UseMobileProjectLoadReturn => {
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);
  const [isLoading, setIsLoading] = useState(false);

  // 필터가 변경되면 초기 상태로 리셋
  useEffect(() => {
    setVisibleCount(initialLoadCount);
    setIsLoading(false);
  }, [filter, initialLoadCount]);

  const loadMore = useCallback(() => {
    if (isLoading || visibleCount >= totalItems) return;

    setIsLoading(true);
    return setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + loadCount, totalItems));
      setIsLoading(false);
    }, 700);
  }, [totalItems, isLoading, visibleCount, loadCount]);

  // 스크롤 시 자동 로드 (모바일 전용)
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - scrollThreshold; // 바닥에서 threshold 남았을 때

      if (scrollPosition >= threshold && visibleCount < totalItems) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalItems, isMobile, loadMore, visibleCount, scrollThreshold]);

  return {
    visibleCount,
    isLoading,
    loadMore,
  };
};

export default useMobileProjectLoad;
