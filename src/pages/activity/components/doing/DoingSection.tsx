import { useState } from 'react';
import ArrowButton from '@shared/components/button/ArrowButton';
import SubTitle from '@shared/components/SubTitle';
import DoingCard from '@pages/activity/components/doing/DoingCard';
import { SUB_TITLE } from '@pages/activity/constants/index';
import { combineStyles } from '@shared/utils/combineStyles';
import { DOING_DATA } from '@pages/activity/constants/doing';
import useXPositionDrag from '@pages/about/hooks/useXPositionDrag';

// DoingSection 스타일 상수화
const DOING_SECTION_STYLES = {
  section: {
    base: 'relative h-[100dvh] snap-start overflow-hidden flex flex-col justify-center items-center',
    desktop: 'lg:mt-[3rem] lg:gap-[3rem]',
    tablet: 'md:gap-[2rem]',
    mobile: 'gap-[2rem]',
  },
  // 데스크탑, 테블릿 캐러셀
  desktopTablet: {
    base: 'w-full max-w-[100dvw]',
    tablet: 'md:flex md:flex-col md:items-center md:justify-center',
    mobile: 'hidden',
  },
  desktopTabletContainer: {
    base: 'relative flex-1 overflow-hidden ',
    desktop: 'lg:w-[110rem] lg:ml-[10rem]',
    tablet: 'md:w-[60rem] md:ml-[10rem]',
  },
  desktopTabletCarousel: {
    base: 'scrollbar-hidden flex w-full snap-x snap-mandatory flex-row gap-[0.83rem] overflow-x-auto scroll-smooth p-[2rem]',
  },
  desktopTabletGradient: {
    base: 'pointer-events-none absolute inset-y-0 right-0 flex h-full w-[17rem] items-center justify-end bg-gradient-to-l from-[#F7FAFF] to-transparent',
  },
  desktopTabletArrow: {
    base: 'absolute inset-y-0 right-[5rem] flex items-center justify-end px-[0.5rem]',
  },
  // 모바일 캐러셀
  mobile: {
    base: 'relative flex justify-center items-center w-full max-w-[100dvw]',
    tablet: 'md:hidden',
  },
  mobileCarousel: {
    base: 'h-[25rem] items-center scrollbar-hidden flex snap-x snap-mandatory flex-row gap-[1.5rem] overflow-x-auto scroll-smooth',
  },
} as const;

const DESKTOP_CAROUSEL_PADDING_LEFT = 2; // rem
const DESKTOP_CAROUSEL_TRAILING_SPACE_WIDTH = 17; // rem

// 데스크톱, 태블릿 캐러셀
const DesktopDoingSection = ({
  hoveredCardIndex,
  hasEverHovered,
  onCardHover,
}: {
  hoveredCardIndex: number | null;
  hasEverHovered: boolean;
  onCardHover: (index: number | null) => void;
}) => {
  const { carouselRef, scrollToNextCard, isLastCard } = useXPositionDrag();

  const sectionClassName = combineStyles(DOING_SECTION_STYLES.section);
  const desktopTabletClassName = combineStyles(DOING_SECTION_STYLES.desktopTablet);
  const desktopTabletContainerClassName = combineStyles(DOING_SECTION_STYLES.desktopTabletContainer);
  const desktopTabletCarouselClassName = combineStyles(DOING_SECTION_STYLES.desktopTabletCarousel);
  const desktopTabletGradientClassName = combineStyles(DOING_SECTION_STYLES.desktopTabletGradient);
  const desktopTabletArrowClassName = combineStyles(DOING_SECTION_STYLES.desktopTabletArrow);
  return (
    <section className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
      <div className={desktopTabletClassName}>
        <div className={desktopTabletContainerClassName}>
          <div
            ref={carouselRef}
            className={desktopTabletCarouselClassName}
            style={{
              scrollPaddingLeft: `${DESKTOP_CAROUSEL_PADDING_LEFT}rem`,
              scrollPaddingRight: `${DESKTOP_CAROUSEL_TRAILING_SPACE_WIDTH}rem`,
            }}>
            {DOING_DATA.map((doing, index) => (
              <div key={doing.id} className="flex-shrink-0 snap-start" data-card="true">
                <DoingCard
                  icon_dark={doing.icon_dark}
                  icon_white={doing.icon_white}
                  term={doing.term}
                  title={doing.title}
                  description={doing.description}
                  image={doing.image}
                  index={index}
                  hoveredCardIndex={hoveredCardIndex}
                  hasEverHovered={hasEverHovered}
                  onCardHover={onCardHover}
                />
              </div>
            ))}
            {/* 마지막 카드 오른쪽 여백 영역 */}
            <div aria-hidden className="w-[5rem] flex-shrink-0" />
          </div>

          {/* 그라데이션 오버레이 영역 */}
          <div className={desktopTabletGradientClassName} />

          {/* 다음 카드로 넘기는 화살표 버튼 영역 */}
          {!isLastCard && (
            <div className={desktopTabletArrowClassName}>
              <ArrowButton iconColor="gray" onArrowBtnClick={scrollToNextCard} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// 모바일 캐러셀
const MobileDoingSection = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hasEverHovered, setHasEverHovered] = useState(false);

  const sectionClassName = combineStyles(DOING_SECTION_STYLES.section);
  const mobileClassName = combineStyles(DOING_SECTION_STYLES.mobile);
  const mobileScrollClassName = combineStyles(DOING_SECTION_STYLES.mobileCarousel);

  const handleCardHover = (index: number | null) => {
    if (index !== null && !hasEverHovered) {
      setHasEverHovered(true);
    }
    setHoveredCardIndex(index);
  };

  return (
    <section className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_1} subDescription={SUB_TITLE.SUB_DESCRIPTION_1} />
      {/* 모바일: 기본 스크롤 캐러셀 */}
      <div className={mobileClassName}>
        <div className={mobileScrollClassName}>
          {DOING_DATA.map((doing, index) => (
            <DoingCard
              key={doing.id}
              icon_dark={doing.icon_dark}
              icon_white={doing.icon_white}
              term={doing.term}
              title={doing.title}
              description={doing.description}
              image={doing.image}
              index={index}
              hoveredCardIndex={hoveredCardIndex}
              hasEverHovered={hasEverHovered}
              onCardHover={handleCardHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// DoingSection
const DoingSection = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hasEverHovered, setHasEverHovered] = useState(false);

  const handleCardHover = (index: number | null) => {
    if (index !== null && !hasEverHovered) {
      setHasEverHovered(true);
    }
    setHoveredCardIndex(index);
  };

  return (
    <>
      <DesktopDoingSection
        hoveredCardIndex={hoveredCardIndex}
        hasEverHovered={hasEverHovered}
        onCardHover={handleCardHover}
      />
      <MobileDoingSection />
    </>
  );
};

export default DoingSection;
