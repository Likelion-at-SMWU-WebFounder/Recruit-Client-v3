import OrbitSection from '@pages/about/components/orbit/OrbitSection';
import ValuesSection from '@pages/about/components/value/ValuesSection';
import IdentitiesSection from '@pages/about/components/identity/IdentitiesSection';
import PeopleSection from '@pages/about/components/people/PeopleSection';
import JoinSection from '@pages/about/components/join/JoinSection';

const About = () => {
  return (
    <>
      <div className="scrollbar-hidden h-[100dvh] max-h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll">
        <div className="h-[100dvh] snap-start">
          <HeroSection />
        </div>
        <div className="h-[100dvh] snap-start">
          <OrbitSection />
        </div>
      </div>
      <div className="lg:space-y-[1.25rem]">
        <ValuesSection />
        <IdentitiesSection />
        <PeopleSection />
      </div>
      <JoinSection />
    </>
  );
};

export default About;
