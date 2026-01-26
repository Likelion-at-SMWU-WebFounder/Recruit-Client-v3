import type React from 'react';

interface TagProps {
  children: React.ReactNode;
  mode?: 'blue' | 'dark' | 'light';
}

const Tag = ({ children, mode = 'blue' }: TagProps) => {
  const baseClasses = 'inline-flex justify-center items-center rounded-[1.875rem] leading-[140%] font-semibold border';

  const blueClasses = [
    'border-blue text-blue bg-white-opacity12',
    'lg:text-[1rem] lg:py-[0.3125rem] lg:px-[0.9375rem]',
    'md:text-[0.625rem] md:py-[0.16669rem] md:px-[0.5rem]',
    'text-[0.4375rem] py-[0.11856rem] px-[0.35563rem]',
  ].join(' ');

  const lightDarkModeClasses = [
    `${mode === 'light' && 'border-navyblack text-navyblack bg-white-opacity12'}`,
    `${mode === 'dark' && 'border-white text-white bg-none'}`,
    'lg:text-[1.5rem] lg:py-[0.3125rem] lg:px-[0.9375rem]',
    'md:text-[0.75rem] md:py-[0.16669rem] md:px-[0.5rem]',
    'text-[0.75rem] py-[0.1875rem] px-[0.5rem]',
  ].join(' ');

  return (
    <>
      {mode === 'blue' && <div className={`${baseClasses} ${blueClasses}`}>{children}</div>}
      {(mode === 'dark' || mode === 'light') && (
        <div className={`${baseClasses} ${lightDarkModeClasses}`}>{children}</div>
      )}
    </>
  );
};

export default Tag;
