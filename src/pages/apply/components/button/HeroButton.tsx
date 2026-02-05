import React from 'react';

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const TW = {
  button: `
    group inline-flex items-center justify-center 
    gap-[0.62rem]
    md:gap-[1.05rem]
    bg-[var(--color-white-main)] 
    text-[var(--color-blue-main)] 
    font-bold leading-normal
    transition-all duration-300 ease-in-out
    cursor-pointer
    leading-[100%]
    
    /* Mobile (Default) */
    rounded-[0.625rem] px-[0.75rem] py-[0.5rem] text-[0.875rem]
    
    /* Tablet (md) */
    md:rounded-[1rem] md:px-[1.375rem] md:py-[0.9375rem] md:text-[1.5rem]
    
    /* Desktop (lg) */
    lg:text-[1.75rem] 
    lg:hover:bg-[var(--color-blue-main)] lg:hover:text-[var(--color-white-main)]
  `,
  icon: `
    shrink-0 transition-colors duration-300
    
    /* Mobile (Default) */
    w-[0.57463rem] h-[0.67038rem]
    
    /* Tablet & Desktop */
    md:w-[0.75rem] md:h-[0.875rem]
  `,
} as const;

const HeroButton = ({ children, onClick }: HeroButtonProps) => {
  return (
    <button onClick={onClick} className={TW.button}>
      {children}

      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={TW.icon}>
        <path
          d="M10.898 0.999547L0.99849 10.899M10.898 0.999547L2.4127 0.999548M10.898 0.999547L10.898 9.48483"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.898 0.999547L0.99849 10.899L10.898 0.999547ZM2.4127 0.999548L10.898 0.999547L2.4127 0.999548ZM10.898 9.48483L10.898 0.999547L10.898 9.48483Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default HeroButton;
