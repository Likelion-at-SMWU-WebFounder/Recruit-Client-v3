import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  // 데스크톱/태블릿 판별: 첫 렌더 시점의 window.innerWidth만 사용(리사이즈 반영 X)
  const isDesktopOrTablet = useMemo(() => typeof window !== 'undefined' && window.innerWidth >= 768, []);

  // 각 카드 DOM을 보관하는 레코드: { [cardId]: HTMLDivElement | null }
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 눈송이의 최신 top 값을 ref로 보관(렌더 없이 내부 비교용)
  const snowflakeTopRef = useRef<number>(0);

  // 실제로 컴포넌트에 반영되는 눈송이 top 상태값
  const [snowflakeTop, setSnowflakeTop] = useState<number>(0);

  // 눈송이의 top 위치를 업데이트하는 루프를 관리하는 ref(requestAnimationFrame id를 보관해서 언마운트 시 취소하기 위함)
  const rafIdRef = useRef<number | null>(null);

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
    if (!isDesktopOrTablet) return;
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
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDesktopOrTablet, updateSnowflakePosition]);

  // 카드 DOM 참조 레코드, 눈송이의 top 위치, 데스크톱/태블릿 여부를 반환
  return { cardRefs, snowflakeTop, isDesktopOrTablet } as const;
}
