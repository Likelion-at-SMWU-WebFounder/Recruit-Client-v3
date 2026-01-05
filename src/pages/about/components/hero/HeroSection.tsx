import ArrowButton from '@shared/components/button/ArrowButton';
import { combineStyles } from '@shared/utils/combineStyles';

import { TITLE, HERO_BACKGROUND_IMAGES_PATH } from '@pages/about/constants/index';
import useResponsiveBackgroundImage from '@shared/hooks/useResponsiveBackgroundImage';

// HeroSection 스타일 상수화
const HERO_SECTION_STYLES = {
  container: {
    base: 'relative flex h-[100dvh] w-full max-w-[100vw] flex-col items-center justify-center gap-[0.56rem] overflow-hidden bg-cover bg-center bg-no-repeat',
  },
  title: {
    base: 'text-[1.125rem] leading-[117%] font-semibold tracking-[-0.01125rem] text-white/75',
    tablet: 'md:text-[2rem] md:tracking-[-0.02rem]',
  },
  description: {
    base: 'text-[1.75rem] leading-[117%] font-bold tracking-[-0.0175rem] text-white',
    tablet: 'md:text-[4rem] md:tracking-[-0.04rem]',
  },
  arrowButton: {
    base: 'animate-bounce-arrow absolute bottom-[2rem] left-1/2 z-50',
    tablet: 'md:hidden',
  }, // 모바일 버전에서 화살표 버튼 숨김
} as const;

const HeroSection = () => {
  const backgroundImage = useResponsiveBackgroundImage(HERO_BACKGROUND_IMAGES_PATH);

  const handleScrollDown = () => {
    const orbitSection = document.getElementById('orbit-section');
    if (orbitSection) {
      orbitSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerClassName = combineStyles(HERO_SECTION_STYLES.container);
  const titleClassName = combineStyles(HERO_SECTION_STYLES.title);
  const descriptionClassName = combineStyles(HERO_SECTION_STYLES.description);
  const arrowButtonClassName = combineStyles(HERO_SECTION_STYLES.arrowButton);

  return (
    <div className={containerClassName} style={{ backgroundImage }}>
      <div className={titleClassName}>{TITLE.TITLE_1}</div>
      <div className={descriptionClassName}>{TITLE.DESCRIPTION_1}</div>
      <div className={arrowButtonClassName}>
        <ArrowButton iconColor="blue" onArrowBtnClick={handleScrollDown} direction="down" />
      </div>
    </div>
  );
};

export default HeroSection;
