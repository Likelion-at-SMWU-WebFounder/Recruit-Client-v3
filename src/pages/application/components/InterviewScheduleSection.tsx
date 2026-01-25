import { useState, type TouchEvent } from 'react';
import { INTERVIEW_SCHEDULE, QUESTIONS, INTERVIEW_ERRORS } from '../constants/index';
import type { SelectedSchedule } from '../types/index';
import CheckMark from './icon/CheckMark';

interface InterviewScheduleSectionProps {
  selectedSchedule: SelectedSchedule;
  onScheduleChange: (date: string, time: string, checked: boolean) => void;
  isSubmitted: boolean;
}

const InterviewScheduleSection = ({
  selectedSchedule,
  onScheduleChange,
  isSubmitted,
}: InterviewScheduleSectionProps) => {
  const question = QUESTIONS[7];
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // 모바일 슬라이드 동작
  const handleTouchStart = (e: TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50 && activeIndex < INTERVIEW_SCHEDULE.length - 1) setActiveIndex(activeIndex + 1);
    if (diff < -50 && activeIndex > 0) setActiveIndex(activeIndex - 1);
    setTouchStart(null);
  };

  // 유효성 검증 로직
  const isInterviewValid = Object.values(selectedSchedule).some((times) => times.length > 0);
  const hasError = isSubmitted && !isInterviewValid;
  const errorMessage = INTERVIEW_ERRORS.empty;

  const isChecked = (date: string, time: string) => {
    return selectedSchedule[date]?.includes(time) || false;
  };

  return (
    <section className="flex w-full flex-col items-center gap-[1.375rem] self-stretch px-4 md:px-0">
      {/* 1. 질문 헤더 */}
      <div className="flex w-full items-start gap-[0.8125rem] md:w-[52.75rem] lg:w-[90.0625rem]">
        <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
          {question.number}.
        </span>
        <div className="flex flex-col items-start md:flex-row md:flex-wrap md:items-center">
          <div className="flex items-center gap-[0.25rem] md:gap-[0.5rem]">
            <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
              {question.question}
            </label>
            <span className="text-[1rem] font-bold text-[var(--color-blue)] md:text-[1.25rem] lg:text-[1.5rem]">*</span>
          </div>
          {hasError && (
            <span className="mt-[0.4rem] text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:mt-0 md:ml-[1.25rem] md:text-[1rem] lg:text-[1.25rem]">
              {errorMessage}
            </span>
          )}
        </div>
      </div>

      {/* 2. [모바일] 일정 박스 및 캐러셀 */}
      <div className="flex flex-col items-start gap-[1.75rem] md:hidden">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex h-[17.0625rem] w-[19.375rem] flex-col rounded-[0.875rem] border-2 border-[rgba(27,38,52,0.65)] bg-[var(--color-white)] px-[2.8125rem] py-[1.875rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] transition-all">
          <div className="mb-[1.25rem] flex w-full justify-end">
            <span className="text-[1.25rem] font-semibold text-[var(--color-navyblack)]">
              {INTERVIEW_SCHEDULE[activeIndex].date}
            </span>
          </div>
          <div className="flex flex-col gap-[0.75rem]">
            {INTERVIEW_SCHEDULE[activeIndex].times.map((time) => {
              const checked = isChecked(INTERVIEW_SCHEDULE[activeIndex].date, time);
              return (
                <div key={time} className="flex items-center justify-between self-stretch">
                  <span className="text-[1rem] font-medium text-[var(--color-navyblack)]">{time}</span>
                  <div
                    onClick={() => onScheduleChange(INTERVIEW_SCHEDULE[activeIndex].date, time, !checked)}
                    className={`relative flex aspect-square w-[2.125rem] cursor-pointer items-center justify-center rounded-[0.5rem] border-2 transition-all ${
                      checked
                        ? 'border-[var(--color-navyblack)] bg-[var(--color-white)] drop-shadow-[1px_1px_8.4px_rgba(27,38,52,0.10)]'
                        : hasError
                          ? 'border-[rgba(255,36,36,0.80)] bg-white'
                          : 'border-[rgba(27,38,52,0.65)] bg-[var(--color-white)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
                    }`}>
                    {checked && <CheckMark />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-[2.25rem] w-[19.375rem] items-center justify-center gap-[0.5rem]">
          {INTERVIEW_SCHEDULE.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer focus:outline-none">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle
                  cx="4"
                  cy="4"
                  r="4"
                  fill={index === activeIndex ? 'var(--color-blue)' : 'var(--color-navyblack)'}
                  fillOpacity={index === activeIndex ? '1' : '0.4'}
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 3. [태블릿/랩탑] 그리드 */}
      <div className="hidden w-full flex-col rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[var(--color-white)] px-[1rem] py-[1.5rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:flex md:w-[52.75rem] md:items-start md:px-[4.125rem] md:py-[2.5rem] lg:w-[90.0625rem] lg:items-center lg:justify-center lg:px-[5.25rem] lg:py-[2.5rem]">
        <div className="flex w-full flex-col gap-[2rem] md:gap-[3rem] lg:gap-[1.8rem]">
          <div className="flex items-end justify-between self-stretch">
            <div className="w-[6rem] shrink-0 md:w-[7rem] lg:w-[10.5rem]" />
            {INTERVIEW_SCHEDULE.map((schedule) => (
              <div key={schedule.date} className="flex w-[2.9375rem] shrink-0 items-center justify-center">
                <span className="text-[1.125rem] font-semibold whitespace-nowrap text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[1.875rem]">
                  {schedule.date}
                </span>
              </div>
            ))}
          </div>
          {INTERVIEW_SCHEDULE[0].times.map((time) => (
            <div key={time} className="flex items-center justify-between self-stretch">
              <div className="flex w-[6rem] shrink-0 items-center text-[1rem] font-medium text-[var(--color-navyblack)] md:w-[7rem] md:text-[1.5rem] lg:h-[2.9375rem] lg:w-[10.5rem] lg:text-[1.875rem]">
                {time}
              </div>
              {INTERVIEW_SCHEDULE.map((schedule) => {
                const checked = isChecked(schedule.date, time);
                return (
                  <div
                    key={`${schedule.date}-${time}`}
                    className="flex w-[2.9375rem] shrink-0 items-center justify-center">
                    <div
                      onClick={() => onScheduleChange(schedule.date, time, !checked)}
                      className={`flex aspect-square h-[2.9375rem] w-[2.9375rem] cursor-pointer items-center justify-center rounded-[1rem] border-2 transition-all ${
                        checked
                          ? 'border-[var(--color-navyblack)] bg-[var(--color-white)] drop-shadow-[1px_1px_8.4px_rgba(27,38,52,0.10)]'
                          : hasError
                            ? 'border-[rgba(255,36,36,0.80)] bg-white'
                            : 'border-[rgba(27,38,52,0.65)] bg-[var(--color-white)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
                      }`}>
                      {checked && <CheckMark />}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterviewScheduleSection;
