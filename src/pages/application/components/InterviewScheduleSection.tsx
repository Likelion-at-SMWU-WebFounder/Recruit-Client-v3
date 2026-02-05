import { useState, type TouchEvent } from 'react';
import { INTERVIEW_SCHEDULE, QUESTIONS, INTERVIEW_ERRORS } from '../constants/index';
import type { SelectedSchedule } from '../types/index';
import CheckMark from './icon/CheckMark';

interface InterviewScheduleSectionProps {
  selectedSchedule: SelectedSchedule;
  onScheduleChange: (date: string, time: string, checked: boolean) => void;
  isSubmitted: boolean;
}

// 스타일 토큰 정의
const STYLES = {
  section:
    'flex w-full flex-col items-center gap-[1.5rem] md:gap-[2.0625rem] lg:gap-[2.1875rem] px-[1.06rem] md:px-[0rem]',

  // 질문 헤더
  headerContainer:
    'flex w-full items-start gap-[0.5rem] md:gap-[0.8125rem] md:w-[52.75rem] lg:w-[90.0625rem] max-md:block',
  questionNumber:
    'max-md:inline md:shrink-0 text-[1.125rem] leading-[120%] md:leading-[140%] font-semibold text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem] max-md:mr-[0.4rem]',
  labelBox: 'max-md:inline flex flex-col items-start md:flex-row md:flex-wrap md:items-center',
  questionLabel:
    'max-md:inline text-[1.125rem] leading-[120%] md:leading-[140%] font-semibold md:break-keep text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem]',
  requiredStar:
    'ml-[0.25rem] text-[1rem] leading-[120%] font-bold text-[var(--color-blue-main)] md:text-[1.375rem] lg:text-[1.5rem]',
  errorMessage:
    'max-md:block max-md:w-full mt-[0.4rem] text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:mt-0 md:ml-[1.25rem] md:text-[1rem] lg:text-[1.25rem] leading-[120%]',

  // 2. [모바일] 캐러셀 스타일
  mobileContainer: 'flex w-full flex-col items-center gap-[0.625rem] md:hidden',
  carouselWrapper: 'w-[19.375rem] overflow-hidden py-2',
  carouselInner: 'flex w-full flex-nowrap transition-transform duration-300 ease-in-out gap-[1rem]',
  carouselCard:
    'flex w-full shrink-0 flex flex-col px-[2.8125rem] py-[1.875rem] rounded-[0.875rem] border-2 border-[rgba(27,38,52,0.65)] bg-[var(--color-white-main)] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)]',
  mobileDateWrapper: 'mb-[1.625rem] flex w-full justify-end',
  mobileDateContainer: 'flex w-[5rem] justify-center',
  mobileDateText: 'text-[1.125rem] font-semibold text-[var(--color-navyblack-main)] leading-[120%]',
  mobileTimeRow: 'flex items-center justify-between self-stretch',
  mobileTimeText: 'text-[1rem] font-medium text-[var(--color-navyblack-main)] leading-[120%]',
  mobileCheckWrapper: 'flex w-[5rem] justify-center',
  mobileCheckBtn:
    'relative flex aspect-square w-[1.75rem] cursor-pointer items-center justify-center rounded-[0.5625rem] border-2 transition-all',

  // 3. 인디케이터
  indicatorWrapper: 'flex h-[2.25rem] w-[19.375rem] items-center justify-center gap-[0.5rem]',

  // 4. [태블릿/랩탑] 그리드 스타일
  gridWrapper:
    'hidden w-full flex-col rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[var(--color-white-main)] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:flex md:w-[52.8125rem] md:items-start md:px-[4.09375rem] md:py-[3.125rem] lg:w-[90.0625rem] lg:items-center lg:justify-center lg:px-[7.96875rem] lg:py-[3.5rem]',
  gridColumnWrapper: 'flex justify-center md:w-[7rem] lg:w-[10rem]',
  gridHeaderRow: 'flex items-end justify-between self-stretch',
  gridDateCol: 'flex flex-1 items-center justify-center',
  gridColumnContainer: 'flex flex-col items-center w-fit',
  gridDateText:
    'font-semibold whitespace-nowrap text-[var(--color-navyblack-main)] md:text-[1.5rem] lg:text-[1.875rem] leading-[120%]',
  gridTimeRow: 'flex items-center justify-between self-stretch',
  gridTimeText:
    'flex w-[6rem] shrink-0 items-center font-medium text-[var(--color-navyblack-main)] md:w-[7rem] md:text-[1.5rem] lg:h-[2.9375rem] lg:w-[10.5rem] lg:text-[1.875rem] leading-[120%]',
  gridCheckBtn:
    'flex aspect-square md:h-[2.9375rem] md:w-[2.9375rem] cursor-pointer items-center justify-center rounded-[1rem] border-2 transition-all',

  // 공통 상태별 체크박스
  checkedBox:
    'border-[var(--color-navyblack-main)] bg-[var(--color-white-main)] drop-shadow-[1px_1px_8.4px_rgba(27,38,52,0.10)]',
  errorBox: 'border-[rgba(255,36,36,0.80)] bg-white',
  defaultBox: 'border-[rgba(27,38,52,0.65)] bg-[var(--color-white-main)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]',
} as const;

const InterviewScheduleSection = ({
  selectedSchedule,
  onScheduleChange,
  isSubmitted,
}: InterviewScheduleSectionProps) => {
  const question = QUESTIONS[8];
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

  const translateValue = activeIndex === 0 ? 'translateX(0px)' : `translateX(calc(-${activeIndex} * (100% + 1rem)))`;

  const isInterviewValid = Object.values(selectedSchedule).some((times) => times.length > 0);
  const hasError = isSubmitted && !isInterviewValid;
  const errorMessage = INTERVIEW_ERRORS.empty;

  const isChecked = (date: string, time: string) => selectedSchedule[date]?.includes(time) || false;

  // 체크박스 상태 스타일 헬퍼
  const getBoxStyle = (checked: boolean) => {
    if (checked) return STYLES.checkedBox;
    return hasError ? STYLES.errorBox : STYLES.defaultBox;
  };

  return (
    <section className={STYLES.section}>
      {/* 1. 질문 헤더 */}
      <div className={STYLES.headerContainer}>
        <span className={STYLES.questionNumber}>{question.number}.</span>
        <div className={STYLES.labelBox}>
          <label className={STYLES.questionLabel}>
            {question.question}
            <span className={STYLES.requiredStar}>*</span>
          </label>
          {hasError && <span className={STYLES.errorMessage}>{errorMessage}</span>}
        </div>
      </div>

      <div className={STYLES.mobileContainer}>
        <div className={STYLES.carouselWrapper}>
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ transform: translateValue }}
            className={STYLES.carouselInner}>
            {INTERVIEW_SCHEDULE.map((schedule) => (
              <div key={schedule.date} className={STYLES.carouselCard}>
                <div className={STYLES.mobileDateWrapper}>
                  <div className={STYLES.mobileDateContainer}>
                    <span className={`${STYLES.mobileDateText}`}>{schedule.date}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[1.125rem]">
                  {schedule.times.map((time) => {
                    const checked = isChecked(schedule.date, time);
                    return (
                      <div key={time} className={STYLES.mobileTimeRow}>
                        <span className={STYLES.mobileTimeText}>{time}</span>
                        <div className={STYLES.mobileCheckWrapper}>
                          <div
                            onClick={() => onScheduleChange(schedule.date, time, !checked)}
                            className={`${STYLES.mobileCheckBtn} ${getBoxStyle(checked)}`}>
                            {checked && <CheckMark />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 인디케이터 */}
        <div className={STYLES.indicatorWrapper}>
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
                  fill={index === activeIndex ? 'var(--color-blue-main)' : 'var(--color-navyblack-main)'}
                  fillOpacity={index === activeIndex ? '1' : '0.4'}
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* [태블릿/랩탑] 그리드 */}
      <div className={STYLES.gridWrapper}>
        <div className="flex w-full flex-col gap-[2rem] md:gap-[3rem] lg:gap-[1.8rem]">
          <div className={STYLES.gridHeaderRow}>
            <div className="shrink-0 text-left md:w-[8rem] lg:w-[11rem]" />
            {INTERVIEW_SCHEDULE.map((schedule) => (
              <div key={schedule.date} className={STYLES.gridColumnWrapper}>
                <span className={STYLES.gridDateText}>{schedule.date}</span>
              </div>
            ))}
          </div>
          {INTERVIEW_SCHEDULE[0].times.map((time) => (
            <div key={time} className={STYLES.gridTimeRow}>
              <div className={`${STYLES.gridTimeText} md:w-[8rem] lg:w-[11rem]`}>{time}</div>

              {INTERVIEW_SCHEDULE.map((schedule) => {
                const checked = isChecked(schedule.date, time);
                return (
                  <div key={`${schedule.date}-${time}`} className={STYLES.gridColumnWrapper}>
                    <div
                      onClick={() => onScheduleChange(schedule.date, time, !checked)}
                      className={`${STYLES.gridCheckBtn} ${getBoxStyle(checked)}`}>
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
