export const TW = {
  // layout
  section: 'flex w-full items-center justify-center py-[9.37rem] md:py-[12.23244rem] lg:py-[6.0625rem] md:px-[1rem]',
  container: 'flex w-full flex-col items-center',

  // heading
  headingBox: 'flex flex-col items-center gap-[1rem] mb-[4.56rem] md:mb-[6.89rem] lg:mb-[4.19rem]',

  // mobile
  mobileWrap: 'w-full md:hidden',
  mobileCarousel: 'relative flex h-[27.5rem] w-full items-center justify-center overflow-hidden',
  mobileSlideBase: 'absolute transition-all duration-300 ease-out',
  mobileSlideActive: 'z-20',
  mobileSlideIdle: 'z-10 blur-[2px]',

  // indicator
  indicatorWrap: 'mt-[1.06rem] flex h-[2.25rem] w-full items-center justify-center gap-[0.5rem]',
  dotBase: 'h-[0.5rem] w-[0.5rem] flex-shrink-0 rounded-full',
  dotActive: 'bg-[var(--color-blue-main)]',
  dotIdle: 'bg-[var(--color-navyblack-main)] opacity-40',

  // desktop/tablet wrapper
  desktopWrap: 'relative hidden h-[28rem] w-full items-center justify-center cursor-pointer md:flex lg:h-[44.8125rem]',

  // shared card
  cardBase:
    'overflow-hidden rounded-[1.25rem] px-[0.81rem] py-[3rem] shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] lg:px-[2.31rem] lg:py-[4.38rem] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)',
  cardSizeDesktop: 'h-[23.125rem] w-[18rem] lg:h-[36.375rem] lg:w-[32.3125rem]',
  cardSizeMobile: 'h-[23.125rem] w-[18rem]',

  cardFolded: 'absolute transform rotate-[calc(var(--r)*1deg)] -mx-[4rem] lg:-mx-[8rem]',
  cardExpanded: 'relative transform rotate(0deg) mx-[0.4rem] lg:mx-[1.375rem]',

  // gradients
  gradA:
    'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.84%,rgba(247,250,255,0.40)_77.64%)]',
  gradB:
    'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.97%,rgba(247,250,255,0.40)_77.89%)]',
  gradC:
    'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_41.42%,rgba(247,250,255,0.40)_82.79%)]',

  // card text
  textWrap: 'relative z-10 flex flex-col gap-[0.5rem] lg:gap-[0.625rem]',
  titleMobile: 'text-[1.5rem] font-semibold text-[var(--color-navyblack-main)] leading-[120%]',
  titleDesktop: 'text-[1.5rem] font-semibold text-[var(--color-navyblack-main)] lg:text-[2.25rem] leading-[120%]',

  skillsMobile: 'text-[0.875rem] font-medium text-[#1B2634]/60 leading-[120%]',
  skillsFolded: 'text-[0.875rem] font-medium text-[#1B2634]/60 lg:text-[1.25rem] leading-[120%]',
  skillsExpanded: 'text-[0.875rem] font-medium text-[#1B2634]/60 lg:text-[1.25rem] leading-[120%]',

  descMobile:
    'mt-[1.3125rem] text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] break-keep whitespace-pre-line',
  ctaMobile:
    'mt-[1.3125rem] text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] break-keep whitespace-pre-line',

  descExpanded:
    'mt-[1.3125rem] lg:mt-[1.5625rem] text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] lg:text-[1.5rem] break-keep whitespace-pre-line',
  ctaExpanded:
    'mt-[1.3125rem] lg:mt-[2.7rem] text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] lg:text-[1.5rem] break-keep whitespace-pre-line',

  // 3D images
  imgBase: 'absolute z-0 w-auto object-contain opacity-80 transition-all duration-500 ease-in-out',
  imgMobile: '-right-[0%] -bottom-[0%] h-[40%] blur-[1.8px]',
  imgFoldedLeft: '-right-[0%] -bottom-[0%] h-[40%] blur-[1px] lg:h-[44%]',
  imgFoldedCenter: '-right-[0%] -bottom-[0%] h-[40%] blur-[1px] lg:h-[44%]',
  imgExpanded: '-right-[0%] -bottom-[0%] h-[40%] lg:h-[44%] blur-[1.8px]',
} as const;

export type TwTokens = typeof TW;
