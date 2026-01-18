import { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa6';

interface DetailContainerProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean; // 기본 열림 여부
  mobileOnlyToggle?: boolean; // true면 모바일에서만 토글, 데스크탑/태블릿에서는 항상 열림 설정
  mode?: 'default' | 'light'; // default: shadow 있음, 배경 white | light: shadow 없음, 배경 white-dark 설정
}

const TOGGLE_STYLES = {
  wrapper: {
    default:
      'shadow-sub border border-gray-opacity20 w-full bg-white px-[1.25rem] py-[0.9rem] md:pl-[1.5rem] md:py-[0.95rem] lg:pl-[1rem] lg:py-[1.25rem] rounded-[1.25rem]',
    light:
      'shadow-sub border border-gray-opacity20 md:border-none w-full bg-white md:bg-white-dark md:[box-shadow:none] px-[1.25rem] py-[0.9rem] md:pl-[1.5rem] md:py-[0.95rem] lg:pl-[1rem] lg:py-[1.25rem] rounded-[1.25rem]',
  },
  header: {
    base: 'cursor-pointer w-full flex items-center gap-[0.5rem] md:gap-[1rem] p-[0.6rem] md:p-[0.8rem] lg:p-[1rem]',
    desktop: 'md:cursor-default md:pointer-events-none',
    text: 'hd18-semibold md:hd20-semibold lg:hd28-semibold',
    icon: 'size-5 transition-transform duration-200 ease-out md:size-6 lg:size-7',
  },
  contentWrapper: {
    base: 'grid min-h-0 transition-[grid-template-rows,opacity] duration-300 ease-out',
    open: 'grid-rows-[1fr] opacity-100 mt-[1.75rem]',
    closed: 'grid-rows-[0fr] opacity-0 mt-0',
  },
  contentInner: {
    base: 'overflow-hidden',
  },
  content:
    'rounded-[1.5rem] text-[1rem] font-[400] leading-[170%] lg:leading-[190%] text-navyblack md:text-[1.125rem] lg:text-[1.25rem]',
} as const;

const DetailContainer = ({
  title,
  children,
  defaultOpen = true,
  mobileOnlyToggle = false,
  mode = 'default',
}: DetailContainerProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // mobileOnlyToggle이 true이고 데스크탑/태블릿일 때만 항상 열려있도록 설정
  useEffect(() => {
    if (mobileOnlyToggle && !isMobile) {
      setIsOpen(true);
    }
  }, [isMobile, mobileOnlyToggle]);

  const wrapperClassName = TOGGLE_STYLES.wrapper[mode];
  const headerClassName = [
    TOGGLE_STYLES.header.base,
    mobileOnlyToggle && !isMobile && TOGGLE_STYLES.header.desktop,
  ].join(' ');
  const contentWrapperClassName = [
    TOGGLE_STYLES.contentWrapper.base,
    isOpen ? TOGGLE_STYLES.contentWrapper.open : TOGGLE_STYLES.contentWrapper.closed,
  ].join(' ');
  const contentClassName = TOGGLE_STYLES.content;
  const iconClassName = [
    TOGGLE_STYLES.header.icon,
    mobileOnlyToggle ? 'md:hidden' : '', // mobileOnlyToggle이 true면 데스크탑에서 아이콘 숨김 설정
    isOpen ? 'rotate-0 text-blue/50' : '-rotate-90 text-navyblack/50',
  ]
    .filter(Boolean)
    .join(' ');
  const textClassName = [
    TOGGLE_STYLES.header.text,
    mobileOnlyToggle && !isMobile ? 'text-navyblack/50' : isOpen ? 'text-blue' : 'text-navyblack/50',
  ].join(' ');

  const handleToggle = () => {
    if (mobileOnlyToggle && !isMobile) {
      return; // 데스크탑/태블릿에서는 토글 불가하도록 설정
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={wrapperClassName}>
      <button type="button" onClick={handleToggle} className={headerClassName}>
        <FaCaretDown className={iconClassName} />
        <span className={textClassName}>{title}</span>
      </button>

      <div className={contentWrapperClassName}>
        <div className={TOGGLE_STYLES.contentInner.base}>
          <div className={contentClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailContainer;
