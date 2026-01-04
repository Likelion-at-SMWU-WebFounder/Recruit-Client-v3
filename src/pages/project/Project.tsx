import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@shared/components/Layout';
import Title from '@shared/components/Title';
import FilterBar from '@shared/components/filter/FilterBar';
import ProjectGrid from '@pages/project/components/list/ProjectGrid';
import { combineStyles } from '@shared/utils/combineStyles';
import useResponsiveBackgroundImage from '@shared/hooks/useResponsiveBackgroundImage';
import {
  PROJECT_TITLE,
  PROJECT_SUBTITLE,
  PROJECT_FILTER_OPTIONS,
  PROJECT_BACKGROUND_IMAGES_PATH,
} from '@pages/project/constants';

const PROJECT_STYLES = {
  container: {
    base: 'flex flex-col items-center gap-[2.75rem] px-[1rem] pt-[10rem] pb-[7.5rem]',
    tablet: 'md:gap-[1.7rem] md:pt-[12.63rem] md:pb-[5rem]',
    desktop: 'lg:gap-[11.44rem] lg:pt-[16.25rem] lg:pb-[7.5rem]',
  },
  titleWrapper: {
    base: 'flex w-full flex-col items-start',
    tablet: 'md:max-w-[100rem]',
  },
  contentWrapper: {
    base: 'w-full',
    tablet: 'md:max-w-[100rem]',
  },
} as const;

const Project = () => {
  const backgroundImage = useResponsiveBackgroundImage(PROJECT_BACKGROUND_IMAGES_PATH);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterFromUrl = searchParams.get('filter');
  const defaultFilter = PROJECT_FILTER_OPTIONS[0].filterValue;
  const filter = useMemo(() => {
    // URL에 filter가 있고, 유효한 필터 옵션인 경우에만 사용
    if (filterFromUrl && PROJECT_FILTER_OPTIONS.some((option) => option.filterValue === filterFromUrl)) {
      return filterFromUrl;
    }
    return defaultFilter;
  }, [filterFromUrl, defaultFilter]);

  const handleFilterChange = (newFilter: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('filter', newFilter);
    // 필터가 변경되면 페이지를 1로 리셋 (페이지가 1이면 파라미터에서 제거)
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);
  };

  // 초기 렌더링 시 필터가 없으면 기본값으로 설정
  useEffect(() => {
    if (!filterFromUrl) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('filter', defaultFilter);
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [filterFromUrl, defaultFilter, searchParams, setSearchParams]);

  const containerClassName = combineStyles(PROJECT_STYLES.container);
  const titleWrapperClassName = combineStyles(PROJECT_STYLES.titleWrapper);
  const contentWrapperClassName = combineStyles(PROJECT_STYLES.contentWrapper);

  return (
    <Layout menuMode="light" footerMode="light">
      <div
        className={containerClassName}
        style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat' }}>
        <div className={titleWrapperClassName}>
          <Title title={PROJECT_TITLE} description={PROJECT_SUBTITLE} isIcon={true} />
        </div>
        <div className={contentWrapperClassName}>
          <FilterBar value={filter} onChange={handleFilterChange} options={PROJECT_FILTER_OPTIONS} mode="project" />
          <ProjectGrid filter={filter} />
        </div>
      </div>
    </Layout>
  );
};

export default Project;
