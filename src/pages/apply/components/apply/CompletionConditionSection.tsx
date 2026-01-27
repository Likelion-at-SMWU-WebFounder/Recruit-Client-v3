import { useState } from 'react';
import { SECTION_TITLES, COMPLETION_CONDITIONS } from '../../constants/index';
import img3dSpring from '../../assets/3d-spring.png';
import img3dKnot from '../../assets/3d-knot.png';

const CARD_IMAGES = [img3dSpring, img3dKnot] as const;

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

const TW = {
  // layout
  section:
    'flex h-auto w-full items-center justify-center bg-[#F0F4FA] px-4 py-16 md:px-8 md:py-20 lg:h-[67.5rem] lg:px-[13.09375rem] lg:pt-[8rem] lg:pb-[7.9375rem]',
  container: 'flex w-full flex-col items-center',

  // heading
  headingBox: 'mb-10 flex min-w-[17.1875rem] flex-col items-center gap-[1rem] lg:mb-16',
  headingKicker:
    'text-center text-[0.875rem] leading-[140%] font-semibold text-[#1B2634] uppercase opacity-50 md:text-[1rem] lg:text-[1.25rem]',
  headingTitle:
    'text-center text-[1.5rem] leading-[140%] font-semibold text-[#1B2634] md:text-[2rem] lg:text-[2.625rem]',

  // mobile wrapper
  mobileWrap: 'relative w-[22.5625rem] md:hidden',

  // mobile cards (fronts)
  mobileCardBase:
    'relative h-[20.8125rem] w-[22.5625rem] overflow-hidden rounded-[1.25rem] p-6 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  mobileCardLight: 'bg-[#F7FAFF]',
  mobileCardBlue: 'bg-[#4284FF]',

  // mobile contents
  mobileLightTitle: 'mb-4 text-[1.25rem] font-semibold text-[#1B2634]',
  mobileBlueTitle: 'mb-3 text-[1.25rem] font-semibold text-[#F7FAFF]',
  mobileRow: 'flex items-center gap-2',
  mobileLightNum: 'text-[1rem] font-semibold text-[#1B2634]',
  mobileBlueNum: 'text-[1rem] font-semibold text-[#F7FAFF]',
  mobileLightLabel: 'text-[1rem] font-semibold text-[#1B2634]',
  mobileBlueLabel: 'text-[0.875rem] font-semibold text-[#F7FAFF]',
  mobileBlueDate: 'text-[0.75rem] font-medium text-[#F7FAFF]/80',
  mobileLightDetail: 'text-[0.75rem] font-medium text-[#1B2634]/70',

  // mobile image
  mobileImgLight: 'absolute -right-[20%] -bottom-[40%] h-[120%] w-auto object-contain opacity-30',
  mobileImgBlue: 'absolute -right-[15%] -bottom-[35%] h-[110%] w-auto object-contain opacity-30',

  // mobile arrow button
  arrowBtnBase:
    'absolute right-0 bottom-0 flex h-[2.5625rem] w-[2.5625rem] items-center justify-center rounded-tl-[1.25rem] rounded-br-[0.625rem]',
  arrowBtnOnLight: 'bg-[#4284FF]',
  arrowBtnOnBlue: 'bg-[#F7FAFF]',
  arrowIconBase: 'h-5 w-5',
  arrowIconOnLight: 'text-white',
  arrowIconOnBlue: 'text-[#4284FF]',

  // desktop/tablet wrapper
  desktopWrap:
    'hidden w-full flex-col items-center justify-center gap-6 md:flex md:flex-row md:gap-8 lg:h-[44.3125rem] lg:w-[93.8125rem] lg:gap-[6.25rem] lg:p-[3.375rem_2.96875rem_3.3125rem_2.96875rem]',

  // flip container
  flipOuter: 'h-[24rem] w-[20rem] cursor-pointer [perspective:1000px] lg:h-[37.625rem] lg:w-[40.8125rem]',
  flipInner: 'relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]',
  flipped: '[transform:rotateY(180deg)]',

  // front face (light)
  faceBase:
    'absolute inset-0 overflow-hidden rounded-[1.25rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden]',
  frontFace: 'bg-[#F7FAFF]',
  frontTitle:
    'absolute top-6 left-6 text-[1.5rem] font-semibold text-[#1B2634] lg:top-[4.38rem] lg:left-[5.13rem] lg:text-[2.25rem]',
  frontImgBase: 'absolute object-contain',
  frontImg0: '-right-[25%] -bottom-[45%] h-[130%] w-auto lg:-right-[35%] lg:-bottom-[60%] lg:h-[170%]',
  frontImg1: '-right-[20%] -bottom-[40%] h-[120%] w-auto lg:-right-[30%] lg:-bottom-[55%] lg:h-[160%]',

  // back face (blue)
  backFace:
    'absolute inset-0 [transform:rotateY(180deg)] overflow-hidden rounded-[1.25rem] bg-[#4284FF] p-6 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden] lg:p-[3rem_4rem]',

  // back content (white text)
  backTitle: 'font-semibold text-[#F7FAFF] mb-4 text-[1.25rem] md:mb-6 md:text-[1.5rem] lg:mb-8 lg:text-[2.25rem]',
  backSectionWrap: 'flex flex-col gap-4 md:gap-5 lg:gap-6',
  backItemRow: 'flex items-center gap-2 md:gap-3',
  backNum: 'font-semibold text-[#F7FAFF] text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]',
  backItemTitleAttendance: 'font-semibold text-[#F7FAFF] text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]',
  backItemTitleEvent: 'font-semibold text-[#F7FAFF] text-[0.875rem] md:text-[1rem] lg:text-[1.25rem]',
  backDate: 'font-medium text-[#F7FAFF]/80 text-[0.75rem] md:text-[0.875rem] lg:text-[1rem]',
  backDetail: 'font-medium text-[#F7FAFF] text-[0.75rem] md:text-[0.875rem] lg:text-[1.25rem]',
  backDetailsWrap: 'flex flex-col gap-1',

  // back image
  backImgBase: 'absolute object-contain opacity-30',
  backImg0:
    '-right-[30%] -bottom-[50%] h-[140%] w-auto md:-right-[25%] md:-bottom-[45%] md:h-[130%] lg:-right-[35%] lg:-bottom-[60%] lg:h-[170%]',
  backImg1:
    '-right-[25%] -bottom-[45%] h-[130%] w-auto md:-right-[20%] md:-bottom-[40%] md:h-[120%] lg:-right-[30%] lg:-bottom-[55%] lg:h-[160%]',
} as const;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const CompletionConditionSection = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);

  const handleCardInteraction = (cardId: string) => {
    setFlippedCard((prev) => (prev === cardId ? null : cardId));
  };

  const handleMobileNext = () => {
    setMobileCardIndex((prev) => (prev + 1) % COMPLETION_CONDITIONS.length);
  };

  const renderBackContent = (card: (typeof COMPLETION_CONDITIONS)[0], index: number) => {
    const isAttendance = card.id === 'attendance';

    return (
      <>
        <h3 className={TW.backTitle}>{card.title}</h3>

        <div className={TW.backSectionWrap}>
          {isAttendance
            ? (card.items as AttendanceItem[]).map((item) => (
                <div key={item.number}>
                  <div className={TW.backItemRow}>
                    <span className={TW.backNum}>{item.number}</span>
                    <span className={TW.backItemTitleAttendance}>{item.title}</span>
                  </div>

                  <div className={TW.backDetailsWrap}>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className={TW.backDetail}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            : (card.items as EventItem[]).map((item) => (
                <div key={item.number} className={TW.backItemRow}>
                  <span className={TW.backNum}>{item.number}</span>
                  <span className={TW.backItemTitleEvent}>{item.title}</span>
                  <span className={TW.backDate}>{item.date}</span>
                </div>
              ))}
        </div>

        <img src={CARD_IMAGES[index]} alt="" className={cx(TW.backImgBase, index === 0 ? TW.backImg0 : TW.backImg1)} />
      </>
    );
  };

  return (
    <section className={TW.section}>
      <div className={TW.container}>
        {/* heading */}
        <div className={TW.headingBox}>
          <span className={TW.headingKicker}>13기 아기사자</span>
          <h2 className={TW.headingTitle}>{SECTION_TITLES.COMPLETION_CONDITION}</h2>
        </div>

        {/* mobile carousel */}
        <div className={TW.mobileWrap}>
          {mobileCardIndex === 0 && (
            <div className={cx(TW.mobileCardBase, TW.mobileCardLight)}>
              <h3 className={TW.mobileLightTitle}>{COMPLETION_CONDITIONS[0].title}</h3>

              <div className="flex flex-col gap-3">
                {(COMPLETION_CONDITIONS[0].items as AttendanceItem[]).map((item) => (
                  <div key={item.number}>
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className={TW.mobileLightNum}>{item.number}</span>
                      <span className={TW.mobileLightLabel}>{item.title}</span>
                    </div>

                    <div className="flex flex-col gap-0.5 pl-7">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className={TW.mobileLightDetail}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <img src={CARD_IMAGES[0]} alt="" className={TW.mobileImgLight} />

              <button
                onClick={handleMobileNext}
                className={cx(TW.arrowBtnBase, TW.arrowBtnOnLight)}
                aria-label="다음 카드">
                <svg className={cx(TW.arrowIconBase, TW.arrowIconOnLight)} fill="none" viewBox="0 0 24 24">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#F7FAFF" />
                </svg>
              </button>
            </div>
          )}

          {mobileCardIndex === 1 && (
            <div className={cx(TW.mobileCardBase, TW.mobileCardBlue)}>
              <h3 className={TW.mobileBlueTitle}>{COMPLETION_CONDITIONS[1].title}</h3>

              <div className="flex flex-col gap-2">
                {(COMPLETION_CONDITIONS[1].items as EventItem[]).map((item) => (
                  <div key={item.number} className={TW.mobileRow}>
                    <span className={TW.mobileBlueNum}>{item.number}</span>
                    <span className={TW.mobileBlueLabel}>{item.title}</span>
                    <span className={TW.mobileBlueDate}>{item.date}</span>
                  </div>
                ))}
              </div>

              <img src={CARD_IMAGES[1]} alt="" className={TW.mobileImgBlue} />

              <button
                onClick={handleMobileNext}
                className={cx(TW.arrowBtnBase, TW.arrowBtnOnBlue)}
                aria-label="다음 카드">
                <svg className={cx(TW.arrowIconBase, TW.arrowIconOnBlue)} fill="none" viewBox="0 0 24 24">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#4284FF" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* tablet/desktop */}
        <div className={TW.desktopWrap}>
          {COMPLETION_CONDITIONS.map((card, index) => {
            const isFlipped = flippedCard === card.id;

            return (
              <div
                key={card.id}
                className={TW.flipOuter}
                onClick={() => handleCardInteraction(card.id)}
                onMouseEnter={() => setFlippedCard(card.id)}
                onMouseLeave={() => setFlippedCard(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardInteraction(card.id);
                }}>
                <div className={cx(TW.flipInner, isFlipped && TW.flipped)}>
                  {/* front */}
                  <div className={cx(TW.faceBase, TW.frontFace)}>
                    <h3 className={TW.frontTitle}>{card.title}</h3>
                    <img
                      src={CARD_IMAGES[index]}
                      alt=""
                      className={cx(TW.frontImgBase, index === 0 ? TW.frontImg0 : TW.frontImg1)}
                    />
                  </div>

                  {/* back */}
                  <div className={TW.backFace}>{renderBackContent(card, index)}</div>
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
