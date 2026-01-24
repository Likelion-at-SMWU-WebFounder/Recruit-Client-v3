import { HERO_CONTENT } from '../constants/index';
import decoOrange from '../assets/deco-orange.svg';
import decoBlue from '../assets/deco-blue.svg';
import GotoIcon from './icon/GotoIcon';
import '../styles/HomeSection.css';

const HeroSection = () => {
  const handleApplyClick = () => {
    console.log('지원하러 가기 클릭');
  };

  return (
    <section className="relative flex h-[53.25rem] w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] md:h-[85.375rem] lg:h-[67.5rem]">
      {/* 1. 배경 데코 레이어 */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={decoOrange}
          alt=""
          className="animate-deco absolute -top-[2rem] -left-[3rem] h-auto w-[18rem] md:w-[28rem] lg:-top-[5rem] lg:-left-[8rem] lg:w-[40rem]"
        />
        <img
          src={decoBlue}
          alt=""
          className="animate-deco absolute -right-[5rem] bottom-[-2rem] h-auto w-[22rem] md:w-[35rem] lg:-right-[12rem] lg:-bottom-[10rem] lg:w-[52rem]"
        />
      </div>

      {/* 2. 배경 그라데이션 레이어 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(247deg, rgba(12, 12, 12, 0.20) 3.42%, rgba(12, 12, 12, 0.90) 110.51%)',
        }}
      />

      {/* 3. 컨텐츠 레이아웃 */}
      <div className="relative z-10 flex flex-col items-center gap-[2.5rem] md:gap-[3.5rem] lg:gap-[4.375rem]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-center gap-[2rem] md:gap-[3rem] lg:gap-[4.375rem]">
          <h1 className="text-center text-[1.5rem] leading-[140%] font-bold whitespace-pre-line text-[#F7FAFF] md:text-[2.25rem] lg:text-[3.5625rem]">
            {HERO_CONTENT.TITLE}
          </h1>

          <div className="flex flex-col items-center gap-[0.75rem] md:gap-[1rem] lg:gap-[1.5625rem]">
            <p className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[2rem]">
              {HERO_CONTENT.DESCRIPTION}
            </p>
            <p className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[2rem]">
              {HERO_CONTENT.APPLY_PERIOD}
            </p>
          </div>
        </div>

        {/* 지원하기 버튼 */}
        <button
          onClick={handleApplyClick}
          className="flex cursor-pointer items-center justify-center gap-[0.625rem] rounded-[1rem] bg-[#F7FAFF] px-5 py-3 transition-colors hover:bg-[#F7FAFF]/90 md:px-7 md:py-4 lg:px-[1.375rem] lg:py-[0.9375rem]">
          <span className="text-[1.125rem] font-bold text-[#4284FF] md:text-[1.375rem] lg:text-[1.75rem]">
            {HERO_CONTENT.BUTTON_TEXT}
          </span>
          <GotoIcon className="h-[0.5rem] w-[0.4rem] md:h-[0.7rem] md:w-[0.6rem] lg:h-[0.875rem] lg:w-[0.75rem]" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
