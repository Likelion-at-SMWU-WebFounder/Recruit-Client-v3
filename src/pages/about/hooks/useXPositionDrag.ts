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

    const { container, effectiveWidth } = metrics;

    // 현재 스크롤 위치에서 다음 카드의 인덱스 계산
    const rawIndex = container.scrollLeft / effectiveWidth;
    const currentIndex = Math.round(rawIndex);
    const nextIndex = currentIndex + 1;

    // 다음 카드가 존재하는지 확인
    if (nextIndex >= PEOPLE_DATA.length) return;

    // 다음 카드 요소 찾기
    const cards = container.querySelectorAll('[data-card="true"]');
    const nextCard = cards[nextIndex] as HTMLElement | null;

    if (!nextCard) return;

    // scrollPaddingLeft를 고려한 다음 카드의 정확한 위치 계산
    const style = window.getComputedStyle(container);
    const scrollPaddingLeft = parseFloat(style.scrollPaddingLeft || '0') || 0;

    // 카드의 offsetLeft에서 scrollPaddingLeft를 빼서 정확한 snap 위치 계산
    const targetScrollLeft = nextCard.offsetLeft - scrollPaddingLeft;

    container.scrollTo({
      left: targetScrollLeft,
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
