import Badge from '@pages/project/components/list/Badge';

interface ProjectCardProps {
  thumbnail: string;
  title: string;
  summary: string;
  no: string;
  category: string;
  onClick: () => void;
}

// 스타일 상수화: desktop이 없는 경우는 tablet과 같은 스타일을 사용
const CARD_STYLES = {
  container: {
    base: 'flex cursor-pointer transition-all duration-300 ease-in-out',
    mobile:
      'flex-row items-end gap-[0.75rem] rounded-[0.75rem] bg-white px-[0.875rem] py-[1.25rem] [box-shadow:1px_1px_8.4px_0_rgba(27,38,52,0.10)]',
    tablet:
      'md:max-h-[28.9375rem] md:min-h-[27.125rem] md:w-[27.5rem] md:flex-col md:items-start md:gap-[2.625rem] md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:hover:scale-[1.02]',
    desktop: 'lg:max-h-[33.3125rem] lg:min-h-[31.0625rem] lg:w-[32.375rem]',
  },
  thumbnailWrapper: {
    base: 'flex-shrink-0 overflow-hidden',
    mobile: 'h-[6.25rem] min-h-[6.25rem] w-[6.25rem] min-w-[6.25rem] rounded-[0.34781rem]',
    tablet: 'md:h-[15.5rem] md:min-h-0 md:w-[27.5rem] md:min-w-0 md:rounded-[1.25rem]',
    desktop: 'lg:h-[18.25rem] lg:w-[32.375rem]',
  },
  thumbnail: {
    base: 'object-cover transition-transform duration-300 ease-in-out',
    mobile: 'h-[6.25rem] min-h-[6.25rem] w-[6.25rem] min-w-[6.25rem] rounded-[0.34781rem]',
    tablet: 'md:h-full md:min-h-0 md:w-full md:min-w-0 md:rounded-none md:hover:scale-110',
  },
  content: {
    base: 'space-y-[0.62rem]',
    tablet: 'md:space-y-[1.75rem]',
  },
  textSection: {
    base: 'space-y-[0.25rem]',
    tablet: 'md:space-y-[0.75rem]',
  },
  title: {
    base: 'text-navyblack leading-[140%] font-bold text-[1.125rem]',
    tablet: 'md:text-[1.5rem]',
    desktop: 'lg:text-[1.75rem]',
  },
  summary: {
    base: 'text-gray line-clamp-1 leading-[160%] font-semibold text-[0.875rem]',
    tablet: 'md:line-clamp-none md:text-[1.125rem] md:break-keep',
    desktop: 'lg:text-[1.5rem]',
  },
  badgeContainer: {
    base: 'flex items-center gap-[0.25rem]',
    tablet: 'md:gap-[0.625rem]',
  },
} as const;

const ProjectCard = ({ thumbnail, title, summary, no, category, onClick }: ProjectCardProps) => {
  const containerClassName = [
    CARD_STYLES.container.base,
    CARD_STYLES.container.mobile,
    CARD_STYLES.container.tablet,
    CARD_STYLES.container.desktop,
  ].join(' ');

  const thumbnailWrapperClassName = [
    CARD_STYLES.thumbnailWrapper.base,
    CARD_STYLES.thumbnailWrapper.mobile,
    CARD_STYLES.thumbnailWrapper.tablet,
    CARD_STYLES.thumbnailWrapper.desktop,
  ].join(' ');

  const thumbnailClassName = [
    CARD_STYLES.thumbnail.base,
    CARD_STYLES.thumbnail.mobile,
    CARD_STYLES.thumbnail.tablet,
  ].join(' ');

  const contentClassName = [CARD_STYLES.content.base, CARD_STYLES.content.tablet].join(' ');
  const textSectionClassName = [CARD_STYLES.textSection.base, CARD_STYLES.textSection.tablet].join(' ');
  const titleClassName = [CARD_STYLES.title.base, CARD_STYLES.title.tablet, CARD_STYLES.title.desktop].join(' ');
  const summaryClassName = [CARD_STYLES.summary.base, CARD_STYLES.summary.tablet, CARD_STYLES.summary.desktop].join(
    ' '
  );
  const badgeContainerClassName = [CARD_STYLES.badgeContainer.base, CARD_STYLES.badgeContainer.tablet].join(' ');

  return (
    <div onClick={onClick} className={containerClassName}>
      <div className={thumbnailWrapperClassName}>
        <img src={thumbnail} alt={`${title} 프로젝트 썸네일`} className={thumbnailClassName} loading="lazy" />
      </div>
      <div className={contentClassName}>
        <div className={textSectionClassName}>
          <div className={titleClassName}>{title}</div>
          <div className={summaryClassName}>{summary}</div>
        </div>
        <div className={badgeContainerClassName}>
          <Badge>{no}</Badge>
          <Badge>{category}</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
