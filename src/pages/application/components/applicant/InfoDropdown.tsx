import { useState } from 'react';

interface InfoDropdownProps {
  label: string;
  required?: boolean;
  value: string;
  options: { label: string; value: string }[];
  errorMessage?: string;
  onChange: (value: string) => void;
}

const InfoDropdown = ({ label, required, value, options, errorMessage, onChange }: InfoDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!errorMessage;
  const filteredOptions = options.filter((opt) => opt.label !== value);

  return (
    <div className="flex w-full flex-col gap-[1rem] md:w-[24.75rem] md:gap-[1.375rem] lg:w-[40.3125rem]">
      <div className="flex items-end gap-[0.5rem] md:gap-[0.8125rem]">
        <span className="text-[1.25rem] font-semibold text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
          {label}
        </span>
        {required && (
          <span className="text-[1rem] font-bold text-[var(--color-blue)] md:text-[1.25rem] lg:text-[1.5rem]">*</span>
        )}
      </div>

      <div className="relative w-full">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-[2.8rem] w-full cursor-pointer items-center justify-between rounded-[1rem] bg-[var(--color-white)] px-[0.875rem] py-[0.625rem] transition-all md:h-[3.625rem] md:px-[1.5rem] md:py-[1rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem] ${
            hasError
              ? 'border-2 border-[rgba(255,36,36,0.80)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
              : 'border-2 border-[rgba(27,38,52,0.65)] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)]'
          }`}>
          <span
            className={`text-[1.125rem] font-medium md:text-[1.375rem] lg:text-[1.75rem] ${
              value ? 'text-[var(--color-navyblack)]' : 'text-[rgba(27,38,52,0.45)]'
            }`}>
            {value || '선택'}
          </span>
          <svg
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} h-6 w-6 md:h-8 md:w-8`}
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M7 10L12 15L17 10"
              stroke={hasError ? 'rgba(255, 36, 36, 0.80)' : 'var(--color-navyblack)'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute top-full z-20 mt-[0.5rem] w-full overflow-hidden rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-white shadow-lg">
            {filteredOptions.map((opt, index) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex h-[2.5rem] cursor-pointer items-center px-[0.875rem] text-[1rem] font-medium text-[var(--color-navyblack)] hover:bg-[var(--color-white)] md:h-[3.625rem] md:px-[1.5rem] md:text-[1.25rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:text-[1.75rem] ${
                  index !== filteredOptions.length - 1 ? 'border-b border-[rgba(27,38,52,0.1)]' : ''
                }`}>
                {opt.label}
              </div>
            ))}
          </div>
        )}
        <div className="mt-[0.75rem] min-h-[1.25rem] md:min-h-[1.5rem]">
          {hasError && (
            <p className="mt-[0.75rem] text-[0.8125rem] font-medium tracking-[-0.0325rem] text-[rgba(255,36,36,0.80)] md:text-[1rem] md:tracking-[-0.02rem] lg:text-[1.25rem] lg:tracking-normal">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoDropdown;
