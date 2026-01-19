import DetailContainer from '@pages/project/components/detail/DetailContainer';
import { PROJECT_INFO_LABELS, PROJECT_INFO_ICONS_PATHS, PROJECT_DETAIL_TITLES } from '@pages/project/constants/detail';

// 개요 컴포넌트 타입
interface ProjectOverviewProps {
  category?: string | null;
  no?: string | null;
  techStack?: string | null;
  award?: string | null;
  googleDriveUrl?: string | null;
  gitOrgUrl?: string | null;
  gitFeUrl?: string | null;
  gitBeUrl?: string | null;
}

// 정보 행 컴포넌트 타입 (라벨, 값)
interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

// 링크 아이콘 컴포넌트 타입 (링크, 아이콘 경로, 아이콘 이름)
interface LinkIconProps {
  url: string | null | undefined;
  iconPath: string;
  alt: string;
}

// 개요 컴포넌트 스타일
const OVERVIEW_STYLES = {
  wrapper: 'flex flex-row gap-[1.25rem] md:gap-[2rem] lg:gap-[3.25rem]',
  label: 'hd16 md:hd18-semibold lg:hd20-semibold w-[5.625rem] md:w-[6.8125rem] text-navyblack',
  value: 'bd16 md:bd18 lg:bd20 text-navyblack break-words',
  grid: 'grid grid-cols-[auto,1fr] gap-x-[2.5rem] gap-y-[1.69rem] lg:gap-y-[2.62rem]',
  linkContainer: 'flex flex-wrap items-center gap-[0.94rem]',
  linkIcon: 'h-[2.5rem] w-[2.5rem] md:h-[3rem] md:w-[3rem] lg:h-[4.5rem] lg:w-[4.5rem]',
} as const;

// 정보 행 컴포넌트 (라벨, 값)
const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className={OVERVIEW_STYLES.wrapper}>
      <div className={OVERVIEW_STYLES.label}>{label}</div>
      <div className={OVERVIEW_STYLES.value}>{value || '-'}</div>
    </div>
  );
};

// 링크 아이콘 컴포넌트 (링크, 아이콘 경로, 아이콘 이름)
const LinkIcon = ({ url, iconPath, alt }: LinkIconProps) => {
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center">
      <img src={iconPath} alt={alt} className={OVERVIEW_STYLES.linkIcon} loading="lazy" />
    </a>
  );
};

// 링크 아이콘 컴포넌트 (구글 드라이브, 깃허브 조직, 프론트엔드, 백엔드)
const LinkIcons = ({
  googleDriveUrl,
  gitOrgUrl,
  gitFeUrl,
  gitBeUrl,
}: Pick<ProjectOverviewProps, 'googleDriveUrl' | 'gitFeUrl' | 'gitBeUrl' | 'gitOrgUrl'>) => {
  const linkIcons: LinkIconProps[] = [
    {
      url: googleDriveUrl,
      iconPath: PROJECT_INFO_ICONS_PATHS.googleDrive,
      alt: '구글 드라이브 아이콘',
    },
    {
      url: gitOrgUrl,
      iconPath: PROJECT_INFO_ICONS_PATHS.githubOrg,
      alt: '깃허브 아이콘',
    },
    {
      url: gitFeUrl,
      iconPath: PROJECT_INFO_ICONS_PATHS.githubFe,
      alt: '프론트엔드 깃허브 아이콘',
    },
    {
      url: gitBeUrl,
      iconPath: PROJECT_INFO_ICONS_PATHS.githubBe,
      alt: '백엔드 깃허브 아이콘',
    },
  ];

  const visibleIcons = linkIcons.filter((icon) => icon.url);

  if (visibleIcons.length === 0) return null;

  return (
    <div className={OVERVIEW_STYLES.linkContainer}>
      {visibleIcons.map((icon) => (
        <LinkIcon key={icon.iconPath} url={icon.url} iconPath={icon.iconPath} alt={icon.alt} />
      ))}
    </div>
  );
};

// 개요 컴포넌트 (참여 행사, 참여 기수, 기술 스택, 수상 여부, 링크)
const ProjectOverview = ({
  category,
  no,
  techStack,
  award,
  googleDriveUrl,
  gitFeUrl,
  gitBeUrl,
  gitOrgUrl,
}: ProjectOverviewProps) => {
  const hasAnyLink = !!(googleDriveUrl || gitFeUrl || gitBeUrl || gitOrgUrl);

  return (
    <DetailContainer title={PROJECT_DETAIL_TITLES.overview} mobileOnlyToggle>
      <div className="w-full pb-[0.6rem] md:h-[23.25rem] md:px-[0.8rem] lg:h-[30.25rem] lg:px-[1rem]">
        <div className={OVERVIEW_STYLES.grid}>
          <InfoRow label={PROJECT_INFO_LABELS.category} value={category} />
          <InfoRow label={PROJECT_INFO_LABELS.no} value={no} />
          <InfoRow label={PROJECT_INFO_LABELS.techStack} value={techStack} />
          <InfoRow label={PROJECT_INFO_LABELS.award} value={award} />
          <InfoRow
            label={PROJECT_INFO_LABELS.link}
            value={
              hasAnyLink ? (
                <LinkIcons
                  googleDriveUrl={googleDriveUrl}
                  gitOrgUrl={gitOrgUrl}
                  gitFeUrl={gitFeUrl}
                  gitBeUrl={gitBeUrl}
                />
              ) : (
                '-'
              )
            }
          />
        </div>
      </div>
    </DetailContainer>
  );
};

export default ProjectOverview;
