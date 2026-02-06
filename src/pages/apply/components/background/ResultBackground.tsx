import React from 'react';
import ReusableBackground from './ReusableBackground';

const BASE_CARD_STYLE = `
  relative flex flex-col items-center overflow-hidden rounded-[1.25rem] 
  border border-[var(--color-white-main)]/12 bg-[var(--color-white-main)]/12 backdrop-blur-md
  shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)]
  
  w-[22.125rem] h-[34.75rem]
  md:w-[54.4375rem] md:h-[51.75rem]
  lg:w-[66.3125rem] lg:h-[52rem]
`;

const DEFAULT_PADDING = `
  py-[2.28rem] px-[2.12rem]
  md:py-[3.72rem] md:px-[7.25rem]
  lg:py-[3.59rem] lg:px-[7.5rem]
`;

interface ResultBackgroundProps {
  children?: React.ReactNode;
  paddingClassName?: string;
}

const ResultBackground = ({ children, paddingClassName }: ResultBackgroundProps) => {
  return (
    <ReusableBackground
      className="flex h-[46rem] items-center justify-center md:h-[85.375rem] lg:h-[67.5rem]"
      isAnimated={false}>
      <div className={`${BASE_CARD_STYLE} ${paddingClassName || DEFAULT_PADDING}`}>{children}</div>
    </ReusableBackground>
  );
};

export default ResultBackground;
