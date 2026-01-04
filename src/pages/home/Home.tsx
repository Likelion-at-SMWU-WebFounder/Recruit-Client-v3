import { useState, useEffect } from 'react';
import Layout from '@shared/components/Layout';
import HeroSection from '@pages/home/components/hero/HeroSection';
import AboutSection from '@pages/home/components/about/AboutSection';

const Home = () => {
  const sectionClasses = 'relative h-[100dvh] snap-start overflow-hidden';

  // 페이지 이동 시 메뉴 모드 변경을 위한 상태 (기본값 light)
  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scrollbar-hidden');
    return () => {
      root.classList.remove('scrollbar-hidden');
    };
  }, []);

  useEffect(() => {
    // 스크롤 위치에 따라 메뉴 모드 변경
    const heroSection = document.getElementById('hero-section');
    const aboutSection = document.getElementById('about-section');

    if (!heroSection || !aboutSection) return;

    // 메뉴 모드 변경을 위한 IntersectionObserver 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.id;

          if (targetId === 'hero-section' && entry.isIntersecting) {
            setMenuMode('dark'); // hero 섹션에서는 다크 모드
          } else if (targetId === 'about-section' && entry.isIntersecting) {
            setMenuMode('light'); // about 섹션에서는 라이트 모드
          }
        });
      },
      { threshold: 0.9 } // 10% 이상 보일 때 감지
    );

    observer.observe(heroSection);
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
    </Layout>
  );
};

export default Home;
