import { useEffect } from 'react';

import HeroSection from '@pages/about/components/hero/HeroSection';
import OrbitSection from '@pages/about/components/orbit/OrbitSection';
import ValuesSection from '@pages/about/components/value/ValuesSection';
import IdentitiesSection from '@pages/about/components/identity/IdentitiesSection';
import PeopleSection from '@pages/about/components/people/PeopleSection';
import JoinSection from '@pages/about/components/join/JoinSection';

const About = () => {
  // About 페이지에서만 브라우저 기본 스크롤바 숨김
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scrollbar-hidden');

    return () => {
      root.classList.remove('scrollbar-hidden');
    };
  }, []);

  return (
    <>
      <div className="scrollbar-hidden h-[100dvh] max-h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll">
        <div id="hero-section" className="relative h-[100dvh] snap-start overflow-hidden">
          <HeroSection />
        </div>
        <div id="orbit-section" className="relative h-[100dvh] snap-start overflow-hidden">
          <OrbitSection />
        </div>
      </div>
      <div id="values-section" className="lg:space-y-[1.25rem]">
        <ValuesSection />
        <IdentitiesSection />
        <PeopleSection />
      </div>
      <JoinSection />
    </>
  );
};

export default About;
