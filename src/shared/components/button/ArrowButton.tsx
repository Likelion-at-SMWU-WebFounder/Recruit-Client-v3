import { IoMdArrowForward, IoMdArrowDown } from 'react-icons/io';

interface NextArrowBtnProps {
  iconColor: 'gray' | 'navyblack' | 'blue';
  onArrowBtnClick: () => void;
  direction?: 'right' | 'down';
}

// 스타일 상수화
const ARROW_BUTTON_STYLES = {
  base: 'shadow-default cursor-pointer rounded-full bg-white font-semibold transition',
  // 반응형 사이즈 (모바일 기본, md: 태블릿, lg: 데스크톱)
  size: 'p-[0.75rem] text-[1.5rem] md:p-[0.8rem] md:text-[1.4rem] lg:p-[1.5rem] lg:text-[2.625rem]',
  color: {
    gray: 'border border-gray text-gray',
    navyblack: 'text-navyblack',
    blue: 'text-blue border border-blue',
  },
} as const;

const ArrowButton = ({ iconColor, onArrowBtnClick, direction = 'right' }: NextArrowBtnProps) => {
  const className = `${ARROW_BUTTON_STYLES.base} ${ARROW_BUTTON_STYLES.size} ${ARROW_BUTTON_STYLES.color[iconColor]}`;
  const ArrowIcon = direction === 'down' ? IoMdArrowDown : IoMdArrowForward;
  const ariaLabel = direction === 'down' ? 'down scroll' : 'next scroll';

  return (
    <button type="button" aria-label={ariaLabel} className={className} onClick={onArrowBtnClick}>
      <ArrowIcon />
    </button>
  );
};

export default ArrowButton;
