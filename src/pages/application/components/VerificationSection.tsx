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
  const isMatching = password === passwordConfirm && password.length > 0;
  const showError = passwordConfirm.length > 0 && !isMatching;

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h3 className="text-[1.125rem] font-semibold text-[#1B2634] md:text-[1.25rem]">{PASSWORD_INFO.title}</h3>
        <p className="mt-1 text-[0.75rem] text-[#899099] md:text-[0.875rem]">{PASSWORD_INFO.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* 비밀번호 입력 */}
        <div className="flex flex-col gap-2">
          <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">
            비밀번호를 입력해주세요<span className="text-[#4284FF]"> *</span>
          </label>
          <input
            type="password"
            placeholder={PASSWORD_INFO.placeholder}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] px-4 py-3 text-[0.875rem] text-[#1B2634] placeholder:text-[#899099] focus:border-[#4284FF] focus:outline-none md:text-[1rem]"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-2">
          <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">
            위의 비밀번호를 한 번 더 입력해주세요<span className="text-[#4284FF]"> *</span>
          </label>
          <input
            type="password"
            placeholder={PASSWORD_INFO.confirmPlaceholder}
            value={passwordConfirm}
            onChange={(e) => onPasswordConfirmChange(e.target.value)}
            className={`rounded-[0.5rem] border bg-[#F7FAFF] px-4 py-3 text-[0.875rem] text-[#1B2634] placeholder:text-[#899099] focus:outline-none md:text-[1rem] ${
              showError ? 'border-red-500 focus:border-red-500' : 'border-[#E0E0E0] focus:border-[#4284FF]'
            }`}
          />
          {showError && <span className="text-[0.75rem] text-red-500">비밀번호가 일치하지 않습니다.</span>}
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
