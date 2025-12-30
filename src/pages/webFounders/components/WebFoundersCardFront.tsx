import BlurOverlay from '@/pages/webFounders/components/BlurOverlay';
import { combineStyles } from '@shared/utils/combineStyles';

import { BiPlus } from 'react-icons/bi';

interface WebFoundersCardFrontProps {
  name: string;
  no: string;
  part: string;
  image: string;
  onFlip?: () => void;
}

// 웹파운더즈 카드 앞면 스타일 상수화
const WEBFOUNDERS_CARD_FRONT_STYLES = {
  cardContainer: {
    base: 'absolute inset-0 flex h-full flex-col justify-end rounded-[0.75rem] bg-cover bg-center text-white',
    tablet: 'md:rounded-[1.38613rem]',
    desktop: 'lg:rounded-[1.5625rem]',
  }, // 카드 앞면 컨테이너 스타일
  transform: {
    base: '[transform:rotateY(0deg)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]',
  }, // 카드 앞면 회전 스타일
  overlayFooterContainer: {
    base: 'relative flex h-[6.125rem] items-end justify-between px-[0.88rem] py-[0.46rem]',
    tablet: 'md:h-[10.2rem] md:px-[1.62rem] md:py-[1.05rem]',
    desktop: 'lg:h-[11.5rem] lg:px-[2rem] lg:py-[1.62rem]',
  }, // 카드 앞면 하단 컨테이너 스타일 (오버레이 + 이름, 기수, 파트 + flip 버튼)
  footer: {
    base: 'relative flex w-full items-center justify-between',
  }, // 카드 앞면 푸터 스타일(이름, 기수, 파트 + flip 버튼)
  nameInfoWrapper: {
    base: '',
    tablet: 'md:space-y-[0.31rem]',
  }, // 이름, 기수, 파트 컨테이너 스타일
  nameText: {
    base: 'text-[1.125rem] leading-[140%] font-bold',
    tablet: 'md:text-[1.75rem]',
  }, // 이름 스타일
  noPartText: {
    base: 'text-[0.75rem] leading-[140%] font-medium',
    tablet: 'md:text-[1.25rem]',
  }, // 기수, 파트 스타일
  flipButton: {
    base: 'hover:bg-navyblack text-navyblack flex cursor-pointer items-center justify-center rounded-[0.625rem] bg-white p-[0.375rem] transition duration-300 ease-in-out hover:text-white',
    tablet: 'md:rounded-[1.1rem] md:p-[0.5rem]',
    desktop: 'lg:rounded-[1.25rem] lg:p-[0.625rem]',
  }, // flip 버튼 스타일
  flipIcon: {
    base: 'size-5',
    tablet: 'md:size-8',
  }, // flip 버튼 아이콘 스타일
} as const;

const WebFoundersCardFront = ({ name, no, part, image, onFlip }: WebFoundersCardFrontProps) => {
  const hasFlipButton = onFlip !== undefined;
  const cardContainerClassName = `${combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.cardContainer)} ${hasFlipButton ? WEBFOUNDERS_CARD_FRONT_STYLES.transform.base : ''}`;
  const overlayFooterContainerClassName = combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.overlayFooterContainer);
  const nameInfoWrapperClassName = combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.nameInfoWrapper);
  const nameTextClassName = combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.nameText);
  const noPartTextClassName = combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.noPartText);
  const flipButtonClassName = combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.flipButton);
  const flipIconClassName = combineStyles(WEBFOUNDERS_CARD_FRONT_STYLES.flipIcon);

  return (
    <div className={cardContainerClassName} style={{ backgroundImage: `url(${image})` }}>
      <div className={overlayFooterContainerClassName}>
        {/* 오버레이 */}
        <BlurOverlay />

        {/* 이름, 기수, 파트 + flip card 버튼 */}
        <div className={WEBFOUNDERS_CARD_FRONT_STYLES.footer.base}>
          <div className={nameInfoWrapperClassName}>
            <div className={nameTextClassName}>{name}</div>
            <div className={noPartTextClassName}>
              {no} · {part}
            </div>
          </div>

          {hasFlipButton && (
            <button type="button" onClick={onFlip} className={flipButtonClassName}>
              <BiPlus className={flipIconClassName} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebFoundersCardFront;
