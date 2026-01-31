import React from 'react';
import ReusableBackground from './ReusableBackground';

const GLASS_CARD_STYLE = `
  relative flex flex-col items-center overflow-hidden rounded-[1.25rem] 
  border border-[var(--color-white-main)]/12 bg-[var(--color-white-main)]/12 backdrop-blur-md
  shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)]
  
  w-[22.125rem] h-[34.75rem] py-[2.28rem] px-[2.12rem]
  md:w-[54.4375rem] md:h-[51.75rem] md:py-[3.72rem] md:px-[7.25rem]
  lg:w-[66.3125rem] lg:h-[52rem] lg:py-[3.59rem] lg:px-[7.5rem]
`;

interface ResultBackgroundProps {
  children?: React.ReactNode;
}

const ResultBackground = ({ children }: ResultBackgroundProps) => {
  return (
    <ReusableBackground
      className="flex h-[53.25rem] items-center justify-center md:h-[85.375rem] lg:h-[67.5rem]"
      isAnimated={false}>
      <div className={GLASS_CARD_STYLE}>{children}</div>
    </ReusableBackground>
  );
};

export default ResultBackground;
