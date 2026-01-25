import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/home/constants/index';
import { combineStyles } from '@shared/utils/combineStyles';
import { YEAR_DATA } from '@pages/home/constants/year';
import YearContent from '@pages/home/components/year/YearContent';

// YearSection 스타일 상수화
const YEAR_SECTION_STYLES = {
  container: {
    base: 'relative flex h-[100dvh] w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden',
  },
  textContainer: {
    base: 'inline-flex flex-col items-center justify-center gap-[1.25rem]',
    tablet: 'md:mt-[6rem]',
  },
  lineContainer: {
    base: 'flex flex-col items-center justify-center gap-[15.5rem]',
    desktop: 'lg:gap-[15.5rem] lg:mt-[9rem]',
    tablet: 'md:gap-[21.5rem] md:mt-[9rem]',
    mobile: 'gap-[9rem] mt-[4rem]',
  },
  line: {
    base: 'line-drawing',
  },
  lineReverse: {
    base: 'line-reverse-drawing',
  },
  lineResponsive: {
    desktop: 'lg:w-[100rem] lg:h-[0.625rem]',
    tablet: 'md:w-[50rem] md:h-[0.375rem]',
    mobile: 'w-[22.5rem] h-[0.25rem]',
  },
  contentRowContainer: {
    base: 'relative flex flex-col ',
    desktop: 'lg:mt-[-18.5rem] lg:w-[100rem] lg:gap-[4rem]',
    tablet: 'md:mt-[-23.3rem] md:w-[50rem] md:gap-[11.5rem]',
    mobile: 'mt-[-16.9rem] w-[22.5rem] gap-[8.7rem]',
  },
  contentRow1: {
    base: 'flex justify-center',
    desktop: 'lg:ml-[-30rem] lg:text-[2.5rem] lg:gap-[5.69rem] ',
    tablet: 'md:ml-[-10rem] md:text-[1.75rem] md:gap-[1.5rem]',
    mobile: 'text-[1.25rem] gap-[0.625rem] ',
  },
  contentRow2: {
    base: 'flex justify-center',
    desktop: 'lg:ml-[30rem] lg:text-[2.5rem]  lg:gap-[5.69rem] ',
    tablet: 'md:ml-[10rem] md:text-[1.75rem] md:gap-[1.5rem]',
    mobile: 'text-[1.25rem] ',
  },
} as const;

const YearSection = () => {
  const containerClassName = combineStyles(YEAR_SECTION_STYLES.container);
  const textContainerClassName = combineStyles(YEAR_SECTION_STYLES.textContainer);
  const lineContainerClassName = combineStyles(YEAR_SECTION_STYLES.lineContainer);
  const lineClassName = combineStyles(YEAR_SECTION_STYLES.line);
  const lineReverseClassName = combineStyles(YEAR_SECTION_STYLES.lineReverse);
  const lineResponsiveClassName = combineStyles(YEAR_SECTION_STYLES.lineResponsive);

  const contentRowContainerClassName = combineStyles(YEAR_SECTION_STYLES.contentRowContainer);
  const contentRow1ClassName = combineStyles(YEAR_SECTION_STYLES.contentRow1);
  const contentRow2ClassName = combineStyles(YEAR_SECTION_STYLES.contentRow2);

  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <section className={containerClassName}>
        <div className={textContainerClassName}>
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_3} subDescription={SUB_TITLE.SUB_DESCRIPTION_3} />
        </div>

        {/* 애니메이션 선 */}
        <div className={lineContainerClassName}>
          <div className={`${lineClassName} ${lineResponsiveClassName}`} style={{ animationDelay: '0s' }}></div>
          <div
            className={`${lineReverseClassName} ${lineResponsiveClassName}`}
            style={{ animationDelay: '0.6s' }}></div>
        </div>

        <div className={contentRowContainerClassName}>
          {/* 1번째 행 콘텐츠 */}
          <div className={contentRow1ClassName}>
            {YEAR_DATA.slice(0, 3).map((year) => (
              <YearContent content={year.content} date={year.date} />
            ))}
          </div>
          {/* 2번째 행 콘텐츠 */}
          <div className={contentRow2ClassName}>
            {YEAR_DATA.slice(-3).map((year) => (
              <YearContent content={year.content} date={year.date} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default YearSection;
