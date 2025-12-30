import { HERO_CONTENT } from '../constants/index';
import decoOrange from '../assets/deco-orange.png';
import decoBlue from '../assets/deco-blue.png';

const HeroSection = () => {
  const handleApplyClick = () => {
    // 지원 폼 페이지로 이동은 추후 구현
    console.log('지원하기 클릭');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0C0C0C] px-4 py-20 md:px-8 md:py-28 lg:h-[67.5rem] lg:px-14 lg:py-0">
      {/* 배경 장식 이미지 */}
      <div className="pointer-events-none absolute inset-0">
        {/* 주황 장식 - 왼쪽 상단 */}
        <img
          src={decoOrange}
          alt=""
          className="absolute -top-[10%] -left-[5%] w-[40%] rotate-[45.095deg] object-contain md:w-[30%] lg:h-[39rem] lg:w-[23.39rem]"
        />
        {/* 파랑 장식 - 오른쪽 하단 */}
        <img
          src={decoBlue}
          alt=""
          className="absolute -right-[10%] -bottom-[10%] w-[60%] rotate-[138.99deg] object-contain md:w-[50%] lg:h-[31.59rem] lg:w-[40.61rem]"
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center text-center">
        {/* 메인 타이틀 */}
        <h1 className="text-[1.375rem] leading-[140%] font-bold text-[#F7FAFF] md:text-[1.75rem] lg:text-[3.5625rem]">
          {HERO_CONTENT.TITLE}
        </h1>

        {/* 간격 4.375rem */}
        <div className="h-8 md:h-12 lg:h-[4.375rem]" />

        {/* 서브 설명 */}
        <div className="flex flex-col text-[0.8125rem] leading-[140%] font-semibold text-[#F7FAFF] md:text-[1rem] lg:text-[2rem]">
          <p>{HERO_CONTENT.DESCRIPTION}</p>
          <p>{HERO_CONTENT.APPLY_PERIOD}</p>
        </div>

        {/* 간격 4.375rem */}
        <div className="h-8 md:h-12 lg:h-[4.375rem]" />

        {/* 지원하기 버튼 */}
        <button
          onClick={handleApplyClick}
          className="flex items-center justify-center gap-[0.625rem] rounded-[1rem] bg-[#F7FAFF] px-4 py-2.5 text-[0.875rem] font-bold text-[#4284FF] transition-all hover:bg-[#F7FAFF]/90 md:px-5 md:py-3 md:text-[1rem] lg:px-[1.375rem] lg:py-[0.9375rem] lg:text-[1.75rem]">
          {HERO_CONTENT.BUTTON_TEXT}
          <svg className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
