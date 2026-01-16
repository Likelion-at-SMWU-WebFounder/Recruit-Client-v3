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
          className="mx-auto flex w-full flex-col gap-[3.5rem] pb-[10rem] md:gap-[5.5rem] lg:max-w-[98.2rem] lg:gap-[8rem]">
          <ApplicantInfoSection data={formData.applicantInfo} onChange={updateApplicantInfo} />
          <hr className="border-[#E0E0E0]" />

          <PartSelectionSection
            selectedPart={formData.part}
            onPartChange={updatePart}
            programmersCompleted={formData.programmersCompleted}
            onProgrammersChange={updateProgrammersCompleted}
          />
          <hr className="border-[#E0E0E0]" />

          <QuestionSection answers={formData.answers} onAnswerChange={updateAnswer} />
          <InterviewScheduleSection
            selectedSchedule={formData.interviewSchedule}
            onScheduleChange={updateInterviewSchedule}
          />

          <hr className="border-[#E0E0E0]" />

          <AgreementSection agreements={formData.agreements} onAgreementChange={updateAgreement} />
          <hr className="border-[#E0E0E0]" />

          <VerificationSection
            password={formData.password}
            passwordConfirm={formData.passwordConfirm}
            onPasswordChange={updatePassword}
            onPasswordConfirmChange={updatePasswordConfirm}
          />

          <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              className="bg-blue w-full rounded-[0.5rem] py-4 text-[1rem] font-semibold text-white transition-all hover:opacity-90 md:w-[20rem] md:text-[1.125rem] lg:py-6 lg:text-[1.25rem]">
              제출하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Application;
