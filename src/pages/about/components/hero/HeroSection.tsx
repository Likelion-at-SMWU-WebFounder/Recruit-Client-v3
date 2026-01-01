import ArrowButton from '@shared/components/button/ArrowButton';

import { TITLE, HERO_BACKGROUND_IMAGES_PATH } from '@pages/about/constants/index';
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
      <div className="text-[1.125rem] leading-[117%] font-semibold tracking-[-0.01125rem] text-white/75 md:text-[2rem] md:tracking-[-0.02rem]">
        {TITLE.TITLE_1}
      </div>
      <div className="text-[1.75rem] leading-[117%] font-bold tracking-[-0.0175rem] text-white md:text-[4rem] md:tracking-[-0.04rem]">
        {TITLE.DESCRIPTION_1}
      </div>
      <div className="animate-bounce-arrow absolute bottom-[2rem] left-1/2 z-50 md:hidden">
        <ArrowButton iconColor="blue" onArrowBtnClick={handleScrollDown} direction="down" />
      </div>
    </div>
  );
};

export default HeroSection;
