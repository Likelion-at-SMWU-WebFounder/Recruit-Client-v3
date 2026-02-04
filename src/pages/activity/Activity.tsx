import { useRef, useState, useEffect } from 'react';
import { combineStyles } from '@shared/utils/combineStyles';
import Layout from '@shared/components/Layout';
import HeroSection from '@pages/activity/components/hero/HeroSection';
import DoingSection from '@pages/activity/components/doing/DoingSection';
import ScheduleSection from '@pages/activity/components/schedule/ScheduleSection';
import CurriculumSection from '@pages/activity/components/curriculum/CurriculumSection';

// Activity 페이지 스타일 상수화
const ACTIVITY_STYLES = {
  scrollContainer: {
    base: 'scrollbar-hidden h-[100dvh] max-h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll',
  },
  section: {
    base: 'relative h-[100dvh] snap-start overflow-hidden',
  },
  sectionWithouthHeight: {
    base: 'relative snap-start',
  },
} as const;

const Activity = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollContainerClassName = combineStyles(ACTIVITY_STYLES.scrollContainer);
  const sectionClassName = combineStyles(ACTIVITY_STYLES.section);
  const sectionWithouthHeightClassName = combineStyles(ACTIVITY_STYLES.sectionWithouthHeight);

  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Activity 페이지에서만 브라우저 기본 스크롤바 숨김
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scrollbar-hidden');

    return () => {
      root.classList.remove('scrollbar-hidden');
    };
  }, []);

  // CurriculumSection이 뷰포트에 있는지 감지 -> menuMode 변경
  useEffect(() => {
    const curriculumSection = document.getElementById('curriculum-section');
    if (!curriculumSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setMenuMode(entry.isIntersecting ? 'dark' : 'light');
        });
      },
      {
        threshold: 0.1, // 10% 이상 보이면 감지
      }
    );

    observer.observe(curriculumSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout menuMode={menuMode} footerMode="dark">
      <div ref={scrollRef} className={scrollContainerClassName}>
        <div id="hero-section" className={sectionClassName}>
          <HeroSection />
        </div>
        <div id="doing-section" className={sectionClassName}>
          <DoingSection />
        </div>
        <div id="schedule-section" className={sectionWithouthHeightClassName}>
          <ScheduleSection scrollContainerRef={scrollRef} />
        </div>
      </div>
      <div id="curriculum-section" className={sectionWithouthHeightClassName}>
        <CurriculumSection />
      </div>
    </Layout>
  );
};

export default Activity;
