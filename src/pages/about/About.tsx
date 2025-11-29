import OrbitSection from '@pages/about/components/orbit/OrbitSection';
import ValuesSection from '@pages/about/components/value/ValuesSection';
import IdentitiesSection from '@pages/about/components/identity/IdentitiesSection';
import PeopleSection from '@pages/about/components/people/PeopleSection';

const About = () => {
  return (
    <>
      <OrbitSection />
      <div className="lg:space-y-[1.25rem]">
        <ValuesSection />
        <IdentitiesSection />
        <PeopleSection />
      </div>
    </>
  );
};

export default About;
