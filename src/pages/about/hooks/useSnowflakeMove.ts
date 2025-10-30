import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 특정 카드(openId)에 맞춰 '눈송이' 장식의 세로 위치를 부드럽게 추적하는 훅
 *
 * @param openId 현재 열려 있는(선택된) 카드의 id (없으면 null)
 * @param cardsContainerRef 카드 목록을 감싸는 컨테이너 ref (상대 위치 계산 기준)
 * @returns
 *  - cardRefs: 각 카드 DOM을 저장하는 ref 레코드 (렌더 시 ref 콜백으로 채워 사용)
 *  - snowflakeTop: 컨테이너 기준 눈송이의 top 위치(px)
 *  - isDesktopOrTablet: 데스크톱/태블릿 여부 (width >= 768)
 */

export function useSnowflakeMove(openId: number | null, cardsContainerRef: React.RefObject<HTMLDivElement | null>) {
  // 데스크톱/태블릿 판별: matchMedia를 통해 동적으로 관리
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768;
  });

  // 각 카드 DOM을 보관하는 레코드: { [cardId]: HTMLDivElement | null }
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 눈송이의 최신 top 값을 ref로 보관(렌더 없이 내부 비교용)
  const snowflakeTopRef = useRef<number>(0);

  // 실제로 컴포넌트에 반영되는 눈송이 top 상태값
  const [snowflakeTop, setSnowflakeTop] = useState<number>(0);

  // 눈송이의 top 위치를 업데이트하는 루프를 관리하는 ref(requestAnimationFrame id를 보관해서 언마운트 시 취소하기 위함)
  const rafIdRef = useRef<number | null>(null);

  /**
   * matchMedia를 통한 뷰포트 변화 감지
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktopOrTablet(e.matches);

      // 모바일로 전환 시 눈송이 위치 초기화
      if (!e.matches) {
        snowflakeTopRef.current = 0;
        setSnowflakeTop(0);
      }
    };

    // 초기 설정
    handleMediaChange(mediaQuery);

    // 리스너 등록 (브라우저 호환성 고려)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  /**
   * 눈송이의 top 위치를 갱신하는 함수
   * - 컨테이너와 현재 선택된 카드의 DOMRect를 비교하여 컨테이너 내부 기준의 중앙값을 계산
   * - 미세한 변화(<= 0.5px)는 무시하여 불필요한 re-render 방지
   */
  const updateSnowflakePosition = useCallback(() => {
    // 데스크톱/태블릿이 아니면 초기화/해제
    if (!isDesktopOrTablet) return; // 모바일에서는 동작하지 않음

    // 컨테이너 DOM 가져오기
    const container = cardsContainerRef.current;
    if (!container || openId == null) return; // 기준 컨테이너나 열려 있는 카드가 없으면 종료

    // 열려 있는 카드 DOM 가져오기
    const cardEl = cardRefs.current[openId];
    if (!cardEl) return; // 열려있는 카드 DOM이 없으면 종료

    // 뷰포트 기준 위치/크기(컨테이너, 카드의 DOM의 박스 모델 가져오기)
    const containerRect = container.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();

    // 눈송이의 top 위치를 계산: 컨테이너의 top을 0으로 보는 내부 좌표계로 변환한 뒤, 카드의 '중앙' y 좌표를 계산
    const nextTop = cardRect.top - containerRect.top + cardRect.height / 2;
    if (Math.abs(nextTop - snowflakeTopRef.current) > 0.5) {
      snowflakeTopRef.current = nextTop;
      setSnowflakeTop(nextTop);
    }
  }, [cardsContainerRef, openId, isDesktopOrTablet]);

  /**
   * requestAnimationFrame 루프를 돌며 매 프레임 위치를 점검/갱신
   * - isDesktopOrTablet이 true일 때만 활성화
   * - 언마운트 시 requestAnimationFrame 정리
   */
  useEffect(() => {
    if (!isDesktopOrTablet) {
      // 모바일 모드: RAF 루프 정리
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    // 데스크톱/태블릿 모드: RAF 루프 시작
    let mounted = true;
    const loop = () => {
      if (!mounted) return;
      updateSnowflakePosition();
      rafIdRef.current = window.requestAnimationFrame(loop);
    };
    // requestAnimationFrame 루프 시작
    rafIdRef.current = window.requestAnimationFrame(loop);

    // 언마운트 또는 의존성 변경 시 requestAnimationFrame 정리(취소)
    return () => {
      mounted = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isDesktopOrTablet, updateSnowflakePosition]);

  // 카드 DOM 참조 레코드, 눈송이의 top 위치, 데스크톱/태블릿 여부를 반환
  return { cardRefs, snowflakeTop, isDesktopOrTablet } as const;
}
