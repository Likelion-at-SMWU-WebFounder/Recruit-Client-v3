import { useEffect, useRef, useState } from 'react';
import { SECTION_TITLES, SCHEDULES, SECTION_SUB_TITLES } from '../../constants/index';
import iconStar from '../../assets/icon-star.svg';
import SubTitle from '@/shared/components/SubTitle';

const badgeBase =
  'flex items-center justify-center rounded-[62.4375rem] md:border-[0.8px] border-[0.4px] border-[var(--color-blue-main)] bg-[var(--color-white-main)] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]';
const labelBase = 'text-center font-medium whitespace-nowrap text-[var(--color-navyblack-main)]';
const starBase = 'object-contain';

const TW = {
  section:
    'flex w-full flex-col items-center justify-center bg-[var(--color-white-main)] px-[1rem] py-[10rem] gap-[3.88rem] md:gap-[6.89rem] md:px-[4rem] md:py-[12.0625rem] lg:gap-[12rem] lg:px-[10rem] lg:py-[19.5rem] relative overflow-hidden',

  // Mobile Layout
  mobileGrid: 'grid w-full grid-cols-4 gap-[0.69rem] md:hidden relative pt-[2.5rem]',
  mobileItem: 'flex flex-col items-center justify-center gap-[1.4375rem] z-10',
  mobileDate: 'text-center text-[0.875rem] font-medium text-[var(--color-navyblack-main)] leading-[120%]',
  mobileStar: `${starBase} h-[1.25rem] w-[1.25rem]`,
  mobileBadge: `${badgeBase} px-[0.5rem] py-[0.25rem]`,
  mobileLabel: `${labelBase} text-[0.9375rem] leading-[120%]`,

  // Tablet & Desktop Layout
  desktopRow: 'hidden w-full items-center justify-center gap-[0.62rem] md:flex lg:gap-[7.44rem] relative pt-[3.5rem]',
  desktopItem: 'flex w-full flex-col items-center justify-center gap-[1.4375rem] z-10',
  desktopDate:
    'w-full text-center text-[1rem] font-medium text-[var(--color-navyblack-main)] lg:text-[1.375rem] leading-[120%]',
  desktopStar: `${starBase} md:h-[1.75rem] md:w-[1.75rem] lg:h-[2.25rem] lg:w-[2.25rem]`,
  desktopBadge: `${badgeBase} flex items-center justify-center px-[1rem] py-[0.375rem] lg:px-[1.625rem] lg:py-[0.625rem]`,
  desktopLabel: `${labelBase} text-[1.375rem] lg:text-[1.75rem] leading-[120%]`,

  // Line Animation Classes
  lineContainer: 'absolute left-0 w-full flex justify-center pointer-events-none z-0 px-[1rem]',
  hidden: 'opacity-0 translate-y-4',
  visible: 'opacity-100 translate-y-0',
} as const;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const ScheduleSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileSchedules = SCHEDULES.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getLineStyle = (isMobile: boolean) => {
    const duration = isMobile ? '1.5s' : '2.2s';

    return {
      strokeDasharray: 100,
      strokeDashoffset: isVisible ? 0 : 100,
      transition: `stroke-dashoffset ${duration} ease-in-out`,
    };
  };

  return (
    <section ref={sectionRef} className={TW.section}>
      <div>
        <SubTitle
          mode="light"
          align="center"
          subTitle={SECTION_SUB_TITLES.GENERATION}
          subDescription={SECTION_TITLES.SCHEDULE}
        />
      </div>

      {/* [Mobile] */}
      <div className={TW.mobileGrid}>
        <div className={cx(TW.lineContainer, 'top-[5.48rem]')}>
          <svg width="100%" height="4" viewBox="0 0 100 4" fill="none" preserveAspectRatio="none">
            <path
              d="M0 2H100"
              stroke="url(#mobile_grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={getLineStyle(true)}
            />
            <defs>
              <linearGradient id="mobile_grad" x1="0" y1="2" x2="100" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#80ABFD" stopOpacity="0" />
                <stop offset="0.5" stopColor="#A2C2FF" />
                <stop offset="1" stopColor="#80ABFD" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {mobileSchedules.map((schedule) => (
          <div key={schedule.id} className={TW.mobileItem}>
            <span className={TW.mobileDate}>{schedule.dateRangeMobile || schedule.dateRange}</span>
            <img src={iconStar} alt="" className={cx(TW.mobileStar, 'relative z-10')} />
            <div className={TW.mobileBadge}>
              <span className={TW.mobileLabel}>{schedule.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* [Tablet & Desktop] */}
      <div className={TW.desktopRow}>
        <div className={cx(TW.lineContainer, 'top-[6.87rem] lg:top-[7.5rem]')}>
          <svg width="100%" height="4" viewBox="0 0 100 4" fill="none" preserveAspectRatio="none">
            <path
              d="M0 2H100"
              stroke="url(#desktop_grad)"
              strokeWidth="4"
              strokeLinecap="round"
              style={getLineStyle(false)}
            />
            <defs>
              <linearGradient id="desktop_grad" x1="0" y1="2" x2="100" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#80ABFD" stopOpacity="0" />
                <stop offset="0.5" stopColor="#A2C2FF" />
                <stop offset="1" stopColor="#80ABFD" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {SCHEDULES.map((schedule) => (
          <div key={schedule.id} className={TW.desktopItem}>
            <span className={TW.desktopDate}>{schedule.dateRange}</span>
            <img src={iconStar} alt="" className={cx(TW.desktopStar, 'relative z-10')} />
            <div className={TW.desktopBadge}>
              <span className={TW.desktopLabel}>{schedule.labelDesktop || schedule.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
