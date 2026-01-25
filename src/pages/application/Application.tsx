import { useState } from 'react';
import { useApplicationForm } from './hooks/UseApplicationForm';
import ApplicantInfoSection from './components/applicant/ApplicantInfoSection';
import PartSelectionSection from './components/PartSelectionSection';
import QuestionSection from './components/QuestionSection';
import InterviewScheduleSection from './components/InterviewScheduleSection';
import AgreementSection from './components/AgreementSection';
import VerificationSection from './components/VerificationSection';
import SubmitModal from './components/SubmitModal';
import { PAGE_TITLE, PAGE_SUBTITLE, QUESTIONS } from './constants/index';
import DefaultButton from '@/shared/components/button/DefaultButton';
import Layout from '@/shared/components/Layout';

const Application = () => {
  const {
    formData,
    submitStatus,
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitted(true);

    // 전체 유효성 검증
    const isApplicantValid = Object.values(formData.applicantInfo).every((v) => v.trim() !== '');
    const isPhoneValid = /^010-\d{3,4}-\d{4}$/.test(formData.applicantInfo.phone);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.applicantInfo.email);
    const isPartValid = !!formData.part;
    const isQuestionsValid = QUESTIONS.filter((q) => q.required).every((q) => formData.answers[q.id]?.trim() !== '');
    const isInterviewValid = Object.values(formData.interviewSchedule).some((t) => t.length > 0);
    const isAgreementsValid = Object.values(formData.agreements).every((v) => v === true);
    const isPasswordValid = formData.password.length === 4 && formData.password === formData.passwordConfirm;

    if (
      isApplicantValid &&
      isPhoneValid &&
      isEmailValid &&
      isPartValid &&
      isQuestionsValid &&
      isInterviewValid &&
      isAgreementsValid &&
      isPasswordValid
    ) {
      setIsModalOpen(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPartName = (part: string | null) => {
    switch (part) {
      case 'plan-design':
        return '기획·디자인';
      case 'frontend':
        return '프론트엔드';
      case 'backend':
        return '백엔드';
      default:
        return '';
    }
  };

  const handleFinalConfirm = async () => {
    await submitForm();
  };

  return (
    <Layout menuMode="light" footerMode="light">
      <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[var(--color-white)] px-4 md:px-8">
        <main className="w-full lg:max-w-[120rem]">
          <header className="mx-auto mt-[13.38rem] mb-[9.38rem] flex flex-col items-center gap-[1.5625rem] md:mt-[15.87rem] md:mb-[11.87rem] lg:mt-[20.69rem] lg:mb-[16.69rem]">
            <h1 className="text-center text-[1.5rem] font-bold break-keep md:text-[2rem] lg:text-[2.625rem]">
              {PAGE_TITLE}
            </h1>
            <p className="text-center text-[0.875rem] font-semibold text-[var(--color-blue)] uppercase lg:text-[1.25rem]">
              {PAGE_SUBTITLE}
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full flex-col items-center pb-[10rem] lg:max-w-[98.2rem]">
            <div className="flex w-full flex-col gap-[11.4375rem]">
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
                isSubmitted={isSubmitted}
              />
              <QuestionSection answers={formData.answers} onAnswerChange={updateAnswer} isSubmitted={isSubmitted} />
              <InterviewScheduleSection
                selectedSchedule={formData.interviewSchedule}
                onScheduleChange={updateInterviewSchedule}
                isSubmitted={isSubmitted}
              />
              <AgreementSection
                agreements={formData.agreements}
                onAgreementChange={updateAgreement}
                isSubmitted={isSubmitted}
              />
              <VerificationSection
                password={formData.password}
                passwordConfirm={formData.passwordConfirm}
                onPasswordChange={updatePassword}
                onPasswordConfirmChange={updatePasswordConfirm}
                isSubmitted={isSubmitted}
              />
            </div>
            <div className="mt-[10.75rem]">
              <DefaultButton backgroundType="white" isIcon={false} border="solid" onClick={() => handleSubmit()}>
                제출하기
              </DefaultButton>
            </div>
          </form>
        </main>
        <SubmitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleFinalConfirm}
          partName={getPartName(formData.part)}
          submitStatus={submitStatus}
        />
      </div>
    </Layout>
  );
};

export default Application;
