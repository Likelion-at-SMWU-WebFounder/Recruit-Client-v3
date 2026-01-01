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
  const menuModeColor = mode === 'light' ? 'navyblack' : 'white';

  // 기본 스타일 + 색상 모드
  const baseClasses = [
    'fixed top-0 left-0 w-screen flex flex-row justify-between items-center z-50',
    'backdrop-blur-md bg-white/10 dark:bg-black/80',
    `${mode === 'light' ? 'text-navyblack' : 'text-white'}`,
  ].join(' ');

  // 반응형 padding, gap 스타일 (모바일 기본, md: 태블릿, lg: 데스크톱)
  const responsiveClasses = [
    'pt-[1rem] pb-[1.69rem] gap-[1.25rem]', // mobile
    'md:pt-[5rem] md:pb-[3.19rem] md:gap-[2.5rem]', // tablet
    'lg:pt-[8.13rem] lg:pb-[3.06rem] lg:gap-[3.06rem]', // desktop
  ].join(' ');

  // 반응형 타이틀 사이즈(모바일 기본, md: 태블릿, lg: 데스크톱)
  const logoClasses = 'h-[34px], md:h-[42px], lg:h-[60px]';

  // 반응형 아이콘 컨테이너 사이즈
  const iconContainerClasses = 'inline-flex flex-row justify-center items-center gap-[2rem]';
  const iconItemClasses = [
    'inline-flex flex-col justify-center items-center cursor-pointer', // 기본 설정
    'gap-[0.5rem]', // mobile
    'md:gap-[1rem] lg:gap-[1rem]', // tablet, desktop
  ].join(' ');

  return (
    <div className={`${baseClasses} ${responsiveClasses} `} {...props}>
      {/* Logo */}
      <div className={`${logoClasses}`}>
        <img src={mode === 'light' ? smwu_lion_logo_dark : smwu_lion_logo_light} alt="SMWU Like Lion " />
      </div>
      {/* MENU */}
      {MENU_ORDER.map((item) => (
        <div key={item.key} className="">
          <Link to={item.path}>
            {item.label}
            {item.key === 'apply' && <BsArrowUpRightCircleFill className="ml-1 inline-block" />}
          </Link>
        </div>
      ))}
      {/* KAKAO, INSTAGRAM icon */}
      <div className={`${iconContainerClasses}`}>
        <a href={KAKAOTALK_URL} target="_blank" rel="noreferrer">
          <RiKakaoTalkFill className={`${iconItemClasses}`} color={menuModeColor} />
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <RiInstagramFill className={`${iconItemClasses}`} color={menuModeColor} />
        </a>
      </div>
    </div>
  );
};

export default Menu;
