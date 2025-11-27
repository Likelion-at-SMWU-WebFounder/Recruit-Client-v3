import ValuesSection from './components/value/ValuesSection';
import IdentitiesSection from './components/identity/IdentitiesSection';
import PeopleSection from './components/people/PeopleSection';

const About = () => {
  return (
    <div className="lg:space-y-[1.25rem]">
      <ValuesSection />
      <IdentitiesSection />
      <PeopleSection />
    </div>
  );
};

export default About;
