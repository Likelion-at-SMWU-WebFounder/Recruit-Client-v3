import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '@/shared/constants/url';

import { useState, useRef } from 'react';
import SubTitle from '@shared/components/SubTitle';
import PartCard from '@/pages/home/components/part/PartCard';
import ArrowButton from '@shared/components/button/ArrowButton';
import DefaultButton from '@shared/components/button/DefaultButton';

import { combineStyles } from '@shared/utils/combineStyles';
import { SUB_TITLE } from '@pages/home/constants/index';
import { PART_DATA, PART_BUTTON_TEXT } from '@/pages/home/constants/part';

// PartSection 스타일 상수화
const PART_SECTION_STYLES = {
  section: {
    base: 'w-full max-w-[100vw] h-[100dvh] flex flex-col justify-center items-center pt-[5rem]',
    desktop: 'lg:gap-[2rem]',
    tablet: 'md:gap-[8.5rem] md:pt-[10rem] md:pb-[5rem]',
    mobile: 'gap-[1rem] pt-[5rem]',
  },
  mobileCarousel: {
    base: 'relative flex justify-center items-center w-[22rem] h-[25rem] p-[1rem] ',
    tablet: 'md:hidden',
  },
  mobileScroll: {
    base: 'h-[25rem] items-center scrollbar-hidden flex snap-x snap-mandatory flex-row gap-[1.5rem] overflow-x-auto scroll-smooth',
  },
  arrowLeft: {
    base: 'absolute inset-y-0 left-4 flex items-center z-20',
  },
  arrowRight: {
    base: 'absolute inset-y-0 right-4 flex items-center z-20',
  },
  desktopGrid: {
    base: 'md:flex md:justify-center',
    mobile: 'hidden',
  },
  grid: {
    base: 'md:grid md:grid-cols-3 md:gap-[1rem] lg:gap-[1.5rem]',
  },
} as const;

const PartSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const sectionClassName = combineStyles(PART_SECTION_STYLES.section);
  const mobileCarouselClassName = combineStyles(PART_SECTION_STYLES.mobileCarousel);
  const mobileScrollClassName = combineStyles(PART_SECTION_STYLES.mobileScroll);
  const arrowLeftClassName = combineStyles(PART_SECTION_STYLES.arrowLeft);
  const arrowRightClassName = combineStyles(PART_SECTION_STYLES.arrowRight);
  const desktopGridClassName = combineStyles(PART_SECTION_STYLES.desktopGrid);
  const gridClassName = combineStyles(PART_SECTION_STYLES.grid);

  const scrollToCard = (index: number) => {
    const container = carouselRef.current;
    const target = container?.children[index] as HTMLElement | undefined;
    if (!container || !target) return;
    target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    const closestIndex = children.reduce((bestIdx, el, idx) => {
      const dist = Math.abs(el.offsetLeft - container.scrollLeft);
      const bestDist = Math.abs(children[bestIdx].offsetLeft - container.scrollLeft);
      return dist < bestDist ? idx : bestIdx;
    }, 0);
    setCurrentIndex(closestIndex);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PART_DATA.length - 1) {
      scrollToCard(currentIndex + 1);
    }
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < PART_DATA.length - 1;

  const navigate = useNavigate();
  const handlePartClick = () => {
    navigate(ROUTER_URL.ACTIVITY);
  };

  return (
    <section className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_4} subDescription={SUB_TITLE.SUB_DESCRIPTION_4} />

      {/* 모바일: 캐러샐 */}
      <div className={mobileCarouselClassName}>
        <div ref={carouselRef} className={mobileScrollClassName} onScroll={handleScroll}>
          {PART_DATA.map((data) => (
            <div key={data.id} className="flex-shrink-0 snap-start px-[1rem]">
              <PartCard part={data.part} explain={data.explain} cardImage={data.image} />
            </div>
          ))}
        </div>

        {/* 화살표 */}
        {showLeftArrow && (
          <div className={arrowLeftClassName}>
            <ArrowButton iconColor="gray" onArrowBtnClick={handlePrevious} direction="left" />
          </div>
        )}

        {showRightArrow && (
          <div className={arrowRightClassName}>
            <ArrowButton iconColor="gray" onArrowBtnClick={handleNext} direction="right" />
          </div>
        )}
      </div>

      <div className={desktopGridClassName}>
        {/* 태블릿/데스크톱: 그리드 */}
        <div className={gridClassName}>
          {PART_DATA.map((data) => (
            <PartCard key={data.id} part={data.part} explain={data.explain} cardImage={data.image} />
          ))}
        </div>
      </div>

      <div className="mt-[1rem]">
        <DefaultButton onClick={handlePartClick} backgroundType="white">
          {PART_BUTTON_TEXT}
        </DefaultButton>
      </div>
    </section>
  );
};

export default PartSection;
