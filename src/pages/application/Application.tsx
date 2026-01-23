import { useState } from 'react';
import { useApplicationForm } from './hooks/UseApplicationForm';
import ApplicantInfoSection from './components/applicant/ApplicantInfoSection';
import PartSelectionSection from './components/PartSelectionSection';
import QuestionSection from './components/QuestionSection';
import InterviewScheduleSection from './components/InterviewScheduleSection';
import AgreementSection from './components/AgreementSection';
import VerificationSection from './components/VerificationSection';
import { PAGE_TITLE, PAGE_SUBTITLE } from './constants/index';

const Application = () => {
  const {
    formData,
    updateApplicantInfo,
    updatePart,
    updateProgrammersCompleted,
    updateAnswer,
    updateInterviewSchedule,
    updateAgreement,
    updatePassword,
    updatePasswordConfirm,
    submitForm,
  } = useApplicationForm();

  // 제출 시도 여부 상태
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // 유효성 검증 로직
    const isApplicantInfoValid = Object.values(formData.applicantInfo).every((val) => val.trim() !== '');
    const isPartValid = !!formData.part;
    const isAgreementsValid = Object.values(formData.agreements).every((val) => val === true);
    const isPasswordValid = formData.password.length === 4 && formData.password === formData.passwordConfirm;

    if (isApplicantInfoValid && isPartValid && isAgreementsValid && isPasswordValid) {
      submitForm();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-white px-4 md:px-8">
      <main className="w-full lg:max-w-[120rem]">
        {/* 타이틀 섹션 */}
        <div className="mx-auto mt-[5rem] mb-[4rem] flex flex-col items-center justify-center gap-[1.5625rem] md:mt-[10rem] md:mb-[8rem] lg:mt-[22.75rem] lg:mb-[19.25rem] lg:max-w-[50.4rem]">
          <h1 className="text-navyblack text-center text-[1.5rem] leading-[140%] font-bold break-keep md:text-[2rem] lg:text-[2.625rem] lg:whitespace-nowrap">
            {PAGE_TITLE}
          </h1>
          <p className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#4284FF] uppercase md:text-[1.125rem] lg:text-[1.25rem] lg:whitespace-nowrap">
            {PAGE_SUBTITLE}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full flex-col items-center justify-center self-stretch pb-[10rem] lg:max-w-[98.2rem]">
          <div className="flex w-full flex-col items-center gap-[11.4375rem]">
            <ApplicantInfoSection
              data={formData.applicantInfo}
              onChange={updateApplicantInfo}
              isSubmitted={isSubmitted}
            />
            <PartSelectionSection
              selectedPart={formData.part}
              onPartChange={updatePart}
              programmersCompleted={formData.programmersCompleted}
              onProgrammersChange={updateProgrammersCompleted}
            />
            <QuestionSection answers={formData.answers} onAnswerChange={updateAnswer} />
            <InterviewScheduleSection
              selectedSchedule={formData.interviewSchedule}
              onScheduleChange={updateInterviewSchedule}
            />
            <AgreementSection agreements={formData.agreements} onAgreementChange={updateAgreement} />
            <VerificationSection
              password={formData.password}
              passwordConfirm={formData.passwordConfirm}
              onPasswordChange={updatePassword}
              onPasswordConfirmChange={updatePasswordConfirm}
            />
          </div>

          {/* 2. 마지막 컴포넌트와 버튼 gap: 10.75rem */}
          <div className="mt-[10.75rem] flex flex-col items-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-[0.625rem] rounded-[0.75rem] border-[1.5px] border-[#4284FF] bg-[#F7FAFF] px-[2rem] py-[0.7rem] text-[1rem] font-bold text-[#4284FF] transition-all duration-300 hover:bg-[#4284FF] hover:text-white md:px-[2.5rem] md:py-[0.8rem] md:text-[1.125rem] lg:rounded-[1rem] lg:px-[3.3125rem] lg:py-[0.9375rem] lg:text-[1.375rem]">
              제출하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Application;
