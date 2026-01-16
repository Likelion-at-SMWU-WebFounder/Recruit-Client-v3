import { useState } from 'react';

interface InfoDropdownProps {
  label: string;
  required?: boolean;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const InfoDropdown = ({ label, required, value, options, onChange }: InfoDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-[1rem] md:w-[24.75rem] md:gap-[1.375rem] lg:w-[40.3125rem]">
      <div className="flex items-end gap-[0.5rem] self-stretch md:gap-[0.8125rem]">
        <span className="text-[1.25rem] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">{label}</span>
        {required && <span className="text-[1rem] font-bold text-[#4284FF] md:text-[1.25rem] lg:text-[1.5rem]">*</span>}
      </div>

      <div className="relative w-full">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="/* Mobile Layout */ /* Tablet Layout */ /* Laptop Layout */ flex h-[2.5rem] w-full cursor-pointer items-center justify-between rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] pt-[0.6875rem] pr-[1.0625rem] pb-[0.625rem] pl-[0.875rem] shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] md:h-[3.625rem] md:pt-[1rem] md:pr-[1.51225rem] md:pb-[1rem] md:pl-[1.5rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem]">
          <span
            className={`font-medium ${value ? 'text-[#1B2634]' : 'text-[rgba(27,38,52,0.45)]'} text-[1rem] md:text-[1.25rem] lg:text-[1.75rem]`}>
            {value || '선택'}
          </span>
          <svg
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} /* 기본(모바일): 24px */ /* 태블릿(md) 이상: 32px */ h-6 w-6 md:h-8 md:w-8`}
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M7 10L12 15L17 10"
              stroke="#1B2634"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-[3rem] z-20 w-full overflow-hidden rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-white shadow-lg md:top-[4rem] lg:top-[4.5rem]">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="flex h-[2.5rem] cursor-pointer items-center border-b border-[rgba(27,38,52,0.1)] px-[1.375rem] text-[1rem] font-medium text-[#1B2634] last:border-none hover:bg-[#F7FAFF] md:h-[3.625rem] md:text-[1.25rem] lg:h-[4.1875rem] lg:text-[1.75rem]">
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoDropdown;
