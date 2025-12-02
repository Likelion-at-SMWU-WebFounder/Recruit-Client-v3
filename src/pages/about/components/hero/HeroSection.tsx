import { TITLE } from '@pages/about/constants/about';

const HeroSection = () => {
  return (
    <div className="hero-bg flex h-[100dvh] w-full max-w-[100vw] flex-col items-center justify-center gap-[0.56rem]">
      <div className="text-[1.125rem] leading-[117%] font-semibold tracking-[-0.01125rem] text-white/75 md:text-[2rem] md:tracking-[-0.02rem]">
        {TITLE.TITLE_1}
      </div>
      <div className="text-[1.75rem] leading-[117%] font-bold tracking-[-0.0175rem] text-white md:text-[4rem] md:tracking-[-0.04rem]">
        {TITLE.DESCRIPTION_1}
      </div>
    </div>
  );
};

export default HeroSection;
