import { useState } from 'react';
import { SECTION_TITLES, RECRUIT_PARTS } from '../constants/index';
import img3dOrange from '../assets/3d-orange.png';
import img3dBlue from '../assets/3d-blue.png';
import img3dGreen from '../assets/3d-green.png';

const PART_IMAGES = [img3dOrange, img3dBlue, img3dGreen];

const RecruitPartSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (diff > 50 && currentSlide < RECRUIT_PARTS.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (diff < -50 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
      document.removeEventListener('touchend', handleTouchEnd);
    };
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section className="flex h-auto w-full items-center justify-center bg-[#F0F4FA] py-16 md:py-20 lg:h-[67.5rem] lg:py-[6rem]">
      <div className="flex w-full flex-col items-center">
        {/* 글씨 박스 */}
        <div className="mb-10 flex min-w-[17.1875rem] flex-col items-center gap-[1rem] lg:mb-16">
          <span className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#1B2634] uppercase md:text-[1rem] lg:text-[1.25rem]">
            13기 아기사자
          </span>
          <h2 className="text-center text-[1.5rem] leading-[140%] font-semibold text-[#1B2634] md:text-[2rem] lg:text-[2.625rem]">
            {SECTION_TITLES.RECRUIT_PART}
          </h2>
        </div>

        {/* 모바일: 캐러셀 */}
        <div className="w-full md:hidden">
          {/* 캐러셀 컨테이너 */}
          <div
            className="relative flex h-[23.125rem] w-full items-center justify-center overflow-hidden"
            onTouchStart={handleTouchStart}>
            {RECRUIT_PARTS.map((part, index) => {
              const isActive = index === currentSlide;
              const offset = index - currentSlide;

              return (
                <div
                  key={part.id}
                  className={`absolute transition-all duration-300 ease-out ${isActive ? 'z-20' : 'z-10 blur-[2px]'}`}
                  style={{
                    transform: `translateX(${offset * 19}rem)`,
                  }}>
                  <div
                    className={`relative h-[23.125rem] w-[18rem] overflow-hidden rounded-[1.25rem] p-6 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] ${
                      isActive
                        ? 'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.84%,rgba(247,250,255,0.40)_77.64%)]'
                        : 'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_41.42%,rgba(247,250,255,0.40)_82.79%)]'
                    }`}>
                    <div className="relative z-10">
                      <h3 className="text-[1.5rem] font-semibold text-[#1B2634]">{part.title}</h3>
                      <p className="mt-2 text-[1rem] leading-[180%] font-medium text-[#1B2634]/60">{part.skills}</p>
                      <p className="mt-4 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634]">
                        {part.description}
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634]">{part.cta}</p>
                    </div>
                    <img
                      src={PART_IMAGES[index]}
                      alt=""
                      className="absolute -right-[10%] -bottom-[15%] z-0 h-[55%] w-auto object-contain opacity-80"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 인디케이터 점 */}
          <div className="mt-4 flex h-[2.25rem] w-full items-center justify-center gap-[0.5rem]">
            {RECRUIT_PARTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full ${
                  currentSlide === index ? 'bg-[#4284FF]' : 'bg-[#1B2634] opacity-40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 태블릿/데스크탑 */}
        <div
          className="relative hidden h-[28rem] w-[42rem] cursor-pointer md:block lg:h-[44.8125rem] lg:w-[100rem]"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onTouchStart={() => setIsExpanded(!isExpanded)}>
          {/* 접힌 상태 */}
          {!isExpanded && (
            <div className="absolute top-0 left-1/2 h-full w-[42rem] -translate-x-1/2 lg:w-[70rem]">
              {/* 기획/디자인 카드 */}
              <div className="absolute top-1/2 left-0 z-0 h-[24rem] w-[20rem] -translate-y-1/2 rotate-[-18.63deg] overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.97%,rgba(247,250,255,0.40)_77.89%)] p-6 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] lg:h-[36.375rem] lg:w-[32.3125rem] lg:p-10">
                <h3 className="text-[1.5rem] font-semibold text-[#1B2634] lg:text-[2.25rem]">
                  {RECRUIT_PARTS[0].title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634]/60 lg:text-[1.25rem]">
                  {RECRUIT_PARTS[0].skills}
                </p>
                <img
                  src={img3dOrange}
                  alt=""
                  className="absolute -right-[10%] -bottom-[15%] h-[55%] w-auto object-contain opacity-80 blur-[1px] lg:h-[60%]"
                />
              </div>

              {/* 프론트엔드 카드 */}
              <div className="absolute top-1/2 left-1/2 z-10 h-[24rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.84%,rgba(247,250,255,0.40)_77.64%)] p-6 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] lg:h-[36.375rem] lg:w-[32.3125rem] lg:p-10">
                <h3 className="text-[1.5rem] font-semibold text-[#1B2634] lg:text-[2.25rem]">
                  {RECRUIT_PARTS[1].title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634]/60 lg:text-[1.25rem]">
                  {RECRUIT_PARTS[1].skills}
                </p>
                <img
                  src={img3dBlue}
                  alt=""
                  className="absolute -right-[5%] -bottom-[10%] h-[55%] w-auto object-contain opacity-80 blur-[1px] lg:h-[60%]"
                />
              </div>

              {/* 백엔드 카드 */}
              <div className="absolute top-1/2 right-0 z-20 h-[24rem] w-[20rem] -translate-y-1/2 rotate-[18.63deg] overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_41.42%,rgba(247,250,255,0.40)_82.79%)] p-6 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] lg:h-[36.375rem] lg:w-[32.3125rem] lg:p-10">
                <h3 className="text-[1.5rem] font-semibold text-[#1B2634] lg:text-[2.25rem]">
                  {RECRUIT_PARTS[2].title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634]/60 lg:text-[1.25rem]">
                  {RECRUIT_PARTS[2].skills}
                </p>
                <img
                  src={img3dGreen}
                  alt=""
                  className="absolute -right-[5%] -bottom-[10%] h-[55%] w-auto object-contain opacity-80 blur-[1px] lg:h-[60%]"
                />
              </div>
            </div>
          )}

          {/* 펼쳐진 상태 */}
          {isExpanded && (
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-4 lg:gap-6">
              {RECRUIT_PARTS.map((part, index) => (
                <div
                  key={part.id}
                  className="relative h-[24rem] w-[20rem] overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.97%,rgba(247,250,255,0.40)_77.89%)] p-6 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] lg:h-[36.375rem] lg:w-[32.3125rem] lg:p-10">
                  {/* 글씨 영역 */}
                  <div className="relative z-10">
                    <h3 className="text-[1.5rem] font-semibold text-[#1B2634] lg:text-[2.25rem]">{part.title}</h3>
                    <p className="mt-2 text-[1rem] leading-[180%] font-medium text-[#1B2634]/60 lg:text-[1.5rem]">
                      {part.skills}
                    </p>
                    <p className="mt-6 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634] lg:text-[1.25rem]">
                      {part.description}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-[180%] font-medium text-[#1B2634] lg:text-[1.25rem]">
                      {part.cta}
                    </p>
                  </div>
                  {/* 3D 이미지 */}
                  <img
                    src={PART_IMAGES[index]}
                    alt=""
                    className="absolute -right-[5%] -bottom-[10%] z-0 h-[55%] w-auto object-contain opacity-80 blur-[1px] lg:h-[60%]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecruitPartSection;
