import { useRef, useEffect } from 'react';
import { QUESTIONS, QUESTION_ERRORS } from '../constants/index';

interface QuestionSectionProps {
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
  isSubmitted: boolean;
}

const STYLES = {
  section: 'flex w-full flex-col items-center gap-[1.5rem] md:gap-[2.0625rem] lg:gap-[2.1875rem]',
  container: 'flex w-full flex-col items-start w-full px-[1.06rem] md:px-[0rem] md:w-[52.75rem] lg:w-[89.1875rem]',

  // 헤더 영역
  header: 'flex items-start gap-[0.5rem] md:gap-[0.8125rem]',
  questionNumber:
    'shrink-0 text-[1.125rem] leading-[120%] md:leading-[140%] font-semibold text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem]',
  questionLabelBox: 'flex flex-col items-start',
  questionLabel:
    'text-[1.125rem] leading-[120%] md:leading-[140%] font-semibold break-keep text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem]',
  requiredStar:
    'ml-[0.25rem] text-[1rem] leading-[120%] font-bold text-[var(--color-blue-main)] md:text-[1.375rem] lg:text-[1.5rem]',
  subDescription:
    'lg:mt-[0.5625rem] md:mt-[0.4375rem] mt-[0.375rem] leading-[120%] text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem] leading-[120%]',

  // 입력 필드 공통
  inputWrapper: 'mt-[0.875rem] md:mt-[1.375rem] flex w-full flex-col',
  inputBase: `
    w-full md:rounded-[1rem] rounded-[0.875rem] border-2 bg-[var(--color-white-main)]
    text-[var(--color-navyblack-main)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] transition-all outline-none
    text-[1rem] md:text-[1.375rem] lg:text-[1.75rem]
    font-medium leading-[120%]
    placeholder:text-[rgba(27,38,52,0.45)] break-keep leading-[120%]
  `,

  // 입력 필드 크기 및 상태
  textareaLong:
    'w-full h-[43.7rem] resize-none md:h-[32.9rem] lg:h-[29.9rem] px-[0.875rem] py-[0.6875rem] md:px-[1.5rem] md:py-[1em] lg:px-[1.375rem] lg:py-[1.0625rem]',
  textareaShort:
    'min-h-[3.5em] overflow-hidden md:min-h-[3.625rem] lg:min-h-[4.1875rem] px-[0.875rem] py-[0.45rem] md:px-[1.5rem] md:py-[0.8rem] lg:px-[1.375rem] lg:py-[0.9rem]',
  errorBorder: 'border-[rgba(255,36,36,0.80)]',
  defaultBorder: 'border-[rgba(27,38,52,0.65)] focus:border-[var(--color-blue-main)]',

  // 하단 영역 (에러/글자수)
  footerWrapper:
    'mt-[0.5rem] md:mt-[0.625rem] lg:mt-[0.75rem] flex items-start justify-between min-h-[1.25rem] md:min-h-[1.5rem]',
  errorMessage:
    'text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:text-[1rem] lg:text-[1.25rem] leading-[120%]',
  charCount: 'text-[0.8125rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem] leading-[120%]',
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

  // 8번 항목 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answers]);

  return (
    <section className={STYLES.section}>
      {/* 1번 ~ 7번 문항 (Long Type) */}
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
                className={`${STYLES.inputBase} ${STYLES.textareaLong} ${hasError ? STYLES.errorBorder : STYLES.defaultBorder}`}
              />
              <div className={STYLES.footerWrapper}>
                <div>{hasError && <p className={STYLES.errorMessage}>{errorMessage}</p>}</div>
                <div className={STYLES.charCount}>
                  {Math.min(currentValue.length, question.maxLength || 0)}/{question.maxLength}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 8번 문항 (Short Type) */}
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
                className={`${STYLES.inputBase} ${STYLES.textareaShort} ${hasError ? STYLES.errorBorder : STYLES.defaultBorder}`}
              />
              <div className={STYLES.footerWrapper}>
                {hasError && <p className={STYLES.errorMessage}>{errorMessage}</p>}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default QuestionSection;
