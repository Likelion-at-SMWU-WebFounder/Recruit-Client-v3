import { useState } from 'react';
import FilterButton from '@pages/project/components/list/filter/FilterButton';
import { PROJECT_FILTER_OPTIONS } from '@pages/project/constants';
import { MdOutlineMoreHoriz } from 'react-icons/md';

interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

const FILTER_BAR_STYLES = {
  container: {
    base: 'flex w-full justify-start gap-[0.75rem] overflow-x-auto py-[1.75rem] pr-[0.38rem] scrollbar-hidden',
    tablet: 'md:max-w-[100rem] md:gap-[1rem] md:py-[3rem]',
    desktop: 'lg:gap-[1.25rem]',
  },
  moreButton: {
    base: 'text-gray inline-flex aspect-square h-[2.75rem] w-[2.75rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-full md:border-[2px] md:border-transparent bg-white p-[0.5rem]',
    hover: 'hover:border-blue hover:text-blue transition-all duration-300 ease-out hover:border-[2px]',
    tablet: 'md:h-[3.125rem] md:w-[3.125rem] md:p-[0.75rem]',
    desktop: 'lg:h-[4.375rem] lg:w-[4.375rem]',
  },
} as const;

const FilterBar = ({ value, onChange }: FilterBarProps) => {
  const [showMore, setShowMore] = useState(false);

  // 11기까지는 기본적으로 보이고 (id <= 4), 10기와 9기는 더보기 버튼 클릭 시 보임
  const visibleOptions = showMore ? PROJECT_FILTER_OPTIONS : PROJECT_FILTER_OPTIONS.filter((option) => option.id <= 4);

  const hasMoreOptions = PROJECT_FILTER_OPTIONS.length > 4;

  const containerClassName = [
    FILTER_BAR_STYLES.container.base,
    FILTER_BAR_STYLES.container.tablet,
    FILTER_BAR_STYLES.container.desktop,
  ].join(' ');

  const moreButtonClassName = [
    FILTER_BAR_STYLES.moreButton.base,
    FILTER_BAR_STYLES.moreButton.hover,
    FILTER_BAR_STYLES.moreButton.tablet,
    FILTER_BAR_STYLES.moreButton.desktop,
  ].join(' ');

  return (
    <div className={containerClassName}>
      {/* 필터 버튼 */}
      {visibleOptions.map((option) => (
        <FilterButton key={option.id} onClick={() => onChange(option.name)} active={value === option.name}>
          {option.name}
        </FilterButton>
      ))}

      {/* 더보기 버튼 (10기, 9기) */}
      {hasMoreOptions && !showMore && (
        <button type="button" onClick={() => setShowMore(true)} className={moreButtonClassName}>
          <MdOutlineMoreHoriz className="size-6 lg:size-7" />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
