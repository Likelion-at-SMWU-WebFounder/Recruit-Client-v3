import SectionHeader from '../SectionHeader';
import InfoInput from './InfoInput';
import InfoDropdown from './InfoDropdown';
import { APPLICANT_ERRORS, APPLICANT_FIELD_CONFIG } from '../../constants/index';
import type { ApplicantInfo } from '../../types/index';

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

    if (fieldId === 'phone') {
      const phoneRegex = /^010-\d{3,4}-\d{4}$/;
      if (!phoneRegex.test(value)) return APPLICANT_ERRORS.phoneFormat;
    }
    return '';
  };

  return (
    <section className="flex w-full flex-col items-center gap-[1.5rem] px-4 md:gap-[1.75rem] md:px-0 lg:gap-[2.1875rem]">
      <SectionHeader title="지원자 정보" />
      <div className="flex w-full flex-wrap justify-center gap-y-[2.5rem] md:w-[52.75rem] md:gap-x-[3.25rem] md:gap-y-[4rem] lg:w-[90.0625rem] lg:gap-x-[8.5625rem] lg:gap-y-[5rem]">
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
