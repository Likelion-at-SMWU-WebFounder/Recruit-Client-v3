interface InfoInputProps {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  subText?: string;
  errorMessage?: string;
  onChange: (value: string) => void;
}

// 1. 스타일 토큰 정의
const STYLES = {
  // 전체 컨테이너
  container:
    'flex flex-col gap-[0.875rem] w-full md:w-[24.75rem] md:gap-[1.125rem] lg:w-[40.3125rem] lg:gap-[1.375rem]',

  // 라벨 영역
  labelWrapper: 'flex items-end gap-[0.375rem] md:gap-[0.8125rem]',
  labelDefault:
    'text-[1.125rem] font-semibold text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem] leading-[120%] md:leading-[140%] lg:leading-[120%]',
  requiredStar:
    'text-[1rem] font-bold text-[var(--color-blue-main)] md:text-[1.375rem] lg:text-[1.5rem] leading-[120%]',

  // 입력창 영역
  inputWrapper: 'flex w-full flex-col gap-[0.5rem] md:gap-[0.625rem] lg:gap-[0.75rem]',
  inputBase:
    'h-[2.5rem] w-full rounded-[0.625rem] md:rounded-[1rem] bg-[var(--color-white-main)] px-[0.875rem] py-[0.625rem] text-[1rem] font-medium text-[var(--color-navyblack-main)] transition-all outline-none placeholder:text-[rgba(27,38,52,0.45)] md:h-[3.625rem] md:px-[1.5rem] md:py-[1rem] md:text-[1.375rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem] lg:text-[1.75rem] border-2 shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] leading-[120%]',
  inputNormal: 'border-[rgba(27,38,52,0.65)] focus:border-[var(--color-navyblack-main)]',
  inputError: 'border-[rgba(255,36,36,0.80)]',

  // 하단 메시지 영역 (에러/서브텍스트 공통)
  messageContainer: 'min-h-[1.25rem] md:min-h-[1.5rem]',
  messageBase:
    'text-[0.8125rem] font-medium tracking-[-0.0325rem] md:text-[1rem] md:tracking-[-0.02rem] lg:text-[1.25rem] lg:tracking-normal leading-[120%]',
  messageError: 'text-[rgba(255,36,36,0.80)]',
  messageSub: 'break-keep text-[rgba(27,38,52,0.65)]',
};

const InfoInput = ({ label, required, placeholder, value, subText, errorMessage, onChange }: InfoInputProps) => {
  const hasError = !!errorMessage;

  return (
    <div className={STYLES.container}>
      {/* 라벨 섹션 */}
      <div className={STYLES.labelWrapper}>
        <span className={STYLES.labelDefault}>{label}</span>
        {required && <span className={STYLES.requiredStar}>*</span>}
      </div>

      {/* 입력 섹션 */}
      <div className={STYLES.inputWrapper}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${STYLES.inputBase} ${hasError ? STYLES.inputError : STYLES.inputNormal}`}
        />

        {/* 하단 헬퍼 텍스트 섹션 */}
        <div className={STYLES.messageContainer}>
          {hasError ? (
            <p className={`${STYLES.messageBase} ${STYLES.messageError}`}>{errorMessage}</p>
          ) : (
            subText && <p className={`${STYLES.messageBase} ${STYLES.messageSub}`}>{subText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoInput;
