import React from 'react';
import decoOrange from '../../assets/deco-orange.svg';
import decoBlue from '../../assets/deco-blue.svg';

interface ReusableBackgroundProps {
  children: React.ReactNode;
  className?: string;
  isAnimated?: boolean;
}

/* style tokens */
const TW = {
  section: 'relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C]',
  decoLayer: 'pointer-events-none absolute inset-0',
  contentLayer: 'relative z-10',
  animation: 'animate-deco',

  deco: {
    orange:
      'absolute top-[-5rem] left-[-5rem] md:top-[-5rem] md:left-[-6rem] h-auto w-[24rem] md:w-[32rem] lg:-top-[5rem] lg:-left-[8rem] lg:w-[40rem]',
    blue: 'absolute right-[-8rem] md:right-[-9.5rem] lg:bottom-[-10rem] md:bottom-[-7rem] bottom-[-5rem] h-auto w-[26rem] md:w-[40rem] lg:w-[35rem] lg:-right-[12rem] lg:-bottom-[10rem] lg:w-[52rem]',
  },
} as const;

const GRADIENT_STYLE = {
  background: 'linear-gradient(247deg, rgba(12, 12, 12, 0.20) 3.42%, rgba(12, 12, 12, 0.90) 110.51%)',
} as const;

const ReusableBackground = ({ children, className = '', isAnimated = false }: ReusableBackgroundProps) => {
  const decoAnimation = isAnimated ? TW.animation : '';

  return (
    <section className={`${TW.section} ${className}`}>
      {/* 1. 배경 데코 레이어 */}
      <div className={TW.decoLayer}>
        <img src={decoOrange} alt="" className={`${decoAnimation} ${TW.deco.orange}`} />
        <img src={decoBlue} alt="" className={`${decoAnimation} ${TW.deco.blue}`} />
      </div>

      {/* 2. 배경 그라데이션 레이어 */}
      <div className={TW.decoLayer} style={GRADIENT_STYLE} />

      {/* 3. 실제 페이지 컨텐츠 */}
      <div className={TW.contentLayer}>{children}</div>
    </section>
  );
};

export default ReusableBackground;
