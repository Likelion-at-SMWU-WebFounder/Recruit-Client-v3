import { Link } from 'react-router-dom';
import { MENU_ORDER } from '@shared/constants/menu';
import smwu_lion_logo_dark from '@assets/icons/smwu_lion_logo_dark.svg';
import smwu_lion_logo_light from '@assets/icons/smwu_lion_logo_white.svg';
import { KAKAOTALK_URL, INSTAGRAM_URL } from '@shared/constants/url';
import { BsArrowUpRightCircleFill } from 'react-icons/bs'; // 지원하기 옆 화살표
import { RiKakaoTalkFill, RiInstagramFill } from 'react-icons/ri';

export interface MenuProps {
  mode?: 'light' | 'dark';
}

const Menu = ({ mode = 'light', ...props }: MenuProps) => {
  // 메뉴 모드에 따른 글, 아이콘 색상 설정
  const isLightMode = mode === 'light';
  const menuItemColor = isLightMode ? 'navyblack' : 'white';

  // 기본 스타일 + 색상 모드
  const baseClasses = [
    'fixed top-0 left-0 w-screen inline-flex flex-row justify-between items-center z-50',
    'backdrop-blur shadow-xl ',
    `text-${menuItemColor}`,
    `${isLightMode ? 'shadow-gray/5' : 'shadow-black/10'}`,
  ].join(' ');

  // 반응형 padding, gap 스타일 (모바일 기본, md: 태블릿, lg: 데스크톱)
  const responsiveClasses = [
    'p-[1rem] gap-[1.25rem]', // mobile
    'md:gap-[2.5rem]', // tablet
    'lg:gap-[3.06rem]', // desktop
  ].join(' ');

  // 반응형 로고 사이즈
  const logoClasses = 'h-[5rem], md:h-[5rem], lg:h-[5rem]';

  // 반응형 메뉴 사이즈
  const menuContainerClasses = 'w-[50%] inline-flex flex-row justify-between items-center';
  const menuItemClasses = [
    'font-semibold text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]', // mobile, tablet, desktop
    'hover:underline underline-offset-8', // hover 효과
  ].join(' ');

  // 반응형 아이콘 컨테이너 사이즈
  const iconContainerClasses = 'inline-flex flex-row justify-center items-right gap-[0.5rem] md:gap-[1rem]';
  const iconItemClasses = [
    'inline-flex flex-col justify-center items-center cursor-pointer', // 기본 설정
    'h-[2rem] gap-[0.5rem]', // mobile
    'md:h-[4rem] md:gap-[1rem] lg:gap-[1rem]', // tablet, desktop
  ].join(' ');

  return (
    <div className={`${baseClasses} ${responsiveClasses}`} {...props}>
      {/* Logo */}
      <img
        className={logoClasses}
        src={mode === 'light' ? smwu_lion_logo_dark : smwu_lion_logo_light}
        alt="SMWU Like Lion"
      />
      {/* MENU */}
      <div className={menuContainerClasses}>
        {MENU_ORDER.map((item) => (
          <span key={item.key} className={menuItemClasses}>
            <Link to={item.path}>
              {item.label}
              {item.key === 'apply' && <BsArrowUpRightCircleFill className="ml-1 inline-block" />}
            </Link>
          </span>
        ))}
      </div>
      {/* KAKAO, INSTAGRAM icon */}
      <div className={iconContainerClasses}>
        <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
          <RiKakaoTalkFill className={`${iconItemClasses}`} color={menuItemColor} />
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <RiInstagramFill className={`${iconItemClasses}`} color={menuItemColor} />
        </a>
      </div>
    </div>
  );
};

export default Menu;
