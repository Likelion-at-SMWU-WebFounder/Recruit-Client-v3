import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/about/constants/about';
import { IDENTITIES_DATA } from '@pages/about/constants/identities';
import IdentityCard from '@pages/about/components/identity/IdentityCard';
import { useCallback, useState } from 'react';
import { useDesktopScroll } from '@/pages/about/hooks/useDesktopScroll';
import { useMobileScroll } from '@/pages/about/hooks/useMobileScroll';

const IdentitiesSection = () => {
  const [openId, setOpenId] = useState<number | null>(IDENTITIES_DATA[0]?.id ?? null);
  const totalCards = IDENTITIES_DATA.length;
  const getIdByIndex = useCallback((index: number) => IDENTITIES_DATA[index]?.id ?? null, []);

  const {
    sectionRef: desktopSectionRef,
    cardsContainerRef,
    scrollToCard: desktopScrollToCard,
  } = useDesktopScroll(totalCards, getIdByIndex, setOpenId);
  const { sectionRef: mobileSectionRef, scrollToCard: mobileScrollToCard } = useMobileScroll(
    totalCards,
    getIdByIndex,
    setOpenId
  );

  const handleCardClick = (id: number) => {
    const cardIndex = IDENTITIES_DATA.findIndex((item) => item.id === id);
    if (cardIndex !== -1) {
      // 뷰포트에 따라 적절한 스크롤 함수 호출 (cardId도 함께 전달)
      if (window.innerWidth >= 768) {
        desktopScrollToCard(cardIndex);
      } else {
        mobileScrollToCard(cardIndex);
      }
    }
  };

  return (
    <>
      {/* 태블릿/데스크톱: 카드 */}
      <section
        ref={desktopSectionRef}
        className="hidden w-full max-w-[100vw] md:flex md:justify-between md:px-[6.25rem] md:py-[11.88rem] lg:px-[18.44rem] lg:py-[4rem]">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} align="left" />
        <div ref={cardsContainerRef} className="md:flex md:flex-col md:gap-[1.25rem] lg:gap-[1.5rem]">
          {IDENTITIES_DATA.map((identity) => (
            <IdentityCard
              key={identity.id}
              identity={identity.identity}
              description1={identity.description1}
              description2={identity.description2}
              isOpen={openId === identity.id}
              onClick={() => handleCardClick(identity.id)}
            />
          ))}
        </div>
      </section>

      {/* 모바일: 카드 */}
      <section
        ref={mobileSectionRef}
        className="relative flex w-full max-w-[100vw] flex-col items-center justify-center gap-[3.38rem] py-[3.12rem] md:hidden">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} />
        <div className="flex flex-col gap-[1rem]">
          {IDENTITIES_DATA.map((identity) => (
            <IdentityCard
              key={identity.id}
              identity={identity.identity}
              description1={identity.description1}
              description2={identity.description2}
              isOpen={openId === identity.id}
              onClick={() => handleCardClick(identity.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default IdentitiesSection;
