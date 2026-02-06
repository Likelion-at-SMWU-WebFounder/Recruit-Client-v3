import { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SECTION_TITLES, SECTION_SUB_TITLES, COMPLETION_CONDITIONS } from '../../constants/index';
import img3dSpring from '../../assets/3d-spring.png';
import img3dKnot from '../../assets/3d-knot.png';
import img3dSpringBlue from '../../assets/3d-spring-blue.png';
import img3dKnotBlue from '../../assets/3d-knot-blue.png';
import SubTitle from '@/shared/components/SubTitle';
import '../../styles/completionConditionSection.css';

const CARD_IMAGES = [
  { default: img3dSpring, blue: img3dSpringBlue },
  { default: img3dKnot, blue: img3dKnotBlue },
] as const;

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

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const TW = {
  // layout
  section:
    'flex h-auto w-full items-center justify-center bg-[var(--color-white-main)] py-[10rem] md:py-[12.04488rem] lg:py-[8rem]',
  container: 'flex w-full flex-col items-center',

  // heading
  headingBox: 'mb-[4.5rem] flex flex-col items-center gap-[1rem] md:mb-[6.89rem] lg:mb-[4.19rem]',

  // mobile wrapper
  mobileWrap: 'relative w-[22.5625rem] h-[20.8125rem] md:hidden [perspective:1000px] [transform-style:preserve-3d]',

  // mobile cards (fronts)
  mobileCardBase:
    'relative h-[20.8125rem] w-[22.5625rem] overflow-hidden rounded-[1.25rem] px-[1.69rem] py-[1.94rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] cursor-pointer [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform-style:preserve-3d]',
  mobileCardLight:
    'bg-[linear-gradient(216deg,rgba(247,250,255,0.10)_7.92%,rgba(255,255,255,0.65)_26.31%,rgba(255,255,255,0.85)_80.33%)]',
  mobileCardBlue: 'bg-[linear-gradient(180deg,rgba(66,132,255,0.90)_5.26%,rgba(66,132,255,1)_100%)]',

  // mobile contents
  mobileLightTitle: 'mb-[1.25rem] text-[1.25rem] font-semibold text-[var(--color-navyblack-main)] leading-[120%]',
  mobileBlueTitle: 'mb-[1.25rem] text-[1.25rem] font-semibold text-[var(--color-white-main)] leading-[120%]',
  mobileRow: 'flex items-center gap-[0.375rem]',
  mobileLightNum: 'text-[1.125rem] font-semibold text-[var(--color-navyblack-main)] leading-[120%]',
  mobileBlueNum: 'text-[1.125rem] font-semibold text-[var(--color-white-main)] leading-[120%]',
  mobileLightLabel: 'text-[1rem] font-medium text-[var(--color-navyblack-main) leading-[120%]]',
  mobileBlueLabel: 'text-[1rem] font-medium text-[var(--color-white-main)] leading-[120%]',
  mobileBlueDate: 'text-[0.875rem] font-medium text-[#F7FAFF]/75 leading-[120%]',
  mobileLightDetail: 'text-[0.875rem] font-medium text-[#1B2634]/70 leading-[120%]',

  // mobile image
  mobileImgLight: 'absolute -right-[25%] -bottom-[40%] h-[130%] w-auto object-contain opacity-20 scale-[1.7] z-0 ',
  mobileImgBlue: 'absolute -right-[25%] -bottom-[25%] h-[120%] w-auto object-contain opacity-20 scale-[1.3] z-0',

  // mobile arrow button
  arrowBtnBase:
    'absolute right-0 bottom-0 flex h-[2.5625rem] w-[2.5625rem] items-center justify-center rounded-tl-[1.25rem] rounded-br-[0.625rem] cursor-pointer',
  arrowBtnOnLight: 'bg-[var(--color-blue-main)]',
  arrowBtnOnBlue: 'bg-[var(--color-white-main)]',
  arrowIconBase: 'h-[1.5rem] w-[1.5rem]',
  arrowIconOnLight: 'text-[var(--color-white-main)]',
  arrowIconOnBlue: 'text-[var(--color-blue-main)]',

  // desktop/tablet wrapper
  desktopWrap:
    'hidden w-full flex-col items-center justify-center md:flex md:flex-row md:gap-[1rem] md:w-[56rem] md:h-[25.375rem] lg:h-[37.625rem] lg:w-[87.875rem] lg:gap-[6.25rem]',

  // flip container
  flipOuter: 'md:h-[25.375rem] md:w-[27.5rem] cursor-pointer [perspective:1000px] lg:h-[37.625rem] lg:w-[40.8125rem]',

  // front face (light)
  faceBase:
    'absolute inset-0 overflow-hidden rounded-[1.25rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden]',
  frontFace:
    'bg-[linear-gradient(216deg,rgba(247,250,255,0.10)_7.92%,rgba(255,255,255,0.65)_26.31%,rgba(255,255,255,0.85)_80.33%)]',
  frontTitle:
    'absolute top-[2.06rem] left-[2.5rem] text-[1.5rem] font-semibold text-[var(--color-navyblack-main)] lg:top-[4.37rem] lg:left-[5.12rem] lg:text-[2.25rem] leading-[120%]',
  frontImgBase: 'absolute object-contain',
  frontImg0:
    '-right-[23%] -bottom-[35%] h-[130%] w-auto lg:-right-[23%] lg:-bottom-[60%] lg:h-[170%] opacity-20 scale-[1.7]',
  frontImg1:
    '-right-[21%] -bottom-[33%] h-[120%] w-auto lg:-right-[21%] lg:-bottom-[55%] lg:h-[160%] opacity-20 scale-[1.3]',

  // back face (blue)
  backFace: cx(
    'absolute inset-0 [transform:rotateY(180deg)_translateZ(1px)] overflow-hidden rounded-[1.25rem] px-[2.5rem] py-[2.06rem] shadow-[0_0_22.7px_0_rgba(27,38,52,0.13)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] lg:py-[4.38rem] lg:px-[5.13rem]',
    'opacity-90 bg-[linear-gradient(180deg,rgba(66,132,255,0.90)_5.26%,rgba(66,132,255,1)_100%)]'
  ),

  // back content (white text)
  backTitle:
    'font-semibold text-[var(--color-white-main)] md:mb-[1.94rem] md:text-[1.5rem] lg:mb-[2.81rem] lg:text-[2.25rem] leading-[120%] relative z-10',
  backAttendanceWrap: 'flex flex-col md:gap-[1.9375rem] lg:gap-[2.3125rem] relative z-10',
  backEventWrap: 'flex flex-col md:gap-[1rem] lg:gap-[1.125rem] relative z-10',
  backItemRow: 'flex items-center gap-[0.625rem]',
  backNum: 'font-semibold text-[var(--color-white-main)] md:text-[1.375rem] lg:text-[2rem] leading-[120%]',
  backItemRowAttendance: 'flex items-center gap-[1rem] mb-[0.625rem]',
  backItemTitleAttendance:
    'font-medium text-[var(--color-white-main)] md:text-[1.25rem] lg:text-[1.75rem] leading-[120%]',
  backItemTitleEvent: 'font-medium text-[var(--color-white-main)] md:text-[1.25rem] lg:text-[1.75rem] leading-[120%]',
  backDate: 'font-medium text-[var(--color-white-main)]/75 md:text-[1.125rem] lg:text-[1.5rem] leading-[120%]',
  backDetail:
    'font-medium text-[var(--color-white-opacity75)] md:text-[1.125rem] lg:text-[1.5rem] lg:pl-[3.4rem] md:pl-[2.67rem] leading-[120%]',
  backDetailsWrap: 'flex flex-col md:gap-[0.375rem] lg:gap-[0.5rem]',

  // back image
  backImgBase: 'absolute object-contain ',
  backImg0:
    '-right-[23%] -bottom-[35%] h-[130%] w-auto lg:-right-[23%] lg:-bottom-[60%] lg:h-[170%] opacity-30 scale-[1.7]',
  backImg1:
    '-right-[21%] -bottom-[33%] h-[120%] w-auto lg:-right-[21%] lg:-bottom-[55%] lg:h-[160%] opacity-30 scale-[1.3]',
} as const;

const CompletionConditionSection = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [isMobileFlipped, setIsMobileFlipped] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleCardClick = (cardId: string) => {
    if (isDesktop) return;
    setFlippedCard((prev) => (prev === cardId ? null : cardId));
  };

  const handleMobileFlip = () => {
    setIsMobileFlipped((prev) => !prev);
  };

  const renderBackContent = (card: (typeof COMPLETION_CONDITIONS)[0], index: number) => {
    const isAttendance = card.id === 'attendance';
    const currentImage = CARD_IMAGES[index].blue;

    return (
      <>
        <h3 className={TW.backTitle}>{card.title}</h3>

        {isAttendance ? (
          <div className={TW.backAttendanceWrap}>
            {(card.items as AttendanceItem[]).map((item) => (
              <div key={item.number}>
                <div className={TW.backItemRowAttendance}>
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

        <img src={currentImage} alt="" className={cx(TW.backImgBase, index === 0 ? TW.backImg0 : TW.backImg1)} />
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
        <div className={cx(TW.mobileWrap, 'mFlipCard')}>
          <div className={cx('mFlipInner', isMobileFlipped && 'is-flipped')}>
            <div
              className={cx(TW.mobileCardBase, TW.mobileCardLight, 'mFlipFace')}
              onClick={handleMobileFlip}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleMobileFlip();
              }}>
              <div className="relative z-10">
                <h3 className={TW.mobileLightTitle}>{COMPLETION_CONDITIONS[0].title}</h3>
                <div className="flex flex-col gap-[1.5rem]">
                  {(COMPLETION_CONDITIONS[0].items as AttendanceItem[]).map((item) => (
                    <div key={item.number}>
                      <div className="mb-[0.5rem] flex items-baseline gap-[0.75rem]">
                        <span className={TW.mobileLightNum}>{item.number}</span>
                        <span className={TW.mobileLightLabel}>{item.title}</span>
                      </div>

                      <div className="flex flex-col gap-[0.25rem] pl-[2.1rem]">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className={TW.mobileLightDetail}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <img src={CARD_IMAGES[0].default} alt="" className={TW.mobileImgLight} />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileFlip();
                }}
                className={cx(TW.arrowBtnBase, TW.arrowBtnOnLight)}
                aria-label="다음 카드">
                <svg className={cx(TW.arrowIconBase, TW.arrowIconOnLight)} fill="none" viewBox="0 0 24 24">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#F7FAFF" />
                </svg>
              </button>
            </div>
            <div
              className={cx(TW.mobileCardBase, TW.mobileCardBlue, 'mFlipFace', 'mFlipBack')}
              onClick={handleMobileFlip}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleMobileFlip();
              }}>
              <div className="relative z-10">
                <h3 className={TW.mobileBlueTitle}>{COMPLETION_CONDITIONS[1].title}</h3>

                <div className="flex flex-col gap-[0.8125rem]">
                  {(COMPLETION_CONDITIONS[1].items as EventItem[]).map((item) => (
                    <div key={item.number} className={TW.mobileRow}>
                      <span className={TW.mobileBlueNum}>{item.number}</span>
                      <span className={TW.mobileBlueLabel}>{item.title}</span>
                      <span className={TW.mobileBlueDate}>{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <img src={CARD_IMAGES[1].blue} alt="" className={TW.mobileImgBlue} />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileFlip();
                }}
                className={cx(TW.arrowBtnBase, TW.arrowBtnOnBlue)}
                aria-label="다음 카드">
                <svg className={cx(TW.arrowIconBase, TW.arrowIconOnBlue)} fill="none" viewBox="0 0 24 24">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#4284FF" />
                </svg>
              </button>
            </div>
          </div>
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
                      src={CARD_IMAGES[index].default}
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
