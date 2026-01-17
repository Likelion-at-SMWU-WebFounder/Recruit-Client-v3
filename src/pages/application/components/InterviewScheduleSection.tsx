import { INTERVIEW_SCHEDULE, QUESTIONS } from '../constants/index';

interface InterviewScheduleSectionProps {
  selectedSchedule: { [date: string]: string[] };
  onScheduleChange: (date: string, time: string, checked: boolean) => void;
}

const InterviewScheduleSection = ({ selectedSchedule, onScheduleChange }: InterviewScheduleSectionProps) => {
  const question = QUESTIONS[7]; // 8번 질문 데이터

  const isChecked = (date: string, time: string) => {
    return selectedSchedule[date]?.includes(time) || false;
  };

  return (
    <section className="flex w-full flex-col items-center gap-[1.375rem] self-stretch px-4 md:px-0">
      {/* 1. [박스 밖] 질문 헤더 영역: 내어쓰기 구조 유지 */}
      <div className="flex w-full items-start gap-[0.8125rem] md:w-[52.75rem] lg:w-[90.0625rem]">
        <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
          {question.number}.
        </span>
        <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
          {question.question}
          <span className="ml-[0.25rem] font-bold text-[#4284FF]">*</span>
        </label>
      </div>

      {/* 2. [표 영역 박스] 
          - Laptop(lg): w-[90.0625rem], px-[5.25rem]
          - Tablet(md): w-[52.75rem], px-[4.125rem]
      */}
      <div className="flex w-full flex-col rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] px-[1rem] py-[1.5rem] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] md:w-[52.75rem] md:px-[4.125rem] md:py-[2.5rem] lg:w-[90.0625rem] lg:px-[5.25rem] lg:py-[2.5rem]">
        {/* 그리드 컨테이너: 행 사이 간격 고정 */}
        <div className="flex w-full flex-col gap-[2rem] md:gap-[3rem] lg:gap-[1.8rem]">
          {/* 헤더 행: justify-between으로 1열과 4열을 양 끝 패딩에 밀착 */}
          <div className="flex items-end justify-between self-stretch">
            {/* 1열: 시간 라벨 영역 고정 너비 (md 7rem / lg 10.5rem) */}
            <div className="w-[6rem] shrink-0 md:w-[7rem] lg:w-[10.5rem]" />

            {/* 2~4열: 요일 텍스트 (각 열이 독립적으로 균등 배치됨) */}
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

          {/* 데이터 행 반복: 시간 열 + 체크박스 열들 */}
          {INTERVIEW_SCHEDULE[0].times.map((time) => (
            <div key={time} className="flex items-center justify-between self-stretch">
              {/* 1열: 시간 데이터 (고정 너비 및 좌측 패딩 밀착) */}
              <div className="flex w-[6rem] shrink-0 flex-col justify-center text-[1rem] leading-normal font-medium text-[#1B2634] md:w-[7rem] md:text-[1.5rem] lg:h-[2.9375rem] lg:w-[10.5rem] lg:text-[1.875rem]">
                {time}
              </div>

              {/* 2~4열: 체크박스 (마지막 열은 우측 패딩 밀착) */}
              {INTERVIEW_SCHEDULE.map((schedule) => (
                <div
                  key={`${schedule.date}-${time}`}
                  className="flex w-[2rem] shrink-0 items-center justify-center md:w-[2.9375rem] lg:w-[2.9375rem]">
                  <div
                    onClick={() => onScheduleChange(schedule.date, time, !isChecked(schedule.date, time))}
                    className={`/* Tablet: Radius 1rem, Shadow 8.4px */ /* Laptop: Radius 0.5rem */ relative flex aspect-square w-[2rem] cursor-pointer items-center justify-center border-2 transition-all md:w-[2.9375rem] md:rounded-[1rem] md:shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] lg:w-[2.9375rem] lg:rounded-[0.5rem] lg:shadow-none ${isChecked(schedule.date, time) ? 'border-[#1B2634] bg-[#F7FAFF]' : 'border-[rgba(27,38,52,0.3)] bg-white'} `}>
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
