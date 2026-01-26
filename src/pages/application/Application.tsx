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

  // 1. 상태 추적용 Ref들 (렌더링에 영향을 주지 않으면서 최신 값 유지)
  const hasStartedRef = useRef(false);
  const submitStatusRef = useRef(submitStatus);
  const hasSentAbandonRef = useRef(false);

  // 2. 최신 submitStatus 동기화 및 성공 시 상태 초기화
  useEffect(() => {
    submitStatusRef.current = submitStatus;

    if (submitStatus === 'success') {
      // 성공 시에는 이탈로 간주하지 않도록 모든 플래그 초기화
      hasStartedRef.current = false;
      hasSentAbandonRef.current = false;
    }
  }, [submitStatus]);

  // 3. 입력 시작 감지 (Vite 프로젝트 내 formData 관찰)
  useEffect(() => {
    const isAnyFieldFilled =
      Object.values(formData.applicantInfo).some((v) => v.trim() !== '') ||
      Object.values(formData.answers).some((v) => v.trim() !== '') ||
      formData.part !== null;

    if (isAnyFieldFilled && !hasStartedRef.current) {
      hasStartedRef.current = true;
    }
  }, [formData]);

  // 4. 이탈 감지 및 전송 로직 (중복 및 오발송 방지 최적화)
  useEffect(() => {
    const sendAbandonEvent = (reason: string) => {
      // 이미 전송했거나, 시작도 안 했거나, 성공했다면 즉시 중단
      if (hasSentAbandonRef.current) return;

      if (hasStartedRef.current && submitStatusRef.current !== 'success') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'application_abandon',
          page_path: window.location.pathname,
        });
        hasSentAbandonRef.current = true; // 전송 완료 표시
        console.log(`🚀 [GTM 이탈 기록] 사유: ${reason}`);
      }
    };

    const handleExit = (e: Event) => {
      if (document.visibilityState === 'hidden' || e.type === 'pagehide') {
        sendAbandonEvent(e.type);
      }
    };

    document.addEventListener('visibilitychange', handleExit);
    window.addEventListener('pagehide', handleExit);

    return () => {
      document.removeEventListener('visibilitychange', handleExit);
      window.removeEventListener('pagehide', handleExit);
      // 컴포넌트가 사라질 때(내부 페이지 이동 등) 최종 체크
      sendAbandonEvent('unmount');
    };
  }, []); // 빈 배열로 설정하여 컴포넌트 생명주기 동안 딱 한 번만 리스너 등록

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
