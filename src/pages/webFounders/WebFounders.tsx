import { useEffect, useMemo, useState } from 'react';
import Layout from '@shared/components/Layout';
import Title from '@shared/components/Title';
import FilterBar from '@shared/components/filter/FilterBar';
import WebFoundersSection from '@pages/webFounders/components/WebFoundersSection';
import {
  WEBFOUNDERS_TITLE,
  WEBFOUNDERS_SUBTITLE,
  WEBFOUNDERS_FILTER_OPTIONS,
  WEBFOUNDERS_BACKGROUND_IMAGES_PATH,
} from '@pages/webFounders/constants';
import { getFoundersByGeneration, getFoundersByPart } from '@pages/webFounders/utils';
import useImageManager from '@shared/hooks/useImageManager';
import { combineStyles } from '@shared/utils/combineStyles';
import useResponsiveBackgroundImage from '@shared/hooks/useResponsiveBackgroundImage';

// 웹파운더즈 페이지 스타일 상수화
const WEBFOUNDERS_STYLES = {
  container: {
    base: 'space-y-[2.28rem] bg-cover bg-center bg-no-repeat px-[1rem] py-[9.88rem]',
    tablet: 'md:space-y-[4.56rem] md:py-[12.31rem]',
    desktop: 'lg:space-y-[7.5rem] lg:px-[10rem] lg:py-[14.19rem]',
  }, // 웹파운더즈 페이지 전체 컨테이너 스타일
  titleWrapper: {
    base: '',
  }, // 타이틀 컨테이너 스타일
  contentWrapper: {
    base: 'space-y-[1.25rem]',
    tablet: 'md:space-y-[4.56rem]',
    desktop: 'lg:space-y-[3.75rem]',
  }, // 필터 바, 파트별 섹션 컨테이너 스타일
  filterBarWrapper: {
    base: '-mx-[1rem]',
    desktop: 'lg:-mx-[10rem]',
  }, // 웹파운더즈 필터 바 스타일 (그림자 잘림 문제 해결을 위해 왼쪽 마진 조정)
  sectionsContainer: {
    base: 'space-y-[6.25rem]',
    tablet: 'md:space-y-[15.62rem]',
  }, // 웹파운더즈 파트별 섹션 컨테이너 스타일
} as const;

const WebFounders = () => {
  const backgroundImage = useResponsiveBackgroundImage(WEBFOUNDERS_BACKGROUND_IMAGES_PATH);
  const [selectedFilter, setSelectedFilter] = useState<string>(WEBFOUNDERS_FILTER_OPTIONS[0].filterValue); // 기본값: '3기'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 필터에 따라 멤버 필터링 (기수별로 멤버 그룹화)
  const foundersByGeneration = getFoundersByGeneration(selectedFilter);

  // 파트별로 멤버 필터링
  const planDesignFounders = getFoundersByPart(foundersByGeneration, '기획디자인');
  const frontendFounders = getFoundersByPart(foundersByGeneration, '프론트엔드');
  const backendFounders = getFoundersByPart(foundersByGeneration, '백엔드'); // 백엔드 파트 멤버 필터링

  // 현재 표시되는 모든 멤버 이미지 URL 수집 (preload용)
  const preloadImageUrls = useMemo(() => {
    const allFounders = [...planDesignFounders, ...frontendFounders, ...backendFounders];
    return allFounders.map((founder) => founder.image).filter(Boolean);
  }, [planDesignFounders, frontendFounders, backendFounders]);

  // 멤버 이미지 preload
  useImageManager({
    imageUrls: preloadImageUrls,
    enabled: preloadImageUrls.length > 0,
  });

  // 스타일 클래스명
  const containerClassName = combineStyles(WEBFOUNDERS_STYLES.container);
  const titleWrapperClassName = combineStyles(WEBFOUNDERS_STYLES.titleWrapper);
  const contentWrapperClassName = combineStyles(WEBFOUNDERS_STYLES.contentWrapper);
  const filterBarWrapperClassName = combineStyles(WEBFOUNDERS_STYLES.filterBarWrapper);
  const sectionsContainerClassName = combineStyles(WEBFOUNDERS_STYLES.sectionsContainer);

  return (
    <Layout menuMode="light" footerMode="light" footerBgColor="#EEF1F6">
      <div className={containerClassName} style={{ backgroundImage }}>
        {/* 타이틀 */}
        <div className={titleWrapperClassName}>
          <Title title={WEBFOUNDERS_TITLE} description={WEBFOUNDERS_SUBTITLE} />
        </div>

        {/* 필터 바, 파트별 섹션 */}
        <div className={contentWrapperClassName}>
          {/* 필터 바 */}
          <div className={filterBarWrapperClassName}>
            <FilterBar
              value={selectedFilter}
              onChange={setSelectedFilter}
              options={WEBFOUNDERS_FILTER_OPTIONS}
              mode="webFounders"
            />
          </div>

          {/* 파트별 멤버 섹션 */}
          <div className={sectionsContainerClassName}>
            {planDesignFounders.length > 0 && <WebFoundersSection title="기획·디자인" founders={planDesignFounders} />}
            {frontendFounders.length > 0 && <WebFoundersSection title="프론트엔드" founders={frontendFounders} />}
            {backendFounders.length > 0 && <WebFoundersSection title="백엔드" founders={backendFounders} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebFounders;
