interface InfoInputProps {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  subText?: string;
  errorMessage?: string;
  onChange: (value: string) => void;
}

const InfoInput = ({ label, required, placeholder, value, subText, errorMessage, onChange }: InfoInputProps) => {
  const hasError = !!errorMessage;

  return (
    <div className="flex w-full flex-col items-start gap-[1.375rem] md:w-[24.75rem] lg:w-[40.3125rem]">
      <div className="flex items-end gap-[0.5rem] md:gap-[0.8125rem]">
        <span className="text-[1.25rem] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
          {label}
        </span>
        {required && (
          <span className="text-[1rem] font-bold text-[var(--color-blue)] md:text-[1.25rem] lg:text-[1.5rem]">*</span>
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-[0.75rem]">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-[2.5rem] w-full rounded-[1rem] bg-[var(--color-white)] px-[0.875rem] py-[0.625rem] text-[1rem] font-medium text-[var(--color-navyblack)] transition-all outline-none placeholder:text-[rgba(27,38,52,0.45)] md:h-[3.625rem] md:px-[1.5rem] md:py-[1rem] md:text-[1.25rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem] lg:text-[1.75rem] ${
            hasError
              ? 'border-2 border-[rgba(255,36,36,0.80)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
              : 'border-2 border-[rgba(27,38,52,0.65)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] focus:border-[var(--color-navyblack)]'
          }`}
        />

        {/* 에러 메시지 */}
        {hasError ? (
          <p className="text-[0.8125rem] font-medium text-[rgba(255,36,36,0.80)] md:text-[1rem] lg:text-[1.25rem]">
            {errorMessage}
          </p>
        ) : (
          subText && (
            <p className="text-[0.8125rem] font-medium break-keep text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
              {subText}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default InfoInput;
