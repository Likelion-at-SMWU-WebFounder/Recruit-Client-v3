import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ORDER } from '@shared/constants/menu';
import { KAKAOTALK_URL, INSTAGRAM_URL } from '@shared/constants/url';
import { logo, apply_arrow } from '@shared/constants/menu';
import { RiMenuLine, RiCloseLine, RiKakaoTalkFill, RiInstagramFill } from 'react-icons/ri';

export interface MenuProps {
  mode?: 'light' | 'dark';
}

const Menu = ({ mode = 'light', ...props }: MenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLightMode = mode === 'light';
  const menuItemColor = isLightMode ? 'navyblack' : 'white';

  const baseClasses = [
    'fixed top-0 left-0 w-full inline-flex justify-between items-center z-[100]',
    'backdrop-blur-md shadow-xl shadow-black/10',
    `${isLightMode ? 'text-navyblack' : 'text-white'}`,
  ].join(' ');

  const responsiveClasses = [
    'p-[0.625rem_1rem] h-[2.5rem]', // mobile
    'md:p-[0.625rem_4rem] md:h-[4.625rem]', // tablet
    'lg:p-[0.625rem_4rem] lg:h-[6.0625rem]', // desktop
  ].join(' ');

  const logoClasses = 'h-[24px] md:h-[2.625rem] lg:h-[3.675rem]';

  const menuListClasses =
    'hidden md:p-[0.625rem] md:inline-flex md:justify-center md:items-center md:gap-[2.5rem] lg:gap-[4rem]';
  const menuItemClasses = 'md:text-[1rem] lg:text-[1.25rem] font-medium hover:underline underline-offset-8';

  const iconContainerClasses = 'hidden md:inline-flex md:justify-center md:items-right md:gap-[1rem]';
  const iconItemClasses = 'cursor-pointer md:h-[1.42rem] md:w-[1.42rem] lg:h-[2rem] lg:w-[2rem]';

  const mobileMenuContainerClasses =
    'fixed top-0 left-0 h-screen w-full inline-flex flex-col justify-left items-start z-[200] bg-white md:hidden';
  const mobileMenuListClasses = 'm-[2.5rem_1rem] inline-flex flex-col gap-[2rem] text-[1.5rem] font-medium';
  const mobileMenuItemClasses = 'text-[1.5rem] font-medium hover:underline underline-offset-8';
  const mobileIconContainerClasses = 'inline-flex gap-[1rem]';
  const mobileIconItemClasses = 'cursor-pointer h-[2rem] w-[2rem]';
  const mobileIconColor = 'navyblack';

  return (
    <div className={`${baseClasses} ${responsiveClasses}`} {...props}>
      {/* Logo */}
      <Link to="/">
        <img className={logoClasses} src={isLightMode ? logo.dark : logo.light} alt="SMWU Like Lion" />
      </Link>
      {/* LIST */}
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
      {/* LINK */}
      <div className={iconContainerClasses}>
        <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
          <RiKakaoTalkFill className={iconItemClasses} color={menuItemColor} />
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <RiInstagramFill className={iconItemClasses} color={menuItemColor} />
        </a>
      </div>
      {/* MOBILE MENU */}
      <button className="cursor-pointer md:hidden" onClick={() => setMenuOpen(true)}>
        <RiMenuLine className={iconItemClasses} color={menuItemColor} />
      </button>
      {menuOpen && (
        <div className={mobileMenuContainerClasses}>
          <button
            className={`inline-flex ${responsiveClasses} w-full cursor-pointer justify-end`}
            onClick={() => setMenuOpen(false)}>
            <RiCloseLine className={iconItemClasses} color={menuItemColor} />
          </button>
          <div className={mobileMenuListClasses}>
            {MENU_ORDER.map((item) => (
              <span key={item.key} className={mobileMenuItemClasses}>
                <Link to={item.path} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </span>
            ))}
            <div className={mobileIconContainerClasses}>
              <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
                <RiKakaoTalkFill className={mobileIconItemClasses} color={mobileIconColor} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <RiInstagramFill className={mobileIconItemClasses} color={mobileIconColor} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
