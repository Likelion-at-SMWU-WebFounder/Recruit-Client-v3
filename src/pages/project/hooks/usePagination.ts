import { useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UsePaginationOptions {
  totalItems: number;
  tabletItemsPerPage: number;
  desktopItemsPerPage: number;
  isMobile: boolean;
  isDesktop: boolean;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const usePagination = ({
  totalItems,
  tabletItemsPerPage,
  desktopItemsPerPage,
  isMobile,
  isDesktop,
}: UsePaginationOptions): UsePaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 page 파라미터 읽기 (모바일이 아닐 때만 사용)
  const pageFromUrl = searchParams.get('page');
  const currentPage = useMemo(() => {
    // 모바일에서는 페이지네이션을 사용하지 않으므로 항상 1 반환
    if (isMobile) return 1;
    const page = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  }, [pageFromUrl, isMobile]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (page === 1) {
        // 페이지가 1이면 파라미터에서 제거
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', page.toString());
      }
      setSearchParams(newSearchParams);
      // 페이지 변경 시 스크롤을 맨 위로 이동
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [searchParams, setSearchParams]
  );

  const pageSize = useMemo(
    () => (isDesktop ? desktopItemsPerPage : tabletItemsPerPage),
    [isDesktop, desktopItemsPerPage, tabletItemsPerPage]
  );

  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

  // 현재 페이지가 총 페이지 수를 초과하는 경우 1페이지로 리셋
  useEffect(() => {
    if (!isMobile && currentPage > totalPages && totalPages > 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('page');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [currentPage, totalPages, isMobile, searchParams, setSearchParams]);

  return {
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;
