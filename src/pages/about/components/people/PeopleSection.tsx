import { useCallback, useState } from 'react';

import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/about/constants/about';
import { PEOPLE_DATA } from '@pages/about/constants/people';
import PeopleCard from '@pages/about/components/people/PeopleCard';
import ArrowButton from '@shared/components/button/ArrowButton';
import useDesktopScroll from '@pages/about/hooks/useDesktopScroll';
import useMobileScroll from '@pages/about/hooks/useMobileScroll';
import useXPositionDrag from '@pages/about/hooks/useXPositionDrag';

import '@pages/about/styles/index.css';

const DESKTOP_CAROUSEL_PADDING_LEFT = 2; // rem
const DESKTOP_CAROUSEL_TRAILING_SPACE_WIDTH = 17; // rem

// 데스크탑 x축 캐러셀 컴포넌트
const PeopleDesktopSection = () => {
  const { carouselRef, scrollToNextCard, isLastCard } = useXPositionDrag();

  return (
    <section className="hidden w-full max-w-[100vw] lg:flex lg:flex-row lg:gap-[21.31rem] lg:py-[11.625rem] lg:pl-[18.5rem]">
      <div className="py-[2rem]">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_3} subDescription={SUB_TITLE.SUB_DESCRIPTION_3} align="left" />
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={carouselRef}
          className="scrollbar-hidden flex w-full snap-x snap-mandatory flex-row gap-[2.375rem] overflow-x-auto scroll-smooth p-[2rem]"
          style={{
            scrollPaddingLeft: `${DESKTOP_CAROUSEL_PADDING_LEFT}rem`,
            scrollPaddingRight: `${DESKTOP_CAROUSEL_TRAILING_SPACE_WIDTH}rem`,
          }}>
          {PEOPLE_DATA.map((person) => (
            <div key={person.id} className="flex-shrink-0 snap-start" data-card="true">
              <PeopleCard icon={person.icon} keyword={person.keyword} description={person.description} />
            </div>
          ))}
          {/* 마지막 카드 오른쪽 여백 영역 */}
          <div aria-hidden className="w-[17rem] flex-shrink-0" />
        </div>

        {/* 그라데이션 Rectangle 영역 */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-[17rem] items-center justify-end bg-gradient-to-r from-transparent to-white" />

        {/* 다음 카드로 넘기는 화살표 버튼 영역 (데스크톱) */}
        {!isLastCard && (
          <div className="absolute inset-y-0 right-80 flex items-center justify-end px-[0.5rem]">
            <ArrowButton iconColor="gray" onArrowBtnClick={scrollToNextCard} />
          </div>
        )}
      </div>
    </section>
  );
};

// 태블릿/모바일 카드 아코디언 props 타입
interface PeopleAccordionSectionProps {
  mode: 'tablet' | 'mobile';
  openId: number | null;
  onCardClick: (id: number) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
  cardsContainerRef?: React.RefObject<HTMLDivElement | null>;
}

// 태블릿/모바일 카드 아코디언 컴포넌트
const PeopleAccordionSection = ({
  mode,
  openId,
  onCardClick,
  sectionRef,
  cardsContainerRef,
}: PeopleAccordionSectionProps) => {
  const isTablet = mode === 'tablet';

  const sectionClassName = isTablet
    ? 'hidden w-full max-w-[100vw] flex-col items-center gap-[11.25rem] overflow-hidden px-[4rem] pb-[11.875rem] md:flex lg:hidden'
    : 'w-full max-w-[100vw] space-y-[3.38rem] overflow-hidden py-[5rem] md:hidden';

  const wrapperClassName = isTablet ? 'w-full space-y-[1.5rem]' : 'flex flex-col items-center gap-[1rem]';

  const accordionContainerRef = isTablet ? cardsContainerRef : undefined;

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <SubTitle subTitle={SUB_TITLE.SUB_TITLE_3} subDescription={SUB_TITLE.SUB_DESCRIPTION_3} />
      <div ref={accordionContainerRef} className={wrapperClassName}>
        {PEOPLE_DATA.map((person) => {
          const card = (
            <PeopleCard
              icon={person.icon}
              keyword={person.keyword}
              description={person.description}
              isOpen={openId === person.id}
              onClick={() => onCardClick(person.id)}
            />
          );

          return (
            <div key={person.id} className="flex w-full justify-center">
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// 화면 렌더링 컴포넌트(PeopleSection) - 반응형 적용
const PeopleSection = () => {
  const [openId, setOpenId] = useState<number | null>(PEOPLE_DATA[0]?.id ?? null);
  const totalCards = PEOPLE_DATA.length;

  const getIdByIndex = useCallback((index: number) => PEOPLE_DATA[index]?.id ?? null, []);

  const {
    sectionRef: tabletSectionRef,
    cardsContainerRef,
    scrollToCard: tabletScrollToCard,
  } = useDesktopScroll(totalCards, getIdByIndex, setOpenId);

  const { sectionRef: mobileSectionRef, scrollToCard: mobileScrollToCard } = useMobileScroll(
    totalCards,
    getIdByIndex,
    setOpenId
  );

  const handleCardClick = (id: number) => {
    const cardIndex = PEOPLE_DATA.findIndex((person) => person.id === id);
    if (cardIndex === -1) return;

    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      tabletScrollToCard(cardIndex);
    } else {
      mobileScrollToCard(cardIndex);
    }
  };

  return (
    <>
      <PeopleDesktopSection />
      <PeopleAccordionSection
        mode="tablet"
        openId={openId}
        onCardClick={handleCardClick}
        sectionRef={tabletSectionRef}
        cardsContainerRef={cardsContainerRef}
      />
      <PeopleAccordionSection
        mode="mobile"
        openId={openId}
        onCardClick={handleCardClick}
        sectionRef={mobileSectionRef}
      />
    </>
  );
};

export default PeopleSection;
