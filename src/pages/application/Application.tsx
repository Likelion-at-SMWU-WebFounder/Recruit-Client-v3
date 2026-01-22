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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-white px-4 md:px-8">
      <main className="w-full lg:max-w-[120rem]">
        {/* 페이지 타이틀 섹션 */}
        <div className="mx-auto mt-[5rem] mb-[4rem] flex flex-col items-center justify-center gap-[1.5625rem] md:mt-[10rem] md:mb-[8rem] lg:mt-[22.75rem] lg:mb-[19.25rem] lg:max-w-[50.4rem]">
          <h1 className="head1-sb-42 text-navyblack text-center text-[1.5rem] leading-[140%] break-keep md:text-[2rem] lg:text-[2.625rem] lg:whitespace-nowrap">
            {PAGE_TITLE}
          </h1>
          <p className="text-blue text-center text-[0.875rem] leading-[140%] font-semibold uppercase md:text-[1.125rem] lg:text-[1.25rem] lg:whitespace-nowrap">
            {PAGE_SUBTITLE}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full flex-col items-center justify-center self-stretch pb-[10rem] lg:max-w-[98.2rem]">
          <div className="flex w-full flex-col items-center gap-[11.4375rem]">
            {/* 지원자 정보 */}
            <ApplicantInfoSection data={formData.applicantInfo} onChange={updateApplicantInfo} />
            {/* 지원 파트 */}
            <PartSelectionSection
              selectedPart={formData.part}
              onPartChange={updatePart}
              programmersCompleted={formData.programmersCompleted}
              onProgrammersChange={updateProgrammersCompleted}
            />
            {/* 질문 답변 */}
            <QuestionSection answers={formData.answers} onAnswerChange={updateAnswer} />

            {/* 면접 일정 */}
            <InterviewScheduleSection
              selectedSchedule={formData.interviewSchedule}
              onScheduleChange={updateInterviewSchedule}
            />

            {/* 정보 수집 동의 */}
            <AgreementSection agreements={formData.agreements} onAgreementChange={updateAgreement} />

            {/* 비밀번호 설정 */}
            <VerificationSection
              password={formData.password}
              passwordConfirm={formData.passwordConfirm}
              onPasswordChange={updatePassword}
              onPasswordConfirmChange={updatePasswordConfirm}
            />
          </div>
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
