import { useEffect, useState } from 'react';
import { combineStyles } from '@shared/utils/combineStyles';

import Layout from '@shared/components/Layout';
import HeroSection from '@pages/about/components/hero/HeroSection';
import OrbitSection from '@pages/about/components/orbit/OrbitSection';
import ValueSection from '@pages/about/components/value/ValueSection';
import IdentitySection from '@pages/about/components/identity/IdentitySection';
import PeopleSection from '@pages/about/components/people/PeopleSection';
import JoinSection from '@pages/about/components/join/JoinSection';

// About 페이지 스타일 상수화
const ABOUT_STYLES = {
  scrollContainer: {
    base: 'scrollbar-hidden h-[100dvh] max-h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll',
  },
  section: {
    base: 'relative h-[100dvh] snap-start overflow-hidden',
  },
  contentSection: {
    base: '',
    desktop: 'lg:space-y-[1.25rem]',
  },
} as const;

const About = () => {
  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // About 페이지에서만 브라우저 기본 스크롤바 숨김
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scrollbar-hidden');

    return () => {
      root.classList.remove('scrollbar-hidden');
    };
  }, []);

  // HeroSection이 뷰포트에 있는지 감지 -> menuMode 변경
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // HeroSection이 뷰포트에 있으면 dark, 없으면 light
          setMenuMode(entry.isIntersecting ? 'dark' : 'light');
        });
      },
      {
        threshold: 0.1, // 10% 이상 보이면 감지
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollContainerClassName = combineStyles(ABOUT_STYLES.scrollContainer);
  const sectionClassName = combineStyles(ABOUT_STYLES.section);
  const contentSectionClassName = combineStyles(ABOUT_STYLES.contentSection);

  return (
    <Layout menuMode={menuMode} footerMode="light">
      <div className={scrollContainerClassName}>
        <div id="hero-section" className={sectionClassName}>
          <HeroSection />
        </div>
        <div id="orbit-section" className={sectionClassName}>
          <OrbitSection />
        </div>
      </div>
      <div id="value-section" className={contentSectionClassName}>
        <ValueSection />
        <IdentitySection />
        <PeopleSection />
      </div>
      <JoinSection />
    </Layout>
  );
};

export default About;
