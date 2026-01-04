import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ORDER } from '@shared/constants/menu';
import { KAKAOTALK_URL, INSTAGRAM_URL } from '@shared/constants/url';
import { logo, apply_arrow } from '@shared/constants/menu';
import { RiMenuLine, RiCloseLine, RiKakaoTalkFill, RiInstagramFill } from 'react-icons/ri';

export interface MenuProps {
  mode?: 'light' | 'dark';
}

const mobileMenuColor = 'text-navyblack';
const hoverColor = 'hover:text-blue';

// 모바일 메뉴 서랍 컴포넌트
export interface MobileDrawerProps {
  setDrawerOpen: (open: boolean) => void;
  mobileMenuColor: string;
}

const MobileDrawer = ({ setDrawerOpen, mobileMenuColor }: MobileDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setDrawerOpen(false), 300);
  };

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
      <div className={mobileMenuContainerClasses}>
        <span className={`inline-flex h-[2.5rem] w-full justify-end p-[0.625rem_1rem]`}>
          <RiCloseLine
            className={`${mobileMenuColor} ${hoverColor} cursor-pointer md:h-[2rem] md:w-[2rem] lg:h-[2rem] lg:w-[2rem]`}
            onClick={handleClose}
          />
        </span>
        <div className={mobileMenuListClasses}>
          {MENU_ORDER.map((item) => (
            <span key={item.key} className={mobileMenuItemClasses}>
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
