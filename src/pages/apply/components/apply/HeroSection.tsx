import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RECRUITMENT_PHASES, HERO_PHASE_CONTENT, type RecruitmentPhase } from '../../constants/heroSection';
import ReusableBackground from '../background/ReusableBackground';
import DefaultButton from '@/shared/components/button/DefaultButton';
import '../../styles/HomeSection.css';

const CURRENT_MODE = 2;

/* QA용: 배포 전 false로 바꾸거나 코드 제거 */
const QA_DEBUG_MODE = true;

// 스타일 토큰
const TW = {
  bg: {
    wrapperHeight: 'h-[53.25rem] md:h-[85.375rem] lg:h-[67.5rem]',
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

  /** QA 패널 스타일 */
  qa: {
    panel: 'fixed right-3 top-3 z-[9999] rounded-lg border border-white/15 bg-black/60 p-3 backdrop-blur-md',
    title: 'mb-2 text-xs font-semibold text-white/90',
    grid: 'grid grid-cols-5 gap-2',
    btnBase: 'h-8 rounded-md px-2 text-xs font-semibold transition active:scale-[0.98] border',
    btnActive: 'bg-white text-black border-white',
    btnIdle: 'bg-white/10 text-white border-white/20 hover:bg-white/15',
    label: 'mt-2 text-[11px] text-white/70',
  },
} as const;

const HeroSection = () => {
  const navigate = useNavigate();

  /** QA용 임시 모드 상태 */
  const [qaMode, setQaMode] = useState<number>(CURRENT_MODE);

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

  /* 현재 모드: QA 패널 ON이면 qaMode, 아니면 CURRENT_MODE */
  const activeMode = QA_DEBUG_MODE ? qaMode : CURRENT_MODE;

  const phase = useMemo(() => getPhaseByMode(activeMode), [activeMode]);
  const currentContent = HERO_PHASE_CONTENT[phase];

  const handleApplyClick = () => {
    if (currentContent.PATH) {
      navigate(currentContent.PATH);
    }
  };

  return (
    <>
      {QA_DEBUG_MODE && (
        <div className={TW.qa.panel}>
          <p className={TW.qa.title}>QA: Hero 임시 모드</p>

          <div className={TW.qa.grid}>
            {[1, 2, 3, 4, 5].map((m) => {
              const isActive = qaMode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setQaMode(m)}
                  className={`${TW.qa.btnBase} ${isActive ? TW.qa.btnActive : TW.qa.btnIdle}`}
                  aria-pressed={isActive}>
                  {m}
                </button>
              );
            })}
          </div>

          <p className={TW.qa.label}>현재 모드: {qaMode}</p>
        </div>
      )}

      <ReusableBackground className={TW.bg.wrapperHeight} isAnimated={true}>
        <div className={TW.layout.outer}>
          <div className={TW.layout.inner}>
            <h1 className={TW.typo.title}>{currentContent.TITLE}</h1>

            <div className={TW.layout.descGroup}>
              <p className={TW.typo.desc}>{currentContent.DESCRIPTION}</p>
              {currentContent.APPLY_PERIOD && <p className={TW.typo.desc}>{currentContent.APPLY_PERIOD}</p>}
            </div>
          </div>

          {currentContent.BUTTON_TEXT && (
            <DefaultButton onClick={handleApplyClick} backgroundType="white" border="none" isIcon={true} id="cta-apply">
              {currentContent.BUTTON_TEXT}
            </DefaultButton>
          )}
        </div>
      </ReusableBackground>
    </>
  );
};

export default HeroSection;
