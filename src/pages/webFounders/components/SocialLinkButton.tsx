import { type ReactNode } from 'react';

interface SocialLinkButtonProps {
  children: ReactNode;
  onClick: () => void;
  'aria-label'?: string;
}

const SocialLinkButton = ({ children, onClick, 'aria-label': ariaLabel }: SocialLinkButtonProps) => (
  <button
    className="hover:text-navyblack flex h-[1.5rem] w-[1.5rem] cursor-pointer items-center justify-center rounded-lg border border-white transition duration-300 ease-in-out hover:bg-white md:h-[2.5rem] md:w-[2.5rem] md:rounded-2xl"
    onClick={onClick}
    aria-label={ariaLabel}>
    {children}
  </button>
);

export default SocialLinkButton;
