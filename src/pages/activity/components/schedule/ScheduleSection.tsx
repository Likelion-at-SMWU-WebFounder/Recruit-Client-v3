import { useEffect, useRef, useState } from 'react';
import SubTitle from '@shared/components/SubTitle';
import { SUB_TITLE } from '@pages/activity/constants/index';
import { combineStyles } from '@shared/utils/combineStyles';
import { SCHEDULE_DATA } from '@pages/activity/constants/schedule';
import ScheduleBox from '@pages/activity/components/schedule/ScheduleBox';
import useScrollResistance from '@pages/activity/hooks/useScrollResistance';

// ScheduleSection 스타일 상수화
const SCHEDULE_SECTION_STYLES = {
  section: {
    base: 'scrollbar-hidden relative flex flex-col justify-start items-center',
    desktop: 'lg:py-[8rem] lg:gap-[7.63rem]',
    tablet: 'md:py-[6rem] md:gap-[2rem]',
    mobile: 'py-[4rem] gap-[1.5rem]',
  },
  contentWrapper: {
    base: 'relative w-full h-scroll flex flex-col justify-center items-center',
    desktop: 'lg:pb-[15rem]',
    tablet: 'md:pt-[30rem] md:pb-[15rem]',
    mobile: 'pb-[15rem]',
  },
  stroke: {
    base: 'absolute left-1/2 top-0 -translate-x-1/2 bg-blue/30',
    desktop: 'lg:w-[0.625rem] lg:h-full',
    tablet: 'md:w-[0.31rem] md:h-full',
    mobile: 'w-[0.25rem] h-full',
  },
  scheduleItem: {
    base: 'relative flex flex-col w-full items-center',
    desktop: 'lg:mt-[10rem]',
    tablet: 'md:mt-[5rem]',
    mobile: 'mt-[3rem]',
  },
  dotContainer: {
    base: 'absolute left-1/2 flex -translate-x-1/2 items-center justify-center',
  },
  dot: {
    base: 'rounded-full transition-all duration-500 ease-out',
    desktop: 'lg:w-[1.5rem] lg:h-[1.5rem]',
    tablet: 'md:w-[1rem] md:h-[1rem]',
    mobile: 'w-[0.625rem] h-[0.625rem]',
    active: 'bg-blue scale-125 shadow-[0_0_0_6px_rgba(59,130,246,0.2)]',
    inactive: 'bg-blue h-3 w-3',
  },
} as const;

const ScheduleSection = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => {
  const resistanceRef = useScrollResistance(0.4, scrollContainerRef); // 0.15(매우 무거움) ~ 0.4(거의 정상) 사이로 저항감 조정

  const sectionClassName = combineStyles(SCHEDULE_SECTION_STYLES.section);
  const contentWrapperClassName = combineStyles(SCHEDULE_SECTION_STYLES.contentWrapper);
  const strokeClassName = combineStyles(SCHEDULE_SECTION_STYLES.stroke);
  const scheduleItemClassName = combineStyles(SCHEDULE_SECTION_STYLES.scheduleItem);
  const dotContainerClassName = combineStyles(SCHEDULE_SECTION_STYLES.dotContainer);
  const dotActiveClassName = `${combineStyles(SCHEDULE_SECTION_STYLES.dot)} ${SCHEDULE_SECTION_STYLES.dot.active} `;
  const dotInactiveClassName = `${combineStyles(SCHEDULE_SECTION_STYLES.dot)} ${SCHEDULE_SECTION_STYLES.dot.inactive} `;

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  // 각 아이템이 화면 중앙에 도달했을 때 activeId 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setActiveId(id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // 중앙 근처만 active
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={resistanceRef} className={sectionClassName}>
      {/* SubTitle 핸드폰 / 테블릿,데스크탑 분기 */}
      <div className="hidden md:block">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2} />
      </div>
      <div className="md:hidden">
        <SubTitle subTitle={SUB_TITLE.SUB_TITLE_2} subDescription={SUB_TITLE.SUB_DESCRIPTION_2_MOBILE} />
      </div>

      <div className={contentWrapperClassName}>
        <div className={strokeClassName} />

        {SCHEDULE_DATA.map((schedule, index) => {
          const isActive = activeId === schedule.id;

          return (
            <div
              key={schedule.id}
              data-id={schedule.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={scheduleItemClassName}>
              {/* 중앙 Dot */}
              <div className={dotContainerClassName}>
                <div className={`${isActive ? dotActiveClassName : dotInactiveClassName} `} />
              </div>
              <ScheduleBox
                key={schedule.id}
                mode={index % 2 === 0 ? 'left' : 'right'} // 짝수 인덱스는 오른쪽, 홀수 인덱스는 왼쪽
                title={schedule.title}
                date={schedule.date}
                images={schedule.images}
                active={activeId === schedule.id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ScheduleSection;
