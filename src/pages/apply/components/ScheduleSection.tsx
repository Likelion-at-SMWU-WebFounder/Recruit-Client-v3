import { SECTION_TITLES, SCHEDULES } from '../constants/index';
import iconStar from '../assets/icon-star.svg';

const ScheduleSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-16 bg-[#F0F4FA] px-4 py-20 md:gap-24 md:px-8 md:py-32 lg:gap-[12rem] lg:px-[10rem] lg:py-[19.5rem]">
      {/* 글씨 박스 */}
      <div className="flex min-w-[17.1875rem] flex-col items-center gap-[1rem]">
        <span className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#1B2634] uppercase opacity-50 md:text-[1rem] lg:text-[1.25rem]">
          13기 아기사자
        </span>
        <h2 className="text-center text-[1.5rem] leading-[140%] font-semibold text-[#1B2634] md:text-[2rem] lg:text-[2.625rem]">
          {SECTION_TITLES.SCHEDULE}
        </h2>
      </div>

      {/* 시간 표 */}
      <div className="flex w-full flex-col items-center gap-8 md:flex-row md:justify-center md:gap-4 lg:h-[10.0625rem] lg:w-[100rem] lg:flex-row lg:justify-between lg:gap-0">
        {SCHEDULES.map((schedule) => (
          <div
            key={schedule.id}
            className="flex w-[12.125rem] flex-col items-center justify-center gap-3 lg:gap-[1.4375rem]">
            {/* 날짜 */}
            <span className="w-full text-center text-[1rem] font-medium text-[#1B2634] md:text-[1.125rem] lg:text-[1.375rem]">
              {schedule.dateRange}
            </span>

            {/* 포인트 이미지 */}
            <img src={iconStar} alt="" className="h-6 w-6 md:h-7 md:w-7 lg:h-[2.25rem] lg:w-[2.25rem]" />

            {/* 내용 */}
            <div className="flex items-center justify-center gap-[0.625rem] rounded-[62.4375rem] border-[0.8px] border-[rgba(66,132,255,0.8)] bg-[#F7FAFF] px-4 py-2 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] md:px-5 md:py-2.5 lg:px-[1.625rem] lg:py-[0.625rem]">
              <span className="text-center text-[1rem] font-medium whitespace-nowrap text-[#1B2634] md:text-[1.25rem] lg:text-[1.75rem]">
                {schedule.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
