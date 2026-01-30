import { useState, useEffect } from 'react';
import FilterButton from '@shared/components/filter/FilterButton';
import { combineStyles } from '@shared/utils/combineStyles';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import type { FilterOptionType, FilterModeType } from '@shared/types/filter';

interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOptionType[];
  mode?: FilterModeType; // project: 프로젝트 페이지, webFounders: 웹파운더즈 페이지
  showMoreThreshold?: number; // 처음에 보여줄 옵션의 마지막 인덱스 (기본값: 3, 인덱스 0~3까지 표시)
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

const FilterBar = ({ value, onChange, options, mode = 'project', showMoreThreshold = 3 }: FilterBarProps) => {
  // 현재 선택된 필터의 인덱스 확인
  const selectedOptionIndex = options.findIndex((option) => option.filterValue === value);
  // 새로고침 시 선택된 필터가 더보기 영역에 있으면 초기 상태에서 더보기 영역을 열어둠
  const shouldShowMoreInitially = selectedOptionIndex > showMoreThreshold;

  const [showMore, setShowMore] = useState(shouldShowMoreInitially);

  // value가 변경될 때 선택된 필터가 더보기 영역에 있으면 자동으로 열기
  // (예: URL 파라미터로 9기/10기가 선택된 상태에서 새로고침한 경우)
  useEffect(() => {
    if (selectedOptionIndex > showMoreThreshold) {
      setShowMore(true);
    }
  }, [value, selectedOptionIndex, showMoreThreshold]);

  // 더보기 기능이 필요한 경우 (project 모드에서만 사용)
  // 옵션 개수가 showMoreThreshold보다 많을 때만 더보기 버튼 표시
  const hasMoreOptions = mode === 'project' && options.length > showMoreThreshold + 1;

  // 더보기 버튼 클릭 전: 인덱스 0부터 showMoreThreshold까지의 옵션만 표시
  // 더보기 버튼 클릭 후: 모든 옵션 표시
  const visibleOptions = hasMoreOptions && !showMore ? options.slice(0, showMoreThreshold + 1) : options;

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
      {visibleOptions.map((option) => {
        // 현재 옵션의 원본 배열에서의 인덱스 찾기
        const optionIndex = options.findIndex((opt) => opt.id === option.id);
        // 더보기 영역에 있는 옵션인지 확인 (인덱스가 showMoreThreshold보다 큰 경우)
        const isMoreOption = hasMoreOptions && optionIndex > showMoreThreshold;
        // 더보기 영역 옵션들은 순차적으로 나타나도록 딜레이 적용 (각 버튼마다 0.1초씩)
        const animationDelay = isMoreOption ? `${(optionIndex - showMoreThreshold - 1) * 0.1}s` : undefined;

        return (
          <FilterButton
            key={option.id}
            onClick={() => onChange(option.filterValue)}
            active={value === option.filterValue}
            mode={mode}
            className={isMoreOption ? 'filter-float-in' : undefined}
            style={animationDelay ? { animationDelay } : undefined}>
            {option.filterValue}
          </FilterButton>
        );
      })}

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
