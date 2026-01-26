import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type GetIdByIndex = (index: number) => number | null;

const useMobileScroll = (totalCards: number, getIdByIndex: GetIdByIndex, setOpenId: (id: number | null) => void) => {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedProgressRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isClickScrollingRef = useRef(false);
  const progressObjRef = useRef({ value: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 모바일 모드 판별: matchMedia를 통해 동적으로 관리 (데스크톱이었다가 모바일로 전환 시 새로 생성)
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    // ScrollTrigger 생성 함수
    const createScrollTrigger = () => {
      if (!sectionRef.current) return;

      // 기존 ScrollTrigger가 있다면 제거
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      const section = sectionRef.current;

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalCards * 150}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          if (isClickScrollingRef.current) return;

          // 카드 개수 기준 중앙 스냅: round(progress * N - 0.5)
          const N = totalCards;
          const centered = Math.round(self.progress * N - 0.5);
          const cardIndex = Math.max(0, Math.min(centered, N - 1));

          if (cardIndex !== animatedProgressRef.current) {
            animatedProgressRef.current = cardIndex;
            const newOpenId = getIdByIndex(cardIndex);
            setOpenId(newOpenId);
          }
        },
      });

      scrollTriggerRef.current = scrollTrigger;
    };

    // ScrollTrigger 제거 및 상태 초기화 함수
    const destroyScrollTrigger = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(window);
      gsap.killTweensOf(progressObjRef.current);
      animatedProgressRef.current = 0;
      isClickScrollingRef.current = false;
    };

    // 미디어 쿼리 변화 핸들러
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // 모바일 모드: ScrollTrigger 생성
        createScrollTrigger();
      } else {
        // 데스크톱 모드: ScrollTrigger 제거 및 초기화
        destroyScrollTrigger();
      }
    };

    // 초기 설정
    handleMediaChange(mediaQuery);

    // 리스너 등록 (브라우저 호환성 고려)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      // 구형 브라우저 지원
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      // 클린업
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      destroyScrollTrigger();
    };
  }, [totalCards, getIdByIndex, setOpenId]);

  const scrollToCard = (cardIndex: number) => {
    if (!scrollTriggerRef.current) return;

    // 모든 기존 애니메이션 즉시 중단
    gsap.killTweensOf(window);
    gsap.killTweensOf(progressObjRef.current);
    isClickScrollingRef.current = true;

    // 즉시 상태 업데이트하여 카드가 빠르게 열리도록 함
    animatedProgressRef.current = cardIndex;
    const newOpenId = getIdByIndex(cardIndex);
    setOpenId(newOpenId);

    // 다음 프레임에서 스크롤 시작
    requestAnimationFrame(() => {
      const N = totalCards;
      const progress = (cardIndex + 0.5) / N;
      const scrollTrigger = scrollTriggerRef.current!;
      const scrollPosition = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;

      gsap.to(window, {
        scrollTo: { y: scrollPosition, autoKill: false },
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          requestAnimationFrame(() => {
            // 목표 진행도의 중앙 스냅 기준으로 인덱스 확정
            const finalIndex = Math.max(0, Math.min(Math.round(progress * N - 0.5), N - 1));
            const finalId = getIdByIndex(finalIndex);
            animatedProgressRef.current = finalIndex;
            setOpenId(finalId);
            isClickScrollingRef.current = false;
          });
        },
      });
    });
  };

  return { sectionRef, animatedProgressRef, scrollToCard } as const;
};

export default useMobileScroll;
