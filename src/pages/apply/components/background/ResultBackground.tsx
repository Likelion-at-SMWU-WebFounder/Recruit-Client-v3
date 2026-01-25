import React from 'react';
import ReusableBackground from './ReusableBackground';

const GLASS_CARD_STYLE = `
  relative flex flex-col items-center overflow-hidden rounded-[1.25rem] 
  border border-[#F7FAFF]/10 bg-[#F7FAFF]/12 backdrop-blur-md
  shadow-[1px_1px_25.5px_4px_rgba(27,38,52,0.12)]
  
  w-[22.125rem] h-[34.75rem] py-[1rem] px-[1.5rem]
  md:w-[54.4375rem] md:h-[51.75rem] md:py-[4.5rem] md:px-[3rem]
  lg:w-[66.3125rem] lg:h-[53rem] lg:py-[6.97rem] lg:px-[5rem]
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
