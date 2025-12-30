import { useState } from 'react';
import { SECTION_TITLES, COMPLETION_CONDITIONS } from '../constants/index';
import img3dSpring from '../assets/3d-spring.png';
import img3dKnot from '../assets/3d-knot.png';

const CARD_IMAGES = [img3dSpring, img3dKnot];

interface AttendanceItem {
  number: string;
  title: string;
  details: string[];
}

interface EventItem {
  number: string;
  title: string;
  date: string;
}

const CompletionConditionSection = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);

  const handleCardInteraction = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const handleMobileNext = () => {
    setMobileCardIndex((prev) => (prev + 1) % COMPLETION_CONDITIONS.length);
  };

  const renderCardContent = (card: (typeof COMPLETION_CONDITIONS)[0], index: number, isMobile: boolean = false) => (
    <>
      {/* 제목 */}
      <h3
        className={`font-semibold text-[#F7FAFF] ${isMobile ? 'mb-4 text-[1.25rem]' : 'mb-4 text-[1.25rem] md:mb-6 md:text-[1.5rem] lg:mb-8 lg:text-[2.25rem]'}`}>
        {card.title}
      </h3>

      {/* 내용 */}
      <div className={`flex flex-col ${isMobile ? 'gap-4' : 'gap-4 md:gap-5 lg:gap-6'}`}>
        {card.id === 'attendance'
          ? (card.items as AttendanceItem[]).map((item) => (
              <div key={item.number}>
                <div className={`flex items-center ${isMobile ? 'mb-2 gap-2' : 'mb-2 gap-2 md:gap-3'}`}>
                  <span
                    className={`font-semibold text-[#F7FAFF] ${isMobile ? 'text-[1rem]' : 'text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]'}`}>
                    {item.number}
                  </span>
                  <span
                    className={`font-semibold text-[#F7FAFF] ${isMobile ? 'text-[1rem]' : 'text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]'}`}>
                    {item.title}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {item.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className={`font-medium text-[#F7FAFF] ${isMobile ? 'text-[0.75rem]' : 'text-[0.75rem] md:text-[0.875rem] lg:text-[1.25rem]'}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))
          : (card.items as EventItem[]).map((item) => (
              <div key={item.number} className={`flex items-center ${isMobile ? 'gap-2' : 'gap-2 md:gap-3'}`}>
                <span
                  className={`font-semibold text-[#F7FAFF] ${isMobile ? 'text-[1rem]' : 'text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]'}`}>
                  {item.number}
                </span>
                <span
                  className={`font-semibold text-[#F7FAFF] ${isMobile ? 'text-[0.875rem]' : 'text-[0.875rem] md:text-[1rem] lg:text-[1.25rem]'}`}>
                  {item.title}
                </span>
                <span
                  className={`font-medium text-[#F7FAFF]/80 ${isMobile ? 'text-[0.75rem]' : 'text-[0.75rem] md:text-[0.875rem] lg:text-[1rem]'}`}>
                  {item.date}
                </span>
              </div>
            ))}
      </div>

      {/* 3D 이미지 */}
      <img
        src={CARD_IMAGES[index]}
        alt=""
        className={`absolute object-contain ${isMobile ? 'opacity-30' : 'opacity-30'} ${
          index === 0
            ? '-right-[30%] -bottom-[50%] h-[140%] w-auto rotate-[31.047deg] md:-right-[25%] md:-bottom-[45%] md:h-[130%] lg:-right-[35%] lg:-bottom-[60%] lg:h-[170%]'
            : '-right-[25%] -bottom-[45%] h-[130%] w-auto md:-right-[20%] md:-bottom-[40%] md:h-[120%] lg:-right-[30%] lg:-bottom-[55%] lg:h-[160%]'
        }`}
      />
    </>
  );

  return (
    <section className="flex h-auto w-full items-center justify-center bg-[#F0F4FA] px-4 py-16 md:px-8 md:py-20 lg:h-[67.5rem] lg:px-[13.09375rem] lg:pt-[8rem] lg:pb-[7.9375rem]">
      <div className="flex w-full flex-col items-center">
        {/* 글씨 박스 */}
        <div className="mb-10 flex min-w-[17.1875rem] flex-col items-center gap-[1rem] lg:mb-16">
          <span className="text-center text-[0.875rem] leading-[140%] font-semibold text-[#1B2634] uppercase opacity-50 md:text-[1rem] lg:text-[1.25rem]">
            13기 아기사자
          </span>
          <h2 className="text-center text-[1.5rem] leading-[140%] font-semibold text-[#1B2634] md:text-[2rem] lg:text-[2.625rem]">
            {SECTION_TITLES.COMPLETION_CONDITION}
          </h2>
        </div>

        {/* 모바일: 캐러셀 */}
        <div className="relative w-[22.5625rem] md:hidden">
          {/* 첫 번째 카드 - 출결 및 과제 제출 */}
          {mobileCardIndex === 0 && (
            <div className="relative h-[20.8125rem] w-[22.5625rem] overflow-hidden rounded-[1.25rem] bg-[#F7FAFF] p-6 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]">
              <h3 className="mb-4 text-[1.25rem] font-semibold text-[#1B2634]">{COMPLETION_CONDITIONS[0].title}</h3>
              <div className="flex flex-col gap-3">
                {(COMPLETION_CONDITIONS[0].items as AttendanceItem[]).map((item) => (
                  <div key={item.number}>
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="text-[1rem] font-semibold text-[#1B2634]">{item.number}</span>
                      <span className="text-[1rem] font-semibold text-[#1B2634]">{item.title}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 pl-7">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-[0.75rem] font-medium text-[#1B2634]/70">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <img
                src={CARD_IMAGES[0]}
                alt=""
                className="absolute -right-[20%] -bottom-[40%] h-[120%] w-auto object-contain opacity-30"
              />
              {/* 화살표 버튼 */}
              <button
                onClick={handleMobileNext}
                className="absolute right-0 bottom-0 flex h-[2.5625rem] w-[2.5625rem] items-center justify-center rounded-tl-[1.25rem] rounded-br-[0.625rem] bg-[#4284FF]">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* 두 번째 카드 - 필수 행사 참여 */}
          {mobileCardIndex === 1 && (
            <div className="relative h-[20.8125rem] w-[22.5625rem] overflow-hidden rounded-[1.25rem] bg-[#4284FF] p-6 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]">
              <h3 className="mb-3 text-[1.25rem] font-semibold text-[#F7FAFF]">{COMPLETION_CONDITIONS[1].title}</h3>
              <div className="flex flex-col gap-2">
                {(COMPLETION_CONDITIONS[1].items as EventItem[]).map((item) => (
                  <div key={item.number} className="flex items-center gap-2">
                    <span className="text-[1rem] font-semibold text-[#F7FAFF]">{item.number}</span>
                    <span className="text-[0.875rem] font-semibold text-[#F7FAFF]">{item.title}</span>
                    <span className="text-[0.75rem] font-medium text-[#F7FAFF]/80">{item.date}</span>
                  </div>
                ))}
              </div>
              <img
                src={CARD_IMAGES[1]}
                alt=""
                className="absolute -right-[15%] -bottom-[35%] h-[110%] w-auto object-contain opacity-30"
              />
              {/* 화살표 버튼 */}
              <button
                onClick={handleMobileNext}
                className="absolute right-0 bottom-0 flex h-[2.5625rem] w-[2.5625rem] items-center justify-center rounded-tl-[1.25rem] rounded-br-[0.625rem] bg-[#F7FAFF]">
                <svg className="h-5 w-5 text-[#4284FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* 태블릿/데스크탑 */}
        <div className="hidden w-full flex-col items-center justify-center gap-6 md:flex md:flex-row md:gap-8 lg:h-[44.3125rem] lg:w-[93.8125rem] lg:gap-[6.25rem] lg:p-[3.375rem_2.96875rem_3.3125rem_2.96875rem]">
          {COMPLETION_CONDITIONS.map((card, index) => {
            const isFlipped = flippedCard === card.id;

            return (
              <div
                key={card.id}
                className="h-[24rem] w-[20rem] cursor-pointer [perspective:1000px] lg:h-[37.625rem] lg:w-[40.8125rem]"
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => setFlippedCard(card.id)}
                onMouseLeave={() => setFlippedCard(null)}>
                <div
                  className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}>
                  {/* 앞면 */}
                  <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[#F7FAFF] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden]">
                    <h3 className="absolute top-6 left-6 text-[1.5rem] font-semibold text-[#1B2634] lg:top-[4.38rem] lg:left-[5.13rem] lg:text-[2.25rem]">
                      {card.title}
                    </h3>
                    <img
                      src={CARD_IMAGES[index]}
                      alt=""
                      className={`absolute object-contain ${
                        index === 0
                          ? '-right-[25%] -bottom-[45%] h-[130%] w-auto rotate-[31.047deg] lg:-right-[35%] lg:-bottom-[60%] lg:h-[170%]'
                          : '-right-[20%] -bottom-[40%] h-[120%] w-auto lg:-right-[30%] lg:-bottom-[55%] lg:h-[160%]'
                      }`}
                    />
                  </div>

                  {/* 뒷면 */}
                  <div className="absolute inset-0 [transform:rotateY(180deg)] overflow-hidden rounded-[1.25rem] bg-[#4284FF] p-6 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden] lg:p-[3rem_4rem]">
                    {renderCardContent(card, index)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompletionConditionSection;
