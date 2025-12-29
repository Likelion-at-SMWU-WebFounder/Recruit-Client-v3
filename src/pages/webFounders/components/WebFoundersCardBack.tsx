import { type ReactNode } from 'react';
import type { FounderType } from '@/pages/webFounders/types/founder';
import { BiPlus } from 'react-icons/bi';
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { IoMail } from 'react-icons/io5';
import { RiNotionFill } from 'react-icons/ri';
import SocialLinkButton from './SocialLinkButton';
import { normalizeUrl } from '@pages/webFounders/utils';
import { combineStyles } from '@shared/utils/combineStyles';

interface WebFoundersCardBackProps {
  founder: FounderType;
  onFlipBack: () => void;
}

interface SocialLinkConfig {
  url?: string;
  icon: ReactNode;
  label: string;
}

// 스타일 상수화
const CARD_BACK_STYLES = {
  container: {
    base: 'bg-navyblack items-between absolute inset-0 flex h-full [transform:rotateY(180deg)] flex-col justify-between overflow-hidden text-white [-webkit-backface-visibility:hidden] [backface-visibility:hidden]',
    mobile: 'rounded-[0.75rem] p-[0.89rem]',
    tablet: 'md:rounded-[1.4rem] md:p-[1.5rem]',
    desktop: 'lg:rounded-[1.56rem] lg:p-[1.94rem]',
  }, // 카드 뒷면 컨테이너 스타일
  profileImage: {
    base: 'lazyload-image rounded-full object-cover',
    mobile: 'h-[3.15rem] w-[3.15rem]',
    tablet: 'md:h-[4.7rem] md:w-[4.7rem]',
    desktop: 'lg:h-[6.25rem] lg:w-[6.25rem]',
  }, // 프로필 이미지 스타일
  nameInfoWrapper: {
    base: 'flex flex-col',
    mobile: 'mt-[0.51rem] mb-[0.93rem]',
    tablet: 'md:mt-[0.94rem] md:mb-[1.25rem]',
    desktop: 'lg:mt-[1.56rem] lg:mb-[1.41rem]',
  }, // 이름, 기수, 파트 컨테이너 스타일
  nameText: {
    base: 'leading-[140%] font-bold',
    mobile: 'text-[1.125rem]',
    tablet: 'md:text-[1.75rem]',
  }, // 이름 스타일
  noPartText: {
    base: 'leading-[140%] font-medium',
    mobile: 'text-[0.75rem]',
    tablet: 'md:text-[1.25rem]',
  }, // 기수, 파트 스타일
  responsibilitiesText: {
    base: 'leading-[140%] font-medium whitespace-pre-line text-white/70',
    mobile: 'text-[0.75rem]',
    tablet: 'md:text-[1rem]',
    desktop: 'lg:text-[1.25rem]',
  }, // 담당 파트 설명 스타일
  footer: {
    base: 'flex items-end justify-between',
  }, // 푸터 스타일(소셜 링크 아이콘 버튼 컨테이너, 되돌아가기 버튼)
  socialLinksContainer: {
    base: 'flex',
    mobile: 'gap-[0.5rem]',
    tablet: 'md:gap-[0.81rem]',
  }, // 소셜 링크 아이콘 버튼 컨테이너 스타일
  flipBackButton: {
    base: 'hover:text-navyblack bg-navyblack flex aspect-square cursor-pointer items-center justify-center border border-white text-white transition duration-300 ease-in-out hover:bg-white',
    mobile: 'h-[1.875rem] w-[1.875rem] rounded-[0.625rem]',
    tablet: 'md:h-[3.125rem] md:w-[3.125rem] md:rounded-[1.1rem]',
    desktop: 'lg:rounded-[1.25rem]',
  }, // 되돌아가기 버튼 스타일
  flipBackIcon: {
    base: 'rotate-45',
    mobile: 'size-5',
    tablet: 'md:size-8',
  }, // 되돌아가기 버튼 아이콘 스타일
} as const;

/**
 * 소셜 링크 설정을 생성하는 함수
 * @param founder - 멤버 정보
 * @returns 소셜 링크 설정 배열
 */
const createSocialLinks = (founder: FounderType): SocialLinkConfig[] => {
  const { email, notion, github, linkedin, instagram } = founder;
  const links: SocialLinkConfig[] = [];

  const socialConfigs = [
    {
      value: email,
      url: email ? `mailto:${email}` : undefined,
      icon: <IoMail className="size-4 md:size-6" />,
      label: 'Email',
    },
    { value: notion, url: notion, icon: <RiNotionFill className="size-4 md:size-6" />, label: 'Notion' },
    { value: github, url: github, icon: <AiFillGithub className="size-4 md:size-6" />, label: 'GitHub' },
    {
      value: linkedin,
      url: linkedin ? normalizeUrl(linkedin) : undefined,
      icon: <AiFillLinkedin className="size-4 md:size-6" />,
      label: 'LinkedIn',
    },
    {
      value: instagram,
      url: instagram ? normalizeUrl(instagram) : undefined,
      icon: <AiFillInstagram className="size-4 md:size-6" />,
      label: 'Instagram',
    },
  ];

  socialConfigs.forEach((config) => {
    if (config.value && config.url) {
      links.push({
        url: config.url,
        icon: config.icon,
        label: config.label,
      });
    }
  });

  return links;
};

const WebFoundersCardBack = ({ founder, onFlipBack }: WebFoundersCardBackProps) => {
  const { name, no, part, image, responsibilities } = founder;
  const socialLinks = createSocialLinks(founder);

  // 스타일 클래스명
  const containerClassName = combineStyles(CARD_BACK_STYLES.container);
  const profileImageClassName = combineStyles(CARD_BACK_STYLES.profileImage);
  const nameInfoWrapperClassName = combineStyles(CARD_BACK_STYLES.nameInfoWrapper);
  const nameTextClassName = combineStyles(CARD_BACK_STYLES.nameText);
  const noPartTextClassName = combineStyles(CARD_BACK_STYLES.noPartText);
  const responsibilitiesTextClassName = combineStyles(CARD_BACK_STYLES.responsibilitiesText);
  const footerClassName = CARD_BACK_STYLES.footer.base;
  const socialLinksContainerClassName = combineStyles(CARD_BACK_STYLES.socialLinksContainer);
  const flipBackButtonClassName = combineStyles(CARD_BACK_STYLES.flipBackButton);
  const flipBackIconClassName = combineStyles(CARD_BACK_STYLES.flipBackIcon);

  return (
    <div className={containerClassName}>
      <header>
        {/* 프로필 이미지 */}
        <img src={image} className={profileImageClassName} alt={`${name} profile`} />

        {/* 이름, 기수, 파트 */}
        <div className={nameInfoWrapperClassName}>
          <span className={nameTextClassName}>{name}</span>
          <span className={noPartTextClassName}>
            {no} · {part}
          </span>
        </div>

        {/* 담당 파트 설명 */}
        <div className={responsibilitiesTextClassName}>{responsibilities}</div>
      </header>

      <footer className={footerClassName}>
        {/* 아이콘 버튼 영역 */}
        <div className={socialLinksContainerClassName}>
          {socialLinks.map((link, idx) => (
            <SocialLinkButton
              key={idx}
              onClick={() => {
                if (link.url) {
                  window.open(link.url, '_blank', 'noopener,noreferrer');
                }
              }}
              aria-label={link.label}>
              {link.icon}
            </SocialLinkButton>
          ))}
        </div>

        {/* 되돌아가기 버튼 */}
        <button onClick={onFlipBack} className={flipBackButtonClassName}>
          <BiPlus className={flipBackIconClassName} />
        </button>
      </footer>
    </div>
  );
};

export default WebFoundersCardBack;
