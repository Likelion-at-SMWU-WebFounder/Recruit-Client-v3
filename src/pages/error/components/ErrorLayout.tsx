import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { combineStyles } from '@shared/utils/combineStyles';
import DefaultButton from '@shared/components/button/DefaultButton';
import { ROUTER_URL } from '@shared/constants/url';
import errorIcon from '../assets/error-icon.svg';

// 에러 레이아웃 스타일 상수화
const ERROR_LAYOUT_STYLES = {
  container: {
    base: 'flex h-[100dvh] flex-col items-center justify-center',
  },
  content: {
    base: 'flex flex-col items-center gap-[1.62rem] text-center',
    tablet: 'md:gap-[2.25rem]',
  },
  errorIcon: {
    base: 'w-[3.9375rem] h-[3.9375rem] aspect-square',
    tablet: 'md:w-[6rem] md:h-[6rem]',
    desktop: 'lg:w-[6.3rem] lg:h-[6.3rem]',
  },
  messageContainer: {
    base: 'flex flex-col gap-[1rem]',
    tablet: 'md:gap-[1.62rem]',
  },
  messageTitle: {
    base: 'text-navyblack/90 text-[1.75rem] font-bold leading-[150%] tracking-[-0.0385rem]',
    tablet: 'md:text-[3rem] md:tracking-[-0.066rem]',
    desktop: 'lg:text-[3.25rem] lg:tracking-[-0.0715rem]',
  },
  description: {
    base: 'text-navyblack/70 text-[1rem] font-medium leading-[170%]',
    tablet: 'md:text-[1.5rem]',
    desktop: 'lg:text-[1.75rem] lg:leading-[180%]',
  },
} as const;

export interface ErrorLayoutProps {
  title: string;
  children?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  scrollTopOnMount?: boolean;
}

const ErrorLayout = ({
  title,
  children,
  buttonText = '홈으로 바로가기',
  onButtonClick,
  scrollTopOnMount = true,
}: ErrorLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!scrollTopOnMount) return;
    window.scrollTo(0, 0);
  }, [scrollTopOnMount]);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
      return;
    }
    navigate(ROUTER_URL.HOME);
  };

  const containerClassName = combineStyles(ERROR_LAYOUT_STYLES.container);
  const contentClassName = combineStyles(ERROR_LAYOUT_STYLES.content);
  const errorIconClassName = combineStyles(ERROR_LAYOUT_STYLES.errorIcon);
  const messageContainerClassName = combineStyles(ERROR_LAYOUT_STYLES.messageContainer);
  const messageTitleClassName = combineStyles(ERROR_LAYOUT_STYLES.messageTitle);
  const descriptionClassName = combineStyles(ERROR_LAYOUT_STYLES.description);

  return (
    <div className={containerClassName}>
      <div className={contentClassName}>
        <img src={errorIcon} alt="에러 아이콘" className={errorIconClassName} />

        <div className={messageContainerClassName}>
          <h2 className={messageTitleClassName}>{title}</h2>
          {children && <p className={descriptionClassName}>{children}</p>}
        </div>

        <DefaultButton onClick={handleButtonClick} isIcon={false}>
          {buttonText}
        </DefaultButton>
      </div>
    </div>
  );
};

export default ErrorLayout;
