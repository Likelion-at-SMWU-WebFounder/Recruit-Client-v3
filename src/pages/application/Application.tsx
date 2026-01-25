import { useState, useEffect, useRef } from 'react';
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

  // GTM 로직
  // 폼 작성 시작 여부를 추적하는 Ref
  const hasStartedRef = useRef(false);

  // 1. 사용자가 어떤 입력이라도 시작했는지 감지
  useEffect(() => {
    const isAnyFieldFilled =
      Object.values(formData.applicantInfo).some((v) => v.trim() !== '') ||
      Object.values(formData.answers).some((v) => v.trim() !== '') ||
      formData.part !== null;

    if (isAnyFieldFilled && !hasStartedRef.current) {
      hasStartedRef.current = true;
    }
  }, [formData]); // formData가 변경될 때마다 체크

  // 2. 페이지 이탈(Abandon) 감지 로직
  useEffect(() => {
    // 이탈 신호를 보내는 공통 함수
    const sendAbandonEvent = () => {
      if (hasStartedRef.current && submitStatus !== 'success') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'application_abandon',
          page_path: window.location.pathname,
        });
        console.log('🚀 [GTM 내부 이탈] 다른 페이지로 이동함');
      }
    };

    // 외부 이탈 감지 (탭 닫기, 최소화 등)
    const handleExit = (e: Event) => {
      if (document.visibilityState === 'hidden' || e.type === 'pagehide') {
        sendAbandonEvent();
      }
    };

    document.addEventListener('visibilitychange', handleExit);
    window.addEventListener('pagehide', handleExit);

    // 내부 이탈 감지 (리액트 라우터 이동 등 컴포넌트가 사라질 때)
    return () => {
      document.removeEventListener('visibilitychange', handleExit);
      window.removeEventListener('pagehide', handleExit);
      sendAbandonEvent();
    };
  }, [submitStatus]); // submitStatus가 success가 아닐 때만 작동하게 함

  // 3. 제출 성공 시 상태 해제 (이탈로 간주하지 않음)
  useEffect(() => {
    if (submitStatus === 'success') {
      hasStartedRef.current = false;
    }
  }, [submitStatus]);

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
            id="application-form"
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
