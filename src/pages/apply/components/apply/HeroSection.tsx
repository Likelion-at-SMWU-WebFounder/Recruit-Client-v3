import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import { RECRUITMENT_PHASES, HERO_PHASE_CONTENT, type RecruitmentPhase } from '../../constants/heroSection';
// import { PHASE_SCHEDULE } from '../constants/heroSection';
import ReusableBackground from '../background/ReusableBackground';
import GotoIcon from '../icon/GotoIcon';
import '../../styles/HomeSection.css';

const CURRENT_MODE = 5;

const HeroSection = () => {
  const navigate = useNavigate();

  const getPhaseByMode = (mode: number): RecruitmentPhase => {
    switch (mode) {
      case 1:
        return RECRUITMENT_PHASES.NOTIFICATION;
      case 2:
        return RECRUITMENT_PHASES.APPLICATION;
      case 3:
        return RECRUITMENT_PHASES.DOCUMENT_REVIEWING;
      case 4:
        return RECRUITMENT_PHASES.DOCUMENT_CHECK;
      case 5:
        return RECRUITMENT_PHASES.FINAL_CHECK;
      default:
        return RECRUITMENT_PHASES.NOTIFICATION;
    }
  };

  const phase = getPhaseByMode(CURRENT_MODE);
  const currentContent = HERO_PHASE_CONTENT[phase];

  const handleApplyClick = () => {
    if (currentContent.PATH) {
      navigate(currentContent.PATH);
    }
  };

  /* [실시간 시간 판별 로직]
  const [phase, setPhase] = useState<RecruitmentPhase>(RECRUITMENT_PHASES.NOTIFICATION);

  useEffect(() => {
    const checkPhase = () => {
      const now = new Date();
      const appStart = new Date(PHASE_SCHEDULE.APPLICATION_START);
      const appEnd = new Date(PHASE_SCHEDULE.APPLICATION_END);
      const docResult = new Date(PHASE_SCHEDULE.DOCUMENT_RESULT);
      const finalResult = new Date(PHASE_SCHEDULE.FINAL_RESULT);

      if (now >= finalResult) setPhase(RECRUITMENT_PHASES.FINAL_CHECK);
      else if (now >= docResult) setPhase(RECRUITMENT_PHASES.DOCUMENT_CHECK);
      else if (now >= appEnd) setPhase(RECRUITMENT_PHASES.DOCUMENT_REVIEWING);
      else if (now >= appStart) setPhase(RECRUITMENT_PHASES.APPLICATION);
      else setPhase(RECRUITMENT_PHASES.NOTIFICATION);
    };

    checkPhase();
    const timer = setInterval(checkPhase, 60000);
    return () => clearInterval(timer);
  }, []);
  */

  return (
    <ReusableBackground className="h-[53.25rem] md:h-[85.375rem] lg:h-[67.5rem]" isAnimated={true}>
      <div className="flex flex-col items-center gap-[2.5rem] md:gap-[3.5rem] lg:gap-[4.375rem]">
        <div className="flex flex-col items-center gap-[2rem] md:gap-[3rem] lg:gap-[4.375rem]">
          <h1 className="text-center text-[1.5rem] leading-[140%] font-bold whitespace-pre-line text-[#F7FAFF] md:text-[2.25rem] lg:text-[3.5625rem]">
            {currentContent.TITLE}
          </h1>

          <div className="flex flex-col items-center gap-[0.75rem] md:gap-[1rem] lg:gap-[1.5625rem]">
            <p className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[2rem]">
              {currentContent.DESCRIPTION}
            </p>
            {currentContent.APPLY_PERIOD && (
              <p className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[2rem]">
                {currentContent.APPLY_PERIOD}
              </p>
            )}
          </div>
        </div>

        {currentContent.BUTTON_TEXT && (
          <button
            onClick={handleApplyClick}
            className="flex cursor-pointer items-center justify-center gap-[0.625rem] rounded-[1rem] bg-[#F7FAFF] px-5 py-3 transition-colors hover:bg-[#F7FAFF]/90 md:px-7 md:py-4 lg:px-[1.375rem] lg:py-[0.9375rem]">
            <span className="text-[1.125rem] font-bold text-[#4284FF] md:text-[1.375rem] lg:text-[1.75rem]">
              {currentContent.BUTTON_TEXT}
            </span>
            <GotoIcon className="h-[0.5rem] w-[0.4rem] md:h-[0.7rem] md:w-[0.6rem] lg:h-[0.875rem] lg:w-[0.75rem]" />
          </button>
        )}
      </div>
    </ReusableBackground>
  );
};

export default HeroSection;
