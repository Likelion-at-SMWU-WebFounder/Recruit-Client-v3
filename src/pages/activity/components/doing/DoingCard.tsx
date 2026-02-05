import { useState, useEffect } from 'react';
import DoingCardFront from '@pages/activity/components/doing/DoingCardFront';
import DoingCardBack from '@pages/activity/components/doing/DoingCardBack';
import DoingCardMobile from '@pages/activity/components/doing/DoingCardMobile';
import { combineStyles } from '@shared/utils/combineStyles';

interface DoingCardProps {
  icon_dark?: string;
  icon_white?: string;
  term: number[];
  title: string;
  description: string[]; // [0]: 짧은 설명, [1]: 긴 설명
  image: string;
  index?: number;
  hoveredCardIndex?: number | null;
  hasEverHovered?: boolean;
  onCardHover?: (index: number | null) => void;
}
interface DesktopTabletDoingCardProps {
  icon_dark?: string;
  icon_white?: string;
  term: number[];
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  index?: number;
  hoveredCardIndex?: number | null;
  hasEverHovered?: boolean;
  onCardHover?: (index: number | null) => void;
}

interface MobileDoingCardProps {
  icon_white?: string;
  term: number[];
  title: string;
  fullDescription: string;
  image: string;
}

// DoingCard 스타일 상수화
const DOING_CARD_STYLES = {
  flipContainer: {
    base: 'relative cursor-pointer [perspective:1000px] hidden md:flex',
    desktop: 'lg:w-[23.875rem] lg:h-[36.375rem]',
    tablet: 'md:w-[13.5rem] md:h-[20rem]',
  },
  flipInner: {
    base: 'relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]',
    flipped: '[transform:rotateY(180deg)]',
  },
  mobileCardContainer: {
    base: 'md:hidden w-full h-full flex items-center justify-center',
  },
  mobileInner: {
    base: 'w-[100dvw] h-fit flex items-center justify-center',
  },
} as const;

const DesktopTabletDoingCard = ({
  icon_dark,
  icon_white,
  term,
  title,
  shortDescription,
  fullDescription,
  image,
  index = 0,
  hoveredCardIndex,
  hasEverHovered = false,
  onCardHover,
}: DesktopTabletDoingCardProps) => {
  const [isTabletClicked, setIsTabletClicked] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 플립 상태 결정 로직:
  // 태블릿: 클릭 상태에 따라 결정
  // 데스크톱: 기존 호버 로직 사용
  const getFlipState = () => {
    if (isTablet) {
      // 태블릿에서는 클릭 상태로 결정
      return isTabletClicked;
    }

    // 데스크톱: 기존 로직
    if (!hasEverHovered) {
      return index === 0; // 첫 번째 카드만 뒷면(true)
    } else {
      return hoveredCardIndex === index; // 현재 호버된 카드만 뒷면(true)
    }
  };

  const isFlipped = getFlipState();

  const flipContainerClassName = combineStyles(DOING_CARD_STYLES.flipContainer);
  const flipInnerClassName = `${combineStyles(DOING_CARD_STYLES.flipInner)} ${isFlipped ? DOING_CARD_STYLES.flipInner.flipped : ''}`;

  const handleMouseEnter = () => {
    if (!isTablet) {
      onCardHover?.(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isTablet) {
      onCardHover?.(null);
    }
  };

  const handleClick = () => {
    if (isTablet) {
      setIsTabletClicked(!isTabletClicked);
    }
  };

  return (
    <>
      {/* 데스크톱 및 태블릿 flip 카드 */}
      <div
        className={flipContainerClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}>
        <div className={flipInnerClassName}>
          {/* 앞면 */}
          <DoingCardFront
            icon_dark={icon_dark}
            term={term}
            title={title}
            shortDescription={shortDescription}
            onFlip={() => {}}
          />

          {/* 뒷면 */}
          <DoingCardBack
            icon_white={icon_white}
            title={title}
            fullDescription={fullDescription}
            image={image}
            onFlipBack={() => {}}
          />
        </div>
      </div>
    </>
  );
};

const MobileDoingCard = ({ icon_white, term, title, fullDescription, image }: MobileDoingCardProps) => {
  const mobileCardContainerClassName = combineStyles(DOING_CARD_STYLES.mobileCardContainer);
  const mobileInnerClassName = combineStyles(DOING_CARD_STYLES.mobileInner);

  return (
    <>
      {/* 모바일 카드 */}
      <div className={mobileCardContainerClassName}>
        <div className={mobileInnerClassName}>
          <DoingCardMobile
            icon_white={icon_white}
            term={term}
            title={title}
            fullDescription={fullDescription}
            image={image}
          />
        </div>
      </div>
    </>
  );
};

const DoingCard = ({
  icon_dark,
  icon_white,
  term,
  title,
  description,
  image,
  index = 0,
  hoveredCardIndex,
  hasEverHovered = false,
  onCardHover,
}: DoingCardProps) => {
  const shortDescription = description[0];
  const fullDescription = description[1];

  return (
    <>
      <DesktopTabletDoingCard
        icon_dark={icon_dark}
        icon_white={icon_white}
        term={term}
        title={title}
        shortDescription={shortDescription}
        fullDescription={fullDescription}
        image={image}
        index={index}
        hoveredCardIndex={hoveredCardIndex}
        hasEverHovered={hasEverHovered}
        onCardHover={onCardHover}
      />
      <MobileDoingCard
        icon_white={icon_white}
        term={term}
        title={title}
        fullDescription={fullDescription}
        image={image}
      />
    </>
  );
};
export default DoingCard;
