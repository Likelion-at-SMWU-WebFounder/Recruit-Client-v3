import { combineStyles } from '@shared/utils/combineStyles';
import { TITLE } from '@pages/about/constants/index';

// OrbitTextBox 스타일 상수화
const ORBIT_TEXT_BOX_STYLES = {
  container: {
    base: 'absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-[1rem]',
  },
  title: {
    base: 'text-navyblack text-center text-[1.75rem] leading-[150%] font-[700] tracking-[-0.088rem]',
    tablet: 'md:text-[4rem]',
  },
  description: {
    base: 'text-navyblack-opacity70 text-center text-[1.125rem] leading-[170%] font-[500] whitespace-pre-line',
    tablet: 'md:text-[2rem]',
  },
} as const;

const OrbitTextBox = () => {
  const containerClassName = combineStyles(ORBIT_TEXT_BOX_STYLES.container);
  const titleClassName = combineStyles(ORBIT_TEXT_BOX_STYLES.title);
  const descriptionClassName = combineStyles(ORBIT_TEXT_BOX_STYLES.description);

  return (
    <div className={containerClassName}>
      <div className={titleClassName}>{TITLE.TITLE_2}</div>
      <div className={descriptionClassName}>{TITLE.DESCRIPTION_2}</div>
    </div>
  );
};

export default OrbitTextBox;
