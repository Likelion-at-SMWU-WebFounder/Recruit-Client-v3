import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import ProjectCard from '@pages/project/components/list/ProjectCard';
import MobileLoadingDots from '@/pages/project/components/list/MobileLoadingDots';
import Pagination from '@pages/project/components/list/Pagination';
import { combineStyles } from '@shared/utils/combineStyles';
import { ROUTER_URL } from '@shared/constants/url';
import { allProjectsData } from '@pages/project/constants/project/allProjectData';
import useImagePreload from '@pages/project/hooks/useImagePreload';
import usePagination from '@pages/project/hooks/usePagination';
import useMobileProjectLoad from '@pages/project/hooks/useMobileProjectLoad';
import useResponsive from '@shared/hooks/useResponsive';

interface ProjectGridProps {
  filter: string;
}

const TABLET_ITEMS_PER_PAGE = 4;
const DESKTOP_ITEMS_PER_PAGE = 6;
const MOBILE_LOAD_COUNT = 8; // 모바일 무한 스크롤 추가 로드 개수
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
  // 반응형 관리 함수
  const { isMobile, isDesktop } = useResponsive();

  // 상세 페이지로 이동 함수
  const handleClick = useCallback(
    (projectId: string) => {
      // 상세 페이지로 이동 (쿼리 파라미터는 전달하지 않지만, 브라우저 히스토리로 복원 가능)
      navigate(ROUTER_URL.PROJECT_DETAIL.replace(':projectId', projectId));
    },
    [navigate]
  );

  // 필터링된 프로젝트 목록 관리 함수
  const filteredProjects = useMemo(
    () => allProjectsData.filter((project) => filter === '전체' || project.no.includes(filter)),
    [filter]
  );

  // 모바일: 무한 스크롤 관리 함수 (무한 스크롤 추가 로드 개수 관리)
  const { visibleCount, isLoading } = useMobileProjectLoad({
    totalItems: filteredProjects.length, // 필터링된 프로젝트 목록 개수
    initialLoadCount: MOBILE_LOAD_COUNT, // 모바일 무한 스크롤 초기 로드 개수: 8개
    loadCount: MOBILE_LOAD_COUNT, // 모바일 무한 스크롤 추가 로드 개수: 8개
    isMobile, // 모바일 여부
    filter, // 기수 필터 옵션 값
    scrollThreshold: INFINITE_SCROLL_THRESHOLD, // 모바일 무한 스크롤 임계값
  });

  // 데스크탑, 태블릿: 페이지네이션 관리 함수 (페이지 변경 시 스크롤 맨 위로 이동)
  const { currentPage, pageSize, totalPages, handlePageChange } = usePagination({
    totalItems: filteredProjects.length, // 필터링된 프로젝트 목록 개수
    tabletItemsPerPage: TABLET_ITEMS_PER_PAGE, // 태블릿 페이지당 아이템 개수: 4개
    desktopItemsPerPage: DESKTOP_ITEMS_PER_PAGE, // 데스크탑 페이지당 아이템 개수: 6개
    isMobile, // 모바일 여부
    isDesktop, // 데스크탑 여부
  });

  // 현재 페이지 프로젝트 목록 관리 함수
  const currentProjects = useMemo(
    () =>
      isMobile
        ? filteredProjects.slice(0, visibleCount)
        : filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredProjects, currentPage, isMobile, pageSize, visibleCount]
  );

  const containerClassName = useMemo(() => combineStyles(GRID_STYLES.container), []);
  const gridClassName = useMemo(() => combineStyles(GRID_STYLES.grid), []);

  // 프로젝트 목록 첫 페이지 이미지 preload (성능 최적화)
  const preloadImageUrls = useMemo(() => {
    if (isMobile || currentPage !== 1 || currentProjects.length === 0) return [];
    return currentProjects
      .slice(0, 6)
      .map((project) => {
        const projectWithImages = project as typeof project & { images?: string[] };
        return projectWithImages.images?.[0] || '';
      })
      .filter(Boolean);
  }, [isMobile, currentPage, currentProjects]);

  // 프로젝트 목록 첫 페이지 이미지 preload 함수
  useImagePreload({
    imageUrls: preloadImageUrls,
    enabled: !isMobile && currentPage === 1 && currentProjects.length > 0,
  });

  return (
    <div className={containerClassName}>
      <div className={gridClassName}>
        {currentProjects.map((project, index) => {
          const projectWithImages = project as typeof project & { images?: string[] };
          const thumbnail = projectWithImages.images?.[0] || '';
          // 첫 페이지의 첫 6개 이미지는 eager loading
          const isFirstPage = !isMobile && currentPage === 1 && index < 6;
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
              isFirstPage={isFirstPage}
            />
          );
        })}
      </div>
      {!isMobile && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      {isLoading && <MobileLoadingDots />}
    </div>
  );
};

export default ProjectGrid;
