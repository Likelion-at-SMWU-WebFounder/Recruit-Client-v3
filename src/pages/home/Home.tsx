import { useState, useEffect, useRef } from 'react';
import { combineStyles } from '@shared/utils/combineStyles';
import Layout from '@shared/components/Layout';
import Footer from '@shared/components/Footer';
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
  footer: {
    base: 'relative h-auto snap-start',
  },
} as const;

const Home = () => {
  const scrollContainerClassName = combineStyles(HOME_STYLES.scrollContainer);
  const sectionClassName = combineStyles(HOME_STYLES.section);
  const footerClassName = combineStyles(HOME_STYLES.footer);

  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('dark');

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

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

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      const index = Math.round(scrollTop / containerHeight);
      const currentId = sections[index]?.id;

      if (!currentId) return;

      if (currentId === 'hero-section' || currentId === 'apply-section') {
        setMenuMode('dark');
      } else {
        setMenuMode('light');
      }
    };

    // 최초 1회
    onScroll();

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Layout menuMode={menuMode} footerMode="light" withoutFooter={true}>
      <div ref={scrollRef} className={scrollContainerClassName}>
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
        <div id="apply-section" className={sectionClassName}>
          <ApplySection />
        </div>
        <div className={footerClassName}>
          <Footer mode="light" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
