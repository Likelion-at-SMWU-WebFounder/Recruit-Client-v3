import { useState, useEffect } from 'react';
import { combineStyles } from '@shared/utils/combineStyles';
import Layout from '@shared/components/Layout';

// Home 페이지 스타일 상수화
const HOME_STYLES = {
  scrollContainer: {
    base: 'scrollbar-hidden h-[100dvh] max-h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll',
  },
  section: {
    base: 'relative h-[100dvh] snap-start overflow-hidden',
  },
} as const;

const Activity = () => {
  const scrollContainerClassName = combineStyles(HOME_STYLES.scrollContainer);
  const sectionClassName = combineStyles(HOME_STYLES.section);

  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    window.scrollTo(0, 0);
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
        threshold: 0.9, // 90% 이상 보이면 감지
      }
    );

    observer.observe(curriculumSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout menuMode={menuMode} footerMode="dark">
      <div className={scrollContainerClassName}>
        <div id="hero-section" className={sectionClassName}></div>
        <div id="doing-section" className={sectionClassName}></div>
        <div id="schedule-section" className={sectionClassName}></div>
      </div>
      <div id="curriculum-section" className={sectionClassName}></div>
    </Layout>
  );
};

export default Activity;
