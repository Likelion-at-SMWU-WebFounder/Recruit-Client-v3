import SectionHeader from './SectionHeader';
import { PASSWORD_INFO } from '../constants/index';

interface VerificationSectionProps {
  password: string;
  passwordConfirm: string;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
}

const VerificationSection = ({
  password,
  passwordConfirm,
  onPasswordChange,
  onPasswordConfirmChange,
}: VerificationSectionProps) => {
  // 입력 필드 공통 스타일
  const inputStyle = `
    flex shrink-0 items-center rounded-[1rem] border-2 border-[rgba(27,38,52,0.65)] bg-[#F7FAFF] 
    shadow-[1px_1px_6.4px_0_rgba(27,38,52,0.10)] transition-all focus:outline-none focus:border-[#1B2634]
    w-full h-[3.5rem] px-4 text-[1.25rem]
    md:w-[18rem] md:h-[4rem] md:text-[1.5rem]
    lg:w-[21.9375rem] lg:h-[4.25rem] lg:p-[1.0625rem_1.375rem] lg:text-[1.75rem]
    placeholder:text-[rgba(27,38,52,0.45)] text-[#1B2634] font-medium
  `;

  return (
    <section className="mx-auto flex w-full flex-col items-center self-stretch px-4 md:px-0 lg:w-[98.18744rem]">
      <SectionHeader title={PASSWORD_INFO.title} />
      <div className="h-[2.1875rem] shrink-0" />
      <div className="flex w-full flex-col items-center gap-[3rem] md:gap-[4rem] lg:gap-[5rem]">
        {/* 첫 번째 항목: 비밀번호 설정 */}
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-start lg:w-[90.0625rem] lg:items-center">
          <label className="font-pretendard flex-1 text-left text-[1.25rem] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
            {PASSWORD_INFO.label1}
            <span className="ml-[0.25rem] text-[#4284FF]">*</span>
          </label>
          <input
            type="password"
            maxLength={4}
            placeholder={PASSWORD_INFO.placeholder1}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* 두 번째 항목: 비밀번호 확인 */}
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-start lg:w-[90.0625rem] lg:items-center">
          <div className="flex flex-1 flex-col gap-1 lg:gap-[0.375rem]">
            <label className="font-pretendard text-left text-[1.25rem] font-semibold text-[#1B2634] md:text-[1.5rem] lg:text-[2rem]">
              {PASSWORD_INFO.label2}
              <span className="ml-[0.25rem] text-[#4284FF]">*</span>
            </label>
            <p className="font-pretendard text-left text-[0.875rem] font-medium text-[rgba(27,38,52,0.65)] md:text-[1rem] lg:text-[1.25rem]">
              {PASSWORD_INFO.subDescription}
            </p>
          </div>
          <input
            type="password"
            maxLength={4}
            placeholder={PASSWORD_INFO.placeholder2}
            value={passwordConfirm}
            onChange={(e) => onPasswordConfirmChange(e.target.value)}
            className={inputStyle}
          />
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
