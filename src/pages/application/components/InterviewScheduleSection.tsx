import { INTERVIEW_SCHEDULE, QUESTIONS } from '../constants/index';

interface InterviewScheduleSectionProps {
  selectedSchedule: { [date: string]: string[] };
  onScheduleChange: (date: string, time: string, checked: boolean) => void;
}

const InterviewScheduleSection = ({ selectedSchedule, onScheduleChange }: InterviewScheduleSectionProps) => {
  const question = QUESTIONS[7]; // 8번 질문

  const isChecked = (date: string, time: string) => {
    return selectedSchedule[date]?.includes(time) || false;
  };

  return (
    <section className="flex flex-col gap-4">
      <label className="text-[0.875rem] leading-[160%] font-medium text-[#1B2634] md:text-[1rem]">
        {question.number}. {question.question}
      </label>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse">
          <thead>
            <tr>
              <th className="border border-[#E0E0E0] bg-[#F7FAFF] px-2 py-3 text-[0.75rem] font-medium text-[#1B2634] md:px-4 md:text-[0.875rem]">
                시간
              </th>
              {INTERVIEW_SCHEDULE.map((schedule) => (
                <th
                  key={schedule.date}
                  className="border border-[#E0E0E0] bg-[#F7FAFF] px-2 py-3 text-[0.75rem] font-medium text-[#1B2634] md:px-4 md:text-[0.875rem]">
                  {schedule.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INTERVIEW_SCHEDULE[0].times.map((time) => (
              <tr key={time}>
                <td className="border border-[#E0E0E0] bg-[#F7FAFF] px-2 py-3 text-center text-[0.75rem] text-[#1B2634] md:px-4 md:text-[0.875rem]">
                  {time}
                </td>
                {INTERVIEW_SCHEDULE.map((schedule) => (
                  <td key={`${schedule.date}-${time}`} className="border border-[#E0E0E0] px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked(schedule.date, time)}
                      onChange={(e) => onScheduleChange(schedule.date, time, e.target.checked)}
                      className="h-4 w-4 accent-[#4284FF]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InterviewScheduleSection;
