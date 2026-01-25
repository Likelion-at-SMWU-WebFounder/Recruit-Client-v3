import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGINATION_STYLES = {
  container: {
    base: 'flex w-full items-center justify-end md:gap-[0.75rem] lg:gap-[3.25rem]',
  },
  pageButton: {
    base: 'w-[2.75rem] cursor-pointer transition-colors duration-200 ease-out md:text-[1rem] lg:text-[1.75rem]',
    active: 'text-blue font-bold leading-[170%]',
    inactive: 'md:bd16 lg:bd28 text-navyblack/50 hover:text-[#6978B2]',
  },
  arrowButton: {
    base: 'w-[3rem]',
    enabled: 'cursor-pointer text-navyblack/50 transition-colors duration-200 ease-out hover:text-[#6978B2]',
    disabled: 'cursor-not-allowed text-navyblack/20',
  },
} as const;

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const VISIBLE_COUNT = 5;
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const chunkIndex = Math.floor((currentPage - 1) / VISIBLE_COUNT);
  const startPage = chunkIndex * VISIBLE_COUNT + 1;
  const endPage = Math.min(totalPages, startPage + VISIBLE_COUNT - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePrev = () => {
    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  const pageButtonClassName = (page: number) => {
    const base = PAGINATION_STYLES.pageButton.base;
    const state = page === currentPage ? PAGINATION_STYLES.pageButton.active : PAGINATION_STYLES.pageButton.inactive;
    return [base, state].join(' ');
  };

  const prevArrowClassName = [
    PAGINATION_STYLES.arrowButton.base,
    isPrevDisabled ? PAGINATION_STYLES.arrowButton.disabled : PAGINATION_STYLES.arrowButton.enabled,
  ].join(' ');

  const nextArrowClassName = [
    PAGINATION_STYLES.arrowButton.base,
    isNextDisabled ? PAGINATION_STYLES.arrowButton.disabled : PAGINATION_STYLES.arrowButton.enabled,
  ].join(' ');

  const containerClassName = PAGINATION_STYLES.container.base;

  return (
    <div className={containerClassName}>
      <button
        type="button"
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className={prevArrowClassName}
        aria-label="이전 페이지로 이동">
        <FaCaretLeft className="md:size-4 lg:size-6" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={pageButtonClassName(page)}
          aria-label={`페이지 ${page}로 이동`}
          aria-current={page === currentPage ? 'page' : undefined}>
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled}
        className={nextArrowClassName}
        aria-label="다음 페이지로 이동">
        <FaCaretRight className="md:size-4 lg:size-6" />
      </button>
    </div>
  );
};

export default Pagination;
