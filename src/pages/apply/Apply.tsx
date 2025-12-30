import CompletionConditionSection from './components/CompletionConditionSection';
import HeroSection from './components/HeroSection';
import RecruitInfoSection from './components/RecruitInfoSection';
import RecruitPartSection from './components/RecruitPartSection';

const Apply = () => {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <RecruitPartSection />
      <RecruitInfoSection />
      <CompletionConditionSection />
    </main>
  );
};

export default Apply;
