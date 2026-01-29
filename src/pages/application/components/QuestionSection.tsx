import { useRef, useEffect } from 'react';
import { QUESTIONS, QUESTION_ERRORS } from '../constants/index';

interface QuestionSectionProps {
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
  isSubmitted: boolean;
}

/**
 * QuestionSection 스타일 토큰
 */
const STYLES = {
  section: 'flex w-full flex-col items-center gap-[4rem] px-4 md:px-0 lg:gap-[5rem]',
  container: 'flex w-full flex-col items-start md:w-[52.75rem] lg:w-[89.1875rem]',
  header: 'flex items-start gap-[0.8125rem]',
  questionNumber:
    'shrink-0 text-[1.125rem] leading-[140%] font-semibold text-[var(--color-navyblack)] md:text-[1.625rem] lg:text-[2rem]',
  questionLabelBox: 'flex flex-col items-start',
  questionLabel:
    'text-[1.125rem] leading-[140%] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.625rem] lg:text-[2rem]',
  requiredStar:
    'ml-[0.25rem] text-[1rem] leading-[140%] font-bold text-[var(--color-blue)] md:text-[1.25rem] lg:text-[1.5rem]',
  subDescription:
    'mt-[0.5625rem] text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]',
  inputWrapper: 'mt-[1.375rem] flex w-full flex-col',
  inputBase: `
    w-full rounded-[1rem] border-2 bg-[var(--color-white)]
    text-[var(--color-navyblack)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all outline-none
    text-[1.125rem] md:text-[1.375rem] lg:text-[1.75rem]
    font-medium leading-normal
    placeholder:text-[rgba(27, 38, 52, 0.45)]
  `,
  textareaLong: 'h-[37rem] resize-none px-[1.375rem] py-[1.0625rem] md:h-[26.375rem] lg:h-[24.8125rem]',
  textareaShort:
    'min-h-[4.7rem] overflow-hidden px-[0.875rem] py-[0.5625rem] md:min-h-[4rem] md:py-[0.9rem] lg:min-h-[5rem] lg:px-[1.375rem] lg:py-[1.0625rem]',
  errorBorder: 'border-[rgba(255,36,36,0.80)]',
  defaultBorder: 'border-[rgba(27,38,52,0.65)] focus:border-[var(--color-blue)]',
  footerWrapper: 'mt-[0.5rem] flex items-start justify-between',
  errorMessage: 'text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:text-[1rem] lg:text-[1.25rem]',
  charCount: 'text-[0.875rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]',
  errorMinHeight: 'min-h-[1.25rem] md:min-h-[1.5rem]',
} as const;

const QuestionSection = ({ answers, onAnswerChange, isSubmitted }: QuestionSectionProps) => {
  const getErrorMessage = (question: (typeof QUESTIONS)[0]) => {
    const value = answers[question.id] || '';
    if (question.required && isSubmitted && !value.trim()) {
      return QUESTION_ERRORS.requiredSuffix;
    }
    return '';
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answers]);

  return (
    <section className={STYLES.section}>
      {/* 1번 ~ 6번 문항 */}
      {QUESTIONS.filter((q) => q.type === 'long').map((question) => {
        const errorMessage = getErrorMessage(question);
        const hasError = !!errorMessage;
        const currentValue = answers[question.id] || '';

        return (
          <div key={question.id} className={STYLES.container}>
            <div className={STYLES.header}>
              <span className={STYLES.questionNumber}>{question.number}.</span>
              <div className={STYLES.questionLabelBox}>
                <label className={STYLES.questionLabel}>
                  {question.question}
                  {question.required && <span className={STYLES.requiredStar}>*</span>}
                </label>
                <p className={STYLES.subDescription}>공백 포함 {question.maxLength}자 이내</p>
              </div>
            </div>

            <div className={STYLES.inputWrapper}>
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
                className={` ${STYLES.inputBase} ${STYLES.textareaLong} ${hasError ? STYLES.errorBorder : STYLES.defaultBorder} `}
              />
              <div className={STYLES.footerWrapper}>
                <div className={STYLES.errorMinHeight}>
                  {hasError && <p className={STYLES.errorMessage}>{errorMessage}</p>}
                </div>
                <div className={STYLES.charCount}>
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
          <div className={STYLES.container}>
            <div className={STYLES.header}>
              <span className={STYLES.questionNumber}>{q7.number}.</span>
              <label className={STYLES.questionLabel}>
                {q7.question}
                {q7.required && <span className={STYLES.requiredStar}>*</span>}
              </label>
            </div>

            <div className={`${STYLES.inputWrapper} gap-[0.5rem]`}>
              <textarea
                ref={textareaRef}
                placeholder={q7.placeholder}
                value={answers[q7.id] || ''}
                onChange={(e) => onAnswerChange(q7.id, e.target.value)}
                rows={1}
                className={` ${STYLES.inputBase} ${STYLES.textareaShort} ${hasError ? STYLES.errorBorder : STYLES.defaultBorder} `}
              />
              {hasError && <p className={STYLES.errorMessage}>{errorMessage}</p>}
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default QuestionSection;
