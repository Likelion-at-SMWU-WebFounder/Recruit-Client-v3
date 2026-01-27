// styles/recruitPartSection.styles.ts
export const TW = {
  // layout
  section:
    'flex w-full items-center justify-center py-[9.37rem] md:px-[4rem] md:py-[12.23244rem] lg:py-[6.0625rem] lg:px-[10.1875rem]',
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
  desktopWrap: 'relative hidden h-[28rem] w-[38rem] cursor-pointer md:block lg:h-[44.8125rem] lg:w-[64rem]',
  foldedStage: 'absolute top-0 left-1/2 h-full w-[38rem] -translate-x-1/2 lg:w-[64rem]',
  expandedStage: 'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-[1rem] lg:gap-[1.375rem]',

  // shared card
  cardBase: 'overflow-hidden rounded-[1.25rem] p-6 shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)] lg:p-10',
  cardSizeDesktop: 'h-[23.125rem] w-[18rem] lg:h-[36.375rem] lg:w-[32.3125rem]',
  cardSizeMobile: 'h-[23.125rem] w-[18rem]',

  // gradients
  gradA:
    'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.84%,rgba(247,250,255,0.40)_77.64%)]',
  gradB:
    'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_38.97%,rgba(247,250,255,0.40)_77.89%)]',
  gradC:
    'bg-[linear-gradient(180deg,rgba(247,250,255,0.40)_0.05%,rgba(247,250,255,0.26)_41.42%,rgba(247,250,255,0.40)_82.79%)]',

  // folded positioning (desktop)
  foldedPos: {
    left: 'absolute top-1/2 left-0 z-0 -translate-y-1/2 rotate-[-18.63deg]',
    center: 'absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
    right: 'absolute top-1/2 right-0 z-20 -translate-y-1/2 rotate-[18.63deg]',
  },

  // card text
  textWrap: 'relative z-10',
  titleMobile: 'text-[1.5rem] font-semibold text-[var(--color-navyblack-main)]',
  titleDesktop: 'text-[1.5rem] font-semibold text-[var(--color-navyblack-main)] lg:text-[2.25rem]',

  skillsMobile: 'mt-[0.5rem] text-[0.875rem] leading-[180%] font-medium text-[#1B2634]/60',
  skillsFolded: 'lg:mt-[0.625rem] md:mt-[0.5rem] text-[0.875rem] font-medium text-[#1B2634]/60 lg:text-[1.25rem]',
  skillsExpanded: 'mt-2 text-[1rem] leading-[180%] font-medium text-[#1B2634]/60 lg:text-[1.5rem]',

  descMobile:
    'mt-[1.3125rem] text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] break-keep whitespace-pre-line',
  ctaMobile:
    'mt-3 text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] break-keep whitespace-pre-line',

  descExpanded:
    'mt-[1.3125rem] text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] lg:text-[1.5rem] break-keep whitespace-pre-line',
  ctaExpanded:
    'mt-4 text-[0.9375rem] leading-[180%] font-medium text-[var(--color-navyblack-main)] lg:text-[1.5rem] break-keep whitespace-pre-line',

  // 3D images
  imgBase: 'absolute z-0 w-auto object-contain opacity-80',
  imgMobile: '-right-[0%] -bottom-[0%] h-[40%]',
  imgFoldedLeft: '-right-[0%] -bottom-[0%] h-[45%] blur-[1px] lg:h-[55%]',
  imgFoldedCenter: '-right-[0%] -bottom-[0%] h-[45%] blur-[1px] lg:h-[55%]',
  imgExpanded: '-right-[0%] -bottom-[0%] h-[45%] blur-[1px] lg:h-[55%]',
} as const;

export type TwTokens = typeof TW;
