import { useEffect, useState } from 'react';
import WebFoundersSection from '@pages/webFounders/components/WebFoundersSection';
import {
  WEBFOUNDERS_TITLE,
  WEBFOUNDERS_SUBTITLE,
  WEBFOUNDERS_PLAN_DESIGN,
  WEBFOUNDERS_FRONTEND,
  WEBFOUNDERS_BACKEND,
} from '@pages/webFounders/constants/index';
import Title from '@shared/components/Title';

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

  // 배경 이미지 설정 (반응형)
  useEffect(() => {
    const handleResize = () => setBackgroundImage(`url(${getFoundersImage(IMAGE_BASE_PATH, getWidth())})`);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [IMAGE_BASE_PATH]);

  return (
    <div
      className="space-y-[4.69rem] bg-cover bg-center bg-no-repeat px-[1rem] py-[8.44rem] md:space-y-[6.44rem] lg:space-y-[11.63rem] lg:px-[10rem] lg:py-[8.13rem]"
      style={{ backgroundImage }}>
      <div className="">
        <Title title={WEBFOUNDERS_TITLE} description={WEBFOUNDERS_SUBTITLE} />
      </div>
      <div className="space-y-[6.25rem] md:space-y-[15.62rem]">
        <WebFoundersSection title="기획·디자인" founders={WEBFOUNDERS_PLAN_DESIGN} />
        <WebFoundersSection title="프론트엔드" founders={WEBFOUNDERS_FRONTEND} />
        <WebFoundersSection title="백엔드" founders={WEBFOUNDERS_BACKEND} />
      </div>
    </div>
  );
};

export default WebFounders;
