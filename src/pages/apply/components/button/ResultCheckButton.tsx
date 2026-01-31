import React from 'react';

const TW = {
  button: `
    inline-flex items-end justify-end
    rounded-[0.625rem] md:rounded-[1rem] rounded-[-.625]
    bg-[var(--color-white-main)] 
    px-[0.75rem] py-[0.5rem] md:px-[1.375rem] md:py-[0.9375rem]
    text-[var(--color-blue-main)] font-bold leading-[120%]
    text-[1rem] md:text-[1.375rem] lg:text-[1.5rem]
    hover:bg-[var(--color-blue-main)] hover:text-[var(--color-white-main)]
    cursor-pointer
  `,
} as const;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ResultCheckButton = ({ children, ...props }: Props) => {
  return (
    <button className={TW.button} {...props}>
      {children}
    </button>
  );
};

export default ResultCheckButton;
