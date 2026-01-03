import Layout from '@shared/components/Layout';
import HeroSection from '@pages/home/components/hero/HeroSection';

const Home = () => {
  return (
    <Layout menuMode="light" footerMode="light">
      <HeroSection />
      <div className="flex h-[200vh] items-center justify-center">숙멋 홈페이지</div>
    </Layout>
  );
};

export default Home;
