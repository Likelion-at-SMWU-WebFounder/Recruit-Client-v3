import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { PASSWORD_INFO, VERIFICATION_ERRORS } from '../constants/index';
import EyeToggleIcon from './icon/EyeToggleIcon';

interface VerificationSectionProps {
  password: string;
  passwordConfirm: string;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  isSubmitted: boolean;
}

const VerificationSection = ({
  password,
  passwordConfirm,
  onPasswordChange,
  onPasswordConfirmChange,
  isSubmitted,
}: VerificationSectionProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 에러 판별 로직
  const firstError = isSubmitted
    ? !password
      ? VERIFICATION_ERRORS.empty
      : password.length < 4
        ? VERIFICATION_ERRORS.length
        : null
    : null;

  const secondError = isSubmitted && password !== passwordConfirm ? VERIFICATION_ERRORS.mismatch : null;

  const inputContainerStyle = (hasError: boolean) => `
    relative flex items-center w-full h-[3rem] md:w-[18rem] md:h-[3.75rem] lg:w-[21.9375rem] lg:h-[4.25rem]
    rounded-[1rem] border-2 transition-all bg-[#F7FAFF]
    ${
      hasError
        ? 'border-[var(--Color-error-red,rgba(255,36,36,0.80))]'
        : 'border-[rgba(27,38,52,0.65)] focus-within:border-[var(--color-navyblack)]'
    }
    shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)]
  `;

  const inputBaseStyle = `
    h-full w-full bg-transparent px-4 outline-none font-medium text-[var(--color-navyblack)]
    text-[1.125rem] md:text-[1.25rem] lg:text-[1.75rem]
    placeholder:text-[rgba(27,38,52,0.45)] placeholder:font-medium
    placeholder:text-[1.125rem] md:placeholder:text-[1.25rem] lg:placeholder:text-[1.75rem]
  `;

  const errorTextStyle = `mt-[0.5rem] text-[0.8125rem] font-medium text-[var(--Color-error-red,rgba(255,36,36,0.80))] md:text-[1rem] lg:text-[1.25rem] text-right md:text-left`;

  return (
    <section className="mx-auto flex w-full flex-col items-center self-stretch px-4 md:px-0 lg:w-[98.18744rem]">
      <SectionHeader title={PASSWORD_INFO.title} />
      <div className="h-[2.1875rem] shrink-0" />

      <div className="flex w-full flex-col items-center gap-[3rem] md:gap-[4rem] lg:gap-[5rem]">
        {/* 1. 비밀번호 설정 영역 */}
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-start lg:w-[90.0625rem] lg:items-center">
          <label className="text-left text-[1.25rem] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
            {PASSWORD_INFO.label1}
            <span className="ml-[0.39rem] inline-block text-[1.125rem] leading-normal font-bold text-[var(--Color-blue-main,#4284FF)] md:ml-[0.49rem] md:text-[1.3rem] lg:ml-[0.69rem] lg:text-[1.5rem]">
              *
            </span>
          </label>
          <div className="flex w-full flex-col md:w-auto">
            <div className={inputContainerStyle(!!firstError)}>
              <input
                type={showPassword ? 'text' : 'password'}
                maxLength={4}
                placeholder={PASSWORD_INFO.placeholder1}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className={inputBaseStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 cursor-pointer text-[var(--color-navyblack)] opacity-70 transition-opacity hover:opacity-100">
                <EyeToggleIcon isVisible={showPassword} />
              </button>
            </div>
            {firstError && <p className={errorTextStyle}>{firstError}</p>}
          </div>
        </div>

        {/* 2. 비밀번호 확인 영역 */}
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-start lg:w-[90.0625rem] lg:items-center">
          <div className="flex flex-col gap-1 lg:gap-[0.375rem]">
            <label className="text-left text-[1.25rem] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]">
              {PASSWORD_INFO.label2}
              <span className="ml-[0.39rem] inline-block text-[1.125rem] leading-normal font-bold text-[var(--Color-blue-main,#4284FF)] md:ml-[0.49rem] md:text-[1.3rem] lg:ml-[0.69rem] lg:text-[1.5rem]">
                *
              </span>
            </label>
            <p className="text-left text-[0.875rem] font-medium break-keep text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
              {PASSWORD_INFO.subDescription}
            </p>
          </div>
          <div className="flex w-full flex-col md:w-auto">
            <div className={inputContainerStyle(!!secondError)}>
              <input
                type={showConfirm ? 'text' : 'password'}
                maxLength={4}
                placeholder={PASSWORD_INFO.placeholder2}
                value={passwordConfirm}
                onChange={(e) => onPasswordConfirmChange(e.target.value)}
                className={inputBaseStyle}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 cursor-pointer text-[var(--color-navyblack)] opacity-70 transition-opacity hover:opacity-100">
                <EyeToggleIcon isVisible={showConfirm} />
              </button>
            </div>
            {secondError && <p className={errorTextStyle}>{secondError}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
