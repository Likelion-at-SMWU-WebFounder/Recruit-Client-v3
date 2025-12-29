import { type ReactNode } from 'react';
import { combineStyles } from '@shared/utils/combineStyles';

interface SocialLinkButtonProps {
  children: ReactNode;
  onClick: () => void;
  'aria-label'?: string;
}

// 소셜 링크 버튼 스타일 상수화
const SOCIAL_LINK_BUTTON_STYLES = {
  button: {
    base: 'hover:text-navyblack flex h-[1.5rem] w-[1.5rem] cursor-pointer items-center justify-center rounded-lg border border-white transition duration-300 ease-in-out hover:bg-white',
    tablet: 'md:h-[2.5rem] md:w-[2.5rem] md:rounded-2xl',
  },
} as const;

const SocialLinkButton = ({ children, onClick, 'aria-label': ariaLabel }: SocialLinkButtonProps) => {
  const buttonClassName = combineStyles(SOCIAL_LINK_BUTTON_STYLES.button);

  return (
    <button className={buttonClassName} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

export default SocialLinkButton;
