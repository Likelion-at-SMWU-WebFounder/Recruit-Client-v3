import { useCallback, useEffect, useRef, useState } from 'react';

import { PEOPLE_DATA } from '@pages/about/constants/people';

const useXPositionDrag = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLastCard, setIsLastCard] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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

    // 마우스 드래그 핸들러
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      const rect = container.getBoundingClientRect();
      startXRef.current = e.pageX - rect.left;
      scrollLeftRef.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const walk = (x - startXRef.current) * 2; // 드래그 속도 조절 (2배)
      container.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    };

    // 초기 상태 계산
    evaluateIsLastCard();

    // 스크롤 이벤트
    container.addEventListener('scroll', handleScroll);

    // 마우스 드래그 이벤트
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 전역 mouseup 이벤트 (캐러셀 영역 밖에서 마우스를 놓았을 때도 처리)
    document.addEventListener('mouseup', handleMouseUp);

    // 초기 커서 스타일 설정
    container.style.cursor = 'grab';

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [evaluateIsLastCard, getXPositionScroll]);

  return {
    carouselRef,
    scrollToNextCard,
    isLastCard,
  };
};

export default useXPositionDrag;
