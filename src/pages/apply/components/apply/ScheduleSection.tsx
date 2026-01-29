import { SECTION_TITLES, SCHEDULES, SECTION_SUB_TITLES } from '../../constants/index';
import iconStar from '../../assets/icon-star.svg';
import SubTitle from '@/shared/components/SubTitle';

const TW = {
  // layout
  section:
    'flex w-full flex-col items-center justify-center gap-16 bg-[var(--color-white-main)] px-4 py-20 md:gap-24 md:px-8 md:py-32 lg:gap-[12rem] lg:px-[10rem] lg:py-[19.5rem]',

  // heading
  headingBox: 'flex min-w-[17.1875rem] flex-col items-center gap-[1rem]',

  // mobile
  mobileGrid: 'grid w-full grid-cols-4 gap-2 md:hidden',
  mobileItem: 'flex flex-col items-center justify-center gap-3',
  mobileDate: 'text-center text-[0.875rem] font-medium text-[#1B2634]',
  mobileStar: 'h-[1.25rem] w-[1.25rem]',
  mobileBadge:
    'flex items-center justify-center rounded-[62.4375rem] border-[0.8px] border-[rgba(66,132,255,0.8)] bg-[#F7FAFF] px-3 py-1.5 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  mobileLabel: 'text-center text-[0.75rem] font-medium whitespace-nowrap text-[#1B2634]',

  // tablet/desktop
  desktopRow:
    'hidden w-full items-center justify-center gap-4 md:flex lg:h-[10.0625rem] lg:w-[100rem] lg:justify-between lg:gap-0',
  desktopItem: 'flex w-[12.125rem] flex-col items-center justify-center gap-3 lg:gap-[1.4375rem]',
  desktopDate: 'w-full text-center text-[1.125rem] font-medium text-[#1B2634] lg:text-[1.375rem]',
  desktopStar: 'md:h-[1.75rem] md:w-[1.75rem] lg:h-[2.25rem] lg:w-[2.25rem]',
  desktopBadge:
    'flex items-center justify-center gap-[0.625rem] rounded-[62.4375rem] border-[0.8px] border-[rgba(66,132,255,0.8)] bg-[#F7FAFF] px-5 py-2.5 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] lg:px-[1.625rem] lg:py-[0.625rem]',
  desktopLabel: 'text-center text-[1.25rem] font-medium whitespace-nowrap text-[#1B2634] lg:text-[1.75rem]',
} as const;

//const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const ScheduleSection = () => {
  const mobileSchedules = SCHEDULES.slice(0, 4);

  return (
    <section className={TW.section}>
      {/* 글씨 박스 */}
      <div className={TW.headingBox}>
        <SubTitle
          mode="light"
          align="center"
          subTitle={SECTION_SUB_TITLES.GENERATION}
          subDescription={SECTION_TITLES.SCHEDULE}
        />
      </div>

      {/* 모바일 */}
      <div className={TW.mobileGrid}>
        {mobileSchedules.map((schedule) => (
          <div key={schedule.id} className={TW.mobileItem}>
            {/* 날짜 */}
            <span className={TW.mobileDate}>{schedule.dateRangeMobile || schedule.dateRange}</span>

            {/* 포인트 이미지 */}
            <img src={iconStar} alt="" className={TW.mobileStar} />

            {/* 내용 */}
            <div className={TW.mobileBadge}>
              <span className={TW.mobileLabel}>{schedule.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 태블릿/데스크탑 */}
      <div className={TW.desktopRow}>
        {SCHEDULES.map((schedule) => (
          <div key={schedule.id} className={TW.desktopItem}>
            {/* 날짜 */}
            <span className={TW.desktopDate}>{schedule.dateRange}</span>

            {/* 포인트 이미지 */}
            <img src={iconStar} alt="" className={TW.desktopStar} />

            {/* 내용 */}
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
