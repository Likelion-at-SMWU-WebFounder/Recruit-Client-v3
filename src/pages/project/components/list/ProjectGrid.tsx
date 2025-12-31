import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ProjectCard from '@pages/project/components/list/ProjectCard';
import Loading from '@pages/project/components/list/Loading';
import Pagination from '@shared/components/Pagination';
import { combineStyles } from '@shared/utils/combineStyles';
import { ROUTER_URL } from '@shared/constants/url';
import { allProjectsData } from '@pages/project/constants/project/allProjectData';

interface ProjectGridProps {
  filter: string;
}

const TABLET_ITEMS_PER_PAGE = 4;
const DESKTOP_ITEMS_PER_PAGE = 6;
const MOBILE_LOAD_COUNT = 8; // 모바일 무한 스크롤 추가 로드 개수
const MOBILE_MEDIA_QUERY = '(min-width: 768px)';
const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';
const INFINITE_SCROLL_THRESHOLD = 200;

const GRID_STYLES = {
  container: {
    base: 'flex flex-col items-center',
    tablet: 'md:gap-[5.62rem]',
    desktop: 'lg:gap-[7.5rem]',
  },
  grid: {
    base: 'grid w-full grid-cols-1 gap-[1rem]',
    tablet: 'md:max-w-[100rem] md:grid-cols-2 md:gap-x-[1rem] md:gap-y-[7.5rem] md:min-h-[61.75rem]',
    desktop: 'lg:grid-cols-3 lg:gap-x-[1.5rem] lg:min-h-[69.625rem]',
  },
} as const;

const ProjectGrid = ({ filter }: ProjectGridProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(MOBILE_LOAD_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
    },
    [searchParams, setSearchParams]
  );

  const handleClick = useCallback(
    (projectId: string) => {
      // 상세 페이지로 이동 (쿼리 파라미터는 전달하지 않지만, 브라우저 히스토리로 복원 가능)
      navigate(ROUTER_URL.PROJECT_DETAIL.replace(':projectId', projectId));
    },
    [navigate]
  );

  const filteredProjects = useMemo(
    () => allProjectsData.filter((project) => filter === '전체' || project.no.includes(filter)),
    [filter]
  );

  // 화면 크기에 따라 모바일 여부 판단 (md 브레이크포인트 기준)
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(!event.matches);
    };

    handleMediaChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleMediaChange(event);
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // 화면 크기에 따라 데스크탑 여부 판단 (lg 브레이크포인트 기준)
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(event.matches);
    };

    handleMediaChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleMediaChange(event);
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // 필터가 변경되면 초기 상태로 리셋 (페이지는 URL에서 관리되므로 필터 변경 시 URL이 업데이트됨)
  useEffect(() => {
    setVisibleCount(MOBILE_LOAD_COUNT);
    setIsLoading(false);
  }, [filter]);

  const loadMore = useCallback(() => {
    if (isLoading || visibleCount >= filteredProjects.length) return;

    setIsLoading(true);
    // 600ms 딜레이 후 프로젝트 추가 로드
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + MOBILE_LOAD_COUNT, filteredProjects.length));
      setIsLoading(false);
    }, 600);
  }, [filteredProjects.length, isLoading, visibleCount]);

  // 스크롤 시 자동 로드 (모바일 전용)
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - INFINITE_SCROLL_THRESHOLD; // 바닥에서 200px 남았을 때

      if (scrollPosition >= threshold && visibleCount < filteredProjects.length) loadMore();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filteredProjects.length, isMobile, loadMore, visibleCount]);

  const pageSize = useMemo(() => (isDesktop ? DESKTOP_ITEMS_PER_PAGE : TABLET_ITEMS_PER_PAGE), [isDesktop]);

  const totalPages = useMemo(() => Math.ceil(filteredProjects.length / pageSize), [filteredProjects.length, pageSize]);

  // 현재 페이지가 총 페이지 수를 초과하는 경우 1페이지로 리셋
  useEffect(() => {
    if (!isMobile && currentPage > totalPages && totalPages > 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('page');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [currentPage, totalPages, isMobile, searchParams, setSearchParams]);

  const currentProjects = useMemo(
    () =>
      isMobile
        ? filteredProjects.slice(0, visibleCount)
        : filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredProjects, currentPage, isMobile, pageSize, visibleCount]
  );

  const containerClassName = useMemo(() => combineStyles(GRID_STYLES.container), []);
  const gridClassName = useMemo(() => combineStyles(GRID_STYLES.grid), []);

  return (
    <div className={containerClassName}>
      <div className={gridClassName}>
        {currentProjects.map((project) => {
          const projectWithImages = project as typeof project & { images?: string[] };
          const thumbnail = projectWithImages.images?.[0] || '';
          return (
            <ProjectCard
              key={project.id}
              thumbnail={thumbnail}
              title={project.title}
              summary={project.summary}
              no={project.no}
              category={project.category}
              onClick={() => {
                handleClick(project.id);
              }}
            />
          );
        })}
      </div>
      {!isMobile && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default ProjectGrid;
