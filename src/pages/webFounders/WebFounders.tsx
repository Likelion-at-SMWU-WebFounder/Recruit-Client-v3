import { useEffect, useState } from 'react';
import Title from '@shared/components/Title';
import FilterBar from '@shared/components/filter/FilterBar';
import WebFoundersSection from '@pages/webFounders/components/WebFoundersSection';
import { WEBFOUNDERS_TITLE, WEBFOUNDERS_SUBTITLE, WEBFOUNDERS_FILTER_OPTIONS } from '@pages/webFounders/constants';
import { getFoundersByGeneration, getFoundersByPart } from '@pages/webFounders/utils';

// WebFounders 페이지 배경 이미지 설정
const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1440);
const getFoundersImage = (base: string, width: number) => {
  if (width <= 768) return `${base}/webfounders/background-image/founders-mobile.webp`;
  if (width <= 1024) return `${base}/webfounders/background-image/founders-tablet.webp`;
  return `${base}/webfounders/background-image/founders-desktop.webp`;
};

const WebFounders = () => {
  const IMAGE_BASE_PATH = import.meta.env.VITE_IMAGE_PATH;
  const [backgroundImage, setBackgroundImage] = useState(() => `url(${getFoundersImage(IMAGE_BASE_PATH, getWidth())})`);
  const [selectedFilter, setSelectedFilter] = useState<string>(WEBFOUNDERS_FILTER_OPTIONS[0].filterValue); // 기본값: '3기'

  // 배경 이미지 설정 (반응형)
  useEffect(() => {
    const handleResize = () => setBackgroundImage(`url(${getFoundersImage(IMAGE_BASE_PATH, getWidth())})`);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [IMAGE_BASE_PATH]);

  // 필터에 따라 멤버 필터링 (파트별로 그룹화된 객체)
  const foundersByPart = getFoundersByGeneration(selectedFilter);

  // 파트별로 멤버 그룹화
  const planDesignFounders = getFoundersByPart(foundersByPart, '기획디자인');
  const frontendFounders = getFoundersByPart(foundersByPart, '프론트엔드');
  const backendFounders = getFoundersByPart(foundersByPart, '백엔드');

  return (
    <div
      className="space-y-[2.28rem] bg-cover bg-center bg-no-repeat px-[1rem] py-[8.44rem] md:space-y-[4.56rem] lg:space-y-[7.5rem] lg:px-[10rem] lg:py-[8.13rem]"
      style={{ backgroundImage }}>
      <div className="">
        <Title title={WEBFOUNDERS_TITLE} description={WEBFOUNDERS_SUBTITLE} />
      </div>
      <div className="space-y-[1.25rem] md:space-y-[4.56rem] lg:space-y-[3.75rem]">
        {/* 필터 바 */}
        <div className="-mx-[1rem] lg:-mx-[10rem]">
          <FilterBar
            value={selectedFilter}
            onChange={setSelectedFilter}
            options={WEBFOUNDERS_FILTER_OPTIONS}
            mode="webFounders"
          />
        </div>

        {/* 파트별 멤버 섹션 */}
        <div className="space-y-[6.25rem] md:space-y-[15.62rem]">
          {planDesignFounders.length > 0 && <WebFoundersSection title="기획·디자인" founders={planDesignFounders} />}
          {frontendFounders.length > 0 && <WebFoundersSection title="프론트엔드" founders={frontendFounders} />}
          {backendFounders.length > 0 && <WebFoundersSection title="백엔드" founders={backendFounders} />}
        </div>
      </div>
    </div>
  );
};

export default WebFounders;
