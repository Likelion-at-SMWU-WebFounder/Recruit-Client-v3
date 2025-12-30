import { useState } from 'react';
import WebFoundersCardFront from './WebFoundersCardFront';
import WebFoundersCardBack from './WebFoundersCardBack';
import type { FounderType } from '@/pages/webFounders/types/founder';
import { combineStyles } from '@shared/utils/combineStyles';

interface WebFoundersCardProps {
  founder: FounderType;
}

// 웹파운더즈 카드 스타일 상수화
const WEBFOUNDERS_CARD_STYLES = {
  container: {
    base: 'relative h-[15.5rem] w-full', // 앞면 카드 컨테이너 스타일
    tablet: 'md:h-[26rem]',
    desktop: 'lg:h-[32.5rem]',
  },
  flipContainer: {
    base: 'relative h-[15.5rem] w-full [perspective:1500px]', // 뒷면(flip) 카드 컨테이너 스타일
    tablet: 'md:h-[26rem]',
    desktop: 'lg:h-[32.5rem]',
  },
  flipInner: {
    base: 'relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]', // 뒷면(flip) 카드 내부 스타일
    flipped: '[transform:rotateY(180deg)]', // 뒷면(flip) 카드 회전 스타일
  },
} as const;

const WebFoundersCard = ({ founder }: WebFoundersCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  // WEBFOUNDERS_3TH (12기)만 뒷면(flip) 버튼이 있음
  // founder.no가 '12기'인지 확인하여 flip 버튼 표시 여부 결정
  const hasBackCard = founder.no === '12기';

  if (!hasBackCard) {
    // WEBFOUNDERS_1TH (10기), WEBFOUNDERS_2TH (11기)는 앞면만 있음
    const containerClassName = combineStyles(WEBFOUNDERS_CARD_STYLES.container); // 앞면 카드 컨테이너 스타일
    return (
      <div className={containerClassName}>
        <WebFoundersCardFront name={founder.name} no={founder.no} part={founder.part} image={founder.image} />
      </div>
    );
  }

  // WEBFOUNDERS_3TH (12기)는 flip 버튼이 있는 카드
  const flipContainerClassName = combineStyles(WEBFOUNDERS_CARD_STYLES.flipContainer); // 뒷면(flip) 카드 컨테이너 스타일
  const flipInnerClassName = `${combineStyles(WEBFOUNDERS_CARD_STYLES.flipInner)} ${isFlipped ? WEBFOUNDERS_CARD_STYLES.flipInner.flipped : ''}`; // 뒷면(flip) 카드 내부 스타일

  return (
    <div className={flipContainerClassName}>
      <div className={flipInnerClassName}>
        {/* 앞면 */}
        <WebFoundersCardFront
          name={founder.name}
          no={founder.no}
          part={founder.part}
          image={founder.image}
          onFlip={() => setIsFlipped(true)}
        />

        {/* 뒷면 */}
        <WebFoundersCardBack founder={founder} onFlipBack={() => setIsFlipped(false)} />
      </div>
    </div>
  );
};

export default WebFoundersCard;
