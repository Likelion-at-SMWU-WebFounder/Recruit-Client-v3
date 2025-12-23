import { FaCaretRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGINATION_STYLES = {
  container: {
    base: 'flex w-full items-center justify-end gap-[4.875rem]',
  },
  pageButton: {
    base: 'cursor-pointer transition-colors duration-200 ease-out md:text-[1rem] lg:text-[1.75rem]',
    active: 'text-blue font-bold leading-[170%]',
    inactive: 'text-navyblack/50 font-medium hover:text-[#6978B2] leading-[140%]',
  },
  arrowButton: {
    enabled: 'cursor-pointer text-navyblack/50 transition-colors duration-200 ease-out hover:text-blue/30',
    disabled: 'cursor-not-allowed text-navyblack/20',
  },
} as const;

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const isNextDisabled = currentPage >= totalPages;

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

  const arrowButtonClassName = isNextDisabled
    ? PAGINATION_STYLES.arrowButton.disabled
    : PAGINATION_STYLES.arrowButton.enabled;

  const containerClassName = PAGINATION_STYLES.container.base;

  return (
    <div className={containerClassName}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
        className={arrowButtonClassName}
        aria-label="다음 페이지로 이동">
        <FaCaretRight className="md:size-5 lg:size-7" />
      </button>
    </div>
  );
};

export default Pagination;
