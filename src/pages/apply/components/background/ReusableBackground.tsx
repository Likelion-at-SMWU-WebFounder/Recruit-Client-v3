import React from 'react';
import decoOrange from '../../assets/deco-orange.svg';
import decoBlue from '../../assets/deco-blue.svg';

interface ReusableBackgroundProps {
  children: React.ReactNode;
  className?: string;
  isAnimated?: boolean;
}

const ReusableBackground = ({ children, className = '', isAnimated = false }: ReusableBackgroundProps) => {
  const animationClass = isAnimated ? 'animate-deco' : '';
  return (
    <section
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] ${className}`}>
      {/* 1. 배경 데코 레이어 */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={decoOrange}
          alt=""
          className={`${animationClass} absolute -top-[2rem] -left-[3rem] h-auto w-[18rem] md:w-[28rem] lg:-top-[5rem] lg:-left-[8rem] lg:w-[40rem]`}
        />
        <img
          src={decoBlue}
          alt=""
          className={`${animationClass} absolute -right-[5rem] bottom-[-2rem] h-auto w-[22rem] md:w-[35rem] lg:-right-[12rem] lg:-bottom-[10rem] lg:w-[52rem]`}
        />
      </div>

      {/* 2. 배경 그라데이션 레이어 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(247deg, rgba(12, 12, 12, 0.20) 3.42%, rgba(12, 12, 12, 0.90) 110.51%)',
        }}
      />

      {/* 3. 실제 페이지 컨텐츠가 들어갈 자리 */}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default ReusableBackground;
