import { useEffect, useState } from 'react';
import { TITLE } from '@pages/about/constants/index';

// About 페이지 배경 이미지 설정
const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1440);
const getHeroImage = (base: string, width: number) => {
  if (width <= 768) return `${base}/about/background-image/hero-mobile.webp`;
  if (width <= 1024) return `${base}/about/background-image/hero-tablet.webp`;
  return `${base}/about/background-image/hero-desktop.webp`;
};

const HeroSection = () => {
  const IMAGE_BASE_PATH = import.meta.env.VITE_IMAGE_PATH;
  const [backgroundImage, setBackgroundImage] = useState(() => `url(${getHeroImage(IMAGE_BASE_PATH, getWidth())})`);

  // 배경 이미지 설정 (반응형)
  useEffect(() => {
    const handleResize = () => setBackgroundImage(`url(${getHeroImage(IMAGE_BASE_PATH, getWidth())})`);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [IMAGE_BASE_PATH]);

  return (
    <div
      className="flex h-[100dvh] w-full max-w-[100vw] flex-col items-center justify-center gap-[0.56rem] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}>
      <div className="text-[1.125rem] leading-[117%] font-semibold tracking-[-0.01125rem] text-white/75 md:text-[2rem] md:tracking-[-0.02rem]">
        {TITLE.TITLE_1}
      </div>
      <div className="text-[1.75rem] leading-[117%] font-bold tracking-[-0.0175rem] text-white md:text-[4rem] md:tracking-[-0.04rem]">
        {TITLE.DESCRIPTION_1}
      </div>
    </div>
  );
};

export default HeroSection;
