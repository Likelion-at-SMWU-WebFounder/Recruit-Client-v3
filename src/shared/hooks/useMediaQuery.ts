import { useState, useEffect } from 'react';

/**
 * 미디어 쿼리를 감지하는 커스텀 훅
 * @param query - CSS 미디어 쿼리 문자열 (예: '(min-width: 768px)')
 * @returns 미디어 쿼리 매칭 여부
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    // 초기 값 설정
    handleMediaChange(mediaQuery);

    // 리스너 등록 (브라우저 호환성 고려)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      // 구형 브라우저 지원
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      // cleanup
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
