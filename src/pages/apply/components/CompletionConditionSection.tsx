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

  const handleCardInteraction = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

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

        {/* 카드 컨테이너 */}
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:h-[44.3125rem] lg:w-[93.8125rem] lg:gap-[6.25rem] lg:p-[3.375rem_2.96875rem_3.3125rem_2.96875rem]">
          {COMPLETION_CONDITIONS.map((card, index) => {
            const isFlipped = flippedCard === card.id;

            return (
              <div
                key={card.id}
                className="h-[18rem] w-[20rem] cursor-pointer [perspective:1000px] md:h-[24rem] md:w-[20rem] lg:h-[37.625rem] lg:w-[40.8125rem]"
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => setFlippedCard(card.id)}
                onMouseLeave={() => setFlippedCard(null)}>
                <div
                  className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}>
                  {/* 앞면 - 흰색 배경 + 3D 이미지 */}
                  <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[#F7FAFF] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden]">
                    {/* 카드 제목 */}
                    <h3 className="absolute top-4 left-4 text-[1.25rem] font-semibold text-[#1B2634] md:top-6 md:left-6 md:text-[1.5rem] lg:top-[4.38rem] lg:left-[5.13rem] lg:text-[2.25rem]">
                      {card.title}
                    </h3>

                    {/* 3D 이미지 */}
                    <img
                      src={CARD_IMAGES[index]}
                      alt=""
                      className={`absolute object-contain ${
                        index === 0
                          ? '-right-[30%] -bottom-[50%] h-[140%] w-auto md:-right-[25%] md:-bottom-[45%] md:h-[130%] lg:-right-[35%] lg:-bottom-[60%] lg:h-[170%]'
                          : '-right-[25%] -bottom-[45%] h-[130%] w-auto md:-right-[20%] md:-bottom-[40%] md:h-[120%] lg:-right-[30%] lg:-bottom-[55%] lg:h-[160%]'
                      }`}
                    />
                  </div>

                  {/* 뒷면 - 파란색 배경 + 내용 */}
                  <div className="absolute inset-0 [transform:rotateY(180deg)] overflow-hidden rounded-[1.25rem] bg-[#4284FF] p-4 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden] md:p-6 lg:p-[3rem_4rem]">
                    {/* 제목 */}
                    <h3 className="mb-4 text-[1.25rem] font-semibold text-[#F7FAFF] md:mb-6 md:text-[1.5rem] lg:mb-8 lg:text-[2.25rem]">
                      {card.title}
                    </h3>

                    {/* 내용 */}
                    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                      {card.id === 'attendance'
                        ? // 출결 및 과제 제출 카드
                          (card.items as AttendanceItem[]).map((item) => (
                            <div key={item.number}>
                              <div className="mb-2 flex items-center gap-2 md:gap-3">
                                <span className="text-[1rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
                                  {item.number}
                                </span>
                                <span className="text-[1rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
                                  {item.title}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1">
                                {item.details.map((detail, idx) => (
                                  <p
                                    key={idx}
                                    className="text-[0.75rem] font-medium text-[#F7FAFF] md:text-[0.875rem] lg:text-[1.25rem]">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))
                        : // 필수 행사 참여 카드
                          (card.items as EventItem[]).map((item) => (
                            <div key={item.number} className="flex items-center gap-2 md:gap-3">
                              <span className="text-[1rem] font-semibold text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]">
                                {item.number}
                              </span>
                              <span className="text-[0.875rem] font-semibold text-[#F7FAFF] md:text-[1rem] lg:text-[1.25rem]">
                                {item.title}
                              </span>
                              <span className="text-[0.75rem] font-medium text-[#F7FAFF]/80 md:text-[0.875rem] lg:text-[1rem]">
                                {item.date}
                              </span>
                            </div>
                          ))}
                    </div>

                    {/* 뒷면 3D 이미지 */}
                    <img
                      src={CARD_IMAGES[index]}
                      alt=""
                      className={`absolute object-contain opacity-30 ${
                        index === 0
                          ? '-right-[30%] -bottom-[50%] h-[140%] w-auto md:-right-[25%] md:-bottom-[45%] md:h-[130%] lg:-right-[35%] lg:-bottom-[60%] lg:h-[170%]'
                          : '-right-[25%] -bottom-[45%] h-[130%] w-auto md:-right-[20%] md:-bottom-[40%] md:h-[120%] lg:-right-[30%] lg:-bottom-[55%] lg:h-[160%]'
                      }`}
                    />
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
