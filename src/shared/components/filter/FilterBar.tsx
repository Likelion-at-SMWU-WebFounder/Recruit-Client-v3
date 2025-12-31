import { useState } from 'react';
import FilterButton from '@shared/components/filter/FilterButton';
import { combineStyles } from '@shared/utils/combineStyles';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import type { FilterOptionType, FilterModeType } from '@shared/types/filter';

interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOptionType[];
  mode?: FilterModeType; // project: 프로젝트 페이지, webFounders: 웹파운더즈 페이지
  showMoreThreshold?: number; // 더보기 버튼을 표시할 최소 옵션 개수 (기본값: 4)
}

// 필터 바 스타일 상수화
const FILTER_BAR_STYLES = {
  container: {
    project: {
      base: 'flex w-full justify-start gap-[0.75rem] overflow-x-auto py-[1.75rem] pr-[0.38rem] scrollbar-hidden',
      tablet: 'md:max-w-[100rem] md:gap-[1rem] md:py-[3rem]',
      desktop: 'lg:gap-[1.25rem]',
    },
    webFounders: {
      base: 'flex w-full justify-start gap-[0.75rem] overflow-x-auto py-[1.75rem] pl-[1rem] pr-[0.38rem] scrollbar-hidden',
      tablet: 'md:max-w-[100rem] md:gap-[1rem] md:py-[3rem]',
      desktop: 'lg:gap-[1.25rem] lg:pl-[10rem]',
    },
  },
  moreButton: {
    base: 'text-gray inline-flex aspect-square h-[2.75rem] w-[2.75rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-full md:border-[2px] md:border-transparent bg-white p-[0.5rem]',
    hover: 'hover:border-blue hover:text-blue transition-all duration-300 ease-out hover:border-[2px]',
    tablet: 'md:h-[3.125rem] md:w-[3.125rem] md:p-[0.75rem]',
    desktop: 'lg:h-[4.375rem] lg:w-[4.375rem]',
  },
} as const;

const FilterBar = ({ value, onChange, options, mode = 'project', showMoreThreshold = 4 }: FilterBarProps) => {
  const [showMore, setShowMore] = useState(false);

  // 더보기 기능이 필요한 경우 (project 모드에서만 사용)
  const hasMoreOptions = mode === 'project' && options.length > showMoreThreshold;
  const visibleOptions =
    hasMoreOptions && !showMore ? options.filter((option) => option.id <= showMoreThreshold) : options;

  const containerClassName = combineStyles(FILTER_BAR_STYLES.container[mode]);
  const moreButtonClassName = [
    FILTER_BAR_STYLES.moreButton.base,
    FILTER_BAR_STYLES.moreButton.hover,
    FILTER_BAR_STYLES.moreButton.tablet,
    FILTER_BAR_STYLES.moreButton.desktop,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName}>
      {/* 필터 버튼 */}
      {visibleOptions.map((option) => (
        <FilterButton
          key={option.id}
          onClick={() => onChange(option.filterValue)}
          active={value === option.filterValue}
          mode={mode}>
          {option.filterValue}
        </FilterButton>
      ))}

      {/* 더보기 버튼 (project 모드에서만 표시) */}
      {hasMoreOptions && !showMore && (
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className={moreButtonClassName}
          aria-label="필터 옵션 더보기">
          <MdOutlineMoreHoriz className="size-6 lg:size-7" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
