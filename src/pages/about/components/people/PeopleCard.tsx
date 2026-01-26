import { combineStyles } from '@shared/utils/combineStyles';
import { renderEmphasizedText } from '@/shared/utils/renderEmphasizedText';

interface PeopleCardProps {
  icon: string;
  keyword: string;
  description: string;
  isOpen?: boolean;
  onClick?: () => void;
}

// PeopleCard 스타일 상수화
const PEOPLE_CARD_STYLES = {
  desktop: {
    base: 'hidden cursor-pointer h-[35.5rem] w-[40rem] flex-col items-start gap-[3rem] rounded-[1.25rem] px-[4.75rem] py-[5.88rem] shadow-default',
    desktop: 'lg:flex',
  },
  tabletMobile: {
    base: 'flex cursor-pointer flex-col items-start shadow-sub md:shadow-default',
    mobile: 'w-[22.5625rem] rounded-[0.5rem] py-[1.5rem] pr-[2.3125rem] pl-[1rem]',
    tablet: 'md:flex md:w-[56rem] md:rounded-[1.25rem] md:px-[4.75rem] md:py-[2rem] md:pr-[5.875rem] md:pl-[2.44rem]',
    desktop: 'lg:hidden',
  },
  tabletMobileOpen: {
    base: 'gap-[1.25rem]',
  },
  tabletMobileClosed: {
    base: 'opacity-60',
  },
  descriptionOpen: {
    base: 'grid grid-rows-[1fr] opacity-100',
  },
  descriptionClosed: {
    base: 'grid grid-rows-[0fr] opacity-0',
  },
  icon: {
    base: 'w-[1.5rem]',
    tablet: 'md:w-[3.25rem]',
    desktop: 'lg:w-[5rem]',
  },
  keywordDesktop: {
    base: 'hd32-semibold text-navyblack',
  },
  descriptionDesktop: {
    base: 'text-navyblack/70 text-[1.5rem] leading-[200%] font-[600] whitespace-pre-line',
  },
  keywordTabletMobile: {
    base: 'text-navyblack hd20-semibold',
    tablet: 'md:hd28-semibold',
  },
  descriptionTabletMobile: {
    base: 'text-navyblack/70 text-[1rem] leading-[180%] font-[500]',
    tablet: 'md:text-[1.25rem] md:font-[600] md:whitespace-pre-line',
  },
  iconKeywordWrapper: {
    base: 'flex items-center gap-[0.75rem]',
    tablet: 'md:gap-[1.25rem]',
  },
} as const;

const PeopleCard = ({ icon, keyword, description, isOpen, onClick }: PeopleCardProps) => {
  // 첫 번째 줄바꿈만 유지하고 나머지는 공백으로 변환 (태블릿, 모바일 화면에서 필요)
  const processedDescription = description.replace(/\n/g, (_, offset) => {
    return offset === description.indexOf('\n') ? '\n' : ' ';
  });

  const desktopClassName = combineStyles(PEOPLE_CARD_STYLES.desktop);
  const tabletMobileClassName = `${combineStyles(PEOPLE_CARD_STYLES.tabletMobile)} ${isOpen ? combineStyles(PEOPLE_CARD_STYLES.tabletMobileOpen) : combineStyles(PEOPLE_CARD_STYLES.tabletMobileClosed)}`;
  const iconClassName = combineStyles(PEOPLE_CARD_STYLES.icon);
  const keywordDesktopClassName = combineStyles(PEOPLE_CARD_STYLES.keywordDesktop);
  const descriptionDesktopClassName = combineStyles(PEOPLE_CARD_STYLES.descriptionDesktop);
  const iconKeywordWrapperClassName = combineStyles(PEOPLE_CARD_STYLES.iconKeywordWrapper);
  const keywordTabletMobileClassName = combineStyles(PEOPLE_CARD_STYLES.keywordTabletMobile);
  const descriptionTabletMobileClassName = combineStyles(PEOPLE_CARD_STYLES.descriptionTabletMobile);
  const descriptionContainerClassName = isOpen
    ? `${PEOPLE_CARD_STYLES.descriptionOpen.base} w-full transition-[grid-template-rows,opacity] duration-300 ease-out`
    : `${PEOPLE_CARD_STYLES.descriptionClosed.base} w-full transition-[grid-template-rows,opacity] duration-300 ease-out`;

  return (
    <>
      {/* 데스크톱 */}
      <div className={desktopClassName}>
        <img src={icon} alt={keyword} className={iconClassName} loading="lazy" />
        <div className={keywordDesktopClassName}>{keyword}</div>
        <div className={descriptionDesktopClassName}>{renderEmphasizedText(description)}</div>
      </div>

      {/* 태블릿, 모바일 */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className={tabletMobileClassName}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick?.();
          }
        }}>
        <div className={iconKeywordWrapperClassName}>
          <img src={icon} alt={keyword} className={iconClassName} loading="lazy" />
          <div className={keywordTabletMobileClassName}>{keyword}</div>
        </div>
        <div className={descriptionContainerClassName}>
          <div className="overflow-hidden">
            <div className={descriptionTabletMobileClassName}>{renderEmphasizedText(processedDescription)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleCard;
