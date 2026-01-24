import { ACTIVITY_DATA } from '@pages/home/constants/activity';
import { combineStyles } from '@shared/utils/combineStyles';
import { useState, useEffect } from 'react';

interface ActivityCardProps {
  type: 'hackathon' | 'seminar';
}

// ActivityCard 스타일 상수화
const ACTIVITY_CARD_STYLES = {
  desktopTabletTextCard: {
    base: 'shadow-default hidden rounded-[1.25rem] bg-navyblack/20 p-[2rem] w-[20rem] h-[18rem] gap-[1.25rem]',
    tablet: 'md:inline-flex md:flex-col md:items-left md:justify-center',
  },
  mobileTextCard: {
    base: 'shadow-sub inline-flex flex-col items-left pt-[1rem] gap-[2rem] w-[6.5rem] h-[6.8rem]',
    tablet: 'md:hidden',
  },
  textCardIcon: {
    base: 'h-[3.125rem] w-[3.125rem]',
  },
  textCardTitle: {
    base: 'text-[1.75rem] font-medium',
  },
  textCardDescription: {
    base: 'text-[1.375rem] font-normal',
  },
  imageCard: {
    base: 'w-[20rem] h-[26rem] rounded-[1.25rem] object-cover',
  },
  cardContainer: {
    base: 'inline-flex flex-row gap-[1.5rem]',
  },
  cardColumn: {
    base: 'flex flex-col gap-[1.5rem]',
  },
} as const;

// 텍스트 카드
export const ActivityTextCard = ({ type }: ActivityCardProps) => {
  const activity = ACTIVITY_DATA[type];
  const TEXT_COLOR_CLASSES = `${type === 'hackathon' ? 'text-white' : 'text-navyblack'}`;

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
  const cardContainerClassName = combineStyles(ACTIVITY_CARD_STYLES.cardContainer);
  const cardColumnClassName = combineStyles(ACTIVITY_CARD_STYLES.cardColumn);

  // 카드 순서 배열
  const cardSequence = [
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

  const renderColumn = (columnIndex: number) => {
    return cardSequence
      .filter((card) => card.column === columnIndex)
      .map((card, index) => {
        const globalIndex = cardSequence.findIndex((c) => c === card);
        const isVisible = globalIndex < visibleCards;

        return (
          <div
            key={`${columnIndex}-${index}`}
            className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: isVisible ? 'fadeIn 0.5s ease-in-out' : 'none' }}>
            {card.component}
          </div>
        );
      });
  };

  return (
    <div className={cardContainerClassName}>
      <div className={cardColumnClassName}>{renderColumn(0)}</div>
      <div className={cardColumnClassName}>{renderColumn(1)}</div>
    </div>
  );
};
