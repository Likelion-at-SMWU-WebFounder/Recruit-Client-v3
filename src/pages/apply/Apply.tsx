import { useEffect, useState, useRef } from 'react';
import CompletionConditionSection from './components/apply/CompletionConditionSection';
import FAQSection from './components/apply/FAQSection';
import HeroSection from './components/apply/HeroSection';
import RecruitInfoSection from './components/apply/RecruitInfoSection';
import RecruitPartSection from './components/apply/RecruitPartSection';
import ScheduleSection from './components/apply/ScheduleSection';
import Layout from '@/shared/components/Layout';

const Apply = () => {
  const [menuMode, setMenuMode] = useState<'light' | 'dark'>('dark');
  // HeroSection을 참조할 ref 생성
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    // 현재 ref가 가리키는 요소가 있는지 확인
    const currentHero = heroRef.current;
    if (!currentHero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // HeroSection이 화면에 10% 이상 보이면 dark, 아니면 light
          setMenuMode(entry.isIntersecting ? 'dark' : 'light');
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(currentHero);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout menuMode={menuMode} footerMode="light">
      <main className="w-full bg-white">
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <RecruitPartSection />
        <RecruitInfoSection />
        <CompletionConditionSection />
        <ScheduleSection />
        <FAQSection />
      </main>
    </Layout>
  );
};

export default Apply;
