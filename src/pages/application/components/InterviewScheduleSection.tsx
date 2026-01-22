import { useState, type TouchEvent } from 'react'; // [수정] type 키워드 추가
import { INTERVIEW_SCHEDULE, QUESTIONS } from '../constants/index';

interface InterviewScheduleSectionProps {
  selectedSchedule: { [date: string]: string[] };
  onScheduleChange: (date: string, time: string, checked: boolean) => void;
}

const InterviewScheduleSection = ({ selectedSchedule, onScheduleChange }: InterviewScheduleSectionProps) => {
  const question = QUESTIONS[7];
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isChecked = (date: string, time: string) => {
    return selectedSchedule[date]?.includes(time) || false;
  };

  // 모바일 터치 슬라이드 로직
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50 && activeIndex < INTERVIEW_SCHEDULE.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (diff < -50 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    setTouchStart(null);
  };

  return (
    <section className="flex w-full flex-col items-center gap-[1.375rem] self-stretch px-4 md:px-0">
      {/* 1. [박스 밖] 질문 헤더: 내어쓰기(Hanging Indent) 구조 */}
      <div className="flex w-full items-start gap-[0.8125rem] md:w-[52.75rem] lg:w-[90.0625rem]">
        <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
          {question.number}.
        </span>
        <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
          {question.question}
          <span className="ml-[0.25rem] font-bold text-[#4284FF]">*</span>
        </label>
      </div>

      {/* 2. [모바일] 요일별 스와이프 카드 (md 미만) */}
      <div className="flex flex-col items-start gap-[1.75rem] md:hidden">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex h-[17.0625rem] w-[19.375rem] flex-col rounded-[0.875rem] border-[1.2px] border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] px-[2.8125rem] pt-[1.875rem] pb-[1.875rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] transition-all">
          <div className="mb-[1.25rem] flex w-full justify-end">
            <span className="text-[1.25rem] font-semibold text-[#1B2634]">{INTERVIEW_SCHEDULE[activeIndex].date}</span>
          </div>

          <div className="flex flex-col gap-[0.75rem]">
            {INTERVIEW_SCHEDULE[activeIndex].times.map((time) => (
              <div key={time} className="flex items-center justify-between self-stretch">
                <span className="text-[1rem] font-medium text-[#1B2634]">{time}</span>
                <div
                  onClick={() =>
                    onScheduleChange(
                      INTERVIEW_SCHEDULE[activeIndex].date,
                      time,
                      !isChecked(INTERVIEW_SCHEDULE[activeIndex].date, time)
                    )
                  }
                  className={`relative flex aspect-square w-[2.125rem] cursor-pointer items-center justify-center rounded-[0.5rem] border-[1.2px] transition-all ${
                    isChecked(INTERVIEW_SCHEDULE[activeIndex].date, time)
                      ? 'border-[#1B2634] bg-[#F7FAFF]'
                      : 'border-[rgba(27,38,52,0.3)] bg-white'
                  }`}>
                  {isChecked(INTERVIEW_SCHEDULE[activeIndex].date, time) && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#1B2634"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="flex h-[2.25rem] w-[19.375rem] items-center justify-center gap-[0.5rem]">
          {INTERVIEW_SCHEDULE.map((_, index) => (
            <button key={index} onClick={() => setActiveIndex(index)} className="focus:outline-none">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle
                  cx="4"
                  cy="4"
                  r="4"
                  fill={index === activeIndex ? '#4284FF' : '#1B2634'}
                  fillOpacity={index === activeIndex ? '1' : '0.4'}
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 3. [태블릿/랩탑] 양 끝 패딩 밀착 그리드 (md 이상) */}
      <div className="hidden w-full flex-col rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] px-[1rem] py-[1.5rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:flex md:w-[52.75rem] md:items-start md:px-[4.125rem] md:py-[2.5rem] lg:w-[90.0625rem] lg:items-center lg:justify-center lg:px-[5.25rem] lg:py-[2.5rem]">
        <div className="flex w-full flex-col gap-[2rem] md:gap-[3rem] lg:gap-[1.8rem]">
          <div className="flex items-end justify-between self-stretch">
            <div className="w-[6rem] shrink-0 md:w-[7rem] lg:w-[10.5rem]" />
            {INTERVIEW_SCHEDULE.map((schedule) => (
              <div
                key={schedule.date}
                className="flex w-[2rem] shrink-0 items-center justify-center md:w-[2.9375rem] lg:w-[2.9375rem]">
                <span className="text-[1.125rem] leading-normal font-semibold whitespace-nowrap text-[#1B2634] md:text-[1.5rem] lg:text-[1.875rem]">
                  {schedule.date}
                </span>
              </div>
            ))}
          </div>

          {INTERVIEW_SCHEDULE[0].times.map((time) => (
            <div key={time} className="flex items-center justify-between self-stretch">
              <div className="flex w-[6rem] shrink-0 flex-col justify-center text-[1rem] leading-normal font-medium text-[#1B2634] md:w-[7rem] md:text-[1.5rem] lg:h-[2.9375rem] lg:w-[10.5rem] lg:text-[1.875rem]">
                {time}
              </div>
              {INTERVIEW_SCHEDULE.map((schedule) => (
                <div
                  key={`${schedule.date}-${time}`}
                  className="flex w-[2rem] shrink-0 items-center justify-center md:w-[2.9375rem] lg:w-[2.9375rem]">
                  <div
                    onClick={() => onScheduleChange(schedule.date, time, !isChecked(schedule.date, time))}
                    className={`relative flex aspect-square w-[2rem] cursor-pointer items-center justify-center border-2 transition-all md:w-[2.9375rem] md:rounded-[1rem] md:shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] lg:w-[2.9375rem] lg:rounded-[0.5rem] lg:shadow-none ${isChecked(schedule.date, time) ? 'border-[#1B2634] bg-[#F7FAFF]' : 'border-[rgba(27,38,52,0.3)] bg-white'}`}>
                    {isChecked(schedule.date, time) && (
                      <svg viewBox="0 0 24 24" fill="none" className="h-[70%] w-[70%]">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#1B2634"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterviewScheduleSection;
