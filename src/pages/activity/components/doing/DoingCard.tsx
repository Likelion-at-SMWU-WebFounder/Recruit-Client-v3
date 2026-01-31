import { useState, useEffect } from 'react';
import DoingCardFront from './DoingCardFront';
import DoingCardBack from './DoingCardBack';
import { combineStyles } from '@shared/utils/combineStyles';

interface DoingCardProps {
  icon_dark?: string;
  icon_white?: string;
  term: number[];
  title: string;
  description: string[];
  image: string;
  index?: number;
  hoveredCardIndex?: number | null;
  hasEverHovered?: boolean;
  onCardHover?: (index: number | null) => void;
}

// DoingCard 스타일 상수화
const DOING_CARD_STYLES = {
  flipContainer: {
    base: 'relative cursor-pointer [perspective:1000px]',
    desktop: 'lg:w-[23.875rem] lg:h-[36.375rem]',
    tablet: 'md:w-[12.73331rem] md:h-[19.4rem]',
    mobile: 'w-[18.625rem] h-[12.5rem]',
  },
  flipInner: {
    base: 'relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]',
    flipped: '[transform:rotateY(180deg)]',
  },
} as const;

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
  const [isTabletClicked, setIsTabletClicked] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const shortDescription = description[0];
  const fullDescription = description[1];

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
  // 데스크톱/모바일: 기존 호버 로직 사용
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
          term={term}
          title={title}
          fullDescription={fullDescription}
          image={image}
          onFlipBack={() => {}}
        />
      </div>
    </div>
  );
};
export default DoingCard;
