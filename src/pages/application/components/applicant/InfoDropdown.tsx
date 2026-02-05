import { useState } from 'react';

interface InfoDropdownProps {
  label: string;
  required?: boolean;
  value: string;
  options: { label: string; value: string }[];
  errorMessage?: string;
  onChange: (value: string) => void;
}

// 1. 스타일 토큰 정의
const STYLES = {
  // 레이아웃 컨테이너
  container:
    'group relative flex flex-col gap-[0.875rem] w-[19.375rem] md:w-[24.75rem] md:gap-[1.125rem] lg:w-[40.3125rem] lg:gap-[1.375rem] transition-all duration-300',
  overlay: 'fixed inset-0 z-10 md:hidden bg-[#4D4D4E] opacity-65',

  // 라벨 섹션
  labelWrapper: 'flex items-end gap-[0.375rem] md:gap-[0.8125rem]',
  labelDefault:
    'text-[1.125rem] font-semibold text-[var(--color-navyblack-main)] md:text-[1.625rem] lg:text-[2rem] leading-[120%] md:leading-[140%] lg:leading-[120%]',
  requiredStar:
    'text-[1rem] font-bold text-[var(--color-blue-main)] md:text-[1.375rem] lg:text-[1.5rem] leading-[120%]',

  // 셀렉트 박스 (Trigger)
  triggerBase:
    'relative z-20 flex cursor-pointer items-center justify-between h-[2.5rem] w-full rounded-[0.625rem] md:rounded-[1rem] bg-[var(--color-white-main)] px-[0.875rem] py-[0.625rem] text-[var(--color-navyblack-main)] transition-all outline-none md:h-[3.625rem] md:px-[1.5rem] md:py-[1rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:py-[1.0625rem] border-2 shadow-[1px_1px_8.4px_0_rgba(27,38,52,0.10)] leading-[120%]',
  triggerNormal: 'border-[rgba(27,38,52,0.65)]',
  triggerError: 'border-[rgba(255,36,36,0.80)]',

  // 텍스트 및 아이콘
  valueText: 'text-[1rem] font-medium md:text-[1.375rem] lg:text-[1.75rem]',
  iconWrapper: 'transition-transform duration-300 flex items-center justify-center',
  iconSvg: 'w-[0.63263rem] h-[0.24688rem] md:w-[0.95129rem] md:h-[0.37156rem] lg:w-[1.28125rem] lg:h-[0.5rem]',

  // 드롭다운 메뉴 (List)
  menuWrapper:
    'absolute z-20 w-full overflow-hidden rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[var(--color-white-main)] shadow-lg transition-all duration-300 ease-in-out',

  optionItem:
    'flex h-[3.625rem] cursor-pointer items-center px-[1.5rem] text-[1.125rem] font-medium text-[var(--color-navyblack-main)] transition-colors duration-300 md:text-[1.375rem] lg:h-[4.1875rem] lg:px-[1.375rem] lg:text-[1.75rem] leading-[120%] lg:hover:bg-[rgba(27,38,52,0.05)] active:bg-[rgba(27,38,52,0.1)]',

  // 에러 메시지
  errorContainer: 'mt-[0.75rem] min-h-[1.25rem] md:min-h-[1.5rem]',
  errorText:
    'text-[0.8125rem] font-medium tracking-[-0.0325rem] md:text-[1rem] md:tracking-[-0.02rem] lg:text-[1.25rem] lg:tracking-normal leading-[120%] text-[rgba(255,36,36,0.80)]',
};

const InfoDropdown = ({ label, required, value, options, errorMessage, onChange }: InfoDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!errorMessage;
  const filteredOptions = options.filter((opt) => opt.label !== value);

  // 애니메이션
  const activeClass = isOpen
    ? 'opacity-100 mt-[0.5625rem] visible'
    : 'opacity-0 top-[-20px] invisible lg:group-hover:opacity-100 lg:group-hover:top-full lg:group-hover:mt-[0.5625rem] lg:group-hover:visible';

  const arrowRotate = isOpen ? 'rotate-180' : 'rotate-0 lg:group-hover:rotate-180';

  return (
    <div className={STYLES.container}>
      {/* 모바일 오버레이 */}
      {isOpen && <div className={STYLES.overlay} onClick={() => setIsOpen(false)} />}

      {/* 라벨 섹션 */}
      <div className={STYLES.labelWrapper}>
        <span className={STYLES.labelDefault}>{label}</span>
        {required && <span className={STYLES.requiredStar}>*</span>}
      </div>

      <div className="relative w-full">
        {/* 드롭다운 실행부 */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${STYLES.triggerBase} ${hasError ? STYLES.triggerError : STYLES.triggerNormal}`}>
          <span
            className={`${STYLES.valueText} ${value ? 'text-[var(--color-navyblack-main)]' : 'text-[rgba(27,38,52,0.45)]'}`}>
            {value || '선택'}
          </span>
          <div className={`${STYLES.iconWrapper} ${arrowRotate}`}>
            <svg className={STYLES.iconSvg} viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 1.5L11.5 9.5L22 1.5"
                stroke="var(--color-navyblack-main)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* 옵션 리스트 */}
        <div className={`${STYLES.menuWrapper} ${activeClass}`}>
          {filteredOptions.map((opt, index) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`${STYLES.optionItem} ${index !== filteredOptions.length - 1 ? 'border-b border-[rgba(27,38,52,0.1)]' : ''}`}>
              {opt.label}
            </div>
          ))}
        </div>

        {/* 에러 메시지 섹션 */}
        <div className={STYLES.errorContainer}>{hasError && <p className={STYLES.errorText}>{errorMessage}</p>}</div>
      </div>
    </div>
  );
};

export default InfoDropdown;
