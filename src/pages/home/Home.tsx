import { useState, useEffect } from 'react';
import Layout from '@shared/components/Layout';
import HeroSection from '@pages/home/components/hero/HeroSection';
import AboutSection from '@pages/home/components/about/AboutSection';
import ActivitySection from '@pages/home/components/activity/ActivitySection';

const Home = () => {
  const sectionClasses = 'relative h-[100dvh] snap-start overflow-hidden';

  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // AboutSection이 뷰포트에 있는지 감지 -> menuMode 변경
  useEffect(() => {
    const aboutSection = document.getElementById('about-section');
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // AboutSection 뷰포트에 있으면 light, 없으면 dark
          setMenuMode(entry.isIntersecting ? 'light' : 'dark');
        });
      },
      {
        threshold: 0.9, // 90% 이상 보이면 감지
      }
    );

    observer.observe(aboutSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout menuMode={menuMode} footerMode="light">
      <div id="hero-section" className={sectionClasses}>
        <HeroSection />
      </div>
      <div id="about-section" className={sectionClasses}>
        <AboutSection />
      </div>
      <div id="activity-section" className={sectionClasses}>
        <ActivitySection />
      </div>
    </Layout>
  );
};

export default Home;
