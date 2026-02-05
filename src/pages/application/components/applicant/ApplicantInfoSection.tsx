import SectionHeader from '../SectionHeader';
import InfoInput from './InfoInput';
import InfoDropdown from './InfoDropdown';
import { APPLICANT_ERRORS, APPLICANT_FIELD_CONFIG } from '../../constants/index';
import type { ApplicantInfo } from '../../types/index';

const STYLES = {
  section: 'flex flex-col w-full items-center gap-[1.5rem] md:gap-[2.0625rem] lg:gap-[2.1875rem] ',
  gridContainer:
    'flex flex-wrap justify-center md:w-[52.75rem] lg:w-[90.0625rem] gap-x-[1rem] gap-y-[2.1875rem] md:gap-x-[3.25rem] md:gap-y-[4rem] lg:gap-x-[8.5625rem] lg:gap-y-[5rem]',
};

interface ApplicantInfoSectionProps {
  data: ApplicantInfo;
  onChange: (field: keyof ApplicantInfo, value: string) => void;
  isSubmitted: boolean;
}

const ApplicantInfoSection = ({ data, onChange, isSubmitted }: ApplicantInfoSectionProps) => {
  const getErrorMessage = (fieldId: keyof ApplicantInfo) => {
    const value = data[fieldId];
    const isEmpty = !value || value.trim() === '';

    if (!isSubmitted) return '';
    if (isEmpty) return APPLICANT_ERRORS[fieldId];

    const numberOnlyRegex = /^\d+$/;

    // 학번 숫자 유효성 검사
    if (fieldId === 'studentId') {
      if (!numberOnlyRegex.test(value)) return APPLICANT_ERRORS.studentIdFormat;
    }

    // 수료 학기 숫자 유효성 검사
    if (fieldId === 'semestersLeft') {
      if (!numberOnlyRegex.test(value)) return APPLICANT_ERRORS.semestersLeftFormat;
    }

    if (fieldId === 'phone') {
      const phoneRegex = /^010-\d{3,4}-\d{4}$/;
      if (!phoneRegex.test(value)) return APPLICANT_ERRORS.phoneFormat;
    }
    if (fieldId === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) return APPLICANT_ERRORS.emailFormat;
    }

    return '';
  };

  return (
    <section className={STYLES.section}>
      <SectionHeader title="지원자 정보" />
      <div className={STYLES.gridContainer}>
        {APPLICANT_FIELD_CONFIG.map((field) => {
          const commonProps = {
            label: field.label,
            required: field.required,
            value: data[field.id],
            onChange: (val: string) => onChange(field.id, val),
            errorMessage: getErrorMessage(field.id),
          };

          if (field.options) {
            return <InfoDropdown key={field.id} {...commonProps} options={field.options} />;
          }

          return (
            <InfoInput key={field.id} {...commonProps} placeholder={field.placeholder || ''} subText={field.subText} />
          );
        })}
      </div>
    </section>
  );
};

export default ApplicantInfoSection;
