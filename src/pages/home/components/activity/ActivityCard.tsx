import { ACTIVITY_DATA } from '@pages/home/constants/activity';
import { combineStyles } from '@shared/utils/combineStyles';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

interface ActivityCardProps {
  type: 'hackathon' | 'seminar';
}

interface CardItem {
  component: ReactElement;
  column?: number;
  row?: number;
}

// ActivityCard 스타일 상수화
const ACTIVITY_CARD_STYLES = {
  desktopTabletTextCard: {
    base: 'md:inline-flex md:flex-col items-left justify-center shadow-default rounded-[1.25rem] bg-navyblack/20 p-[2rem]',
    desktop: 'lg:w-[20rem] lg:h-[18rem] lg:gap-[1.25rem]',
    tablet: 'md:inline-flex md:w-[13rem] md:h-[18rem] md:gap-[1.65rem]',
    mobile: 'hidden',
  },
  mobileTextCard: {
    base: 'shadow-sub inline-flex flex-col items-left justify-center pl-[0.75rem] rounded-[0.75rem]',
    tablet: 'md:hidden',
    mobile: 'w-[6.5rem] h-[6.5rem] gap-[0.5rem]',
  },
  textCardIcon: {
    desktop: 'lg:h-[3.125rem] lg:w-[3.125rem]',
    tablet: 'md:h-[2.5rem] md:w-[2.5rem]',
    mobile: 'h-[1.5rem] w-[1.5rem]',
  },
  textCardTitle: {
    base: 'font-medium',
    desktop: 'lg:text-[1.75rem]',
    tablet: 'md:text-[1.5rem]',
    mobile: 'text-[1.125rem]',
  },
  textCardDescription: {
    base: 'font-normal',
    desktop: 'lg:text-[1.375rem] ',
    tablet: 'md:text-[1.125rem]',
  },
  imageCard: {
    base: 'object-cover',
    desktop: 'lg:rounded-[1.25rem] lg:w-[20rem] lg:h-[26rem]',
    tablet: 'md:rounded-[1.25rem] md:w-[13rem] md:h-[26rem]',
    mobile: 'rounded-[0.75rem] w-[15rem] h-[6.5rem]',
  },
} as const;

// 텍스트 카드
export const ActivityTextCard = ({ type }: ActivityCardProps) => {
  const activity = ACTIVITY_DATA[type];
  const TEXT_COLOR_CLASSES = `${type === 'hackathon' ? 'bg-blue text-white' : 'bg-white text-navyblack'}`;

  const desktopTabletTextCardClassName = combineStyles(ACTIVITY_CARD_STYLES.desktopTabletTextCard);
  const mobileTextCardClassName = combineStyles(ACTIVITY_CARD_STYLES.mobileTextCard);
  const textCardIconClassName = combineStyles(ACTIVITY_CARD_STYLES.textCardIcon);
  const textCardTitleClassName = combineStyles(ACTIVITY_CARD_STYLES.textCardTitle);
  const textCardDescriptionClassName = combineStyles(ACTIVITY_CARD_STYLES.textCardDescription);

  return (
    <>
      {/* 데스크탑, 태블릿 */}
      <div className={`${desktopTabletTextCardClassName} ${TEXT_COLOR_CLASSES}`}>
        <img src={activity.icon} alt={type} className={textCardIconClassName} />
        <span className={textCardTitleClassName}>{activity.title}</span>
        <span className={textCardDescriptionClassName}>{activity.description}</span>
      </div>

      {/* 모바일 */}
      <div
        className={`${mobileTextCardClassName} ${type === 'hackathon' ? 'bg-blue text-white' : 'text-navyblack bg-white'}`}>
        <img src={activity.icon} alt={type} className={textCardIconClassName} />
        <span className={textCardTitleClassName}>{activity.title}</span>
      </div>
    </>
  );
};

// 이미지 카드
export const ActivityImageCard = ({ type }: ActivityCardProps) => {
  const activity = ACTIVITY_DATA[type];
  const imageCardClassName = combineStyles(ACTIVITY_CARD_STYLES.imageCard);

  return <img src={activity.image} alt={activity.title} className={imageCardClassName} />;
};

// 카드 컨테이너
export const ActivityCardContainer = () => {
  const [visibleCards, setVisibleCards] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 카드 시퀀스 정의
  const cardSequence: CardItem[] = isMobile
    ? [
        { component: <ActivityTextCard type="hackathon" />, row: 0 },
        { component: <ActivityImageCard type="hackathon" />, row: 0 },
        { component: <ActivityImageCard type="seminar" />, row: 1 },
        { component: <ActivityTextCard type="seminar" />, row: 1 },
      ]
    : [
        { component: <ActivityImageCard type="hackathon" />, column: 0 },
        { component: <ActivityTextCard type="hackathon" />, column: 1 },
        { component: <ActivityImageCard type="seminar" />, column: 1 },
        { component: <ActivityTextCard type="seminar" />, column: 0 },
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards((prev) => (prev < cardSequence.length ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [cardSequence.length]);

  // 통합된 렌더링 함수
  const renderCards = (indexKey: 'column' | 'row', indexValue: number) => {
    return cardSequence
      .filter((card) => {
        if (indexKey === 'column') {
          return card.column === indexValue;
        }
        return card.row === indexValue;
      })
      .map((card, index) => {
        const globalIndex = cardSequence.findIndex((c) => c === card);
        const isVisible = globalIndex < visibleCards;

        return (
          <div
            key={`${indexValue}-${index}`}
            className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: isVisible ? 'fadeIn 0.5s ease-in-out' : 'none' }}>
            {card.component}
          </div>
        );
      });
  };

  const containerClass = isMobile
    ? 'inline-flex flex-col gap-[0.625rem] md:hidden'
    : 'hidden md:inline-flex md:flex-row md:gap-[1.5rem]';

  const itemClass = isMobile ? 'inline-flex flex-row gap-[0.75rem]' : 'inline-flex flex-col gap-[1.5rem]';

  return (
    <div className={containerClass}>
      <div className={itemClass}>{renderCards(isMobile ? 'row' : 'column', 0)}</div>
      <div className={itemClass}>{renderCards(isMobile ? 'row' : 'column', 1)}</div>
    </div>
  );
};
