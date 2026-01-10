import { combineStyles } from '@shared/utils/combineStyles';

interface LoadingProps {
  text?: string;
}

const DEFAULT_LOADING_TEXT = '로딩 중' as const;

// 로딩 스피너 스타일 상수화
const LOADING_SPINNER_STYLES = {
  wrapper: {
    base: 'fixed inset-0 z-50 flex items-center justify-center',
  }, // 로딩 스피너 랩퍼 (배경 오버레이 포함)
  background: {
    base: 'absolute inset-0 bg-black/50 backdrop-blur-sm',
  }, // 배경 오버레이
  container: {
    base: 'flex flex-col items-center justify-center gap-[1.25rem]',
    tablet: 'md:gap-[2rem]',
  }, // 로딩 스피너 컨텐츠 (스피너와 텍스트)
  base: {
    base: 'relative h-[3rem] w-[3rem]',
    tablet: 'md:h-[6.25rem] md:w-[6.25rem]',
  }, // 스피너
  spinner: {
    base: 'absolute inset-0 animate-spin rounded-full',
  }, // 스피너 애니메이션
  text: {
    base: 'text-[0.875rem] leading-[140%] font-bold text-white',
    tablet: 'md:text-[1rem]',
  }, // 텍스트
  gradient:
    'conic-gradient(from 180deg at 50% 50%, var(--Color-white-background, #FFF) 0deg, var(--Color-blue-dark, #4682F3) 360deg)',
  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))',
} as const;

const Loading = ({ text = DEFAULT_LOADING_TEXT }: LoadingProps) => {
  const containerClassName = combineStyles(LOADING_SPINNER_STYLES.container);
  const baseClassName = combineStyles(LOADING_SPINNER_STYLES.base);
  const spinnerClassName = combineStyles(LOADING_SPINNER_STYLES.spinner);
  const textClassName = combineStyles(LOADING_SPINNER_STYLES.text);
  const wrapperClassName = combineStyles(LOADING_SPINNER_STYLES.wrapper);
  const backgroundClassName = combineStyles(LOADING_SPINNER_STYLES.background);

  // 로딩 스피너 컨텐츠 (스피너와 텍스트)
  const content = (
    <div className={containerClassName}>
      <div className={baseClassName} role="status">
        <div
          className={spinnerClassName}
          style={{
            background: LOADING_SPINNER_STYLES.gradient,
            mask: LOADING_SPINNER_STYLES.mask,
            WebkitMask: LOADING_SPINNER_STYLES.mask,
          }}
        />
        <span className="sr-only">{text}</span>
      </div>
      <span className={textClassName}>{text}</span>
    </div>
  );

  // 로딩 스피너 랩퍼 (배경 오버레이 포함)
  return (
    <div className={wrapperClassName}>
      <div className={backgroundClassName} />
      <div className="relative z-10">{content}</div>
    </div>
  );
};

export default Loading;
