import { useState, useEffect } from 'react';
import { combineStyles } from '@shared/utils/combineStyles';
import Layout from '@shared/components/Layout';
import HeroSection from '@pages/home/components/hero/HeroSection';
import AboutSection from '@pages/home/components/about/AboutSection';
import ActivitySection from '@pages/home/components/activity/ActivitySection';
import YearSection from '@pages/home/components/year/YearSection';
import PartSection from '@pages/home/components/part/PartSection';
import ProjectSection from '@pages/home/components/project/ProjectSection';
import ApplySection from '@pages/home/components/apply/ApplySection';

// Home 페이지 스타일 상수화
const HOME_STYLES = {
  scrollContainer: {
    base: 'scrollbar-hidden h-[100dvh] max-h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll',
  },
  section: {
    base: 'relative h-[100dvh] snap-start overflow-hidden',
  },
} as const;

const Home = () => {
  const scrollContainerClassName = combineStyles(HOME_STYLES.scrollContainer);
  const sectionClassName = combineStyles(HOME_STYLES.section);

  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // HeroSection이 뷰포트에 있는지 감지 -> menuMode 변경
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const applySection = document.getElementById('apply-section');
    if (!heroSection || !applySection) return;

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

    observer.observe(heroSection);
    observer.observe(applySection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout menuMode={menuMode} footerMode="light">
      <div className={scrollContainerClassName}>
        <div id="hero-section" className={sectionClassName}>
          <HeroSection />
        </div>
        <div id="about-section" className={sectionClassName}>
          <AboutSection />
        </div>
        <div id="activity-section" className={sectionClassName}>
          <ActivitySection />
        </div>
        <div id="year-section" className={sectionClassName}>
          <YearSection />
        </div>
        <div id="part-section" className={sectionClassName}>
          <PartSection />
        </div>
        <div id="project-section" className={sectionClassName}>
          <ProjectSection />
        </div>
      </div>
      <div id="apply-section" className={sectionClassName}>
        <ApplySection />
      </div>
    </Layout>
  );
};

export default Home;
