import { QUESTIONS, QUESTION_ERRORS } from '../constants/index';

interface QuestionSectionProps {
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
  isSubmitted: boolean;
}

const QuestionSection = ({ answers, onAnswerChange, isSubmitted }: QuestionSectionProps) => {
  const inputBaseStyle = `
    w-full rounded-[1rem] border-2 bg-[var(--color-white)] 
    text-[var(--color-navyblack)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all outline-none 
    text-[1rem] md:text-[1.375rem] lg:text-[1.75rem] 
    font-medium leading-normal 
    placeholder:text-[rgba(27, 38, 52, 0.45)]
  `;

  // 에러 메시지 생성 로직
  const getErrorMessage = (question: (typeof QUESTIONS)[0]) => {
    const value = answers[question.id] || '';
    if (question.required && isSubmitted && !value.trim()) {
      return `${question.number}${QUESTION_ERRORS.requiredSuffix}`;
    }
    return '';
  };

  return (
    <section className="flex w-full flex-col items-center gap-[4rem] px-4 md:px-0 lg:gap-[5rem]">
      {/* 1번 ~ 6번 */}
      {QUESTIONS.filter((q) => q.type === 'long').map((question) => {
        const errorMessage = getErrorMessage(question);
        const hasError = !!errorMessage;
        const currentValue = answers[question.id] || '';

        return (
          <div key={question.id} className="flex w-full flex-col items-start md:w-[52.75rem] lg:w-[89.1875rem]">
            {/* 헤더 영역 (번호 + 질문) */}
            <div className="flex items-start gap-[0.8125rem]">
              <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
                {question.number}.
              </span>

              <div className="flex flex-col items-start">
                <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
                  {question.question}
                  {/* 필수 * 표시 */}
                  {question.required && (
                    <span className="ml-[0.25rem] text-[1rem] leading-[140%] font-bold text-[var(--color-blue)] md:text-[1.25rem] lg:text-[1.5rem]">
                      *
                    </span>
                  )}
                </label>
                <p className="mt-[0.5625rem] text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
                  공백 포함 {question.maxLength}자 이내
                </p>
              </div>
            </div>

            {/* 입력 영역 */}
            <div className="mt-[1.375rem] flex w-full flex-col">
              <textarea
                placeholder={question.placeholder}
                value={currentValue}
                onChange={(e) => {
                  const val = e.target.value;
                  if (question.maxLength && val.length > question.maxLength) {
                    onAnswerChange(question.id, val.slice(0, question.maxLength));
                  } else {
                    onAnswerChange(question.id, val);
                  }
                }}
                className={`${inputBaseStyle} h-[37rem] resize-none px-[1.375rem] py-[1.0625rem] md:h-[26.375rem] lg:h-[24.8125rem] ${
                  hasError
                    ? 'border-[rgba(255,36,36,0.80)]'
                    : 'border-[rgba(27,38,52,0.65)] focus:border-[var(--color-blue)]'
                }`}
              />

              {/* 하단 정보 (에러 메시지 + 글자수) */}
              <div className="mt-[0.5rem] flex items-start justify-between">
                <div className="min-h-[1.25rem] md:min-h-[1.5rem]">
                  {hasError && (
                    <p className="text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:text-[1rem] lg:text-[1.25rem]">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <div className="text-[0.875rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
                  {Math.min(currentValue.length, question.maxLength || 0)}/{question.maxLength}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 7번 항목 */}
      {(() => {
        const q7 = QUESTIONS.find((q) => q.type === 'short');
        if (!q7) return null;
        const errorMessage = getErrorMessage(q7);
        const hasError = !!errorMessage;

        return (
          <div className="flex w-full flex-col items-start md:w-[52.75rem] lg:w-[89.1875rem]">
            <div className="flex items-start gap-[0.8125rem]">
              <span className="shrink-0 text-[1.25rem] leading-[140%] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
                {q7.number}.
              </span>
              <label className="text-[1.25rem] leading-[140%] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
                {q7.question}
                {q7.required && (
                  <span className="ml-[0.25rem] text-[1rem] leading-[140%] font-bold text-[var(--color-blue)] md:text-[1.25rem] lg:text-[1.5rem]">
                    *
                  </span>
                )}
              </label>
            </div>

            <div className="mt-[1.375rem] flex w-full flex-col gap-[0.5rem]">
              <textarea
                placeholder={q7.placeholder}
                value={answers[q7.id] || ''}
                onChange={(e) => onAnswerChange(q7.id, e.target.value)}
                rows={1}
                className={`${inputBaseStyle} h-auto min-h-[3.5rem] resize-none px-[1rem] py-[0.8rem] md:min-h-[3.75rem] md:py-[0.9rem] lg:min-h-[4.25rem] lg:px-[1.375rem] lg:py-[1.0625rem] ${
                  hasError
                    ? 'border-[rgba(255,36,36,0.80)]'
                    : 'border-[rgba(27,38,52,0.65)] focus:border-[var(--color-blue)]'
                }`}
              />
              {hasError && (
                <p className="text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:text-[1rem] lg:text-[1.25rem]">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default QuestionSection;
