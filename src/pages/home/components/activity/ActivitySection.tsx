import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE, TEXT_CONTENT_CLASSES } from '@pages/home/constants/index';
import { ACTIVITY_CONTENT_TEXT } from '@pages/home/constants/activity';
import { ActivityCardContainer } from '@pages/home/components/activity/ActivityCard';
import { combineStyles } from '@shared/utils/combineStyles';

// ActivitySection 스타일 상수화
const ACTIVITY_SECTION_STYLES = {
  desktopTabletSection: {
    base: 'md:inline-flex justify-between items-start w-full max-w-[100vw] pt-[5rem] ',
    desktop: 'lg:px-[10rem]',
    tablet: 'md:px-[4rem]',
    mobile: 'hidden',
  },
  mobileSection: {
    base: 'relative flex w-full max-w-[100vw] flex-col items-center justify-center gap-[2.7rem] ',
    tablet: 'md:hidden',
  },
  textContainer: {
    base: 'inline-flex flex-col items-start justify-center gap-[1.25rem]',
    tablet: 'md:mt-[6rem]',
  },
  desktopText: {
    base: `${TEXT_CONTENT_CLASSES} hidden`,
    desktop: 'lg:block',
  },
  tabletText: {
    base: `${TEXT_CONTENT_CLASSES}`,
    desktop: 'lg:hidden',
  },
  mobileTextContainer: {
    base: 'inline-flex flex-col items-center justify-center gap-[3.125rem]',
  },
  mobileText: {
    base: `${TEXT_CONTENT_CLASSES} w-[22rem] text-center`,
  },
  cardContainer: {
    base: '',
  },
} as const;

const ActivitySection = () => {
  const desktopTabletSectionClassName = combineStyles(ACTIVITY_SECTION_STYLES.desktopTabletSection);
  const mobileSectionClassName = combineStyles(ACTIVITY_SECTION_STYLES.mobileSection);
  const textContainerClassName = combineStyles(ACTIVITY_SECTION_STYLES.textContainer);
  const desktopTextClassName = combineStyles(ACTIVITY_SECTION_STYLES.desktopText);
  const tabletTextClassName = combineStyles(ACTIVITY_SECTION_STYLES.tabletText);
  const mobileTextContainerClassName = combineStyles(ACTIVITY_SECTION_STYLES.mobileTextContainer);
  const mobileTextClassName = combineStyles(ACTIVITY_SECTION_STYLES.mobileText);
  const cardContainerClassName = combineStyles(ACTIVITY_SECTION_STYLES.cardContainer);

  return (
    <>
      {/* 데스크톱, 태블릿 */}
      <section className={desktopTabletSectionClassName}>
        <div className={textContainerClassName}>
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} align="left" />
          <div className={desktopTextClassName}>{ACTIVITY_CONTENT_TEXT.desktop}</div>
          <div className={tabletTextClassName}>{ACTIVITY_CONTENT_TEXT.tablet}</div>
        </div>
        <div className={cardContainerClassName}>
          <ActivityCardContainer />
        </div>
      </section>

      {/* 모바일 */}
      <section className={mobileSectionClassName}>
        <div className={mobileTextContainerClassName}>
          <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} />
          <div className={mobileTextClassName}>{ACTIVITY_CONTENT_TEXT.mobile}</div>
        </div>
        <div className={cardContainerClassName}>
          <ActivityCardContainer />
        </div>
      </section>
    </>
  );
};

export default ActivitySection;
