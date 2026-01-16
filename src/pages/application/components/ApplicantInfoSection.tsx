import type { ApplicantInfo } from '../types/index';
import FormInput from './FormInput';
import { SEMESTER_OPTIONS } from '../constants/index';

interface ApplicantInfoSectionProps {
  data: ApplicantInfo;
  onChange: (field: keyof ApplicantInfo, value: string) => void;
}

const ApplicantInfoSection = ({ data, onChange }: ApplicantInfoSectionProps) => {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-[1.125rem] font-semibold text-[#1B2634] md:text-[1.25rem]">지원자 정보</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* 이름 */}
        <FormInput
          label="이름"
          required
          placeholder="김숙명"
          value={data.name}
          onChange={(value) => onChange('name', value)}
        />

        {/* 학번 */}
        <FormInput
          label="학번"
          required
          placeholder="2345678"
          value={data.studentId}
          onChange={(value) => onChange('studentId', value)}
        />

        {/* 전공 */}
        <FormInput
          label="전공"
          required
          placeholder="IT공학전공, 컴퓨터과학전공 등 세부 전공 작성 가능"
          value={data.major}
          onChange={(value) => onChange('major', value)}
        />

        {/* 수료 학기 */}
        <div className="flex flex-col gap-2">
          <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">
            수료 학기<span className="text-[#4284FF]"> *</span>
          </label>
          <select
            value={data.semestersLeft}
            onChange={(e) => onChange('semestersLeft', e.target.value)}
            className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] px-4 py-3 text-[0.875rem] text-[#1B2634] focus:border-[#4284FF] focus:outline-none md:text-[1rem]">
            <option value="">선택</option>
            {SEMESTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 재/휴학여부 */}
        <div className="flex flex-col gap-2">
          <label className="text-[0.875rem] font-medium text-[#1B2634] md:text-[1rem]">
            재/휴학여부<span className="text-[#4284FF]"> *</span>
          </label>
          <select
            value={data.verificationCode}
            onChange={(e) => onChange('verificationCode', e.target.value)}
            className="rounded-[0.5rem] border border-[#E0E0E0] bg-[#F7FAFF] px-4 py-3 text-[0.875rem] text-[#1B2634] focus:border-[#4284FF] focus:outline-none md:text-[1rem]">
            <option value="">선택</option>
            <option value="enrolled">재학</option>
            <option value="leave">휴학</option>
          </select>
        </div>

        {/* 휴대 전화 번호 */}
        <FormInput
          label="휴대 전화 번호"
          required
          type="tel"
          placeholder="010-0000-0000"
          value={data.phone}
          onChange={(value) => onChange('phone', value)}
        />

        {/* 인증번호 */}
        <FormInput
          label="인증번호"
          placeholder="인증번호 입력"
          value={data.verificationCode}
          onChange={(value) => onChange('verificationCode', value)}
        />

        {/* 이메일 */}
        <FormInput
          label="이메일"
          required
          type="email"
          placeholder="sookmyung@gmail.com"
          value={data.email}
          onChange={(value) => onChange('email', value)}
        />
      </div>
    </section>
  );
};

export default ApplicantInfoSection;
