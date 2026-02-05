import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MENU_ORDER } from '@shared/constants/menu';
import { KAKAOTALK_URL, INSTAGRAM_URL } from '@shared/constants/url';
import { logo, apply_arrow } from '@shared/constants/menu';
import { RiMenuLine, RiCloseLargeLine, RiKakaoTalkFill, RiInstagramFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export interface MenuProps {
  mode?: 'light' | 'dark';
}

const mobileMenuColor = 'text-navyblack';
const hoverOption = 'hover:text-blue hover:font-[600]';
const activeOption = 'text-blue font-[600]';

export interface MobileDrawerProps {
  setDrawerOpen: (open: boolean) => void;
  mobileMenuColor: string;
}

const MobileDrawer = ({ setDrawerOpen, mobileMenuColor }: MobileDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(null);
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

  const mobileMenuContainerClasses = `
    fixed top-0 left-0 w-[100vw] h-[100vh] inline-flex flex-col justify-start items-start z-[200] bg-white md:hidden
    transform transition-transform duration-300 ease-in-out
    ${isVisible ? 'translate-x-0' : 'translate-x-full'}
  `;
  const mobileMenuListClasses = 'm-[2.5rem_1rem] flex flex-col gap-[2rem] text-[1.5rem] font-medium';

  const mobileIconContainerClasses = 'inline-flex gap-[1rem]';
  const mobileIconItemClasses = `${mobileMenuColor} ${hoverOption} cursor-pointer h-[2rem] w-[2rem]`;

  return (
    <>
      <div className={mobileMenuContainerClasses} role="dialog" aria-modal="true" aria-label="모바일 메뉴 서랍">
        <span className={`inline-flex h-[3.5rem] w-full justify-end p-[1.2rem_1rem] pr-[1.5rem]`}>
          <RiCloseLargeLine className={`${mobileMenuColor} ${hoverOption} cursor-pointer`} onClick={handleClose} />
        </span>
        <div className={mobileMenuListClasses}>
          {MENU_ORDER.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              onClick={(e) => {
                e.preventDefault(); // 기본 네비게이션 막기
                handleCloseAndNavigate(item.path);
              }}
              onMouseEnter={() => setHoveredMobileItem(item.key)}
              onMouseLeave={() => setHoveredMobileItem(null)}
              className={({ isActive }) => {
                const isActiveOrHovered = isActive || hoveredMobileItem === item.key;
                return `w-full cursor-pointer text-[1.5rem] ${
                  isActiveOrHovered ? activeOption : mobileMenuColor
                } ${hoverOption}`;
              }}>
              {item.label}
            </NavLink>
          ))}
          <div className={mobileIconContainerClasses}>
            <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
              <RiKakaoTalkFill className={mobileIconItemClasses} />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <RiInstagramFill className={mobileIconItemClasses} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Menu = ({ mode = 'light', ...props }: MenuProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isLightMode = mode === 'light';
  const menuModeColor = isLightMode ? 'text-navyblack' : 'text-white';

  const baseClasses = [
    'fixed top-0 left-0 w-[100vw] inline-flex justify-between items-center z-[100]',
    'backdrop-blur-md shadow-xl shadow-black/10',
    `${menuModeColor}`,
  ].join(' ');

  const responsiveClasses = [
    'p-[1.5rem_1rem] pr-[1.5rem] h-[3.5rem]', // mobile
    'md:p-[0.625rem_4rem] md:h-[4.625rem]', // tablet
    'lg:p-[0.625rem_4rem] lg:h-[6.0625rem]', // desktop
  ].join(' ');

  const logoClasses = 'h-[24px] md:h-[2.625rem] lg:h-[3.675rem]';

  const menuListClasses =
    'hidden md:p-[0.625rem] md:inline-flex md:justify-center md:items-center md:gap-[2.5rem] lg:gap-[4rem]';
  const iconContainerClasses = 'hidden md:inline-flex md:justify-center md:items-right md:gap-[1rem]';
  const iconItemClasses = `${menuModeColor} cursor-pointer md:h-[1.42rem] md:w-[1.42rem] lg:h-[2rem] lg:w-[2rem]`;

  return (
    <>
      <div className={`${baseClasses} ${responsiveClasses}`} {...props}>
        {/* 로고 : desktop, tablet, mobile */}
        <NavLink to="/">
          <img className={logoClasses} src={isLightMode ? logo.dark : logo.light} alt="SMWU Like Lion" />
        </NavLink>

        {/* 메뉴 리스트 : desktop, tablet */}
        <div className={menuListClasses}>
          {MENU_ORDER.filter((item) => item.key !== 'home').map((item) => (
            <span key={item.key}>
              <NavLink
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) => {
                  const isActiveOrHovered = isActive || hoveredItem === item.key;
                  return `${hoverOption} md:text-[1rem] lg:text-[1.25rem] ${
                    isActiveOrHovered ? activeOption : menuModeColor
                  }`;
                }}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {item.key === 'apply' && (
                      <img
                        className={`${iconItemClasses} inline-block pl-[0.3rem]`}
                        src={
                          isActive || hoveredItem === 'apply'
                            ? apply_arrow.active
                            : isLightMode
                              ? apply_arrow.dark
                              : apply_arrow.light
                        }
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
        <div className={iconContainerClasses}>
          <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
            <RiKakaoTalkFill className={iconItemClasses} />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <RiInstagramFill className={iconItemClasses} />
          </a>
        </div>

        {/* 햄버거 메뉴 아이콘 : mobile */}
        <button
          className="cursor-pointer md:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-label="메뉴 서랍 열기"
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer">
          <RiMenuLine className={iconItemClasses} />
        </button>
        {drawerOpen && <MobileDrawer setDrawerOpen={setDrawerOpen} mobileMenuColor={mobileMenuColor} />}
      </div>
    </>
  );
};

export default Menu;
