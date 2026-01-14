import { combineStyles } from '@shared/utils/combineStyles';

// BlurLayer 스타일 상수화
const BLUR_LAYER_STYLES = {
  base: {
    base: 'pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    mobile: 'h-[9rem] w-[22.5rem] rounded-[5rem]',
    tablet: 'md:h-[18rem] md:w-[50rem] md:rounded-full',
  },
  layer1: {
    base: 'bg-white opacity-80 blur-md',
    tablet: 'md:blur-2xl',
  },
  layer2: {
    base: 'bg-white opacity-90 blur-lg',
    tablet: 'md:blur-2xl',
  },
  layer3: {
    base: 'opacity-90 blur-2xl [background:radial-gradient(circle,_rgba(247,250,255,1)_100%,_rgba(247,250,255,0.9)_70%)]',
  },
} as const;

const BlurLayer = () => {
  const baseClassName = combineStyles(BLUR_LAYER_STYLES.base);
  const layer1ClassName = `${baseClassName} ${combineStyles(BLUR_LAYER_STYLES.layer1)}`;
  const layer2ClassName = `${baseClassName} ${combineStyles(BLUR_LAYER_STYLES.layer2)}`;
  const layer3ClassName = `${baseClassName} ${combineStyles(BLUR_LAYER_STYLES.layer3)}`;

  return (
    <>
      <div className={layer1ClassName}></div>
      <div className={layer2ClassName}></div>
      <div className={layer3ClassName}></div>
    </>
  );
};

export default BlurLayer;
