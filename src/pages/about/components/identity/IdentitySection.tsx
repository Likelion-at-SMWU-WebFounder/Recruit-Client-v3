import { useCallback, useState } from 'react';

import { SUB_TITLE } from '@pages/about/constants/index';
import { IDENTITY_DATA } from '@pages/about/constants/identity';
import { combineStyles } from '@shared/utils/combineStyles';

import SubTitle from '@shared/components/SubTitle';
import IdentityCard from '@pages/about/components/identity/IdentityCard';

import useDesktopScroll from '@pages/about/hooks/useDesktopScroll';
import useMobileScroll from '@pages/about/hooks/useMobileScroll';
import useSnowflakeMove from '@pages/about/hooks/useSnowflakeMove';

import { WiSnowflakeCold } from 'react-icons/wi';
import '@pages/about/styles/snowflake.css';

// IdentitySection 스타일 상수화
const IDENTITY_SECTION_STYLES = {
  desktopTablet: {
    base: 'hidden w-full max-w-[100vw]',
    tablet: 'md:flex md:justify-between md:px-[6.25rem] md:py-[11.88rem]',
    desktop: 'lg:px-[18.44rem] lg:py-[6.25rem]',
  },
  mobile: {
    base: 'relative flex w-full max-w-[100vw] flex-col items-center justify-center gap-[3.38rem] py-[3.12rem]',
    tablet: 'md:hidden',
  },
  cardsContainer: {
    base: 'relative',
    tablet: 'md:flex md:flex-col md:gap-[1.25rem]',
    desktop: 'lg:gap-[1.5rem]',
  },
  snowflake: {
    base: 'text-blue pointer-events-none absolute hidden transition-[top] duration-300 ease-out',
    tablet: 'md:-left-[3.56rem] md:block',
    desktop: 'lg:-left-[3.75rem]',
  },
} as const;

const IdentitySection = () => {
  const [openId, setOpenId] = useState<number | null>(IDENTITY_DATA[0]?.id ?? null);
  const totalCards = IDENTITY_DATA.length;
  const getIdByIndex = useCallback((index: number) => IDENTITY_DATA[index]?.id ?? null, []);

  const {
    sectionRef: desktopSectionRef,
    cardsContainerRef,
    scrollToCard: desktopScrollToCard,
  } = useDesktopScroll(totalCards, getIdByIndex, setOpenId);

  const { cardRefs, snowflakeTop, isDesktopOrTablet } = useSnowflakeMove(openId, cardsContainerRef);
  const { sectionRef: mobileSectionRef, scrollToCard: mobileScrollToCard } = useMobileScroll(
    totalCards,
    getIdByIndex,
    setOpenId
  );

  const handleCardClick = (id: number) => {
    const cardIndex = IDENTITY_DATA.findIndex((item) => item.id === id);
    if (cardIndex !== -1) {
      // 뷰포트에 따라 적절한 스크롤 함수 호출
      if (window.innerWidth >= 768) {
        desktopScrollToCard(cardIndex);
      } else {
        mobileScrollToCard(cardIndex);
      }
    }
  };

  const desktopTabletClassName = combineStyles(IDENTITY_SECTION_STYLES.desktopTablet);
  const mobileClassName = combineStyles(IDENTITY_SECTION_STYLES.mobile);
  const cardsContainerClassName = combineStyles(IDENTITY_SECTION_STYLES.cardsContainer);
  const snowflakeClassName = combineStyles(IDENTITY_SECTION_STYLES.snowflake);

  return (
    <>
      {/* 태블릿/데스크톱: 카드 */}
      <section ref={desktopSectionRef} className={desktopTabletClassName}>
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} align="left" />
        <div ref={cardsContainerRef} className={cardsContainerClassName}>
          {IDENTITY_DATA.map((identity) => (
            <div
              key={identity.id}
              ref={(el) => {
                cardRefs.current[identity.id] = el;
              }}>
              <IdentityCard
                identity={identity.identity}
                description1={identity.description1}
                description2={identity.description2}
                isAdditionalInfo={identity.isAdditionalInfo}
                isOpen={openId === identity.id}
                onClick={() => handleCardClick(identity.id)}
              />
            </div>
          ))}

          {/* 눈송이 아이콘 */}
          {isDesktopOrTablet && openId != null ? (
            <div className={snowflakeClassName} style={{ top: `${snowflakeTop}px` }} aria-hidden>
              <div className="snowflake-move">
                <WiSnowflakeCold size={36} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 모바일: 카드 */}
      <section ref={mobileSectionRef} className={mobileClassName}>
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} />
        <div className="flex flex-col gap-[1rem]">
          {IDENTITY_DATA.map((identity) => (
            <IdentityCard
              key={identity.id}
              identity={identity.identity}
              description1={identity.description1}
              description2={identity.description2}
              isAdditionalInfo={identity.isAdditionalInfo}
              isOpen={openId === identity.id}
              onClick={() => handleCardClick(identity.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default IdentitySection;
