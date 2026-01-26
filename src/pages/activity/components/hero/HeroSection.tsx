import { combineStyles } from '@shared/utils/combineStyles';
import { TITLE } from '@pages/activity/constants/index';
import HeroCard from '@/pages/activity/components/hero/HeroCard';
import { HERO_DATA } from '@pages/activity/constants/hero';

// HeroSection 스타일 상수화
const HERO_SECTION_STYLES = {
  section: {
    base: 'relative h-[100dvh] snap-start overflow-hidden flex flex-col justify-center items-center',
    desktop: 'lg:py-[8rem] lg:gap-[7.63rem]',
    tablet: 'md:py-[6rem] md:gap-[2rem]',
    mobile: 'py-[4rem] gap-[1.5rem]',
  },
  titleContainer: {
    base: 'flex flex-col justify-center items-center ',
    desktop: 'lg:gap:[0.9375rem]',
    tablet: 'md:gap-[0.5rem]',
    mobile: 'gap-[0.19188rem]',
  },
  title1: {
    base: 'font-[700] text-navyblack leading-[150%]',
    desktop: 'lg:text-[4rem] lg:tracking-[-0.088rem]',
    tablet: 'md:text-[2.25rem] md:tracking-[-0.0495rem]',
    mobile: 'text-[1.75rem] tracking-[-0.0385rem]',
  },
  title2: {
    base: 'font-[500] text-navyblack/70 leading-[160%] whitespace-pre-line ',
    desktop: 'lg:text-[2rem] lg:tracking-[-0.044rem]',
    tablet: 'md:text-[1.125rem] md:tracking-[-0.02475rem]',
    mobile: 'text-[1.125rem] tracking-[-0.02475rem]',
  },
  heroContainer: {
    base: 'w-full flex flex-col overflow-hidden',
    desktop: 'lg:gap-[0.5rem]',
    tablet: 'md:gap-[0.31rem]',
    mobile: 'gap-[0.38rem]',
  },
  heroRow: {
    base: 'flex w-max ',
    desktop: 'lg:py-[0.625rem] lg:gap-[1.88rem]',
    tablet: 'md:py-[0.3rem] md:gap-[1rem]',
    mobile: 'py-[0.125rem] gap-[0.62rem]',
  },
} as const;

const HeroSection = () => {
  const sectionClassName = combineStyles(HERO_SECTION_STYLES.section);
  const titleContainerClassName = combineStyles(HERO_SECTION_STYLES.titleContainer);
  const title1Classes = combineStyles(HERO_SECTION_STYLES.title1);
  const title2Classes = combineStyles(HERO_SECTION_STYLES.title2);
  const heroContainerClassName = combineStyles(HERO_SECTION_STYLES.heroContainer);
  const heroRowClassName = combineStyles(HERO_SECTION_STYLES.heroRow);

  // HERO_DATA를 두 줄로 분할
  const mid = Math.ceil(HERO_DATA.length / 2);
  const firstRowData = HERO_DATA.slice(0, mid);
  const secondRowData = HERO_DATA.slice(mid);

  // 무한 스크롤을 위해 3번 복제
  const duplicatedFirstRow = [...firstRowData, ...firstRowData, ...firstRowData];
  const duplicatedSecondRow = [...secondRowData, ...secondRowData, ...secondRowData];

  return (
    <section className={sectionClassName}>
      <div className={titleContainerClassName}>
        <span className={title1Classes}>{TITLE.TITLE_1}</span>
        <span className={title2Classes}>{TITLE.TITLE_2}</span>
      </div>

      {/* Hero Card 무한 스크롤 */}
      <div className={heroContainerClassName}>
        <div className={`${heroRowClassName} hero-scroll-left`}>
          {duplicatedFirstRow.map((hero, index) => (
            <HeroCard
              key={`first-${index}`}
              image={hero.image}
              name={hero.name}
              batch={hero.batch}
              part={hero.part as '프론트엔드' | '백엔드' | '기획/디자인'}
              retro={hero.retro}
            />
          ))}
        </div>
        <div className={`${heroRowClassName} hero-scroll-left`} style={{ transform: 'translateX(-10%)' }}>
          {duplicatedSecondRow.map((hero, index) => (
            <HeroCard
              key={`second-${index}`}
              image={hero.image}
              name={hero.name}
              batch={hero.batch}
              part={hero.part as '프론트엔드' | '백엔드' | '기획/디자인'}
              retro={hero.retro}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
