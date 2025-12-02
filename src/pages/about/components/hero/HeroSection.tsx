import { useEffect, useState } from 'react';
import { TITLE } from '@pages/about/constants/about';
import desktopHeroImage from '@pages/about/assets/hero/bg-desktop.svg';
import tabletHeroImage from '@pages/about/assets/hero/bg-tablet.svg';
import mobileHeroImage from '@pages/about/assets/hero/bg-mobile.svg';

const HeroSection = () => {
  const [heroImage, setHeroImage] = useState<string>(desktopHeroImage);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeroImage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setHeroImage(mobileHeroImage);
      } else if (width < 1024) {
        setHeroImage(tabletHeroImage);
      } else {
        setHeroImage(desktopHeroImage);
      }
    };

    // 초기 설정: 페이지 로드 시 초기 배경 이미지 설정
    updateHeroImage();

    // 리사이즈 이벤트 리스너: 브라우저 창 크기가 변경될 때마다 updateHeroImage 함수를 호출하여 배경 이미지 업데이트
    window.addEventListener('resize', updateHeroImage);

    return () => {
      // 리사이즈 이벤트 리스너 제거: 컴포넌트 언마운트 시 리스너 제거
      window.removeEventListener('resize', updateHeroImage);
    };
  }, []);

  return (
    <div
      className="flex h-[100dvh] w-full max-w-[100vw] flex-col items-center justify-center gap-[0.56rem] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}>
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
