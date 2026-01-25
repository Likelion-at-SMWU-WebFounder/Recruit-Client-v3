import { GoDotFill } from 'react-icons/go';
import { combineStyles } from '@shared/utils/combineStyles';

// YearContent 스타일 상수화
const YEAR_CONTENT_STYLES = {
  container: {
    base: 'flex flex-col items-center justify-center gap-[0.625rem]',
    tablet: 'md:w-[13.8rem]',
    mobile: 'w-[7.5rem]',
  },
  dot: {
    base: 'text-blue',
    desktop: 'lg:w-[4rem] lg:h-[4rem] lg:mb-[1.88rem]',
    tablet: 'md:w-[2.5rem] md:h-[2.5rem] md:mb-[2.5rem]',
    mobile: 'w-[2rem] h-[2rem] mb-[1rem]',
  },
  content: {
    base: 'font-semibold text-navyblack leading-[140%] whitespace-nowrap ',
    desktop: 'lg:text-[2rem] ',
    tablet: 'md:text-[1.5rem]',
    mobile: 'text-[1rem]',
  },
  date: {
    base: 'font-semibold text-navyblack/70 whitespace-nowrap ',
    desktop: 'lg:text-[1.5rem]',
    tablet: 'md:text-[1.25rem]',
    mobile: 'text-[0.875rem]',
  },
} as const;

interface YearContentProps {
  content: string;
  date: string;
}
const YearContent = ({ content, date }: YearContentProps) => {
  const containerClassName = combineStyles(YEAR_CONTENT_STYLES.container);
  const dotClassName = combineStyles(YEAR_CONTENT_STYLES.dot);
  const contentClassName = combineStyles(YEAR_CONTENT_STYLES.content);
  const dateClassName = combineStyles(YEAR_CONTENT_STYLES.date);

  return (
    <div className={containerClassName}>
      <GoDotFill className={dotClassName} />
      <div className={contentClassName}>{content}</div>
      <div className={dateClassName}>{date}</div>
    </div>
  );
};

export default YearContent;
