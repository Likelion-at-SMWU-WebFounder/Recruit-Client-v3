import CompletionConditionSection from './components/CompletionConditionSection';
import HeroSection from './components/HeroSection';
import RecruitInfoSection from './components/RecruitInfoSection';
import RecruitPartSection from './components/RecruitPartSection';
import ScheduleSection from './components/ScheduleSection';

const Apply = () => {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <RecruitPartSection />
      <RecruitInfoSection />
      <CompletionConditionSection />
      <ScheduleSection />
    </main>
  );
};

export default Apply;
