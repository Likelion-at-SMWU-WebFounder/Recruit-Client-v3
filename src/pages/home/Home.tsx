import Layout from '@shared/components/Layout';
import HeroSection from '@pages/home/components/hero/HeroSection';
import AboutSection from '@pages/home/components/about/AboutSection';

const Home = () => {
  return (
    <Layout menuMode="light" footerMode="light">
      <HeroSection />
      <AboutSection />
    </Layout>
  );
};

export default Home;
