import { useEffect, useRef } from 'react';

const useScrollResistance = (strength: number = 0.3, scrollContainerRef: React.RefObject<HTMLElement | null>) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const container = scrollContainerRef.current;
    if (!el || !container) return;

    const onWheel = (e: WheelEvent) => {
      const sectionRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // ✅ 섹션이 컨테이너 안에 "완전히" 들어왔는지
      const isFullyInView = sectionRect.top >= containerRect.top && sectionRect.bottom <= containerRect.bottom;

      if (!isFullyInView) {
        // 섹션이 완전히 안 들어왔으면 기본 스크롤
        return;
      }

      const atTopEdge = Math.abs(sectionRect.top - containerRect.top) < 1;
      const atBottomEdge = Math.abs(sectionRect.bottom - containerRect.bottom) < 1;

      // ⬆️ 섹션 맨 위에서 위로 → 탈출 허용
      if (isScrollingUp && atTopEdge) {
        return;
      }

      // ⬇️ 섹션 맨 아래에서 아래로 → 탈출 허용
      if (isScrollingDown && atBottomEdge) {
        return;
      }

      // ✅ 이 구간에서만 저항 적용
      e.preventDefault();

      const resisted = e.deltaY * strength;

      container.scrollBy({
        top: resisted,
        behavior: 'auto',
      });
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [strength, scrollContainerRef]);

  return ref;
};

export default useScrollResistance;
