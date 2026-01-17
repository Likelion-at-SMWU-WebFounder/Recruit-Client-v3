import { QUESTIONS } from '../constants/index';

interface QuestionSectionProps {
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
}

const QuestionSection = ({ answers, onAnswerChange }: QuestionSectionProps) => {
  return (
    <section className="flex w-full flex-col items-center gap-[5rem] self-stretch px-4 md:px-0">
      {/* 1번 ~ 6번: 장문형 답변 영역 */}
      {QUESTIONS.slice(0, 6).map((question) => (
        <div key={question.id} className="flex w-full flex-col items-start md:w-[52.75rem] lg:w-[89.1875rem]">
          <div className="flex items-start gap-[0.8125rem]">
            {/* 번호 영역 */}
            <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
              {question.number}.
            </span>

            {/* 질문 텍스트 + 부연 설명 영역 */}
            <div className="flex flex-col items-start">
              <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
                {question.question}
                <span className="ml-[0.25rem] font-bold text-[#4284FF]">*</span>
              </label>

              {/* 2. 질문과 부연 설명 사이*/}
              <p className="mt-[0.5625rem] text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
                공백 포함 600자 이내
              </p>
            </div>
          </div>

          {/* 3. 부연 설명과 입력칸 사이*/}
          <div className="mt-[1.375rem] flex w-full flex-col self-stretch">
            <textarea
              placeholder="답변을 입력해주세요."
              value={answers[question.id] || ''}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length > 600) {
                  onAnswerChange(question.id, inputValue.slice(0, 600));
                } else {
                  onAnswerChange(question.id, inputValue);
                }
              }}
              className="/* 상하좌우 패딩 설정 */ /* [사용자 요청] 기기별 입력칸 높이 사양 적용 */ /* 모바일 (Mobile) */ /* 태블릿 (Tablet) */ /* 랩탑 (Laptop) */ /* 폰트 크기 반응형 */ h-[37rem] w-full resize-none rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] px-[1.375rem] pt-[1.0625rem] pb-[1.0625rem] text-[1.125rem] font-medium text-[#1B2634] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all outline-none placeholder:text-[rgba(27,38,52,0.45)] focus:border-[#4284FF] md:h-[26.375rem] md:text-[1.25rem] lg:h-[24.8125rem] lg:text-[1.75rem]"
            />
            {/* 글자수 표시 */}
            <div className="mt-[0.5rem] self-stretch text-right text-[0.875rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
              {Math.min((answers[question.id] || '').length, 600)}/600
            </div>
          </div>
        </div>
      ))}

      {/* 7번 항목: 단답형 */}
      {QUESTIONS[6] && (
        <div className="flex w-full flex-col items-start md:w-[52.75rem] lg:w-[89.1875rem]">
          <div className="flex items-start gap-[0.8125rem]">
            <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
              7.
            </span>
            <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
              {QUESTIONS[6].question}
            </label>
          </div>

          <div className="mt-[1.375rem] w-full">
            <input
              type="text"
              placeholder="포트폴리오 링크가 외부에서 접근 가능한 상태(Public 등)인지 확인 후 입력해 주세요."
              value={answers[QUESTIONS[6].id] || ''}
              onChange={(e) => onAnswerChange(QUESTIONS[6].id, e.target.value)}
              className="w-full rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] p-[1rem] text-[1rem] font-medium text-[#1B2634] shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] transition-all outline-none placeholder:text-[rgba(27,38,52,0.45)] focus:border-[#4284FF] lg:px-[1.375rem] lg:py-[1.0625rem] lg:text-[1.5rem]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default QuestionSection;
