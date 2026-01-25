import ArrowButton from '@shared/components/button/ArrowButton';
import Typewriter from 'typewriter-effect';

import { TITLE, HERO_BACKGROUND_IMAGES_PATH } from '@pages/home/constants/index';
import useResponsiveBackgroundImage from '@shared/hooks/useResponsiveBackgroundImage';

const HeroSection = () => {
  const backgroundImage = useResponsiveBackgroundImage(HERO_BACKGROUND_IMAGES_PATH);

  const titleClasses =
    'font-GMarketSans font-[700] text-white leading-[117%] text-[2.25rem] md:text-[4rem] lg:text-[6rem]';

  // 스크롤 대상 요소가 Home 페이지에 추가 후 수정 필요
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative flex h-[100dvh] w-full max-w-[100vw] flex-col items-center overflow-hidden bg-cover bg-center bg-no-repeat pt-[200px] md:pt-[230px]"
      style={{ backgroundImage }}>
      <div className={titleClasses}>{TITLE.TITLE_1}</div>
      <div className={`${titleClasses} `}>
        <Typewriter
          options={{
            strings: [TITLE.TITLE_2],
            autoStart: true,
            delay: 150,
            loop: true,
          }}
        />
      </div>
      <div className="animate-bounce-arrow absolute bottom-[2rem] left-1/2 z-50 md:hidden">
        <ArrowButton iconColor="blue" onArrowBtnClick={handleScrollDown} direction="down" />
      </div>
    </div>
  );
};

export default HeroSection;
