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

  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('dark');
  const DARK_SECTIONS = ['hero-section', 'apply-section'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'about-section',
      'activity-section',
      'year-section',
      'part-section',
      'project-section',
      'apply-section',
    ];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        if (['hero-section', 'apply-section'].includes(id)) {
          setMenuMode('dark');
        } else {
          setMenuMode('light');
        }
        break;
      }
    }
  }, []);

  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'about-section',
      'activity-section',
      'year-section',
      'part-section',
      'project-section',
      'apply-section',
    ];

    const sections = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 가장 많이 보이는 섹션 하나 고르기
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.id;

        if (DARK_SECTIONS.includes(id)) {
          setMenuMode('dark'); // 글자 흰색
        } else {
          setMenuMode('light'); // 글자 어두운색
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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
