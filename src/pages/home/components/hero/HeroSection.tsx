import ArrowButton from '@shared/components/button/ArrowButton';

import { HERO_BACKGROUND_IMAGES_PATH } from '@pages/home/constants/index';
import useResponsiveBackgroundImage from '@shared/hooks/useResponsiveBackgroundImage';

const HeroSection = () => {
  const backgroundImage = useResponsiveBackgroundImage(HERO_BACKGROUND_IMAGES_PATH);

  const handleScrollDown = () => {
    const orbitSection = document.getElementById('orbit-section');
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
