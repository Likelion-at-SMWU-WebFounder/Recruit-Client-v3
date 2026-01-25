import useMediaQuery from './useMediaQuery';

interface UseResponsiveOptions {
  /** 모바일 미디어 쿼리 (기본값: '(min-width: 768px)') */
  mobileQuery?: string;
  /** 데스크탑 미디어 쿼리 (기본값: '(min-width: 1024px)') */
  desktopQuery?: string;
}

interface UseResponsiveReturn {
  /** 모바일 여부 (모바일 미디어 쿼리가 false인 경우) */
  isMobile: boolean;
  /** 태블릿 여부 (모바일 미디어 쿼리는 true, 데스크탑 미디어 쿼리는 false인 경우) */
  isTablet: boolean;
  /** 데스크탑 여부 (데스크탑 미디어 쿼리가 true인 경우) */
  isDesktop: boolean;
}

const DEFAULT_MOBILE_QUERY = '(min-width: 768px)';
const DEFAULT_DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * 화면 크기에 따라 반응형 여부를 판단하는 커스텀 훅
 * @param options - 미디어 쿼리 옵션
 * @returns 반응형 여부 객체 (isMobile, isTablet, isDesktop)
 */
const useResponsive = ({
  mobileQuery = DEFAULT_MOBILE_QUERY,
  desktopQuery = DEFAULT_DESKTOP_QUERY,
}: UseResponsiveOptions = {}): UseResponsiveReturn => {
  const isTabletAndUp = useMediaQuery(mobileQuery);
  const isDesktop = useMediaQuery(desktopQuery);

  // 모바일: 모바일 쿼리가 false인 경우
  const isMobile = !isTabletAndUp;
  // 태블릿: 모바일 쿼리는 true지만 데스크탑 쿼리는 false인 경우
  const isTablet = isTabletAndUp && !isDesktop;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useResponsive;
