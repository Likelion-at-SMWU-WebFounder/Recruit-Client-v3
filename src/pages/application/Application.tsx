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
import LoadingOverlay from './components/LoadingOverlay';
import Layout from '@/shared/components/Layout';

const TW = {
  /* layout */
  container:
    'flex w-full flex-col items-center overflow-x-hidden bg-[var(--color-white-main)] lg:px-[10.91rem] md:px-[4.44rem] px-[1.53rem]',
  main: 'w-full',

  /* header section */
  header: `
    mx-auto flex flex-col items-center lg:gap-[1.5625rem] md:gap-[1.375rem] gap-[0.75rem]
    mt-[16.4rem] mb-[9.44rem] 
    md:mt-[18.5rem] md:mb-[11.25rem] 
    lg:mt-[22.8rem] lg:mb-[15.94rem]
  `,
  title: 'text-center text-[1.375rem] font-semibold break-keep md:text-[1.875rem] lg:text-[2.625rem] leading-[140%]',
  subTitle:
    'text-center text-[0.875rem] font-semibold text-[var(--color-blue-main)] md:text-[1.125rem] lg:text-[1.25rem] leading-[120%] md:leading-[140%]',

  /* form & section layout */
  form: 'mx-auto flex w-full flex-col items-center lg:pb-[6.56rem] md:pb-[2.81rem] pb-[10.875rem]',
  sectionList: 'flex w-full flex-col gap-[6.25rem] md:gap-[8.75rem] lg:gap-[11.4375rem]',

  /* footer / submit button area */
  submitWrapper: 'lg:mt-[10.75rem] md:mt-[6.5625rem] mt-[4.5625rem]',
} as const;

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

  const applicantRef = useRef<HTMLDivElement>(null);
  const partRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const interviewRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);
  const verificationRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programmersFile, setProgrammersFile] = useState<File | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isApplicantValid = Object.values(formData.applicantInfo).every((v) => v.trim() !== '');
    const numberOnlyRegex = /^\d+$/;
    const isStudentIdFormatValid = numberOnlyRegex.test(formData.applicantInfo.studentId);
    const isSemestersFormatValid = numberOnlyRegex.test(formData.applicantInfo.semestersLeft);
    const isPhoneValid = /^010-\d{3,4}-\d{4}$/.test(formData.applicantInfo.phone);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.applicantInfo.email);
    const isPartValid = !!formData.part;
    const isQuestionsValid = QUESTIONS.filter((q) => q.required).every((q) => formData.answers[q.id]?.trim() !== '');
    const isInterviewValid = Object.values(formData.interviewSchedule).some((t) => t.length > 0);
    const isAgreementsValid = Object.values(formData.agreements).every((v) => v === true);
    const isPasswordValid = formData.password.length === 4 && formData.password === formData.passwordConfirm;

    if (
      isApplicantValid &&
      isStudentIdFormatValid &&
      isSemestersFormatValid &&
      isPhoneValid &&
      isEmailValid &&
      isPartValid &&
      isQuestionsValid &&
      isInterviewValid &&
      isAgreementsValid &&
      isPasswordValid
    ) {
      setIsSubmitted(false);
      setIsModalOpen(true);
    } else {
      setIsSubmitted(true);

      let errorSectionRef: React.RefObject<HTMLDivElement | null> | null = null;

      if (!isApplicantValid || !isStudentIdFormatValid || !isSemestersFormatValid || !isPhoneValid || !isEmailValid) {
        errorSectionRef = applicantRef;
      } else if (!isPartValid) {
        errorSectionRef = partRef;
      } else if (!isQuestionsValid) {
        errorSectionRef = questionsRef;
      } else if (!isInterviewValid) {
        errorSectionRef = interviewRef;
      } else if (!isAgreementsValid) {
        errorSectionRef = agreementRef;
      } else if (!isPasswordValid) {
        errorSectionRef = verificationRef;
      }

      if (errorSectionRef && errorSectionRef.current) {
        const element = errorSectionRef.current;
        const offset = 80;

        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
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
    await submitForm(programmersFile);
  };

  // ===== GTM 이탈 감지 로직 =====
  const hasStartedRef = useRef(false);
  const submitStatusRef = useRef(submitStatus);
  const hasSentAbandonRef = useRef(false);

  useEffect(() => {
    submitStatusRef.current = submitStatus;

    if (submitStatus === 'success') {
      hasStartedRef.current = false;
      hasSentAbandonRef.current = false;
    }
  }, [submitStatus]);

  useEffect(() => {
    const isAnyFieldFilled =
      Object.values(formData.applicantInfo).some((v) => v.trim() !== '') ||
      Object.values(formData.answers).some((v) => v.trim() !== '') ||
      formData.part !== null;

    if (isAnyFieldFilled && !hasStartedRef.current) {
      hasStartedRef.current = true;
    }
  }, [formData]);

  useEffect(() => {
    const sendAbandonEvent = (reason: string) => {
      if (hasSentAbandonRef.current) return;

      if (hasStartedRef.current && submitStatusRef.current !== 'success') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'application_abandon',
          page_path: window.location.pathname,
        });
        hasSentAbandonRef.current = true;
        console.log(`[GTM 이탈 기록] 사유: ${reason}`);
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
      sendAbandonEvent('unmount');
    };
  }, []);
  // =========================================

  return (
    <Layout menuMode="light" footerMode="light">
      {submitStatus === 'loading' && <LoadingOverlay />}
      <div className={TW.container}>
        <main className={TW.main}>
          {/* 헤더 섹션 */}
          <header className={TW.header}>
            <h1 className={TW.title}>{PAGE_TITLE}</h1>
            <p className={TW.subTitle}>{PAGE_SUBTITLE}</p>
          </header>

          <form id="application-form" onSubmit={handleSubmit} className={TW.form}>
            {/* 개별 섹션 리스트 */}
            <div className={TW.sectionList}>
              <div ref={applicantRef}>
                <ApplicantInfoSection
                  data={formData.applicantInfo}
                  onChange={updateApplicantInfo}
                  isSubmitted={isSubmitted}
                />
              </div>
              <div className="flex flex-col gap-[2.5rem] md:gap-[4.125rem] lg:gap-[5.625rem]">
                <div ref={partRef}>
                  <PartSelectionSection
                    selectedPart={formData.part}
                    onPartChange={updatePart}
                    programmersCompleted={formData.programmersCompleted}
                    onProgrammersChange={updateProgrammersCompleted}
                    onFileChange={setProgrammersFile}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <div className="flex flex-col gap-[2.375rem] md:gap-[4rem] lg:gap-[5rem]">
                  <div ref={questionsRef}>
                    <QuestionSection
                      answers={formData.answers}
                      onAnswerChange={updateAnswer}
                      isSubmitted={isSubmitted}
                    />
                  </div>
                  <div ref={interviewRef}>
                    <InterviewScheduleSection
                      selectedSchedule={formData.interviewSchedule}
                      onScheduleChange={updateInterviewSchedule}
                      isSubmitted={isSubmitted}
                    />
                  </div>
                </div>
              </div>
              <div ref={agreementRef}>
                <AgreementSection
                  agreements={formData.agreements}
                  onAgreementChange={updateAgreement}
                  isSubmitted={isSubmitted}
                />
              </div>

              <div ref={verificationRef}>
                <VerificationSection
                  password={formData.password}
                  passwordConfirm={formData.passwordConfirm}
                  onPasswordChange={updatePassword}
                  onPasswordConfirmChange={updatePasswordConfirm}
                  isSubmitted={isSubmitted}
                />
              </div>
            </div>

            {/* 제출 버튼 영역 */}
            <div className={TW.submitWrapper}>
              <DefaultButton type="submit" backgroundType="white" isIcon={false} border="solid">
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
