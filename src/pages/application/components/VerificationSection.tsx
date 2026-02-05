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

// 스타일 토큰 정의
const STYLES = {
  // 최상위 섹션
  section: 'flex w-full flex-col items-center gap-[1.5rem] md:gap-[2.0625rem] lg:gap-[2.1875rem]',

  // 중앙 컨테이너
  container:
    'flex w-full md:w-[52.75rem] lg:w-[90.0625rem] flex-col items-center gap-[3rem] md:gap-[4rem] lg:gap-[5rem] px-[1.06rem] md:px-0 lg:w-[90.0625rem]',

  // 각 입력행(Row) 레이아웃
  row: 'flex w-full flex-col justify-between gap-4 md:flex-row md:items-start lg:items-center',

  // 텍스트 및 라벨 스타일
  labelGroup: 'flex flex-col gap-1 lg:gap-[0.375rem]',
  label:
    'text-left text-[1.125rem] font-semibold break-keep text-[var(--color-navyblack)] md:text-[1.5rem] lg:text-[2rem]',
  requiredStar:
    'ml-[0.39rem] inline-block text-[1.125rem] leading-normal font-bold text-[var(--Color-blue-main,#4284FF)] md:ml-[0.49rem] md:text-[1.3rem] lg:ml-[0.69rem] lg:text-[1.5rem]',
  subDescription:
    'text-left text-[0.875rem] font-medium break-keep text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]',
  errorText:
    'mt-[0.5rem] text-[0.8125rem] font-medium text-[var(--Color-error-red,rgba(255,36,36,0.80))] md:text-[1rem] lg:text-[1.25rem] text-left',

  // 입력창 관련
  inputWrapper: 'flex w-full flex-col md:w-auto',
  inputContainer: (hasError: boolean) => `
    relative flex items-center w-full h-[2.8rem] md:w-[18rem] md:h-[3.75rem] lg:w-[21.9375rem] lg:h-[4.25rem]
    rounded-[1rem] border-2 transition-all bg-[#F7FAFF]
    ${
      hasError
        ? 'border-[var(--Color-error-red,rgba(255,36,36,0.80))]'
        : 'border-[rgba(27,38,52,0.65)] focus-within:border-[var(--color-navyblack)]'
    }
    shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)]
  `,
  inputBase: `
    h-full w-full bg-transparent px-4 outline-none font-medium text-[var(--color-navyblack)]
    text-[1.125rem] md:text-[1.25rem] lg:text-[1.75rem]
    placeholder:text-[rgba(27,38,52,0.45)] placeholder:font-medium
    placeholder:text-[1.125rem] md:placeholder:text-[1.25rem] lg:placeholder:text-[1.75rem]
  `,
  eyeButton:
    'absolute right-4 cursor-pointer text-[var(--color-navyblack)] opacity-70 transition-opacity hover:opacity-100',
} as const;

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
      : password.length < 4 || !/^\d+$/.test(password)
        ? VERIFICATION_ERRORS.length
        : null
    : null;

  const secondError = isSubmitted && password !== passwordConfirm ? VERIFICATION_ERRORS.mismatch : null;

  return (
    <section className={STYLES.section}>
      <SectionHeader title={PASSWORD_INFO.title} />

      {/* 컨테이너: 내부 Row들의 배치 담당 */}
      <div className={STYLES.container}>
        {/* 1. 비밀번호 설정 영역 */}
        <div className={STYLES.row}>
          <label className={STYLES.label}>
            {PASSWORD_INFO.label1}
            <span className={STYLES.requiredStar}>*</span>
          </label>

          <div className={STYLES.inputWrapper}>
            <div className={STYLES.inputContainer(!!firstError)}>
              <input
                type={showPassword ? 'text' : 'password'}
                maxLength={4}
                placeholder={PASSWORD_INFO.placeholder1}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className={STYLES.inputBase}
              />
              {password.length > 0 && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={STYLES.eyeButton}>
                  <EyeToggleIcon isVisible={showPassword} />
                </button>
              )}
            </div>
            {firstError && <p className={STYLES.errorText}>{firstError}</p>}
          </div>
        </div>

        {/* 2. 비밀번호 확인 영역 */}
        <div className={STYLES.row}>
          <div className={STYLES.labelGroup}>
            <label className={STYLES.label}>
              {PASSWORD_INFO.label2}
              <span className={STYLES.requiredStar}>*</span>
            </label>
            <p className={STYLES.subDescription}>{PASSWORD_INFO.subDescription}</p>
          </div>

          <div className={STYLES.inputWrapper}>
            <div className={STYLES.inputContainer(!!secondError)}>
              <input
                type={showConfirm ? 'text' : 'password'}
                maxLength={4}
                placeholder={PASSWORD_INFO.placeholder2}
                value={passwordConfirm}
                onChange={(e) => onPasswordConfirmChange(e.target.value)}
                className={STYLES.inputBase}
              />
              {passwordConfirm.length > 0 && (
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={STYLES.eyeButton}>
                  <EyeToggleIcon isVisible={showConfirm} />
                </button>
              )}
            </div>
            {secondError && <p className={STYLES.errorText}>{secondError}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
