import ArrowButton from '@shared/components/button/ArrowButton';

import { HERO_BACKGROUND_IMAGES_PATH } from '@pages/home/constants/index';
import useResponsiveBackgroundImage from '@shared/hooks/useResponsiveBackgroundImage';

const HeroSection = () => {
  const backgroundImage = useResponsiveBackgroundImage(HERO_BACKGROUND_IMAGES_PATH);

  // 스크롤 대상 요소가 Home 페이지에 추가 후 수정 필요
  const handleScrollDown = () => {
    const orbitSection = document.getElementById('??'); // id 값으로 수정 필요
    if (orbitSection) {
      orbitSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative flex h-[100dvh] w-full max-w-[100vw] flex-col items-center justify-center gap-[0.56rem] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}>
      <div className="animate-bounce-arrow absolute bottom-[2rem] left-1/2 z-50 md:hidden">
        <ArrowButton iconColor="blue" onArrowBtnClick={handleScrollDown} direction="down" />
      </div>
    </div>
  );
};

export default HeroSection;
