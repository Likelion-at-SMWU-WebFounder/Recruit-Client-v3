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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // [로직] 전체 유효성 검증
    const isApplicantValid = Object.values(formData.applicantInfo).every((v) => v.trim() !== '');
    const isPhoneValid = /^010-\d{3,4}-\d{4}$/.test(formData.applicantInfo.phone);
    const isPartValid = !!formData.part;
    const isQuestionsValid = QUESTIONS.filter((q) => q.required).every((q) => formData.answers[q.id]?.trim() !== '');
    const isInterviewValid = Object.values(formData.interviewSchedule).some((t) => t.length > 0);
    const isAgreementsValid = Object.values(formData.agreements).every((v) => v === true);
    const isPasswordValid = formData.password.length === 4 && formData.password === formData.passwordConfirm;

    if (
      isApplicantValid &&
      isPhoneValid &&
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
    const isSuccess = await submitForm();

    if (isSuccess) {
      // [수정] 바로 닫지 않음. submitStatus가 'success'가 되면서 모달 내용이 자동으로 바뀜
      console.log('제출 성공 - 완료 화면으로 전환');
    } else {
      alert('제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[var(--color-white)] px-4 md:px-8">
      <main className="w-full lg:max-w-[120rem]">
        <header className="mx-auto mt-[5rem] mb-[4rem] flex flex-col items-center gap-[1.5625rem] lg:mt-[22.75rem] lg:mb-[19.25rem]">
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
            <button
              type="submit"
              className="flex cursor-pointer items-center justify-center rounded-[0.75rem] border-[1.5px] border-[var(--color-blue)] bg-white px-[3.3125rem] py-[0.9375rem] text-[1.375rem] font-bold text-[var(--color-blue)] transition-all hover:bg-[var(--color-blue)] hover:text-white">
              제출하기
            </button>
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
  );
};

export default Application;
