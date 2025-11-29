import { useCallback, useEffect, useRef, useState } from 'react';

import { PEOPLE_DATA } from '@pages/about/constants/people';

const useXPositionDrag = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLastCard, setIsLastCard] = useState(false);

  const getXPositionScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return null;

    const firstCard = container.querySelector('[data-card="true"]') as HTMLElement | null;
    if (!firstCard) return null;

    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    const paddingLeft = parseFloat(style.paddingLeft || '0') || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;

    const effectiveWidth = cardWidth + gap + paddingLeft;
    if (effectiveWidth <= 0) return null;

    return {
      container,
      gap,
      paddingLeft,
      cardWidth,
      effectiveWidth,
    };
  }, []);

  const evaluateIsLastCard = useCallback(() => {
    const metrics = getXPositionScroll();
    if (!metrics) {
      setIsLastCard(false);
      return;
    }

    const { container, effectiveWidth } = metrics;

    const rawIndex = container.scrollLeft / effectiveWidth;
    const index = Math.round(rawIndex);

    const lastId = PEOPLE_DATA[PEOPLE_DATA.length - 1]?.id;
    const currentId = PEOPLE_DATA[index]?.id ?? null;
    const isLast = currentId !== null && lastId !== undefined && currentId === lastId;

    setIsLastCard(isLast);
  }, [getXPositionScroll]);

  const scrollToNextCard = useCallback(() => {
    const metrics = getXPositionScroll();
    if (!metrics) return;

    const { container, cardWidth, gap, paddingLeft } = metrics;

    container.scrollBy({
      left: cardWidth + gap + paddingLeft,
      behavior: 'smooth',
    });
  }, [getXPositionScroll]);

  useEffect(() => {
    const metrics = getXPositionScroll();
    const container = metrics?.container;

    if (!container) {
      setIsLastCard(false);
      return;
    }

    const handleScroll = () => {
      evaluateIsLastCard();
    };

    // 초기 상태 계산
    evaluateIsLastCard();

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [evaluateIsLastCard, getXPositionScroll]);

  return {
    carouselRef,
    scrollToNextCard,
    isLastCard,
  };
};

export default useXPositionDrag;
