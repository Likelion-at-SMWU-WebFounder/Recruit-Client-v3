import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_ORDER } from '@shared/constants/menu';
import { KAKAOTALK_URL, INSTAGRAM_URL } from '@shared/constants/url';
import { logo, apply_arrow } from '@shared/constants/menu';
import { RiMenuLine, RiCloseLargeLine, RiKakaoTalkFill, RiInstagramFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { combineStyles } from '@shared/utils/combineStyles';

export interface MenuProps {
  mode?: 'light' | 'dark';
}

// Menu 스타일 상수화
const MENU_STYLES = {
  container: {
    base: 'fixed top-0 left-0 w-[100vw] inline-flex justify-between items-center z-[100] backdrop-blur-md shadow-xl shadow-black/10',
    mobile: 'p-[1.5rem_1rem] pr-[1.5rem] h-[60px]',
    tablet: 'md:p-[0.625rem_4rem] md:h-[4.625rem]',
    desktop: 'lg:p-[0.625rem_4rem] lg:h-[6.0625rem]',
  },
  logo: {
    base: 'h-[40px]',
    tablet: 'md:h-[2.625rem]',
    desktop: 'lg:h-[3.675rem]',
  },
  menuList: {
    base: 'hidden md:p-[0.625rem] md:inline-flex md:justify-center md:items-center',
    tablet: 'md:gap-[2.5rem]',
    desktop: 'lg:ml-[-8rem] lg:gap-[4rem]',
  },
  iconContainer: {
    base: 'hidden md:inline-flex md:justify-center md:items-right',
    tablet: 'md:gap-[1rem]',
  },
  iconItem: {
    base: 'cursor-pointer',
    tablet: 'md:h-[1.42rem] md:w-[1.42rem]',
    desktop: 'lg:h-[2rem] lg:w-[2rem]',
  },
  mobileMenuContainer: {
    base: 'fixed top-0 left-0 w-[100vw] h-[100vh] inline-flex flex-col justify-start items-start z-[400] bg-white md:hidden transform transition-transform duration-300 ease-in-out',
  },
  mobileMenuList: {
    base: 'm-[2.5rem] flex flex-col gap-[2rem] text-[1.5rem] font-medium',
  },
  mobileIconContainer: {
    base: 'inline-flex gap-[1rem]',
  },
  mobileIconItem: {
    base: 'cursor-pointer h-[2rem] w-[2rem]',
  },
  mobileCloseButtonContainer: {
    base: 'w-full flex  items-center justify-end pr-[1.5rem] h-[60px]',
  },
  mobileCloseButton: {
    base: 'w-[40px] h-[40px] ',
  },
  hamburgerButton: {
    base: 'cursor-pointer md:hidden w-[40px] h-[40px]',
  },
  hamburgerIcon: {
    base: 'w-full h-full',
  },
} as const;

const mobileMenuColor = 'text-navyblack';
const hoverOption = 'hover:font-[600]';
const activeOption = 'text-blue font-[600]';
const defaultFontWeight = 'font-medium';

export interface MobileDrawerProps {
  setDrawerOpen: (open: boolean) => void;
  mobileMenuColor: string;
}

const MobileDrawer = ({ setDrawerOpen, mobileMenuColor }: MobileDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setDrawerOpen(false), 300);
  };

  useEffect(() => {
    setIsVisible(true);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleEscape); // ESC 키로 모달 닫기
    document.body.style.overflow = 'hidden'; // Body scroll 막기
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, []);

  const handleCloseAndNavigate = (path: string) => {
    setIsVisible(false);

    setTimeout(() => {
      setDrawerOpen(false);
      navigate(path);
    }, 300); // 슬라이드 애니메이션 duration과 동일하게
  };

  const mobileMenuContainerClassName = `${combineStyles(MENU_STYLES.mobileMenuContainer)} ${
    isVisible ? 'translate-x-0' : 'translate-x-full'
  }`;
  const mobileMenuListClassName = combineStyles(MENU_STYLES.mobileMenuList);
  const mobileCloseButtonContainerClassName = combineStyles(MENU_STYLES.mobileCloseButtonContainer);
  const mobileCloseButtonClassName = combineStyles(MENU_STYLES.mobileCloseButton);
  const mobileIconContainerClassName = combineStyles(MENU_STYLES.mobileIconContainer);
  const mobileIconItemClassName = `${combineStyles(MENU_STYLES.mobileIconItem)} ${mobileMenuColor} ${hoverOption}`;

  return (
    <>
      <div className={mobileMenuContainerClassName} role="dialog" aria-modal="true" aria-label="모바일 메뉴 서랍">
        <div className={mobileCloseButtonContainerClassName}>
          <div className={mobileCloseButtonClassName}>
            <RiCloseLargeLine
              className={`${mobileMenuColor} ${hoverOption} h-full w-full cursor-pointer`}
              onClick={handleClose}
            />
          </div>
        </div>
        <div className={mobileMenuListClassName}>
          {MENU_ORDER.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              onClick={(e) => {
                e.preventDefault(); // 기본 네비게이션 막기
                handleCloseAndNavigate(item.path);
              }}
              className={({ isActive }) => {
                return `w-full cursor-pointer text-[1.5rem] ${
                  isActive ? activeOption : `${mobileMenuColor} ${defaultFontWeight}`
                } ${hoverOption}`;
              }}>
              {item.label}
            </NavLink>
          ))}
          <div className={mobileIconContainerClassName}>
            <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
              <RiKakaoTalkFill className={mobileIconItemClassName} />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <RiInstagramFill className={mobileIconItemClassName} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Menu = ({ mode = 'light', ...props }: MenuProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLightMode = mode === 'light';
  const menuModeColor = isLightMode ? 'text-navyblack' : 'text-white';

  const containerClassName = `${combineStyles(MENU_STYLES.container)} ${menuModeColor}`;
  const logoClassName = combineStyles(MENU_STYLES.logo);
  const menuListClassName = combineStyles(MENU_STYLES.menuList);
  const iconContainerClassName = combineStyles(MENU_STYLES.iconContainer);
  const iconItemClassName = `${combineStyles(MENU_STYLES.iconItem)} ${menuModeColor}`;
  const hamburgerButtonClassName = combineStyles(MENU_STYLES.hamburgerButton);
  const hamburgerIconClassName = `${combineStyles(MENU_STYLES.hamburgerIcon)} ${menuModeColor}`;

  return (
    <>
      <div className={containerClassName} {...props}>
        {/* 로고 : desktop, tablet, mobile */}
        <NavLink to="/">
          <img className={logoClassName} src={isLightMode ? logo.dark : logo.light} alt="SMWU Like Lion" />
        </NavLink>

        {/* 메뉴 리스트 : desktop, tablet */}
        <div className={menuListClassName}>
          {MENU_ORDER.filter((item) => item.key !== 'home').map((item) => (
            <span key={item.key}>
              <NavLink
                to={item.path}
                className={({ isActive }) => {
                  return `${hoverOption} md:text-[1rem] lg:text-[1.25rem] ${
                    isActive ? activeOption : `${menuModeColor} ${defaultFontWeight}`
                  }`;
                }}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {item.key === 'apply' && (
                      <img
                        className={`${iconItemClassName} inline-block pl-[0.3rem]`}
                        src={isActive ? apply_arrow.active : isLightMode ? apply_arrow.dark : apply_arrow.light}
                        alt=" "
                      />
                    )}
                  </>
                )}
              </NavLink>
            </span>
          ))}
        </div>

        {/* 카카오톡, 인스타그램 아이콘 : desktop, tablet */}
        <div className={iconContainerClassName}>
          <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
            <RiKakaoTalkFill className={iconItemClassName} />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <RiInstagramFill className={iconItemClassName} />
          </a>
        </div>

        {/* 햄버거 메뉴 아이콘 : mobile */}
        <button
          className={hamburgerButtonClassName}
          onClick={() => setDrawerOpen(true)}
          aria-label="메뉴 서랍 열기"
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer">
          <RiMenuLine className={hamburgerIconClassName} />
        </button>
        {drawerOpen && <MobileDrawer setDrawerOpen={setDrawerOpen} mobileMenuColor={mobileMenuColor} />}
      </div>
    </>
  );
};

export default Menu;
