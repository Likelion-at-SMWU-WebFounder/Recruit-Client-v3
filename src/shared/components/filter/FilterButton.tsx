import { combineStyles } from '@shared/utils/combineStyles';
import type { FilterModeType } from '@/shared/types/filter';

interface FilterButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  mode?: FilterModeType;
  className?: string;
  style?: React.CSSProperties;
}

// 필터 버튼 스타일 상수화
const FILTER_BUTTON_STYLES = {
  button: {
    base: 'flex-shrink-0 cursor-pointer rounded-full px-[1.25rem] py-[0.5rem] text-[1rem] leading-[170%]',
    tablet:
      'md:inline-flex md:items-center md:justify-center md:border-[2px] md:border-transparent md:px-[2rem] md:text-[1.25rem]',
    desktop: 'lg:px-[2.25rem] lg:text-[2rem]',
  },
  active: {
    project: 'bg-blue text-white font-semibold',
    webFounders: 'bg-navyblack text-white font-semibold shadow-[0_0_4px_0_#1B2634]',
  },
  inactive: {
    project: 'bg-white text-gray font-medium',
    webFounders: 'bg-white text-gray font-medium shadow-[0_0_4px_0_#CDD6E4]',
  },
  hover: {
    project: 'hover:border-blue hover:border-[2px] hover:text-blue transition-all duration-300 ease-out',
    webFounders: 'hover:border-navyblack hover:border-[2px] hover:text-navyblack transition-all duration-300 ease-out',
  },
} as const;

const FilterButton = ({
  children,
  onClick,
  active,
  mode = 'project',
  className: additionalClassName,
  style,
}: FilterButtonProps) => {
  const buttonClassName = combineStyles(FILTER_BUTTON_STYLES.button);
  const stateClassName = active ? FILTER_BUTTON_STYLES.active[mode] : FILTER_BUTTON_STYLES.inactive[mode];
  const hoverClassName = !active ? FILTER_BUTTON_STYLES.hover[mode] : '';
  const className = `${hoverClassName} ${buttonClassName} ${stateClassName} ${additionalClassName || ''}`.trim();

  return (
    <button type="button" className={className} onClick={onClick} style={style} aria-label={`${children} 필터 선택`}>
      {children}
    </button>
  );
};

export default FilterButton;
