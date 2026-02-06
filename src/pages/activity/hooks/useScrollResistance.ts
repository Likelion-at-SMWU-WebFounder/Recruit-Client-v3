import { useEffect, useRef } from 'react';

/**
 * 스크롤 저항 훅
 *
 * - 섹션이 Activity 스크롤 컨테이너 안에 들어와 있는 동안,
 *   휠 입력을 부드러운 애니메이션으로 "감속"해서 적용한다.
 * - scroll-snap(mandatory)와 충돌하지 않도록,
 *   애니메이션이 동작하는 동안에만 snap을 임시로 끄고 종료 시 원복한다.
 *
 * strength가 작을수록(0.15 ~ 0.3 권장) 더 무겁고 천천히 스크롤된다.
 */
const useScrollResistance = (strength: number = 0.25, scrollContainerRef: React.RefObject<HTMLElement | null>) => {
  const ref = useRef<HTMLElement>(null);

  // 스크롤 애니메이션 상태
  const scrollStateRef = useRef<{
    targetScrollTop: number;
    animating: boolean;
    frameId: number | null;
  } | null>(null);

  useEffect(() => {
    const el = ref.current;
    const container = scrollContainerRef.current;
    if (!el || !container) return;

    if (!scrollStateRef.current) {
      scrollStateRef.current = {
        targetScrollTop: container.scrollTop,
        animating: false,
        frameId: null,
      };
    }

    const stopAnimation = () => {
      if (!scrollStateRef.current) return;
      const s = scrollStateRef.current;

      if (s.frameId !== null) {
        cancelAnimationFrame(s.frameId);
        s.frameId = null;
      }

      s.animating = false;
      // snap-y snap-mandatory 원복 (인라인 스타일 제거)
      container.style.scrollSnapType = '';
    };

    const animate = () => {
      if (!scrollStateRef.current) return;
      const s = scrollStateRef.current;

      const current = container.scrollTop;
      const target = s.targetScrollTop;
      const diff = target - current;

      if (Math.abs(diff) < 0.5) {
        container.scrollTop = target;
        s.animating = false;
        s.frameId = null;
        container.style.scrollSnapType = '';
        return;
      }

      // 부드러운 감속 계수 (0.15 ~ 0.3 정도가 자연스러움)
      const ease = 0.2;
      container.scrollTop = current + diff * ease;

      s.frameId = window.requestAnimationFrame(animate);
    };

    const ensureAnimation = () => {
      if (!scrollStateRef.current) return;
      const s = scrollStateRef.current;

      if (!s.animating) {
        s.animating = true;
        // 애니메이션 동안만 scroll-snap 비활성화
        container.style.scrollSnapType = 'none';
        s.frameId = window.requestAnimationFrame(animate);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!scrollStateRef.current) return;

      const sectionRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // 컨테이너(뷰포트)가 섹션 내부에 들어와 있는 동안만 저항 적용
      const isViewportInsideSection =
        sectionRect.top <= containerRect.top + 1 && sectionRect.bottom >= containerRect.bottom - 1;

      if (!isViewportInsideSection) {
        // 섹션 밖에서는 기본 스크롤 + 스냅
        // 혹시 이전 프레임에서 애니메이션 중이었다면 정리해주기
        stopAnimation();
        return;
      }

      const atTopEdge = Math.abs(sectionRect.top - containerRect.top) < 1;
      const atBottomEdge = Math.abs(sectionRect.bottom - containerRect.bottom) < 1;

      // 섹션 상단에서 위로 / 하단에서 아래로 → 섹션 탈출 허용 (저항 미적용)
      if ((isScrollingUp && atTopEdge) || (isScrollingDown && atBottomEdge)) {
        // 이 시점에는 다시 위/아래 섹션의 scroll-snap이 동작해야 하므로
        // 애니메이션과 snapType을 모두 정리
        stopAnimation();
        return;
      }

      // 여기부터는 섹션 내부 저항 구간
      e.preventDefault();

      const s = scrollStateRef.current;
      const maxScrollTop = container.scrollHeight - container.clientHeight;

      // 너무 큰 휠 값(트랙패드 플릭 등) 제한 → "너무 빨리" 이동 방지
      const maxDelta = 80;
      const limitedDelta = Math.max(-maxDelta, Math.min(maxDelta, e.deltaY));

      const base = s.animating ? s.targetScrollTop : container.scrollTop;
      let nextTarget = base + limitedDelta * strength;

      if (nextTarget < 0) nextTarget = 0;
      if (nextTarget > maxScrollTop) nextTarget = maxScrollTop;

      s.targetScrollTop = nextTarget;
      ensureAnimation();
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
      stopAnimation();
    };
  }, [strength, scrollContainerRef]);

  return ref;
};

export default useScrollResistance;
