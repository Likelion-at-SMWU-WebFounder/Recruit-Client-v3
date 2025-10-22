import { useNavigate } from 'react-router-dom';
import { ROUTER_URL, GITHUB_URL } from '@shared/constants/url';
import { Footer as FooterConstants } from '@shared/constants/footer';
import { FiGithub } from 'react-icons/fi';
import { FiGlobe } from 'react-icons/fi';

export interface FooterProps {
  /* 푸터 모드 - light / dark */
  mode?: 'light' | 'dark';
}

const Footer = ({ mode = 'light', ...props }: FooterProps) => {
  const navigate = useNavigate();

  // 기본 스타일 + 색상 모드
  const baseClasses = [
    'w-screen inline-flex flex-col justify-center items-center',
    `${mode === 'light' ? 'bg-white' : 'bg-navyblack  '}`,
  ].join(' ');

  // 반응형 padding, gap 스타일 (모바일 기본, md: 태블릿, lg: 데스크톱)
  const responsiveClasses = [
    'pt-[3.13rem] pb-[1.69rem] gap-[1.25rem]', // mobile
    'md:pt-[5rem] md:pb-[3.19rem] md:gap-[2.5rem]', // tablet
    'lg:pt-[8.13rem] lg:pb-[3.06rem] lg:gap-[3.06rem]', // desktop
  ].join(' ');

  // 반응형 타이틀 사이즈(모바일 기본, md: 태블릿, lg: 데스크톱)
  const titleClasses = [
    'font-semibold text-[1rem] md:text-[1.5rem] lg:text-[1.75rem] whitespace-pre-line text-center', //
    `${mode === 'light' ? 'text-navyblack' : 'text-white  '}`, // 색상 모드
  ].join(' ');

  // 반응형 아이콘 컨테이너 사이즈
  const iconContainerClasses = 'inline-flex flex-row justify-center items-center gap-[2rem]';
  const iconItemClasses = [
    'inline-flex flex-col justify-center items-center cursor-pointer', // 기본 설정
    'gap-[0.5rem]', // mobile
    'md:gap-[1rem], lg:gap-[1rem]', // tablet, desktop
  ].join(' ');
  const iconTextClasses = 'font-semibold text-blue text-[0.875rem] md:text-[1rem] lg:text-[1rem]';
  const iconSizeClasses = 'text-blue w-[1.5rem] h-[1.5rem] md:w-[1.75rem] md:h-[1.75rem] lg:w-[2rem] lg:h-[2rem]';

  // 반응형 저작권 표시 텍스트 사이즈
  const copyrightClasses =
    'text-center text-gray font-normal leading-[150%] text-[0.75rem] md:text-[0.875rem] lg:text-[1rem]';

  return (
    <div className={`${baseClasses} ${responsiveClasses} `} {...props}>
      {/* Title */}
      <div className={`${titleClasses}`}>{FooterConstants.TITLE}</div>
      {/* Icon */}
      <div className={`${iconContainerClasses}`}>
        <div className={`${iconItemClasses}`} onClick={() => navigate(`${ROUTER_URL.WEBFOUNDERS}`)}>
          <FiGlobe className={`${iconSizeClasses}`} />
          <div className={iconTextClasses}>웹파운더즈</div>
        </div>
        <div className={`${iconItemClasses}`} onClick={() => window.open(GITHUB_URL, '_blank')}>
          <FiGithub className={`${iconSizeClasses}`} />
          <div className={iconTextClasses}>깃허브</div>
        </div>
      </div>
      {/* Copyright */}
      <div className={copyrightClasses}>{FooterConstants.COPYRIGHT}</div>
    </div>
  );
};

export default Footer;
