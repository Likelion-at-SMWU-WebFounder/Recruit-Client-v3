import SectionHeader from '../SectionHeader';
import InfoInput from './InfoInput';
import InfoDropdown from './InfoDropdown';
import type { ApplicantInfo } from '../../types/index';

interface ApplicantInfoSectionProps {
  data: ApplicantInfo;
  onChange: (field: keyof ApplicantInfo, value: string) => void;
}

const ApplicantInfoSection = ({ data, onChange }: ApplicantInfoSectionProps) => {
  return (
    <section className="flex w-full flex-col items-center gap-[2.1875rem] self-stretch px-4 md:px-0">
      <SectionHeader title="지원자 정보" />
      <div className="flex w-full flex-wrap content-center justify-center gap-y-[3rem] md:w-[52.75rem] md:gap-x-[3.25rem] md:gap-y-[4rem] lg:w-[90.0625rem] lg:gap-x-[8.5625rem] lg:gap-y-[5rem]">
        <InfoInput
          label="이름"
          required
          placeholder="김멋사"
          value={data.name}
          onChange={(val) => onChange('name', val)}
        />
        <InfoInput
          label="학번"
          required
          placeholder="2345678"
          value={data.studentId}
          onChange={(val) => onChange('studentId', val)}
        />

        <InfoInput
          label="전공"
          required
          placeholder="경영학부(본), 인공지능공학부(복)"
          value={data.major}
          onChange={(val) => onChange('major', val)}
          subText="본전공(본), 복수전공(복), 연계전공(연) 등을 모두 입력해주세요."
        />

        <InfoInput
          label="수료 학기"
          required
          placeholder="3"
          value={data.semestersLeft}
          onChange={(val) => onChange('semestersLeft', val)}
          subText="종강한 학기를 기준으로 수료 학기를 입력해주세요."
        />

        <InfoDropdown
          label="재/휴학여부"
          required
          value={data.verificationCode}
          options={[
            { label: '재학', value: '재학' },
            { label: '휴학', value: '휴학' },
            { label: '졸업 유예', value: '졸업 유예' },
          ]}
          onChange={(val) => onChange('verificationCode', val)}
        />

        <InfoInput
          label="졸업 예정 연도"
          required
          placeholder="2026년 2월"
          value={data.graduationYear}
          onChange={(val) => onChange('graduationYear', val)}
        />
        <InfoInput
          label="전화번호"
          required
          placeholder="010-1234-5678"
          value={data.phone}
          onChange={(val) => onChange('phone', val)}
        />
        <InfoInput
          label="이메일"
          required
          placeholder="sooklion@gmail.com"
          value={data.email}
          onChange={(val) => onChange('email', val)}
        />
      </div>
    </section>
  );
};

export default ApplicantInfoSection;
