import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RECRUITMENT_PHASES,
  HERO_PHASE_CONTENT,
  type RecruitmentPhase,
  PHASE_SCHEDULE,
} from '../../constants/heroSection';
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

  // 서버 시간과 로컬 시간의 오차 (ms 단위)
  const [timeOffset, setTimeOffset] = useState<number>(0);

  /* 시기별 모드 계산 로직 */
  const getModeByDate = useCallback(() => {
    // 로컬 시각에 오차를 더해 '서버 기준 현재 시각' 생성
    const now = Date.now() + timeOffset;

    // KST(+09:00) 기준 타임라인 설정
    const start = Date.parse(PHASE_SCHEDULE.APPLICATION_START);
    const p3Start = Date.parse(PHASE_SCHEDULE.APPLICATION_END);
    const p4Start = Date.parse(PHASE_SCHEDULE.DOCUMENT_RESULT);
    const p5Start = Date.parse(PHASE_SCHEDULE.FINAL_RESULT);
    const p1Start = Date.parse(PHASE_SCHEDULE.TERMINATION);

    if (now < start) return 1;
    // 모집 기간 중: 2번 (서류 접수)
    if (now < p3Start) return 2;
    // 서류 심사 중: 3번 (심사 중)
    if (now < p4Start) return 3;
    // 서류 결과 확인: 4번 (서류 합격 확인)
    if (now < p5Start) return 4;
    // 최종 결과 확인: 5번 (최종 합격 확인)
    if (now < p1Start) return 5;
    // 모든 일정 종료: 1번 (공고/종료)
    return 1;
  }, [timeOffset]);

  const [activeMode, setActiveMode] = useState<number>(() => getModeByDate());

  /* 서버 시간 동기화 (fetch HEAD) */
  useEffect(() => {
    const syncTime = async () => {
      try {
        // 캐시를 피하기 위해 타임스탬프를 쿼리로 붙이고 HEAD 요청
        const response = await fetch(`${window.location.origin}?t=${Date.now()}`, {
          method: 'HEAD',
          cache: 'no-cache',
        });

        const serverDateStr = response.headers.get('date');
        if (serverDateStr) {
          const serverTime = new Date(serverDateStr).getTime();
          const localTime = Date.now();
          // 오차 저장 (서버시간 - 로컬시간)
          setTimeOffset(serverTime - localTime);
        }
      } catch (err) {
        console.error(err);
      }
    };

    syncTime();
  }, []);

  /* 실시간 모드 업데이트 (1초마다) */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMode(getModeByDate());
    }, 1000);
    return () => clearInterval(timer);
  }, [getModeByDate]);

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

  const phase = useMemo(() => getPhaseByMode(activeMode), [activeMode]);
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
