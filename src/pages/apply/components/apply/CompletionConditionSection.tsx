import { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SECTION_TITLES, SECTION_SUB_TITLES, COMPLETION_CONDITIONS } from '../../constants/index';
import img3dSpring from '../../assets/3d-spring.png';
import img3dKnot from '../../assets/3d-knot.png';
import SubTitle from '@/shared/components/SubTitle';
import '../../styles/completionConditionSection.css';

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
    'flex h-auto w-full items-center justify-center bg-[var(--color-white-main)] px-[1rem] py-[10rem] md:px-[4.0625rem] md:py-[12.04488rem] lg:px-[13.09375rem] lg:py-[8rem]',
  container: 'flex w-full flex-col items-center',

  // heading
  headingBox: 'mb-[4.5rem] flex flex-col items-center gap-[1rem] md:mb-[6.89rem] lg:mb-[5.44rem]',

  // mobile wrapper
  mobileWrap: 'relative w-[22.5625rem] md:hidden',

  // mobile cards (fronts)
  mobileCardBase:
    'relative h-[20.8125rem] w-[22.5625rem] overflow-hidden rounded-[1.25rem] p-[1.8rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)]',
  mobileCardLight: 'bg-[var(--color-white-main)]',
  mobileCardBlue: 'bg-[var(--color-blue-main)]',

  // mobile contents
  mobileLightTitle: 'mb-[1.25rem] text-[1.25rem] font-semibold text-[var(--color-navyblack-main)]',
  mobileBlueTitle: 'mb-3 text-[1.25rem] font-semibold text-[var(--color-white-main)]',
  mobileRow: 'flex items-center gap-[0.625rem]',
  mobileLightNum: 'text-[1.125rem] font-semibold text-[var(--color-navyblack-main)]',
  mobileBlueNum: 'text-[1.125rem] font-semibold text-[var(--color-white-main)]',
  mobileLightLabel: 'text-[1rem] font-medium text-[var(--color-navyblack-main)]',
  mobileBlueLabel: 'text-[1rem] font-medium text-[var(--color-white-main)]',
  mobileBlueDate: 'text-[0.875rem] font-medium text-[#F7FAFF]/75',
  mobileLightDetail: 'text-[0.875rem] font-medium text-[#1B2634]/70',

  // mobile image
  mobileImgLight: 'absolute -right-[25%] -bottom-[40%] h-[130%] w-auto object-contain opacity-35 scale-[1.7]',
  mobileImgBlue: 'absolute -right-[25%] -bottom-[25%] h-[120%] w-auto object-contain opacity-35 scale-[1.3]',

  // mobile arrow button
  arrowBtnBase:
    'absolute right-0 bottom-0 flex h-[2.5625rem] w-[2.5625rem] items-center justify-center rounded-tl-[1.25rem] rounded-br-[0.625rem]',
  arrowBtnOnLight: 'bg-[var(--color-blue-main)]',
  arrowBtnOnBlue: 'bg-[var(--color-white-main)]',
  arrowIconBase: 'h-[1.5rem] w-[1.5rem]',
  arrowIconOnLight: 'text-[var(--color-white-main)]',
  arrowIconOnBlue: 'text-[var(--color-blue-main)]',

  // desktop/tablet wrapper
  desktopWrap:
    'hidden w-full flex-col items-center justify-center md:flex md:flex-row md:gap-[1rem] md:w-[56rem] md:h-[26.375rem] lg:h-[44.3125rem] lg:w-[93.8125rem] lg:gap-[6.25rem] lg:p-[3.375rem_2.96875rem_3.375rem_2.96875rem]',

  // flip container
  flipOuter: 'md:h-[25.375rem] md:w-[27.5rem] cursor-pointer [perspective:1000px] lg:h-[37.625rem] lg:w-[40.8125rem]',

  // front face (light)
  faceBase:
    'absolute inset-0 overflow-hidden rounded-[1.25rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden]',
  frontFace: 'bg-[var(--color-white-main)]',
  frontTitle:
    'absolute top-6 left-6 text-[1.5rem] font-semibold text-[var(--color-navyblack-main)] lg:top-[4.38rem] lg:left-[5.13rem] lg:text-[2.25rem]',
  frontImgBase: 'absolute object-contain',
  frontImg0:
    '-right-[23%] -bottom-[35%] h-[130%] w-auto lg:-right-[23%] lg:-bottom-[60%] lg:h-[170%] opacity-35 scale-[1.7]',
  frontImg1:
    '-right-[21%] -bottom-[33%] h-[120%] w-auto lg:-right-[21%] lg:-bottom-[55%] lg:h-[160%] opacity-35 scale-[1.3]',

  // back face (blue)
  backFace:
    'absolute inset-0 [transform:rotateY(180deg)] overflow-hidden rounded-[1.25rem] bg-[#4284FF] p-6 shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden] lg:p-[3rem_4rem]',

  // back content (white text)
  backTitle:
    'font-semibold text-[var(--color-white-main)] md:mb-[1.25rem] md:text-[1.5rem] lg:mb-[1.5rem] lg:text-[2.25rem]',
  backAttendanceWrap: 'flex flex-col md:gap-[1.9375rem] lg:gap-[2.3125rem]',
  backEventWrap: 'flex flex-col md:gap-[0.75rem] lg:gap-[1rem]',
  backItemRow: 'flex items-center md:gap-[0.625rem] lg:gap-[0.625rem]',
  backNum: 'font-semibold text-[#F7FAFF] md:text-[1.375rem] lg:text-[2rem]',
  backItemTitleAttendance: 'font-medium text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]',
  backItemTitleEvent: 'font-medium text-[#F7FAFF] md:text-[1.25rem] lg:text-[1.5rem]',
  backDate: 'font-medium text-[#F7FAFF]/75 md:text-[1.125rem] lg:text-[1.5rem]',
  backDetail: 'font-medium text-[#F7FAFF] md:text-[1.125rem] lg:text-[1.5rem] lg:pl-[2.875rem] md:pl-[2.175rem]',
  backDetailsWrap: 'flex flex-col md:gap-[0.125rem] lg:gap-[0.5rem]',

  // back image
  backImgBase: 'absolute object-contain opacity-30',
  backImg0:
    '-right-[23%] -bottom-[35%] h-[130%] w-auto lg:-right-[23%] lg:-bottom-[60%] lg:h-[170%] opacity-35 scale-[1.7]',
  backImg1:
    '-right-[21%] -bottom-[33%] h-[120%] w-auto lg:-right-[21%] lg:-bottom-[55%] lg:h-[160%] opacity-35 scale-[1.3]',
} as const;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const CompletionConditionSection = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleCardClick = (cardId: string) => {
    if (isDesktop) return;

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

        {isAttendance ? (
          <div className={TW.backAttendanceWrap}>
            {(card.items as AttendanceItem[]).map((item) => (
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
            ))}
          </div>
        ) : (
          <div className={TW.backEventWrap}>
            {(card.items as EventItem[]).map((item) => (
              <div key={item.number} className={TW.backItemRow}>
                <span className={TW.backNum}>{item.number}</span>
                <span className={TW.backItemTitleEvent}>{item.title}</span>
                <span className={TW.backDate}>{item.date}</span>
              </div>
            ))}
          </div>
        )}

        <img src={CARD_IMAGES[index]} alt="" className={cx(TW.backImgBase, index === 0 ? TW.backImg0 : TW.backImg1)} />
      </>
    );
  };

  return (
    <section className={TW.section}>
      <div className={TW.container}>
        {/* heading */}
        <div className={TW.headingBox}>
          <SubTitle
            mode="light"
            align="center"
            subTitle={SECTION_SUB_TITLES.GENERATION}
            subDescription={SECTION_TITLES.COMPLETION_CONDITION}
          />
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
                className={cx(TW.flipOuter, 'flipCard')}
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={isDesktop ? () => setFlippedCard(card.id) : undefined}
                onMouseLeave={isDesktop ? () => setFlippedCard(null) : undefined}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardClick(card.id);
                }}>
                <div className={cx('flipCardInner', isFlipped && 'is-flipped')}>
                  {/* front */}
                  <div className={cx(TW.faceBase, TW.frontFace, 'flipCardFace')}>
                    <h3 className={TW.frontTitle}>{card.title}</h3>
                    <img
                      src={CARD_IMAGES[index]}
                      alt=""
                      className={cx(TW.frontImgBase, index === 0 ? TW.frontImg0 : TW.frontImg1)}
                    />
                  </div>

                  {/* back */}
                  <div className={cx(TW.backFace, 'flipCardFace', 'flipCardBack')}>
                    {renderBackContent(card, index)}
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
