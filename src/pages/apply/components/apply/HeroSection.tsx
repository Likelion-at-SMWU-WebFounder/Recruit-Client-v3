import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RECRUITMENT_PHASES, HERO_PHASE_CONTENT, type RecruitmentPhase } from '../../constants/heroSection';
import { usePhase } from '@/shared/hooks/usePhase';
import ReusableBackground from '../background/ReusableBackground';
import HeroButton from '../button/HeroButton';
import '../../styles/HomeSection.css';

// 스타일 토큰
const TW = {
  bg: {
    wrapperHeight: 'h-[46rem] md:h-[85.375rem] lg:h-[67.5rem] px-[1rem]',
  },
  layout: {
    outer: 'flex flex-col items-center gap-[2.1875rem] md:gap-[4.375rem] lg:gap-[4.375rem]',
    inner: 'flex flex-col items-center gap-[2.1875rem] md:gap-[3rem] lg:gap-[4.375rem]',
    descGroup: 'flex flex-col items-center gap-[0.9375rem] md:gap-[1.5625rem] lg:gap-[1.5625rem]',
  },
  typo: {
    title:
      'text-center font-bold whitespace-pre-line leading-[140%] text-[var(--color-white-main)] text-[1rem] md:text-[2.625rem] lg:text-[3.5625rem]',
    desc: 'text-center font-semibold leading-[140%] text-[var(--color-white-main)] text-[0.875rem] md:text-[1.625rem] lg:text-[2rem]',
  },
} as const;

const HeroSection = () => {
  const navigate = useNavigate();

  const { currentMode } = usePhase();

  // 모드에 맞는 Phase 매핑
  const phase = useMemo((): RecruitmentPhase => {
    switch (currentMode) {
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
  }, [currentMode]);

  const currentContent = HERO_PHASE_CONTENT[phase];

  const handleApplyClick = () => {
    if (currentContent.PATH) {
      navigate(currentContent.PATH);
    }
  };

  return (
    <ReusableBackground className={TW.bg.wrapperHeight} isAnimated={true}>
      <div className={TW.layout.outer}>
        <div className={TW.layout.inner}>
          <h1 className={TW.typo.title}>{currentContent.TITLE}</h1>

          <div className={TW.layout.descGroup}>
            <p className={TW.typo.desc}>{currentContent.DESCRIPTION}</p>
            {currentContent.APPLY_PERIOD && <p className={TW.typo.desc}>{currentContent.APPLY_PERIOD}</p>}
          </div>
        </div>

        {currentContent.BUTTON_TEXT && <HeroButton onClick={handleApplyClick}>{currentContent.BUTTON_TEXT}</HeroButton>}
      </div>
    </ReusableBackground>
  );
};

export default HeroSection;
