import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom'; // 현재 페이지 경로를 가져오기 위해 필요 (active 상태용)
import { MENU_ORDER } from '@shared/constants/menu';
import { KAKAOTALK_URL, INSTAGRAM_URL } from '@shared/constants/url';
import { logo, apply_arrow } from '@shared/constants/menu';
import { RiMenuLine, RiCloseLine, RiKakaoTalkFill, RiInstagramFill } from 'react-icons/ri';

export interface MenuProps {
  mode?: 'light' | 'dark';
}

const mobileMenuColor = 'text-navyblack';
const hoverColor = 'hover:text-blue';

export interface MobileDrawerProps {
  setDrawerOpen: (open: boolean) => void;
  mobileMenuColor: string;
}

const MobileDrawer = ({ setDrawerOpen, mobileMenuColor }: MobileDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

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

  const mobileMenuContainerClasses = `
    fixed top-0 right-0 h-screen w-full inline-flex flex-col justify-start items-start z-[200] bg-white md:hidden
    transform transition-transform duration-300 ease-in-out
    ${isVisible ? 'translate-x-0' : 'translate-x-full'}
  `;
  const mobileMenuListClasses = 'm-[2.5rem_1rem] flex flex-col gap-[2rem] text-[1.5rem] font-medium';
  const mobileMenuItemClasses = `${mobileMenuColor} ${hoverColor} w-[100dvw] cursor-pointer text-[1.5rem] font-medium`;
  const mobileIconContainerClasses = 'inline-flex gap-[1rem]';
  const mobileIconItemClasses = `${mobileMenuColor} ${hoverColor} cursor-pointer h-[2rem] w-[2rem]`;

  return (
    <>
      <div className={mobileMenuContainerClasses} role="dialog" aria-modal="true" aria-label="모바일 메뉴 서랍">
        <span className={`inline-flex h-[2.5rem] w-full justify-end p-[0.625rem_1rem]`}>
          <RiCloseLine
            className={`${mobileMenuColor} ${hoverColor} cursor-pointer md:h-[2rem] md:w-[2rem] lg:h-[2rem] lg:w-[2rem]`}
            onClick={handleClose}
          />
        </span>
        <div className={mobileMenuListClasses}>
          {MENU_ORDER.map((item) => (
            <span key={item.key} className={mobileMenuItemClasses}>
              {/* 모바일 메뉴에서 active 상태 구현 시:
                  className={`${mobileMenuColor} ${hoverColor} w-[100dvw] cursor-pointer text-[1.5rem] font-medium ${
                    isActivePath(item.path) ? activeColor : ''
                  }`} */}
              <Link to={item.path} onClick={handleClose}>
                {item.label}
              </Link>
            </span>
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
  const isLightMode = mode === 'light';
  const menuModeColor = isLightMode ? 'text-navyblack' : 'text-white';

  // 현재 페이지 경로를 가져오기 위한 hook (active 상태 구현 시 사용)
  // const location = useLocation();

  // const isActivePath = (path: string) => {
  //   if (path === '/') return location.pathname === '/';
  //   return location.pathname.startsWith(path);
  // };

  // active 상태일 때 사용할 색상 클래스 (필요 시 사용)
  // const activeColor = 'text-blue';
  // const getMenuItemClass = (path: string) => {
  //   return `${hoverColor} md:text-[1rem] lg:text-[1.25rem] font-medium ${
  //     isActivePath(path) ? activeColor : ''
  //   }`;
  // };

  const baseClasses = [
    'fixed top-0 left-0 w-full inline-flex justify-between items-center z-[100]',
    'backdrop-blur-md shadow-xl shadow-black/10',
    `${menuModeColor}`,
  ].join(' ');

  const responsiveClasses = [
    'p-[0.625rem_1rem] h-[2.5rem]', // mobile
    'md:p-[0.625rem_4rem] md:h-[4.625rem]', // tablet
    'lg:p-[0.625rem_4rem] lg:h-[6.0625rem]', // desktop
  ].join(' ');

  const logoClasses = 'h-[24px] md:h-[2.625rem] lg:h-[3.675rem]';

  const menuListClasses =
    'hidden md:p-[0.625rem] md:inline-flex md:justify-center md:items-center md:gap-[2.5rem] lg:gap-[4rem]';
  const menuItemClasses = `${hoverColor} md:text-[1rem] lg:text-[1.25rem] font-medium`;
  // active 상태 구현 시 위 menuItemClasses 대신 아래와 같이 사용:
  // const menuItemClasses = (path: string) => getMenuItemClass(path);
  const iconContainerClasses = 'hidden md:inline-flex md:justify-center md:items-right md:gap-[1rem]';
  const iconItemClasses = `${menuModeColor} cursor-pointer md:h-[1.42rem] md:w-[1.42rem] lg:h-[2rem] lg:w-[2rem]`;

  return (
    <>
      <div className={`${baseClasses} ${responsiveClasses}`} {...props}>
        {/* 로고 : desktop, tablet, mobile */}
        <Link to="/">
          <img className={logoClasses} src={isLightMode ? logo.dark : logo.light} alt="SMWU Like Lion" />
        </Link>

        {/* 메뉴 리스트 : desktop, tablet */}
        <div className={menuListClasses}>
          {MENU_ORDER.map((item) => (
            <span key={item.key} className={menuItemClasses}>
              {/* active 상태 구현 시 className={menuItemClasses(item.path)} 으로 변경*/}
              <Link to={item.path}>
                {item.label}
                {item.key === 'apply' && (
                  <img
                    className={`${iconItemClasses} inline-block pl-[0.3rem]`}
                    src={isLightMode ? apply_arrow.dark : apply_arrow.light}
                    alt=" "
                  />
                )}
              </Link>
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
        <button className="cursor-pointer md:hidden" onClick={() => setDrawerOpen(true)}>
          <RiMenuLine className={iconItemClasses} />
        </button>
        {drawerOpen && <MobileDrawer setDrawerOpen={setDrawerOpen} mobileMenuColor={mobileMenuColor} />}
      </div>
    </>
  );
};

export default Menu;
